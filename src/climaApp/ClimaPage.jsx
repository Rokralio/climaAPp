import { useState } from 'react';
import { ApiClimaApp, GetClimaFondo } from './componentes';
import './climaPage.css';

export function ClimaPage() {
  const [descripcionClima, setDescripcionClima] = useState('');

  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="col-12 col-md-12 d-flex flex-column align-items-center">
        <GetClimaFondo descripcionClima={descripcionClima} />
        <div className="api-container">
          <ApiClimaApp className="appQueries" setDescripcionClima={setDescripcionClima} />
        </div>
      </div>
    </div>
  );
}
