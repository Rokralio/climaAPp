import { useState } from "react";
import { ApiClimaApp } from "./componentes/api/openweather/ApiClimaApp";
import { GetClimaFondo } from "./componentes/ImgFondo/GetClimaFondo";

function App() {
  const [descripcionClima, setDescripcionClima] = useState('');

  return (
    <>
      <GetClimaFondo descripcionClima={descripcionClima} />
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
          <ApiClimaApp setDescripcionClima={setDescripcionClima} />
      </div>
    </>
  );
}

export default App;
