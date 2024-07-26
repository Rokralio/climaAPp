import { doc, collection, setDoc, query, where, getDocs, writeBatch, getDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { startSaving, savingSuccess, savingFailure, addCityToHistorial, setHistorialData, setRequestCount, resetRequestCount } from './historialSlice';

const UN_MINUTO = 60 * 1000; // 60 segundos * 1000 milisegundos
const REQUEST_LIMIT = 10;

export const getRequestCountFromFirestore = (uid) => {
  return async (dispatch) => {
    try {
      const docRef = doc(FirebaseDB, `users/${uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        dispatch(setRequestCount(data.requestCount || 0));
      } else {
        await setDoc(docRef, { requestCount: 0 });
        dispatch(setRequestCount(0));
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

export const saveCityToFirestore = (city) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { requestCount } = getState().historial;

    if (requestCount >= REQUEST_LIMIT) {
      dispatch(savingFailure('Has alcanzado el límite de 10 peticiones.'));
      return;
    }

    const cleanEspacios = city.replace(/\s+/g, ' ').trim();
    const registerCity = { 
      name: cleanEspacios, 
      timestamp: new Date().toISOString()
    };

    dispatch(startSaving());

    try {
      const newDoc = doc(collection(FirebaseDB, `historial/${uid}/city`));
      await setDoc(newDoc, registerCity);

      dispatch(addCityToHistorial({ id: newDoc.id, name: cleanEspacios }));
      dispatch(updateRequestCountInFirestore(uid, requestCount + 1));
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
    const haceVeinticuatroHoras = new Date(ahora.getTime() - UN_MINUTO);

    const ciudadesRef = collection(FirebaseDB, `historial/${uid}/city`);
    const q = query(ciudadesRef, where("timestamp", "<", haceVeinticuatroHoras.toISOString()));

    try {
      const querySnapshot = await getDocs(q);
      const batch = writeBatch(FirebaseDB);

      querySnapshot.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });

      await batch.commit();
      dispatch(fetchHistorialData(uid));
      dispatch(resetRequestCount());
    } catch (e) {
      console.error('Error al borrar ciudades:', e);
    }
  };
};


export const fetchHistorialData = (uid) => {
  return async (dispatch) => {
    const ciudadesRef = collection(FirebaseDB, `historial/${uid}/city`);
    const q = query(ciudadesRef);

    try {
      const querySnapshot = await getDocs(q);
      const cities = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        cities.push({ id: doc.id, ...data });
      });

      dispatch(setHistorialData(cities));
    } catch (e) {
      console.error('Error al obtener historial:', e);
    }
  };
};
