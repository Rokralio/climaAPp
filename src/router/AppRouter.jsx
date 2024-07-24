import { Navigate, Route, Routes } from 'react-router-dom';
import { ClimaRoute } from '../climaApp';
import { AuthRoutes } from '../auth';
import { useCheckAuth } from '../hooks';
import { CheckingAuth } from '../ui';


export const AppRouter = () => {
  const { status } = useCheckAuth();

  if (status === 'checking') {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {
        status === 'authenticated'
          ? <Route path='/*' element={<ClimaRoute />} />
          : <Route path='/climaapp/*' element={<AuthRoutes />} />
      }
      <Route path='*' element={ <Navigate to='/climaapp/login'/> } />
    </Routes>
  );
}
