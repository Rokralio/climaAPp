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

  return (
    <div className="box has-text-centered has-text-black is-radiusless m-2" style={{ backgroundColor: 'rgba(225, 225, 225, 0.98)' }}>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              id="city"
              value={city}
              onChange={handleCityChange}
              placeholder="Ingrese una ciudad"
              required
              style={{ backgroundColor: 'white', cursor: 'pointer' }}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            {!loading ? (
              <button
                type="submit"
                className="button is-fullwidth has-text-weight-bold is-size-4 pt-4"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  color: 'inherit',
                }}
              >
                Enviar
              </button>
            ) : (
              <div className="loader" style={{ margin: '0 auto' }}></div>
            )}
          </div>
        </div>
        <p className="has-text-weight-bold mt-2">
          Peticiones restantes: {10 - requestCount}
        </p>
      </form>
    </div>
  );
};

CityForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  requestCount: PropTypes.number.isRequired,
};
