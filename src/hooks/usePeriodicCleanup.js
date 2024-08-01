import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { limpiarDataDeFirestore } from '../store/historial/thunks';

export const useLimpiarDataDeFirestore = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);

  useEffect(() => {
    if (uid) {
      const now = new Date();
      const nextRunTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 9, 0); // 7:09:00 PM

      if (now > nextRunTime) {
        // Si la hora actual ya pasó el tiempo programado para hoy, ajustamos para el próximo día
        nextRunTime.setDate(nextRunTime.getDate() + 1);
      }

      const timeUntilNextRun = nextRunTime.getTime() - now.getTime();

      // Temporizador para esperar hasta las 7:06:01 PM
      const timeoutId = setTimeout(() => {
        dispatch(limpiarDataDeFirestore(uid));

        // Configura el intervalo para que se ejecute todos los días a las 7:06:01 PM
        const intervalId = setInterval(() => {
          dispatch(limpiarDataDeFirestore(uid));
        }, 24 * 60 * 60 * 1000); // 24 horas

        // Limpia el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
      }, timeUntilNextRun);

      // Limpia el timeout cuando el componente se desmonte
      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, uid]);
};

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { limpiarDataDeFirestore } from '../store/historial/thunks';

// export const useLimpiarDataDeFirestore = () => {
//   const dispatch = useDispatch();
//   const uid = useSelector((state) => state.auth.uid);

//   useEffect(() => {
//     if (uid) {
//       // Ejecuta la limpieza periódica
//       const intervalId = setInterval(() => {
//         dispatch(limpiarDataDeFirestore(uid));
//       }, 60 * 1000); // 60 segundos

//       return () => clearInterval(intervalId);
//     }
//   }, [dispatch, uid]);
// };
