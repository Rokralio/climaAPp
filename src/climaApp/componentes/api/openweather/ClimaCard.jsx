import { useState } from 'react';
import PropTypes from 'prop-types';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const convertirCelsiusAFahrenheit = (celsius) => {
  return (celsius * 9/5) + 32;
};

export const ClimaCard = ({ data }) => {
  const [unidad, setUnidad] = useState('C');

  const toggleUnidad = () => {
    setUnidad(unidad === 'C' ? 'F' : 'C');
  };

  const mostrarTemperatura = () => {
    const temp = unidad === 'C' ? data.climaData.temp : convertirCelsiusAFahrenheit(data.climaData.temp);
    return temp.toFixed(1) + ` °${unidad}`;
  };

  const mostrarSensacionTermica = () => {
    const feelsLike = unidad === 'C' ? data.climaData.feels_like : convertirCelsiusAFahrenheit(data.climaData.feels_like);
    return feelsLike.toFixed(1) + ` °${unidad}`;
  };

  const mostrarTemperaturaMinima = () => {
    const tempMin = unidad === 'C' ? data.climaData.temp_min : convertirCelsiusAFahrenheit(data.climaData.temp_min);
    return tempMin.toFixed(1) + ` °${unidad}`;
  };

  const mostrarTemperaturaMaxima = () => {
    const tempMax = unidad === 'C' ? data.climaData.temp_max : convertirCelsiusAFahrenheit(data.climaData.temp_max);
    return tempMax.toFixed(1) + ` °${unidad}`;
  };

  return (
    <div className='p-2 px-3' style={{ backgroundColor: 'rgba(225, 225, 225, 0.98)' }}>
      <div className="d-flex justify-content-between align-items-center w-100">
        <h2>{data.city}</h2>
        <div className="switch-container">
          <label className="switch">
            <input type="checkbox" onChange={toggleUnidad} className="switch-input"/>
            <span className="slider round">
              <span className="slider-label">°F</span>
              <span className="slider-label pd-3">°C</span>
              <span className="slider-indicator"></span>
            </span>
          </label>
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
            <td className="colData">{capitalizeFirstLetter(data.climaData.description || 'N/A')}</td>
          </tr>
          <tr>
            <td className="colTd">Temperatura:</td>
            <td className="colData">{mostrarTemperatura()}</td>
          </tr>
          <tr>
            <td className="colTd">Sensación térmica:</td>
            <td className="colData">{mostrarSensacionTermica()}</td>
          </tr>
          <tr>
            <td className="colTd">Temperatura mínima:</td>
            <td className="colData">{mostrarTemperaturaMinima()}</td>
          </tr>
          <tr>
            <td className="colTd">Temperatura máxima:</td>
            <td className="colData">{mostrarTemperaturaMaxima()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

ClimaCard.propTypes = {
  data: PropTypes.object.isRequired,
};
