const beneficios = [
  'Casos clínicos proyectados en tiempo real, con votación de estudiantes en vivo',
  'Asistencia registrada por código QR, sin planillas manuales',
  'Panel de control único para el docente durante toda la sesión',
  'Pensado para clases numerosas, sin perder participación individual',
]

export default function Catedra() {
  return (
    <section className="bg-hipokratia-50">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <span className="rounded-full bg-hipokratia-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-hipokratia-800">
          Hipokratia Cátedra Interactiva
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold text-hipokratia-900 md:text-5xl">
          La clase magistral, hecha para participar
        </h1>
        <p className="mt-6 text-lg text-hipokratia-800/80">
          Hipokratia Cátedra Interactiva transforma la presentación de casos clínicos en
          una experiencia en vivo: los estudiantes votan, el docente controla el ritmo,
          y la asistencia se registra sola.
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
            Solicita una demo para tu institución
          </h2>
          <p className="mt-2 text-hipokratia-800/80">
            Te mostramos Hipokratia Cátedra Interactiva funcionando con un caso clínico real.
          </p>
          <a
            href="/contacto?servicio=catedra"
            className="mt-5 inline-block rounded-full bg-salud-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-salud-700"
          >
            Solicitar demo →
          </a>
        </div>
      </div>
    </section>
  )
}
