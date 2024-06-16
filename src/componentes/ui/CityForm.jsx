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
    <div className="border border-2 border-info p-3 rounded-1 bg-secondary">
      <form onSubmit={handleSubmit}>
        <label>
          <h1>Bienvenido a ClimaApp</h1>
          <span className="m-2">Quieres saber el clima de Ciudad:</span><br />
          <div className="m-1 d-flex justify-content-center">
          <input 
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder='ciudad?'
            required
            className="rounded "
          />
          </div>
        </label><br />
        <div className="m-1 d-flex justify-content-center">
        <button type='submit' className="rounded">Enviar</button>
        </div>
      </form>
    </div>
  );
};
