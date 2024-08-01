import { doc, setDoc, getDoc, Timestamp, deleteDoc, collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { startSaving, savingSuccess, savingFailure, setRequestCount, setHistorialData } from './historialSlice';
import axios from 'axios';

const REQUEST_LIMIT = 10;

export const convertTimestampToDate = (ciudades) => {
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

export const getRequestCountFromFirestore = (uid) => {
  return async (dispatch) => {
    try {
      const docRef = doc(FirebaseDB, `users/${uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const ciudades = convertTimestampToDate(data.ciudades || []);
        dispatch(setRequestCount(data.requestCount || 0));
        dispatch(setHistorialData(ciudades));
      } else {
        await setDoc(docRef, { requestCount: 0, ciudades: [] });
        dispatch(setRequestCount(0));
        dispatch(setHistorialData([]));
      }
    } catch (e) {
      console.error('Error al obtener el contador de peticiones:', e);
    }
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

export const limpiarDataDeFirestore = (uid) => {
  return async (dispatch) => {
    dispatch(startSaving());

    try {
      // Limpiar la colección `users`
      const docRef = doc(FirebaseDB, `users/${uid}`);
      await deleteDoc(docRef);

      // Limpiar la colección `cardData`
      const cardDataRef = collection(FirebaseDB, 'cardData');
      const cardDataSnapshot = await getDocs(cardDataRef);
      const deletePromises = cardDataSnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      dispatch(savingSuccess('Colecciones limpiadas con éxito.'));
    } catch (e) {
      dispatch(savingFailure('Error al borrar colecciones: ' + e.message));
    }
  };
};


export const fetchHistorialData = (uid) => {
  return async (dispatch) => {
    try {
      const docRef = doc(FirebaseDB, `users/${uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const ciudades = convertTimestampToDate(data.ciudades || []);
        dispatch(setHistorialData(ciudades));
      } else {
        dispatch(setHistorialData([]));
      }
    } catch (e) {
      console.error('Error al obtener historial:', e);
    }
  };
};

const saveCardDataToFirestore = async (city, cardData) => {
  try {
    const cleanCity = city.replace(/\s+/g, ' ').trim();
    const cardDataRef = doc(FirebaseDB, 'cardData', cleanCity);
    await setDoc(cardDataRef, cardData);
  } catch (error) {
    console.error('Error al guardar los datos de la tarjeta en la colección global:', error);
  }
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
      climaData: climaData // Guardamos el climaData aquí
    };

    dispatch(startSaving());

    try {
      const docRef = doc(FirebaseDB, `users/${uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const ciudades = data.ciudades || [];
        const ciudadExiste = ciudades.some(ciudad => ciudad.city.toLowerCase() === cleanCity.toLowerCase());
        if (ciudadExiste) {
          dispatch(savingFailure('La ciudad ya está en el historial.'));
          return;
        }

        const nuevasCiudades = [
          ...ciudades,
          convertDateToTimestamp(registerCity)
        ];
        
        await setDoc(docRef, { 
          requestCount: requestCount + 1, 
          ciudades: nuevasCiudades 
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

      // Guardar los datos completos de la tarjeta en la colección global
      await saveCardDataToFirestore(cleanCity, {
        city: cleanCity,
        country: countryName,
        climaData,
        timestamp: new Date().toISOString()
      });
    } catch (e) {
      dispatch(savingFailure('Error al guardar la ciudad: ' + e.message));
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

    // Primero, intentamos obtener los datos de la colección `users`
    const userCityData = await fetchFromUserCollection(city, uid);

    if (userCityData) {
      dispatch(savingSuccess('Datos obtenidos de la colección `users`.'));

      // También, actualizamos la colección `cardData` si no hay datos
      const cardData = await fetchFromCardData(city);
      if (!cardData) {
        await saveCardDataToFirestore(city, userCityData);
      }

      // Actualiza la colección `users` con los datos de `cardData`
      if (uid) {
        dispatch(saveCityToFirestore(city, userCityData.climaData.sys.country, userCityData.climaData));
      }

      return userCityData;
    } else {
      const cardData = await fetchFromCardData(city);

      if (cardData) {
        dispatch(savingSuccess('Datos obtenidos de cardData.'));

        // Asegurarnos de que los datos también se guarden en la colección `users` si el usuario está autenticado
        if (uid) {
          dispatch(saveCityToFirestore(city, cardData.climaData.sys.country, cardData.climaData));
        }

        return cardData;
      } else {
        // Si no encontramos los datos en cardData, hacemos la solicitud a la API
        const weatherData = await fetchWeatherFromAPI(city);
        const countryName = await fetchCountryName(weatherData.sys.country);
        const cleanCity = city.replace(/\s+/g, ' ').trim();
        const newCardData = {
          city: cleanCity,
          country: countryName,
          climaData: weatherData,
          timestamp: new Date().toISOString()
        };

        // Guardamos los datos en cardData
        await saveCardDataToFirestore(cleanCity, newCardData);

        // También guardamos en el historial si es necesario
        if (uid) {
          dispatch(saveCityToFirestore(cleanCity, weatherData.sys.country, weatherData));
        }

        dispatch(savingSuccess('Datos obtenidos de la API y guardados en cardData.'));
        return newCardData;
      }
    }
  };
};

const fetchFromUserCollection = async (city, uid) => {
  try {
    const docRef = doc(FirebaseDB, `users/${uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const ciudades = data.ciudades || [];
      const cityData = ciudades.find(ciudad => ciudad.city.toLowerCase() === city.toLowerCase());
      if (cityData) {
        return {
          city: cityData.city,
          country: cityData.country,
          climaData: cityData.climaData
        };
      }
    }
    return null;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    return null;
  }
};

const fetchFromCardData = async (city) => {
  try {
    const cleanCity = city.replace(/\s+/g, ' ').trim();
    const docRef = doc(FirebaseDB, 'cardData', cleanCity);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        city: data.city,
        country: data.country,
        climaData: data.climaData
      };
    }
    return null;
  } catch (error) {
    console.error('Error al obtener datos de cardData:', error);
    return null;
  }
};

export const clearUserDataOnLogout = (uid) => {
  return async () => {
    try {
      const docRef = doc(FirebaseDB, `users/${uid}`);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error al limpiar los datos del usuario al hacer logout:', error);
    }
  };
};