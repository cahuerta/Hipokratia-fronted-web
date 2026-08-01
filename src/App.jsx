import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import MiSalud from './pages/MiSalud.jsx'
import FichaClinica from './pages/FichaClinica.jsx'
import EvidenciaMed from './pages/EvidenciaMed.jsx'
import Docencia from './pages/Docencia.jsx'
import Contacto from './pages/Contacto.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/misalud" element={<MiSalud />} />
        <Route path="/ficha-clinica" element={<FichaClinica />} />
        <Route path="/evidenciamed" element={<EvidenciaMed />} />
        <Route path="/docencia" element={<Docencia />} />
        <Route path="/contacto" element={<Contacto />} />
      </Route>
    </Routes>
  )
}
