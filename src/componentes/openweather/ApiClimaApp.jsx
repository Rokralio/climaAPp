import { useState } from 'react';
import axios from 'axios';
import { CityForm } from '../ui/CityForm';

export const ApiClimaApp = () => {

  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const getClima = async (city) => {
    setCargando(true);
    setError(null);

    try {
      const ApiKey = 'f0a81ca80e562eb116c7db8b1c8fb315';
      const getApiClima = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric$lang=es`;
      const resp = await axios.get(getApiClima);

      setClima(resp.data);

    } catch (error) {
      setClima('');
      console.error('Error al obtener la ciudad', error);
      setError(`No se encontro el clima de "${city}"`)

    } finally{
      setCargando(false);
    }
  }

  const envForm = (city) => {
    getClima(city);
  };

  
  return (
    <div>
      <CityForm onFormSubmit={envForm}/>
      {cargando && <p>Cargando...</p> }
      {error && <p>{error}</p>}
      {clima && (
        <div>
          <h2>Clima en {clima.name}</h2>
          <p>Pais: {clima.sys.country}</p>
          <p>Temperatura: {clima.main.temp} °C</p>
          <p>Sensación térmica: {clima.main.feels_like}</p>
          <p>Temperatura mínima: {clima.main.temp_min}</p>
          <p>Temperatura máxima: {clima.main.temp_max}</p>
        </div>
      )}
    </div>
  );
};



