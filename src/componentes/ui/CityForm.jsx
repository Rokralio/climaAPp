import { useState } from "react";

export const CityForm = ({onFormSubmit}) => {
const [city, setCity] = useState('');
const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(city);
    setCity('')
    setFormSubmitted(true);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Ciudad:
        <input 
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder='ciudad?'
          required
        />
      </label>
      <button type='submit'>Enviar</button>
    </form>
  );
};
