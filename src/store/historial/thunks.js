import { doc, setDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { FirebaseDB } from '../../firebase/config';
import { startSaving, savingSuccess, savingFailure, setRequestCount, setHistorialData } from './historialSlice';
import axios from 'axios';

const REQUEST_LIMIT = 10;

const convertTimestampToDate = (ciudades) => {
  return ciudades.map((ciudad) => ({
    ...ciudad,
    timestamp: ciudad.timestamp.toDate().toISOString(),
  }));
};

const convertDateToTimestamp = (ciudad) => ({
  ...ciudad,
  timestamp: Timestamp.fromDate(new Date(ciudad.timestamp)),
});

const fetchCountryName = async (countryCode) => {
  try {
    const resp = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    return resp.data[0]?.name?.common || '';
  } catch (error) {
    return '';
  }
};

export const listenToUserData = (uid) => {
  return (dispatch) => {
    const docRef = doc(FirebaseDB, `users/${uid}`);
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const ciudades = convertTimestampToDate(data.ciudades || []);
        dispatch(setRequestCount(data.requestCount || 0));
        dispatch(setHistorialData(ciudades));
      } else {
        dispatch(setRequestCount(0));
        dispatch(setHistorialData([]));
      }
    }, (error) => {
      console.error('Error al escuchar datos del usuario:', error);
    });
  };
};

export const updateRequestCountInFirestore = (uid, newCount) => {
  return async (dispatch) => {
    try {
      const docRef = doc(FirebaseDB, `users/${uid}`);
      await setDoc(docRef, { requestCount: newCount }, { merge: true });
      dispatch(setRequestCount(newCount));
    } catch (e) {
      console.error('Error al actualizar el contador de peticiones:', e);
    }
  };
};

const fetchWeatherFromAPI = async (city) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    const getApiClima = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
    const resp = await axios.get(getApiClima);
    return resp.data;
  } catch (error) {
    throw new Error('No se pudo obtener el clima desde la API.');
  }
};

export const getCityData = (city) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { requestCount } = getState().historial;

    if (requestCount >= REQUEST_LIMIT) {
      dispatch(savingFailure('Has alcanzado el límite de 10 peticiones.'));
      return;
    }

    const userCityData = await fetchFromUserCollection(city, uid);

    if (userCityData) {
      dispatch(savingSuccess('Datos obtenidos de la colección `users`.'));
      return userCityData;
    } else {
      const weatherData = await fetchWeatherFromAPI(city);
      const countryName = await fetchCountryName(weatherData.sys.country);
      const cleanCity = city.replace(/\s+/g, ' ').trim();
      const relevantData = {
        temp: weatherData.main.temp,
        feels_like: weatherData.main.feels_like,
        temp_min: weatherData.main.temp_min,
        temp_max: weatherData.main.temp_max,
        description: weatherData.weather?.[0]?.description
      };
      const newCardData = {
        city: cleanCity,
        country: countryName,
        climaData: weatherData,
        timestamp: new Date().toISOString()
      };

      if (uid) {
        await dispatch(saveCityToFirestore(cleanCity, weatherData.sys.country, relevantData));
      }

      dispatch(savingSuccess('Datos obtenidos de la API y guardados en Firestore.'));
      return newCardData;
    }
  };
};

const fetchFromUserCollection = (city, uid) => {
  return new Promise((resolve, reject) => {
    const docRef = doc(FirebaseDB, `users/${uid}`);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const ciudades = data.ciudades || [];
        const cityData = ciudades.find(ciudad => ciudad.city.toLowerCase() === city.toLowerCase());
        if (cityData) {
          resolve({
            city: cityData.city,
            country: cityData.country,
            climaData: cityData.climaData
          });
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    }, (error) => {
      console.error('Error al obtener datos del usuario:', error);
      reject(error);
    });

    return unsubscribe;
  });
};

export const saveCityToFirestore = (city, countryCode, climaData) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { requestCount } = getState().historial;

    if (requestCount >= REQUEST_LIMIT) {
      dispatch(savingFailure('Has alcanzado el límite de 10 peticiones.'));
      return;
    }

    const cleanCity = city.replace(/\s+/g, ' ').trim();
    const countryName = await fetchCountryName(countryCode);
    const registerCity = { 
      city: cleanCity, 
      country: countryName,
      timestamp: new Date().toISOString(),
      climaData: climaData
    };

    dispatch(startSaving());

    try {
      const docRef = doc(FirebaseDB, `users/${uid}`);
      const unsubscribe = onSnapshot(docRef, async (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          let ciudades = data.ciudades || [];
          const ciudadExiste = ciudades.find(ciudad => ciudad.city.toLowerCase() === cleanCity.toLowerCase());
          
          if (ciudadExiste) {
            const now = new Date();
            const lastUpdate = new Date(ciudadExiste.timestamp);

            if ((now - lastUpdate) < 600000) {
              return;
            } else {
              ciudades = ciudades.map(ciudad => 
                ciudad.city.toLowerCase() === cleanCity.toLowerCase() ? 
                convertDateToTimestamp(registerCity) : 
                ciudad
              );
            }
          } else {
            ciudades.push(convertDateToTimestamp(registerCity));
          }

          await setDoc(docRef, { 
            requestCount: requestCount + 1, 
            ciudades 
          }, { merge: true });

          dispatch(updateRequestCountInFirestore(uid, requestCount + 1));
          dispatch(savingSuccess('Ciudad guardada con éxito.'));
        } else {
          await setDoc(docRef, { 
            requestCount: 1, 
            ciudades: [convertDateToTimestamp(registerCity)] 
          });
          dispatch(updateRequestCountInFirestore(uid, 1));
          dispatch(savingSuccess('Ciudad guardada con éxito.'));
        }

        unsubscribe();
      }, (error) => {
        dispatch(savingFailure('Error al guardar la ciudad: ' + error.message));
      });
    } catch (e) {
      dispatch(savingFailure('Error al guardar la ciudad: ' + e.message));
    }
  };
};
