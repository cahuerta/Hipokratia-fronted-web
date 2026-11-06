import { useEffect, useState } from 'react'

// Precio "desde" en vivo: mismo endpoint que planes.hipokratia.health (Superadmin → Precios)
const PRECIOS_URL = 'https://services.icarticular.cl/api/planes/precios'
const fmt = (n) => `$${Number(n).toLocaleString('es-CL')}`

const beneficios = [
  'Ficha clínica electrónica, agenda y facturación en un solo sistema',
  'Roles diferenciados: médico, kinesiólogo, psicólogo, odontólogo, administración',
  'Documentación clínica asistida por IA, sin perder tiempo en formularios',
  'Arquitectura alineada a estándares FHIR, lista para interoperar',
]

export default function Gestion() {
  const [desde, setDesde] = useState(null)
  useEffect(() => {
    fetch(PRECIOS_URL)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return
        // "Desde": lo mínimo que se puede contratar (Externo Base). El precio
        // por usuario de un centro no se contrata solo.
        if (d.externo_base > 0) setDesde(d.externo_base)
      })
      .catch(() => {})
  }, [])

  return (
    <section className="bg-hipokratia-50">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <span className="rounded-full bg-hipokratia-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-hipokratia-800">
          Hipokratia Gestión
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold text-hipokratia-900 md:text-5xl">
          El sistema que ordena la operación clínica
        </h1>
        <p className="mt-6 text-lg text-hipokratia-800/80">
          Hipokratia Gestión reúne la ficha clínica, la agenda y la facturación en una
          sola plataforma, con un rol para cada profesional del equipo y datos que se
          mantienen consistentes de principio a fin.
        </p>

        <ul className="mt-10 space-y-4">
          {beneficios.map((b) => (
            <li key={b} className="flex items-start gap-3 text-hipokratia-800">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-salud-600" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl border-2 border-hipokratia-800 bg-white p-8">
          <span className="text-xs font-semibold uppercase tracking-wide text-salud-600">Planes y precios</span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-hipokratia-900">
            {desde ? `Desde ${fmt(desde)} al mes` : 'Precios claros, mensuales'}
          </h2>
          <p className="mt-2 text-hipokratia-800/80">
            Para un profesional (Externo Base o Completo) o para tu centro, pagando por cada usuario.
            IVA incluido. Calcula el valor de tu equipo y mira a nuestros asistentes explicando cada plan.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="https://planes.hipokratia.health/inscribete"
              className="inline-block rounded-full bg-salud-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-salud-700"
            >
              Inscríbete: 1 mes gratis →
            </a>
            <a
              href="https://planes.hipokratia.health"
              className="inline-block rounded-full bg-hipokratia-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-hipokratia-800"
            >
              Ver planes y precios →
            </a>
          </div>
          <p className="mt-3 text-sm text-hipokratia-800/70">Prueba gratis para un profesional, sin tarjeta.</p>
        </div>

        <div className="mt-6 rounded-2xl border border-hipokratia-100 bg-white p-8">
          <h2 className="font-display text-xl font-semibold text-hipokratia-900">
            Solicita una demo para tu centro
          </h2>
          <p className="mt-2 text-hipokratia-800/80">
            Te mostramos Hipokratia Gestión funcionando con un caso similar al tuyo.
          </p>
          <a
            href="/contacto?servicio=gestion"
            className="mt-5 inline-block rounded-full bg-salud-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-salud-700"
          >
            Solicitar demo →
          </a>
        </div>
      </div>
    </section>
  )
}
