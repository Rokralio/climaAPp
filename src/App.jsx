import { useState } from "react";
import { ApiClimaApp } from "./componentes/Api/openweather/ApiClimaApp";
import { GetClimaFondo } from "./componentes/ImgFondo/GetClimaFondo";

function App() {
  const [descripcionClima, setDescripcionClima] = useState('');

  return (
    <>
      <GetClimaFondo descripcionClima={descripcionClima} />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div>
          <ApiClimaApp setDescripcionClima={setDescripcionClima} />
        </div>
      </div>
    </>
  );
}

export default App;
