import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../componentes/ui/navbar/Navbar"
import { ClimaPage } from '../ClimaPage'

export const ClimaRoute = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='climaapp/' element={<ClimaPage />}/>

        <Route path='*' element={<Navigate to="/climaapp/" />}/>
      </Routes>
    </>
  )
}
