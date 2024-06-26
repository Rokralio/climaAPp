import { useState } from "react";
import PropTypes from 'prop-types';

export const CityForm = ({ onFormSubmit, loading }) => {
  const [city, setCity] = useState('');

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanEspacios = city.replace(/\s+/g, ' ').trim();
    onFormSubmit(cleanEspacios);
    setCity('');
  };

  return (
    <div className="p-3 text-center" style={{ backgroundColor: 'rgba(208, 217, 225, 0.5)' }}>
      <h1>Bienvenido</h1>
      <form onSubmit={handleSubmit}>
        <div className="m-1">
          <label htmlFor="city" className="m-2 fw-medium d-block">¿De qué ciudad quieres saber el clima?</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="¿Ciudad?"
            required
            className="form-control text-center"
          />
        </div>
        <div className="m-1 d-flex justify-content-center">
          {!loading && (
            <button type='submit' className="btn btn-sm fs-2 p-0 text-decoration-underline" style={{ minWidth: '100%', backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>Enviar</button>
          )}
          {loading && (
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

CityForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
