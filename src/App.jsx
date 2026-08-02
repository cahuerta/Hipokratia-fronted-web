import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Portal from './pages/Portal.jsx'
import Gestion from './pages/Gestion.jsx'
import Dossier from './pages/Dossier.jsx'
import Catedra from './pages/Catedra.jsx'
import Contacto from './pages/Contacto.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/dossier" element={<Dossier />} />
        <Route path="/catedra" element={<Catedra />} />
        <Route path="/contacto" element={<Contacto />} />
      </Route>
    </Routes>
  )
}
