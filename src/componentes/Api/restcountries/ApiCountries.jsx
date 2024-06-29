import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const ApiCountries = ({ countryCode }) => {
  const [countryName, setCountryName] = useState('');

  useEffect(() => {
    const obtenniendoNomobre = async () => {
      if (countryCode) {
        try {
          const resp = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
          const countryData = resp.data[0];
          setCountryName(countryData.name.common);
        } catch (error) {
          console.error('Error al obtener el nombre del país', error);
        }
      } else {
        setCountryName('');
      }
    };

    obtenniendoNomobre();
  }, [countryCode]);

  return (
    <>
      {countryName && (
        <p className="d-flex justify-content-between">
          <span className="pS">País:</span>
          <span className="ms-2">{countryName}</span>
        </p>
      )}
    </>
  );
}



ApiCountries.propTypes = {
  countryCode: PropTypes.string.isRequired,
};