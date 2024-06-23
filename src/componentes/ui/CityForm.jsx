import { useState } from "react";
import PropTypes from 'prop-types';

export const CityForm = ({onFormSubmit}) => {
  const [city, setCity] = useState('');
  const handleCityChange = (event) => {
    setCity(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(city);
    setCity('')
  }

  return (
    <div className="border border-2 border-info p-3 rounded-1 bg-secondary">
      <h1>Bienvenido a ClimaApp</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="city" className="m-2">¿Quieres saber el clima de Ciudad?:</label>
        <div className="m-1 d-flex justify-content-center">
          <input 
            id="city"
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder='¿Ciudad?'
            required
            className="rounded "
          />
        </div>
        <div className="m-1 d-flex justify-content-center">
        <button type='submit' className="rounded">Enviar</button>
        </div>
      </form>
    </div>
  );
};

CityForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};