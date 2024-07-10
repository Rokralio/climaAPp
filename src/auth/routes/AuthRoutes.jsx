import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../pages';


export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="climaapp/login" element={ <LoginPage /> } />
        <Route path="climaapp/register" element={ <RegisterPage /> } />

        <Route path='/*' element={ <Navigate to="climaapp/login" /> } />
    </Routes>
  )
}
