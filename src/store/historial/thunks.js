import { doc, collection, setDoc, query, where, getDocs, writeBatch } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { startSaving, savingSuccess, savingFailure, addCityToHistorial, setHistorialData } from './historialSlice';

const UN_MINUTO = 60 * 1000; // 60 segundos * 1000 milisegundos

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

      dispatch(addCityToHistorial({ id: newDoc.id, name: cleanEspacios }));
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

    const ciudadesRef = collection(FirebaseDB, `${uid}/historial/city`);
    const q = query(ciudadesRef, where("timestamp", "<", haceVeinticuatroHoras.toISOString()));

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
        cities.push({ id: doc.id, ...data });
      });

      dispatch(setHistorialData(cities));
    } catch (e) {
      console.error('Error al obtener historial:', e);
    }
  };
};
