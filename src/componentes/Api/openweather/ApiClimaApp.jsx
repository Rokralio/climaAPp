import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { CityForm } from "../../ui/CityForm";
import { ApiCountries } from "../restcountries/ApiCountries";
import { BtSwitch } from "../../ui/BtSwitch";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const ApiClimaApp = ({ setDescripcionClima }) => {
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [mostrarCelsius, setMostrarCelsius] = useState(true);

  const getClima = async (city) => {
    setCargando(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const getApiClima = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
      const resp = await axios.get(getApiClima);
      setClima(resp.data);
      setDescripcionClima(capitalizeFirstLetter(resp.data.weather?.[0]?.description || ''));
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
    <div>
      <CityForm onFormSubmit={envForm} loading={cargando} />
      {error && (
        <p className='h5 text-center text-danger p-2 px-3 mt-1' style={{ backgroundColor: 'rgba(238, 237, 237, 0.98)' }}>
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
          <ApiCountries countryCode={clima.sys.country} />
          <p className="d-flex justify-content-between">
            <span className="pS">Tipo de clima:</span>
            <span className="ms-2"> {capitalizeFirstLetter(clima.weather?.[0]?.description || '')}</span></p>
          <div id='celsius' style={{ display: mostrarCelsius ? 'block' : 'none' }}>
            <p className="d-flex justify-content-between">
              <span className="pS">Temperatura:</span>
              <span className="ms-2"> {clima.main.temp} °C</span></p>
            <p className="d-flex justify-content-between">
              <span className="pS">Sensación térmica:</span>
              <span className="ms-2"> {clima.main.feels_like} °C</span></p>
            <p className="d-flex justify-content-between">
              <span className="pS">Temperatura mínima:</span>
              <span className="ms-2"> {clima.main.temp_min} °C</span></p>
            <p className="d-flex justify-content-between">
              <span className="pS">Temperatura máxima:</span>
              <span className="ms-2"> {clima.main.temp_max} °C</span></p>
          </div>
          <div id='fahrenheit' style={{ display: mostrarCelsius ? 'none' : 'block' }}>
            <p className="d-flex justify-content-between">
              <span className="pS">Temperatura:</span>
              <span className="ms-2"> {(clima.main.temp * 9/5 + 32).toFixed(2)} °F</span></p>
            <p className="d-flex justify-content-between">
              <span className="pS">Sensación térmica:</span>
              <span className="ms-2"> {(clima.main.feels_like * 9/5 + 32).toFixed(2)} °F</span></p>
            <p className="d-flex justify-content-between">
              <span className="pS">Temperatura mínima:</span>
              <span className="ms-2"> {(clima.main.temp_min * 9/5 + 32).toFixed(2)} °F</span></p>
            <p className="d-flex justify-content-between">
              <span className="pS">Temperatura máxima:</span>
              <span className="ms-2"> {(clima.main.temp_max * 9/5 + 32).toFixed(2)} °F</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

ApiClimaApp.propTypes = {
  setDescripcionClima: PropTypes.func.isRequired,
};
