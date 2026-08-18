import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Pacientes from './pages/Pacientes.jsx'
import Profesionales from './pages/Profesionales.jsx'
import Portal from './pages/Portal.jsx'
import Gestion from './pages/Gestion.jsx'
import Dossier from './pages/Dossier.jsx'
import Aprende from './pages/Aprende.jsx'
import Catedra from './pages/Catedra.jsx'
import Contacto from './pages/Contacto.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/profesionales" element={<Profesionales />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/dossier" element={<Dossier />} />
        <Route path="/aprende" element={<Aprende />} />
        <Route path="/catedra" element={<Catedra />} />
        <Route path="/contacto" element={<Contacto />} />
      </Route>
    </Routes>
  )
}
