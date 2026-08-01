const beneficios = [
  'Ficha clínica accesible desde el celular, en cualquier momento',
  'Indicaciones y planes de tratamiento explicados en lenguaje simple',
  'Notificaciones que acompañan cada etapa del cuidado',
  'Acceso para cuidadores en tratamientos que lo requieren',
]

export default function MiSalud() {
  return (
    <section className="bg-hipokratia-50">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <span className="rounded-full bg-hipokratia-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-hipokratia-800">
          Portal de Pacientes
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold text-hipokratia-900 md:text-5xl">
          La ficha clínica, del lado del paciente
        </h1>
        <p className="mt-6 text-lg text-hipokratia-800/80">
          El portal de pacientes de Hipokratia lleva la información clínica fuera del
          consultorio: indicaciones, tratamientos y evolución, siempre a mano y siempre
          en lenguaje que la persona puede entender.
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
            ¿Tu centro quiere ofrecer esta experiencia a sus pacientes?
          </h2>
          <p className="mt-2 text-hipokratia-800/80">
            Conversemos sobre cómo integrar el portal de pacientes a tu operación clínica.
          </p>
          <a
            href="/contacto"
            className="mt-5 inline-block rounded-full bg-salud-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-salud-700"
          >
            Conversar con Hipokratia
          </a>
        </div>
      </div>
    </section>
  )
}
