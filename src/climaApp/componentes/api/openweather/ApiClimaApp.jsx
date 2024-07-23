import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ApiCountries, BtSwitch, CityForm } from '../../../componentes';
import { HistoryData } from "../../historial/HistoryData";
import { fetchHistorialData, saveCityToFirestore } from "../../../../store/historial/thunks";
import { usePeriodicCleanup } from "../../../../hooks/usePeriodicCleanup";


const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const ApiClimaApp = ({ setDescripcionClima }) => {
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [mostrarCelsius, setMostrarCelsius] = useState(true);
  const dispatch = useDispatch();
  const historial = useSelector((state) => state.historial.data);
  const { uid } = useSelector((state) => state.auth);

  const getClima = async (city) => {
    setCargando(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const getApiClima = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
      const resp = await axios.get(getApiClima);
      setClima(resp.data);
      setDescripcionClima(capitalizeFirstLetter(resp.data.weather?.[0]?.description || ''));

      if (uid) {
        dispatch(saveCityToFirestore(city));
      }

    } catch (error) {
      console.error('Error al obtener la ciudad', error);
      setError(`No se encontró el clima de "${city}"`);
      setClima(null);
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

  useEffect(() => {
    if (uid) {
      dispatch(fetchHistorialData(uid));
    }
  }, [dispatch, uid]);

  usePeriodicCleanup(uid, 60 * 1000);

  return (
    <div className="cuadro-main">
      <CityForm onFormSubmit={envForm} loading={cargando} />
      {error && (
        <p className="h5 text-center text-danger p-2 px-3 mt-1" style={{ backgroundColor: 'rgba(238, 237, 237, 0.98)', maxWidth: '100%', overflowWrap: 'break-word' }}>
          {error}
        </p>
      )}
      {clima && (
        <div className='p-2 px-3 mt-1' style={{ backgroundColor: 'rgba(238, 237, 237, 0.98)' }}>
          <div className="d-flex justify-content-between align-items-center w-100">
            <h2>{clima.name}</h2>
            <div className="ms-auto">
              <BtSwitch mostrarCelsius={mostrarCelsius} toggleTemperatureUnit={toggleTemperatureUnit} />
            </div>
          </div>
          <table className="table table-striped-columns">
            <tbody>
              <tr>
                <td className="colTd">País:</td>
                <ApiCountries countryCode={clima.sys.country} />
              </tr>
              <tr>
                <td className="colTd">Tipo de clima:</td>
                <td className="colData">{capitalizeFirstLetter(clima.weather?.[0]?.description || '')}</td>
              </tr>
              {mostrarCelsius ? (
                <>
                  <tr>
                    <td className="colTd">Temperatura:</td>
                    <td className="colData">{clima.main.temp} °C</td>
                  </tr>
                  <tr>
                    <td className="colTd">Sensación térmica:</td>
                    <td className="colData">{clima.main.feels_like} °C</td>
                  </tr>
                  <tr>
                    <td className="colTd">Temperatura mínima:</td>
                    <td className="colData">{clima.main.temp_min} °C</td>
                  </tr>
                  <tr>
                    <td className="colTd">Temperatura máxima:</td>
                    <td className="colData">{clima.main.temp_max} °C</td>
                  </tr>
                </>
              ) : (
                <>
                  <tr>
                    <td className="colTd">Temperatura:</td>
                    <td className="colData">{(clima.main.temp * 9/5 + 32).toFixed(2)} °F</td>
                  </tr>
                  <tr>
                    <td className="colTd">Sensación térmica:</td>
                    <td className="colData">{(clima.main.feels_like * 9/5 + 32).toFixed(2)} °F</td>
                  </tr>
                  <tr>
                    <td className="colTd">Temperatura mínima:</td>
                    <td className="colData">{(clima.main.temp_min * 9/5 + 32).toFixed(2)} °F</td>
                  </tr>
                  <tr>
                    <td className="colTd">Temperatura máxima:</td>
                    <td className="colData">{(clima.main.temp_max * 9/5 + 32).toFixed(2)} °F</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      )}
      <HistoryData historial={historial} />
    </div>
  );
};

ApiClimaApp.propTypes = {
  setDescripcionClima: PropTypes.func.isRequired,
};
