import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CityForm } from '../../../componentes';
import { getCityData, listenToUserData } from "../../../../store/historial/thunks";
import { ClimaCard } from "./ClimaCard";
import PropTypes from "prop-types";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const ApiClimaApp = ({ setDescripcionClima }) => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const historialData = useSelector((state) => state.historial.data);

  const { requestCount } = useSelector((state) => state.historial);

  useEffect(() => {
    if (uid) {
      const unsubscribe = dispatch(listenToUserData(uid));
      return () => unsubscribe();
    }
  }, [dispatch, uid]);

  const getClima = async (city) => {
    if (requestCount >= 10) {
      setError('Has alcanzado el límite de 10 peticiones.');
      return;
    }

    setCargando(true);
    setError(null);
  
    try {
      const cardData = await dispatch(getCityData(city));
  
      if (cardData) {
        setDescripcionClima(capitalizeFirstLetter(cardData.climaData.weather?.[0]?.description || ''));
      } else {
        setError(`No se encontró el clima de "${city}"`);
      }
    } catch (error) {
      setError(`No se pudo obtener el clima de "${city}"`);
    } finally {
      setCargando(false);
    }
  };

  const envForm = (city) => {
    getClima(city);
  };

  return (
    <div className="cuadro-main d-flex">
      <div className="content-container">
        <CityForm onFormSubmit={envForm} loading={cargando} requestCount={requestCount} />
        {error && (
          <p className="h5 text-center text-danger p-2 px-3 mt-1" style={{ backgroundColor: 'rgba(238, 237, 237, 0.98)', maxWidth: '100%', overflowWrap: 'break-word' }}>
            {error}
          </p>
        )}
        {historialData && historialData.length > 0 && (
          <div className='historial-container mt-2'>
            {historialData.map((data, i) => (
              <ClimaCard key={i} data={data} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

ApiClimaApp.propTypes = {
  setDescripcionClima: PropTypes.func.isRequired,
};
