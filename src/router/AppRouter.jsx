import { Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../auth';
import { ClimaRoute } from '../climaApp/routes/ClimaRoute';
import { PrivateRoute, PublicRoute } from './index';


export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path='climaapp/login' element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />

        <Route path='climaapp/register' element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } />

        <Route path='/*' element={
          <PrivateRoute>
            <ClimaRoute />
        </PrivateRoute>
        } />
      </Routes>
    </>
  )
}
