const beneficios = [
  'Ficha clínica accesible desde el celular, en cualquier momento',
  'Indicaciones y planes de tratamiento explicados en lenguaje simple',
  'Notificaciones que acompañan cada etapa del cuidado',
  'Acceso para cuidadores en tratamientos que lo requieren',
]

export default function Portal() {
  return (
    <section className="bg-hipokratia-50">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <span className="rounded-full bg-hipokratia-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-hipokratia-800">
          Hipokratia Portal
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold text-hipokratia-900 md:text-5xl">
          La ficha clínica, del lado del paciente
        </h1>
        <p className="mt-6 text-lg text-hipokratia-800/80">
          Hipokratia Portal lleva la información clínica fuera del consultorio:
          indicaciones, tratamientos y evolución, siempre a mano y siempre en lenguaje
          que la persona puede entender.
        </p>

        <ul className="mt-10 space-y-4">
          {beneficios.map((b) => (
            <li key={b} className="flex items-start gap-3 text-hipokratia-800">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-salud-600" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl border border-hipokratia-100 bg-white p-8">
          <h2 className="font-display text-xl font-semibold text-hipokratia-900">
            Acceso gratuito para pacientes
          </h2>
          <p className="mt-2 text-hipokratia-800/80">
            Hipokratia Portal es de acceso gratuito por ahora. Entra con tus datos
            de paciente y revisa tu ficha desde hoy.
          </p>
          <a
            href="https://portal.hipokratia.health"
            className="mt-5 inline-block rounded-full bg-salud-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-salud-700"
          >
            Ir a Hipokratia Portal →
          </a>
        </div>
      </div>
    </section>
  )
}
