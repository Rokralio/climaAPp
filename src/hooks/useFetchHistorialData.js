// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchHistorialData } from '../store/historial/thunks';

// const useFetchHistorialData = () => {
//   const dispatch = useDispatch();
//   const { uid } = useSelector(state => state.auth);
//   const historialData = useSelector(state => state.historial.data);

//   useEffect(() => {
//     if (uid) {
//       dispatch(fetchHistorialData(uid));
//     }
//   }, [dispatch, uid]);

//   return historialData;
// };

// export default useFetchHistorialData;
