import { useState } from 'react';
import { ApiClimaApp, GetClimaFondo } from './componentes';

export function ClimaPage() {
  const [descripcionClima, setDescripcionClima] = useState('');

  return (
    <>
        <GetClimaFondo descripcionClima={descripcionClima} />
        <ApiClimaApp setDescripcionClima={setDescripcionClima} />
    </>
  );
}
