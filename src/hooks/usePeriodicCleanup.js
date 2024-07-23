import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { borrarCiudadesDeFirebase } from '../store/historial/thunks';


export const usePeriodicCleanup = (uid, interval = 60000) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (uid) {
      const intervalId = setInterval(() => {
        dispatch(borrarCiudadesDeFirebase());
      }, interval);

      return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
    }
  }, [dispatch, uid, interval]);
};
