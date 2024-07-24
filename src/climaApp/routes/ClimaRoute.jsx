import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../componentes';
import { ClimaPage } from '../ClimaPage';

export const ClimaRoute = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<ClimaPage />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
