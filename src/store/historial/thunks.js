import { doc, collection, setDoc, query, where, getDocs, writeBatch } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { startSaving, savingSuccess, savingFailure, addCityToHistorial, setHistorialData } from './historialSlice';

const UNA_HORA = 60 * 60 * 1000;

export const saveCityToFirestore = (city) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const cleanEspacios = city.replace(/\s+/g, ' ').trim();
    const registerCity = { 
      name: cleanEspacios, 
      timestamp: new Date().toISOString()
    };

    dispatch(startSaving());

    try {
      const newDoc = doc(collection(FirebaseDB, `${uid}/historial/city`));
      await setDoc(newDoc, registerCity);

      dispatch(addCityToHistorial({ id: newDoc.id, name: cleanEspacios, tiempoRestante: UNA_HORA }));
      dispatch(savingSuccess('Ciudad guardada con éxito.'));
    } catch (e) {
      console.error('Error al guardar la ciudad:', e);
      dispatch(savingFailure('Error al guardar la ciudad: ' + e.message));
    }
  };
};

export const borrarCiudadesDeFirebase = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const ahora = new Date();
    const haceUnaHora = new Date(ahora.getTime() - UNA_HORA);

    const ciudadesRef = collection(FirebaseDB, `${uid}/historial/city`);
    const q = query(ciudadesRef, where("timestamp", "<", haceUnaHora.toISOString()));

    try {
      const querySnapshot = await getDocs(q);
      const batch = writeBatch(FirebaseDB);

      querySnapshot.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });

      await batch.commit();
      dispatch(fetchHistorialData(uid)); // Actualiza el historial después de eliminar las ciudades expiradas
    } catch (e) {
      console.error('Error al borrar ciudades:', e);
    }
  };
};

export const fetchHistorialData = (uid) => {
  return async (dispatch) => {
    const ciudadesRef = collection(FirebaseDB, `${uid}/historial/city`);
    const q = query(ciudadesRef);

    try {
      const querySnapshot = await getDocs(q);
      const cities = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const timestamp = new Date(data.timestamp);
        const ahora = new Date();
        const tiempoRestante = Math.max(0, UNA_HORA - (ahora - timestamp));
        cities.push({ id: doc.id, ...data, tiempoRestante });
      });

      dispatch(setHistorialData(cities));
    } catch (e) {
      console.error('Error al obtener historial:', e);
    }
  };
};


// import { doc, collection, setDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore/lite';
// import { FirebaseDB } from '../../firebase/config';
// import { startSaving, savingSuccess, savingFailure, addCityToHistorial, setHistorialData } from './historialSlice';

// const UNA_HORA = 60 * 60 * 1000;

// export const saveCityToFirestore = (city) => {
//   return async (dispatch, getState) => {
//     const { uid } = getState().auth;
//     const cleanEspacios = city.replace(/\s+/g, ' ').trim();
//     const registerCity = { 
//       name: cleanEspacios, 
//       timestamp: new Date().toISOString()
//     }

//     dispatch(startSaving());

//     try {
//       const newDoc = doc(collection(FirebaseDB, `${uid}/historial/city`));
//       await setDoc(newDoc, registerCity);

//       dispatch(addCityToHistorial({ id: newDoc.id, name: cleanEspacios, tiempoRestante: UNA_HORA }));
//       dispatch(savingSuccess('Ciudad guardada con éxito.'));
//     } catch (e) {
//       console.error('Error al guardar la ciudad:', e);
//       dispatch(savingFailure('Error al guardar la ciudad: ' + e.message));
//     }
//   };
// };

// export const borrarCiudadesDeFirebase = () => {
//   return async (dispatch, getState) => {
//     const { uid } = getState().auth;
//     const ahora = new Date();
//     const haceUnaHora = new Date(ahora.getTime() - UNA_HORA);

//     const ciudadesRef = collection(FirebaseDB, `${uid}/historial/city`);
//     const q = query(ciudadesRef, where("timestamp", "<", haceUnaHora));

//     try {
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach(async (docSnapshot) => {
//         await deleteDoc(docSnapshot.ref);
//       });

//       dispatch(fetchHistorialData(uid));
//     } catch (e) {
//       console.error('Error al borrar ciudades:', e);
//     }
//   };
// };

// export const fetchHistorialData = (uid) => {
//   return async (dispatch) => {
//     const ciudadesRef = collection(FirebaseDB, `${uid}/historial/city`);
//     const q = query(ciudadesRef);

//     try {
//       const querySnapshot = await getDocs(q);
//       const cities = [];
//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         const timestamp = new Date(data.timestamp);
//         const ahora = new Date();
//         const tiempoRestante = Math.max(0, UNA_HORA - (ahora - timestamp));
//         cities.push({ id: doc.id, ...data, tiempoRestante });
//       });

//       dispatch(setHistorialData(cities));
//     } catch (e) {
//       console.error('Error al obtener historial:', e);
//     }
//   };
// };
