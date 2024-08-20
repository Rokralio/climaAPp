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
    <div className="card is-radiusless has-text-black" style={{ backgroundColor: 'rgba(225, 225, 225, 0.98)' }}>
      <div className="card-content">
        <div className="columns is-mobile is-vcentered">
          <div className="column">
            <h5 className="title is-5 has-text-black">{data.city}</h5>
          </div>
          <div className="column is-narrow">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={unidad === 'F'}
                onChange={toggleUnidad}
                style={{ marginRight: '0.5rem' }}
              />
              {unidad === 'C' ? '°C' : '°F'}
            </label>
          </div>
        </div>
        <table className="table is-fullwidth">
          <tbody>
            <tr>
              <td className="has-text-black" style={{ backgroundColor: 'white' }}>País:</td>
              <td className="has-text-black" style={{ backgroundColor: 'rgba(230, 230, 230)', textAlign: 'center' }}>{data.country}</td>
            </tr>
            <tr>
              <td className="has-text-black" style={{ backgroundColor: 'white' }}>Tipo de clima:</td>
              <td className="has-text-black" style={{ backgroundColor: 'rgba(230, 230, 230)', textAlign: 'center' }}>
                {capitalizeFirstLetter(data.climaData.description || 'N/A')}
              </td>
            </tr>
            <tr>
              <td className="has-text-black" style={{ backgroundColor: 'white' }}>Temperatura:</td>
              <td className="has-text-black" style={{ backgroundColor: 'rgba(230, 230, 230)', textAlign: 'center' }}>{mostrarTemperatura()}</td>
            </tr>
            <tr>
              <td className="has-text-black" style={{ backgroundColor: 'white' }}>Sensación térmica:</td>
              <td className="has-text-black" style={{ backgroundColor: 'rgba(230, 230, 230)', textAlign: 'center' }}>{mostrarSensacionTermica()}</td>
            </tr>
            <tr>
              <td className="has-text-black" style={{ backgroundColor: 'white' }}>Temperatura mínima:</td>
              <td className="has-text-black" style={{ backgroundColor: 'rgba(230, 230, 230)', textAlign: 'center' }}>{mostrarTemperaturaMinima()}</td>
            </tr>
            <tr>
              <td className="has-text-black" style={{ backgroundColor: 'white' }}>Temperatura máxima:</td>
              <td className="has-text-black" style={{ backgroundColor: 'rgba(230, 230, 230)', textAlign: 'center' }}>{mostrarTemperaturaMaxima()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

ClimaCard.propTypes = {
  data: PropTypes.object.isRequired,
};
