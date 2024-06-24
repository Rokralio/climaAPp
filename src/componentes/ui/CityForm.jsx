import { useState } from "react";
import PropTypes from 'prop-types';

export const CityForm = ({onFormSubmit}) => {
  const [city, setCity] = useState('');
  const handleCityChange = (event) => {
    setCity(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanEspacios = city.replace(/\s+/g, ' ').trim();
    onFormSubmit(cleanEspacios);
    setCity('')
  }

  return (
    <div  className="p-3 rounded-1" 
          style={{ backgroundColor: 'rgba(208, 217, 225, 0.5)' }}>
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
        <button type='submit' className="btn btn-light">Enviar</button>
        </div>
      </form>
    </div>
  );
};

CityForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};