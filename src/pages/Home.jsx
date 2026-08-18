import { Link } from 'react-router-dom'

const diferenciadores = [
  {
    titulo: 'Interoperable de base',
    texto: 'Arquitectura alineada a FHIR R4, pensada para conversar con otros sistemas, no para aislar los datos.',
  },
  {
    titulo: 'IA aplicada al cuidado',
    texto: 'Modelos de lenguaje integrados donde generan valor clínico real: documentación, síntesis, alternativas de estudio.',
  },
  {
    titulo: 'Construido por quien lo usa',
    texto: 'Cada módulo nace de la práctica clínica diaria, no de un backlog genérico de software.',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hipokratia-50">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24 md:py-32">
          <span className="rounded-full bg-hipokratia-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-hipokratia-800">
            Software clínico
          </span>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-hipokratia-900 md:text-6xl">
            Tecnología clínica para el cuidado real
          </h1>
          <p className="max-w-xl text-lg text-hipokratia-800/80">
            Hipokratia diseña y opera el software que sostiene la práctica médica diaria:
            de la ficha clínica al paciente, de la evidencia científica al aula.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/contacto"
              className="rounded-full bg-salud-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-salud-700"
            >
              Hablemos de tu centro
            </Link>
            <a
              href="#servicios"
              className="rounded-full border border-hipokratia-800 px-6 py-3 text-sm font-semibold text-hipokratia-900 transition-colors hover:bg-hipokratia-100"
            >
              Ver servicios
            </a>
          </div>
        </div>
      </section>

      {/* Qué es Hipokratia */}
      <section className="border-t border-hipokratia-100 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="font-display text-3xl font-semibold text-hipokratia-900">
            Un ecosistema, no una lista de productos
          </h2>
          <p className="mt-5 text-lg text-hipokratia-800/80">
            Cada módulo de Hipokratia resuelve un momento distinto del cuidado clínico,
            pero comparte una misma base de datos, una misma identidad de paciente y un
            mismo estándar de seguridad. El resultado: menos sistemas sueltos, más tiempo
            para la medicina.
          </p>
        </div>
      </section>

      {/* Servicios: elegí tu camino */}
      <section id="servicios" className="bg-hipokratia-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl font-semibold text-hipokratia-900 text-center">
            ¿Qué buscas hoy?
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Link
              to="/pacientes"
              className="group rounded-2xl border border-hipokratia-100 bg-white p-10 text-center transition-shadow hover:shadow-lg"
            >
              <span className="rounded-full bg-hipokratia-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-hipokratia-800">
                Pacientes
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-hipokratia-900">
                Soy paciente
              </h3>
              <p className="mt-3 text-hipokratia-800/80">
                Tu ficha, tus indicaciones y la evidencia de tu tratamiento, siempre a mano.
              </p>
              <span className="mt-6 inline-block text-sm font-semibold text-salud-600 group-hover:underline">
                Ver servicios para pacientes →
              </span>
            </Link>

            <Link
              to="/profesionales"
              className="group rounded-2xl border border-hipokratia-100 bg-white p-10 text-center transition-shadow hover:shadow-lg"
            >
              <span className="rounded-full bg-hipokratia-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-hipokratia-800">
                Profesionales
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-hipokratia-900">
                Soy centro médico o profesional
              </h3>
              <p className="mt-3 text-hipokratia-800/80">
                Gestión clínica, síntesis de evidencia y formación médica para tu equipo.
              </p>
              <span className="mt-6 inline-block text-sm font-semibold text-salud-600 group-hover:underline">
                Ver servicios para profesionales →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Diferenciadores */}
      <section className="border-t border-hipokratia-100 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl font-semibold text-hipokratia-900">
            Por qué Hipokratia
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {diferenciadores.map((d) => (
              <div key={d.titulo}>
                <h3 className="font-display text-lg font-semibold text-hipokratia-900">
                  {d.titulo}
                </h3>
                <p className="mt-2 text-hipokratia-800/80">{d.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Descarga app */}
      <section className="bg-hipokratia-900 text-hipokratia-50">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-16">
          <h2 className="font-display text-2xl font-semibold">
            Lleva tu ficha clínica en el bolsillo
          </h2>
          <p className="max-w-xl opacity-80">
            La app de pacientes de Hipokratia está disponible para descargar. Próximamente en Google Play.
          </p>
          <span className="mt-2 rounded-full border border-hipokratia-50/30 px-5 py-2 text-sm opacity-70">
            Disponible pronto
          </span>
        </div>
      </section>
    </>
  )
}
