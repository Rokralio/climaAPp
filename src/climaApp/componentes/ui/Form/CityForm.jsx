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

  const handleFocus = (e) => {
    e.target.style.boxShadow = '0 0 0 0px #ccc';
};



  return (
    <div className="p-3 text-center" style={{ backgroundColor: 'rgba(238, 237, 237, 0.98)' }}>
      <h1 className="fw-bold mb-3" >Bienvenido</h1>
      <form onSubmit={handleSubmit}>
        <div className="m-1">
          <input
            id="city"
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Ingrese una ciudad"
            required
            className="form-control rounded-0"
            onFocus={handleFocus}
            style={{cursor: 'pointer'}}
          />
        </div>
        <div className="m-1 d-flex justify-content-center">
          {!loading && (
            <button type='submit' className="btn btn-sm fs-2 p-0 fw-bold" style={{ minWidth: '100%', backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>Enviar</button>
          )}
          {loading && (
            <div className="spinner-border text-secondary" role="status">
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
