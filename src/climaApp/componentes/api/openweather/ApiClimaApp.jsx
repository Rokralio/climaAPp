import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ApiCountries, BtSwitch, CityForm } from '../../../componentes';
import { saveCityToFirestore, getRequestCountFromFirestore } from "../../../../store/historial/thunks";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const convertToFahrenheit = (celsius) => {
  return (celsius * 9/5 + 32).toFixed(2);
};

export const ApiClimaApp = ({ setDescripcionClima }) => {
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [mostrarCelsius, setMostrarCelsius] = useState(true);
  const dispatch = useDispatch();
  const requestCount = useSelector((state) => state.historial.requestCount);
  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    if (uid) {
      dispatch(getRequestCountFromFirestore(uid));
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
      const apiKey = import.meta.env.VITE_API_KEY;
      const getApiClima = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
      const resp = await axios.get(getApiClima);
      setClima(resp.data);
      setDescripcionClima(capitalizeFirstLetter(resp.data.weather?.[0]?.description || ''));

      if (uid) {
        dispatch(saveCityToFirestore(city, resp.data.sys.country));
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

  return (
    <div className="cuadro-main d-flex">
      <div className="content-container w-60">
        <CityForm onFormSubmit={envForm} loading={cargando} requestCount={requestCount} />
        {error && (
          <p className="h5 text-center text-danger p-2 px-3 mt-1" style={{ backgroundColor: 'rgba(238, 237, 237, 0.98)', maxWidth: '100%', overflowWrap: 'break-word' }}>
            {error}
          </p>
        )}
        {clima && (
          <div className='p-2 px-3 mt-1' style={{ backgroundColor: 'rgba(225, 225, 225, 0.98)' }}>
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
                      <td className="colData">{convertToFahrenheit(clima.main.temp)} °F</td>
                    </tr>
                    <tr>
                      <td className="colTd">Sensación térmica:</td>
                      <td className="colData">{convertToFahrenheit(clima.main.feels_like)} °F</td>
                    </tr>
                    <tr>
                      <td className="colTd">Temperatura mínima:</td>
                      <td className="colData">{convertToFahrenheit(clima.main.temp_min)} °F</td>
                    </tr>
                    <tr>
                      <td className="colTd">Temperatura máxima:</td>
                      <td className="colData">{convertToFahrenheit(clima.main.temp_max)} °F</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

ApiClimaApp.propTypes = {
  setDescripcionClima: PropTypes.func.isRequired,
};

// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { ApiCountries, BtSwitch, CityForm } from '../../../componentes';
// import { saveCityToFirestore, getRequestCountFromFirestore } from "../../../../store/historial/thunks";

// const capitalizeFirstLetter = (string) => {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// };

// const convertToFahrenheit = (celsius) => {
//   return (celsius * 9/5 + 32).toFixed(2);
// };

// export const ApiClimaApp = ({ setDescripcionClima }) => {
//   const [clima, setClima] = useState(null);
//   const [cargando, setCargando] = useState(false);
//   const [error, setError] = useState(null);
//   const [mostrarCelsius, setMostrarCelsius] = useState(true);
//   const dispatch = useDispatch();
//   const requestCount = useSelector((state) => state.historial.requestCount);
//   const { uid } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (uid) {
//       dispatch(getRequestCountFromFirestore(uid));
//     }
//   }, [dispatch, uid]);

//   const getClima = async (city) => {
//     if (requestCount >= 10) {
//       setError('Has alcanzado el límite de 10 peticiones.');
//       return;
//     }

//     setCargando(true);
//     setError(null);

//     try {
//       const apiKey = import.meta.env.VITE_API_KEY;
//       const getApiClima = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
//       const resp = await axios.get(getApiClima);
//       setClima(resp.data);
//       setDescripcionClima(capitalizeFirstLetter(resp.data.weather?.[0]?.description || ''));

//       if (uid) {
//         dispatch(saveCityToFirestore(city));
//       }

//     } catch (error) {
//       console.error('Error al obtener la ciudad', error);
//       setError(`No se encontró el clima de "${city}"`);
//       setClima(null);
//     } finally {
//       setCargando(false);
//     }
//   };

//   const toggleTemperatureUnit = () => {
//     setMostrarCelsius(!mostrarCelsius);
//   };

//   const envForm = (city) => {
//     getClima(city);
//   };

//   return (
//     <div className="cuadro-main d-flex">
//       <div className="content-container w-60">
//         <CityForm onFormSubmit={envForm} loading={cargando} requestCount={requestCount} />
//         {error && (
//           <p className="h5 text-center text-danger p-2 px-3 mt-1" style={{ backgroundColor: 'rgba(238, 237, 237, 0.98)', maxWidth: '100%', overflowWrap: 'break-word' }}>
//             {error}
//           </p>
//         )}
//         {clima && (
//           <div className='p-2 px-3 mt-1' style={{ backgroundColor: 'rgba(225, 225, 225, 0.98)' }}>
//             <div className="d-flex justify-content-between align-items-center w-100">
//               <h2>{clima.name}</h2>
//               <div className="ms-auto">
//                 <BtSwitch mostrarCelsius={mostrarCelsius} toggleTemperatureUnit={toggleTemperatureUnit} />
//               </div>
//             </div>
//             <table className="table table-striped-columns">
//               <tbody>
//                 <tr>
//                   <td className="colTd">País:</td>
//                   <ApiCountries countryCode={clima.sys.country} />
//                 </tr>
//                 <tr>
//                   <td className="colTd">Tipo de clima:</td>
//                   <td className="colData">{capitalizeFirstLetter(clima.weather?.[0]?.description || '')}</td>
//                 </tr>
//                 {mostrarCelsius ? (
//                   <>
//                     <tr>
//                       <td className="colTd">Temperatura:</td>
//                       <td className="colData">{clima.main.temp} °C</td>
//                     </tr>
//                     <tr>
//                       <td className="colTd">Sensación térmica:</td>
//                       <td className="colData">{clima.main.feels_like} °C</td>
//                     </tr>
//                     <tr>
//                       <td className="colTd">Temperatura mínima:</td>
//                       <td className="colData">{clima.main.temp_min} °C</td>
//                     </tr>
//                     <tr>
//                       <td className="colTd">Temperatura máxima:</td>
//                       <td className="colData">{clima.main.temp_max} °C</td>
//                     </tr>
//                   </>
//                 ) : (
//                   <>
//                     <tr>
//                       <td className="colTd">Temperatura:</td>
//                       <td className="colData">{convertToFahrenheit(clima.main.temp)} °F</td>
//                     </tr>
//                     <tr>
//                       <td className="colTd">Sensación térmica:</td>
//                       <td className="colData">{convertToFahrenheit(clima.main.feels_like)} °F</td>
//                     </tr>
//                     <tr>
//                       <td className="colTd">Temperatura mínima:</td>
//                       <td className="colData">{convertToFahrenheit(clima.main.temp_min)} °F</td>
//                     </tr>
//                     <tr>
//                       <td className="colTd">Temperatura máxima:</td>
//                       <td className="colData">{convertToFahrenheit(clima.main.temp_max)} °F</td>
//                     </tr>
//                   </>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// ApiClimaApp.propTypes = {
//   setDescripcionClima: PropTypes.func.isRequired,
// };
