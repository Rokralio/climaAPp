import { useState } from 'react';
import axios from 'axios';
import { CityForm } from '../ui/CityForm';
import { ApiCountries } from '../Api/restcountries/ApiCountries';

export const ApiClimaApp = () => {

  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const getClima = async (city) => {
    setCargando(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      //endpoint
      const getApiClima = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
      const resp = await axios.get(getApiClima);

      setClima(resp.data);

    } catch (error) {
      setClima('');
      console.error('Error al obtener la ciudad', error);
      setError(`No se encontró el clima de "${city}"`);

    } finally {
      setCargando(false);
    }
  }

  const envForm = (city) => {
    getClima(city);
  };

  return (
    <div className='border border-3 p-2'>
      <CityForm onFormSubmit={envForm}/>
        {cargando && <p>Cargando...</p> }
        {error && <p className="h5 rounded-1 text-center text-danger bg-light mt-3">{error}</p>}
        {clima && (
          <div className='border border-2 rounded-1 border-info px-3 mt-1'>
            <h2 className='text-center'>Clima en {clima.name}</h2>
            <ApiCountries countryCode={clima.sys.country} />
            <p>Temperatura: {clima.main.temp} °C</p>
            <p>Sensación térmica: {clima.main.feels_like} °C</p>
            <p>Temperatura mínima: {clima.main.temp_min} °C</p>
            <p>Temperatura máxima: {clima.main.temp_max} °C</p>
          </div>
        )}
      </div>
  );
};
