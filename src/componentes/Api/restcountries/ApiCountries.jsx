import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export const ApiCountries = ({ countryCode }) => {
  const [countryName, setCountryName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCountryName = async () => {
      try {
        const resp = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const countryData = resp.data[0];
        setCountryName(countryData.name.common);
      } catch (error) {
        console.error('Error al obtener el nombre del país', error);
        setError('Error al cargar el nombre del país');
      }
    };

    if (countryCode) {
      getCountryName();
    }

  }, [countryCode]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <p>Pais: <span className='fw-bold'>{countryName}</span></p>
    </div>
  );
}

ApiCountries.propTypes = {
  countryCode: PropTypes.string.isRequired,
};