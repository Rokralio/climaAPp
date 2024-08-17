import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CityForm } from '../../../componentes';
import { getCityData, listenToUserData } from "../../../../store/historial/thunks";
import { ClimaCard } from "./ClimaCard";
import PropTypes from "prop-types";
import { Box, Alert } from '@mui/material';

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
    <Box className="cuadro-main" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Box className="content-container">
        <CityForm onFormSubmit={envForm} loading={cargando} requestCount={requestCount} />
        {error && (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            {error}
          </Alert>
        )}
        {historialData && historialData.length > 0 && (
          <Box mt={2} display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr', md: 'repeat(2, 1fr)' }} gap={2}>
            {historialData.map((data, i) => (
              <ClimaCard key={i} data={data} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

ApiClimaApp.propTypes = {
  setDescripcionClima: PropTypes.func.isRequired,
};
