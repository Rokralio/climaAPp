import { useState } from "react";
import { ApiClimaApp } from "./componentes/api/openweather/ApiClimaApp";
import { GetClimaFondo } from "./componentes/ImgFondo/GetClimaFondo";

function App() {
  const [descripcionClima, setDescripcionClima] = useState('');

  return (
    <div className="container-fluid d-flex flex-column vh-100 p-0">
      <header className="cbz-header d-flex  align-items-center">
        <h1 className="cbz">ClimaApp</h1>
      </header>
      <GetClimaFondo descripcionClima={descripcionClima} />
      <div className="api-container d-flex justify-content-center align-items-center flex-grow-1 m-5" >
        <ApiClimaApp setDescripcionClima={setDescripcionClima} />
      </div>
    </div>
  );
}

export default App;
