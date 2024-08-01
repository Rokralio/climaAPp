import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { BtSwitch, CityForm } from '../../../componentes';
import { getRequestCountFromFirestore, getCityData, fetchHistorialData } from "../../../../store/historial/thunks";
import { useLimpiarDataDeFirestore } from "../../../../hooks/usePeriodicCleanup";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const convertToFahrenheit = (celsius) => {
  return (celsius * 9/5 + 32).toFixed(2);
};

export const ApiClimaApp = ({ setDescripcionClima }) => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [mostrarCelsius, setMostrarCelsius] = useState(true);
  const [historial, setHistorial] = useState([]);
  
  const dispatch = useDispatch();
  const requestCount = useSelector((state) => state.historial.requestCount);
  const { uid } = useSelector((state) => state.auth);
  const historialData = useSelector((state) => state.historial.data);

  useEffect(() => {
    if (uid) {
      dispatch(getRequestCountFromFirestore(uid));
      dispatch(fetchHistorialData(uid));
    }
  }, [dispatch, uid]);

  useEffect(() => {
    setHistorial(historialData);
  }, [historialData]);

  useLimpiarDataDeFirestore();

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
        dispatch(fetchHistorialData(uid));

        setTimeout(() => {
          if (uid) {
            dispatch(fetchHistorialData(uid));
            dispatch(getRequestCountFromFirestore(uid));
          }
        }, 1000);
        setTimeout(() => {
          if (uid) {
            dispatch(fetchHistorialData(uid));
            dispatch(getRequestCountFromFirestore(uid));
          }
        }, 1500);

      } else {
        setError(`No se encontró el clima de "${city}"`);
      }
    } catch (error) {
      setError(`No se pudo obtener el clima de "${city}"`);
    } finally {
      setCargando(false);
    }
  };

  const toggleTemperatureUnit = () => {
    setMostrarCelsius(!mostrarCelsius);
  };

  const envForm = (city) => {
    getClima(city);
  };

  return (
    <div className="cuadro-main d-flex">
      <div className="content-container w-60">
        <CityForm onFormSubmit={envForm} loading={cargando} requestCount={requestCount} />
        {error && (
          <p className="h5 text-center text-danger p-2 px-3 mt-1" style={{ backgroundColor: 'rgba(238, 237, 237, 0.98)', maxWidth: '100%', overflowWrap: 'break-word' }}>
            {error}
          </p>
        )}
        {historial && historial.length > 0 && (
          <div className='historial-container mt-2'>
            {historial.map((data, i) => (
              <div key={i} className='p-2 px-3' style={{ backgroundColor: 'rgba(225, 225, 225, 0.98)' }}>
                <div className="d-flex justify-content-between align-items-center w-100">
                  <h2>{data.city}</h2>
                  <div className="ms-auto">
                    <BtSwitch mostrarCelsius={mostrarCelsius} toggleTemperatureUnit={toggleTemperatureUnit} />
                  </div>
                </div>
                <table className="table table-striped-columns">
                  <tbody>
                    <tr>
                      <td className="colTd">País:</td>
                      <td className="colData">{data.country}</td>
                    </tr>
                    <tr>
                      <td className="colTd">Tipo de clima:</td>
                      <td className="colData">{capitalizeFirstLetter(data.climaData.weather?.[0]?.description || 'N/A')}</td>
                    </tr>
                    {mostrarCelsius ? (
                      <>
                        <tr>
                          <td className="colTd">Temperatura:</td>
                          <td className="colData">{data.climaData.main.temp} °C</td>
                        </tr>
                        <tr>
                          <td className="colTd">Sensación térmica:</td>
                          <td className="colData">{data.climaData.main.feels_like} °C</td>
                        </tr>
                        <tr>
                          <td className="colTd">Temperatura mínima:</td>
                          <td className="colData">{data.climaData.main.temp_min} °C</td>
                        </tr>
                        <tr>
                          <td className="colTd">Temperatura máxima:</td>
                          <td className="colData">{data.climaData.main.temp_max} °C</td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr>
                          <td className="colTd">Temperatura:</td>
                          <td className="colData">{convertToFahrenheit(data.climaData.main.temp)} °F</td>
                        </tr>
                        <tr>
                          <td className="colTd">Sensación térmica:</td>
                          <td className="colData">{convertToFahrenheit(data.climaData.main.feels_like)} °F</td>
                        </tr>
                        <tr>
                          <td className="colTd">Temperatura mínima:</td>
                          <td className="colData">{convertToFahrenheit(data.climaData.main.temp_min)} °F</td>
                        </tr>
                        <tr>
                          <td className="colTd">Temperatura máxima:</td>
                          <td className="colData">{convertToFahrenheit(data.climaData.main.temp_max)} °F</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
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
