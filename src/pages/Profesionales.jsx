import { Link } from 'react-router-dom'

const servicios = [
  {
    to: '/gestion',
    nombre: 'Hipokratia Gestión',
    descripcion:
      'Ficha clínica, agenda, facturación y roles profesionales en una sola plataforma, pensada para el flujo real de un centro de salud.',
  },
  {
    to: '/dossier',
    nombre: 'Hipokratia Dossier',
    descripcion:
      'Síntesis de literatura médica asistida por IA, con documentos clínicos generados en minutos y trazabilidad de cada fuente.',
  },
  {
    to: '/catedra',
    nombre: 'Hipokratia Cátedra Interactiva',
    descripcion:
      'Casos clínicos proyectados en tiempo real, votación de estudiantes y asistencia por QR para la formación médica moderna.',
  },
]

export default function Profesionales() {
  return (
    <>
      <section className="bg-hipokratia-50">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <span className="rounded-full bg-hipokratia-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-hipokratia-800">
            Centros Médicos / Profesionales
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold text-hipokratia-900 md:text-5xl">
            Tecnología clínica para tu equipo
          </h1>
          <p className="mt-6 text-lg text-hipokratia-800/80">
            Gestión clínica, síntesis de evidencia científica y formación médica,
            construidas desde la práctica diaria y pensadas para el flujo real de un
            centro de salud.
          </p>
        </div>
      </section>

      <section className="border-t border-hipokratia-100 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {servicios.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="group rounded-2xl border border-hipokratia-100 bg-hipokratia-50 p-8 transition-shadow hover:shadow-lg"
              >
                <h2 className="font-display text-xl font-semibold text-hipokratia-900">
                  {s.nombre}
                </h2>
                <p className="mt-3 text-hipokratia-800/80">{s.descripcion}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-salud-600 group-hover:underline">
                  Conocer más →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-hipokratia-900 text-hipokratia-50">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-16">
          <h2 className="font-display text-2xl font-semibold">
            ¿Quieres integrar Hipokratia en tu centro?
          </h2>
          <p className="max-w-xl opacity-80">
            Conversemos sobre cómo estas herramientas se adaptan a tu operación clínica.
          </p>
          <Link
            to="/contacto"
            className="mt-2 rounded-full bg-salud-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-salud-700"
          >
            Hablemos de tu centro
          </Link>
        </div>
      </section>
    </>
  )
}
