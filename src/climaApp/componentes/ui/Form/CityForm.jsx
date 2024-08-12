import PropTypes from "prop-types";
import { useState } from "react";

export const CityForm = ({ onFormSubmit, loading, requestCount }) => {
  const [city, setCity] = useState('');

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanCityName = city.replace(/\s+/g, ' ').trim();
    onFormSubmit(cleanCityName);
    setCity('');
  };

  const handleFocus = (e) => {
    e.target.style.boxShadow = '0 0 0 0px #ccc';
  };

  return (
    <div className="p-3 text-center" style={{ backgroundColor: 'rgba(225, 225, 225, 0.98)' }}>
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
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="m-1 d-flex justify-content-center">
          {!loading && (
            <button type='submit' className="btn btn-sm fs-2 p-0 fw-bold" style={{ minWidth: '100%', backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
              Enviar
            </button>
          )}
          {loading && (
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
        <div className="mt-2">
          <p className="fs-5">Peticiones restantes: {10 - requestCount}</p>
        </div>
      </form>
    </div>
  );
};

CityForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  requestCount: PropTypes.number.isRequired
};
