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
    <div  className="p-3 text-center" style={{ backgroundColor: 'rgba(208, 217, 225, 0.5)' }}>
      <h1>Bienvenido</h1>
      <form onSubmit={handleSubmit}>
        <div className="m-1 d-flex justify-content-center">
          <label htmlFor="city" className="m-2 fw-medium">Este es el clima de </label>
          <div className="m-1 d-flex">
            <input 
              id="city"
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder="¿Ciudad?"
              required
            />
          </div>
        </div>
        <div className="m-1 d-flex justify-content-center">
        <button type='submit' className="btn btn-sm fs-2 p-0 text-decoration-underline" style={{ minWidth: '100%', backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>Enviar</button>

        </div>
      </form>
    </div>
  );
};

CityForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};