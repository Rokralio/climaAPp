import { doc, setDoc, getDoc, Timestamp, deleteDoc } from 'firebase/firestore/lite';
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
    console.error('Error al obtener el nombre del país', error);
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

export const saveCityToFirestore = (city, countryCode) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { requestCount } = getState().historial;

    if (requestCount >= REQUEST_LIMIT) {
      dispatch(savingFailure('Has alcanzado el límite de 10 peticiones.'));
      return;
    }

    const cleanEspacios = city.replace(/\s+/g, ' ').trim();
    const countryName = await fetchCountryName(countryCode);
    const registerCity = { 
      name: cleanEspacios, 
      country: countryName,
      timestamp: new Date().toISOString()
    };

    dispatch(startSaving());

    try {
      const docRef = doc(FirebaseDB, `users/${uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const ciudades = data.ciudades || [];
        const ciudadExiste = ciudades.some(ciudad => ciudad.name.toLowerCase() === cleanEspacios.toLowerCase());
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
    } catch (e) {
      console.error('Error al guardar la ciudad:', e);
      dispatch(savingFailure('Error al guardar la ciudad: ' + e.message));
    }
  };
};

export const borrarCiudadesDeFirebase = (uid) => {
  return async (dispatch) => {
    dispatch(startSaving());

    try {
      const docRef = doc(FirebaseDB, `users/${uid}`);
      await deleteDoc(docRef);
      dispatch(savingSuccess('Ciudades borradas con éxito.'));
    } catch (e) {
      console.error('Error al borrar ciudades:', e);
      dispatch(savingFailure('Error al borrar ciudades: ' + e.message));
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

// import { doc, setDoc, getDoc, Timestamp, deleteDoc } from 'firebase/firestore/lite';
// import { FirebaseDB } from '../../firebase/config';
// import { startSaving, savingSuccess, savingFailure, setRequestCount, setHistorialData } from './historialSlice';

// const REQUEST_LIMIT = 10;

// const convertTimestampToDate = (ciudades) => {
//   return ciudades.map((ciudad) => ({
//     ...ciudad,
//     timestamp: ciudad.timestamp.toDate().toISOString(),
//   }));
// };

// const convertDateToTimestamp = (ciudad) => ({
//   ...ciudad,
//   timestamp: Timestamp.fromDate(new Date(ciudad.timestamp)),
// });

// export const getRequestCountFromFirestore = (uid) => {
//   return async (dispatch) => {
//     try {
//       const docRef = doc(FirebaseDB, `users/${uid}`);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         const ciudades = convertTimestampToDate(data.ciudades || []);
//         dispatch(setRequestCount(data.requestCount || 0));
//         dispatch(setHistorialData(ciudades));
//       } else {
//         await setDoc(docRef, { requestCount: 0, ciudades: [] });
//         dispatch(setRequestCount(0));
//         dispatch(setHistorialData([]));
//       }
//     } catch (e) {
//       console.error('Error al obtener el contador de peticiones:', e);
//     }
//   };
// };

// export const updateRequestCountInFirestore = (uid, newCount) => {
//   return async (dispatch) => {
//     try {
//       const docRef = doc(FirebaseDB, `users/${uid}`);
//       await setDoc(docRef, { requestCount: newCount }, { merge: true });
//       dispatch(setRequestCount(newCount));
//     } catch (e) {
//       console.error('Error al actualizar el contador de peticiones:', e);
//     }
//   };
// };

// export const saveCityToFirestore = (city) => {
//   return async (dispatch, getState) => {
//     const { uid } = getState().auth;
//     const { requestCount } = getState().historial;

//     if (requestCount >= REQUEST_LIMIT) {
//       dispatch(savingFailure('Has alcanzado el límite de 10 peticiones.'));
//       return;
//     }

//     const cleanEspacios = city.replace(/\s+/g, ' ').trim();
//     const registerCity = { 
//       name: cleanEspacios, 
//       timestamp: new Date().toISOString()
//     };

//     dispatch(startSaving());

//     try {
//       const docRef = doc(FirebaseDB, `users/${uid}`);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         const ciudades = data.ciudades || [];
//         const ciudadExiste = ciudades.some(ciudad => ciudad.name.toLowerCase() === cleanEspacios.toLowerCase());
//         if (ciudadExiste) {
//           dispatch(savingFailure('La ciudad ya está en el historial.'));
//           return;
//         }

//         const nuevasCiudades = [
//           ...ciudades,
//           convertDateToTimestamp(registerCity)
//         ];
        
//         await setDoc(docRef, { 
//           requestCount: requestCount + 1, 
//           ciudades: nuevasCiudades 
//         }, { merge: true });

//         dispatch(updateRequestCountInFirestore(uid, requestCount + 1));
//         dispatch(savingSuccess('Ciudad guardada con éxito.'));
//       } else {
//         await setDoc(docRef, { 
//           requestCount: 1, 
//           ciudades: [convertDateToTimestamp(registerCity)] 
//         });
//         dispatch(updateRequestCountInFirestore(uid, 1));
//         dispatch(savingSuccess('Ciudad guardada con éxito.'));
//       }
//     } catch (e) {
//       console.error('Error al guardar la ciudad:', e);
//       dispatch(savingFailure('Error al guardar la ciudad: ' + e.message));
//     }
//   };
// };

// export const borrarCiudadesDeFirebase = (uid) => {
//   return async (dispatch) => {
//     dispatch(startSaving());

//     try {
//       const docRef = doc(FirebaseDB, `users/${uid}`);
//       await deleteDoc(docRef);
//       dispatch(savingSuccess('Ciudades borradas con éxito.'));
//     } catch (e) {
//       console.error('Error al borrar ciudades:', e);
//       dispatch(savingFailure('Error al borrar ciudades: ' + e.message));
//     }
//   };
// };

// export const fetchHistorialData = (uid) => {
//   return async (dispatch) => {
//     try {
//       const docRef = doc(FirebaseDB, `users/${uid}`);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         const ciudades = convertTimestampToDate(data.ciudades || []);
//         dispatch(setHistorialData(ciudades));
//       } else {
//         dispatch(setHistorialData([]));
//       }
//     } catch (e) {
//       console.error('Error al obtener historial:', e);
//     }
//   };
// };
