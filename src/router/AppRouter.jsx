import { Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../auth';
import { ClimaRoute } from '../climaApp/routes/ClimaRoute';



export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path='climaapp/login' element={

            <LoginPage />

        } />

        <Route path='climaapp/register' element={

            <RegisterPage />

        } />

        <Route path='/*' element={

            <ClimaRoute />
        } />
      </Routes>
    </>
  )
}
