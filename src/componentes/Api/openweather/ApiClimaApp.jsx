import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { CityForm } from '../../ui/CityForm';
import { ApiCountries } from '../restcountries/ApiCountries';
import { BtSwitch } from '../../ui/BtSwitch';

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
      setClima('');
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
      <CityForm onFormSubmit={envForm} />
      {cargando && <p>Cargando...</p>}
      {error && <p className="h5 rounded-1 text-center text-danger bg-light mt-3">{error}</p>}
      {clima && (
        <div className='p-2 px-3 mt-1' style={{ backgroundColor: 'rgba(208, 217, 225, 0.5)' }}>
          <h2 className='text-center'>Clima en {clima.name}</h2>
          <BtSwitch mostrarCelsius={mostrarCelsius} toggleTemperatureUnit={toggleTemperatureUnit} />
          <ApiCountries countryCode={clima.sys.country} />
          <p>Tipo de clima: {capitalizeFirstLetter(clima.weather?.[0]?.description || '')}</p>
          <div id='celsius' style={{ display: mostrarCelsius ? 'block' : 'none' }}>
            <p>Temperatura: {clima.main.temp} °C</p>
            <p>Sensación térmica: {clima.main.feels_like} °C</p>
            <p>Temperatura mínima: {clima.main.temp_min} °C</p>
            <p>Temperatura máxima: {clima.main.temp_max} °C</p>
          </div>
          <div id='fahrenheit' style={{ display: mostrarCelsius ? 'none' : 'block' }}>
            <p>Temperatura: {(clima.main.temp * 9/5 + 32).toFixed(2)} °F</p>
            <p>Sensación térmica: {(clima.main.feels_like * 9/5 + 32).toFixed(2)} °F</p>
            <p>Temperatura mínima: {(clima.main.temp_min * 9/5 + 32).toFixed(2)} °F</p>
            <p>Temperatura máxima: {(clima.main.temp_max * 9/5 + 32).toFixed(2)} °F</p>
          </div>
        </div>
      )}
    </div>
  );
};

ApiClimaApp.propTypes = {
  setDescripcionClima: PropTypes.func.isRequired,
}