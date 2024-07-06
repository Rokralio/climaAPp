import { Navigate, Route, Routes } from 'react-router-dom'
import { ClimaPage } from '../climaApp/ClimaPage'
import { LoginPages } from '../auth/pages/LoginPages'
import { Navbar } from '../climaApp/componentes/ui/navbar/Navbar'

export const AppRouter = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='climaapp/' element={<ClimaPage />}/>
        <Route path='climaapp/login' element={<LoginPages />}/>
        <Route path='*' element={<Navigate to="/climaapp/" />}/>
      </Routes>
    </>
  )
}
