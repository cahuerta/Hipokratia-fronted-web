import { Link } from 'react-router-dom'

const servicios = [
  {
    to: '/portal',
    nombre: 'Hipokratia Portal',
    descripcion:
      'Acceso a la ficha propia, indicaciones y planes de tratamiento desde el celular, con notificaciones que acompañan cada etapa del cuidado.',
  },
  {
    to: '/aprende',
    nombre: 'Hipokratia Aprende',
    descripcion:
      'Evidencia científica traducida a lenguaje simple, para que cualquier paciente entienda qué dice la ciencia sobre su diagnóstico.',
  },
]

export default function Pacientes() {
  return (
    <>
      <section className="bg-hipokratia-50">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <span className="rounded-full bg-hipokratia-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-hipokratia-800">
            Pacientes
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold text-hipokratia-900 md:text-5xl">
            Tu ficha, tus indicaciones, siempre a mano
          </h1>
          <p className="mt-6 text-lg text-hipokratia-800/80">
            Hipokratia lleva la información clínica fuera del consultorio: tratamientos,
            evolución y evidencia científica, en lenguaje que cualquier persona puede
            entender.
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
            ¿Eres un centro de salud o profesional?
          </h2>
          <p className="max-w-xl opacity-80">
            Hipokratia también ofrece herramientas de gestión clínica, síntesis de
            evidencia y formación médica para equipos de salud.
          </p>
          <Link
            to="/profesionales"
            className="mt-2 rounded-full border border-hipokratia-50/30 px-6 py-3 text-sm font-semibold transition-colors hover:bg-hipokratia-50/10"
          >
            Ver servicios para profesionales →
          </Link>
        </div>
      </section>
    </>
  )
}
