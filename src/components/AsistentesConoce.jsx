// components/AsistentesConoce.jsx — los asistentes de HypokratIA en la página principal.
//
// El carrusel y la escena viven en conoce.hipokratia.health (repo hipokratia-conversa);
// aquí solo se muestran en un marco. Al tocar un avatar, ese marco pasa a pantalla
// completa con la escena y al cerrar vuelve a su lugar (mensajes "expandir" / "contraer").
// El alto del marco lo informa la propia página de conoce ("alto").
import { useEffect, useRef, useState } from 'react'

const CONOCE = import.meta.env.VITE_CONOCE_URL || 'https://conoce.hipokratia.health'
const ORIGEN = new URL(CONOCE).origin

export default function AsistentesConoce() {
  const marco = useRef(null)
  const [alto, setAlto] = useState(400)
  const [grande, setGrande] = useState(false)

  useEffect(() => {
    function alMensaje(e) {
      if (e.origin !== ORIGEN || e.source !== marco.current?.contentWindow) return
      const d = e.data || {}
      if (d.fuente !== 'hipokratia-conversa') return
      if (d.tipo === 'alto' && Number(d.alto) > 0) setAlto(Math.min(900, Math.ceil(d.alto)))
      if (d.tipo === 'expandir') setGrande(true)
      if (d.tipo === 'contraer') setGrande(false)
    }
    window.addEventListener('message', alMensaje)
    return () => window.removeEventListener('message', alMensaje)
  }, [])

  // Con la escena abierta, la página de atrás no se mueve
  useEffect(() => {
    if (!grande) return undefined
    const antes = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = antes }
  }, [grande])

  return (
    <section className="bg-white" style={{ height: alto }} aria-label="Conoce a nuestros asistentes">
      <iframe
        ref={marco}
        src={`${CONOCE}/?modo=carrusel`}
        title="Conoce a nuestros asistentes: Ica, Ipo, Sophia y Katia"
        allow="autoplay"
        loading="eager"
        style={
          grande
            ? { position: 'fixed', inset: 0, width: '100%', height: '100%', border: 0, zIndex: 100, background: '#070D22' }
            : { display: 'block', width: '100%', height: alto, border: 0, background: 'transparent' }
        }
      />
    </section>
  )
}
