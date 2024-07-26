import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { borrarCiudadesDeFirebase } from '../store/historial/thunks';

export const usePeriodicCleanup = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(borrarCiudadesDeFirebase());
    }, 60 * 1000); // 60 segundos

    return () => clearInterval(intervalId);
  }, [dispatch]);
};