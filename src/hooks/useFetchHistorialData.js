import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistorialData } from '../store/historial/thunks';


export const useFetchHistorialData = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    if (uid) {
      dispatch(fetchHistorialData(uid));
    }
  }, [dispatch, uid]);
};

