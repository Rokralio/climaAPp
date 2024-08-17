import { useState } from 'react';
import { ApiClimaApp, GetClimaFondo } from './componentes';
import './climaPage.css';

export function ClimaPage() {
  const [descripcionClima, setDescripcionClima] = useState('');

  return (
    <>
        <GetClimaFondo descripcionClima={descripcionClima} />
        <ApiClimaApp setDescripcionClima={setDescripcionClima} />
    </>
  );
}
