import { useState } from "react";
import { ApiClimaApp } from "./componentes/api/openweather/ApiClimaApp";
import { GetClimaFondo } from "./componentes/ImgFondo/GetClimaFondo";
import "./app.css"

function App() {
  const [descripcionClima, setDescripcionClima] = useState('');

  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="col-12 col-md-6 d-flex flex-column align-items-center">
        <GetClimaFondo descripcionClima={descripcionClima} />
        <div className="api-container d-flex justify-content-center align-items-center flex-grow-1 w-100">
          <ApiClimaApp setDescripcionClima={setDescripcionClima} />
        </div>
      </div>
    </div>
  );
}

export default App;
