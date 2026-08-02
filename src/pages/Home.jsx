import { Link } from 'react-router-dom'

const servicios = [
  {
    to: '/gestion',
    nombre: 'Hipokratia Gestión',
    descripcion:
      'Ficha clínica, agenda, facturación y roles profesionales en una sola plataforma, pensada para el flujo real de un centro de salud.',
  },
  {
    to: '/portal',
    nombre: 'Hipokratia Portal',
    descripcion:
      'Acceso a la ficha propia, indicaciones y planes de tratamiento desde el celular, con notificaciones que acompañan cada etapa del cuidado.',
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

      {/* Servicios */}
      <section id="servicios" className="bg-hipokratia-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl font-semibold text-hipokratia-900">
            Servicios
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {servicios.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="group rounded-2xl border border-hipokratia-100 bg-white p-8 transition-shadow hover:shadow-lg"
              >
                <h3 className="font-display text-xl font-semibold text-hipokratia-900">
                  {s.nombre}
                </h3>
                <p className="mt-3 text-hipokratia-800/80">{s.descripcion}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-salud-600 group-hover:underline">
                  Conocer más →
                </span>
              </Link>
            ))}
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
