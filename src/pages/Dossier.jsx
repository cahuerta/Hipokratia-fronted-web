const beneficios = [
  'Síntesis de literatura médica generada en minutos, no en días',
  'Documentos clínicos con trazabilidad de cada fuente citada',
  'Exportación en PDF y presentación, listos para compartir',
  'Pensado tanto para el equipo clínico como para el paciente informado',
]

export default function Dossier() {
  return (
    <section className="bg-hipokratia-50">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <span className="rounded-full bg-hipokratia-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-hipokratia-800">
          Hipokratia Dossier
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold text-hipokratia-900 md:text-5xl">
          La evidencia científica, ordenada y citada
        </h1>
        <p className="mt-6 text-lg text-hipokratia-800/80">
          Hipokratia Dossier analiza literatura médica y entrega síntesis claras, con
          cada afirmación trazada a su fuente original. Menos tiempo buscando papers,
          más tiempo revisando lo que realmente importa.
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
            Acceso web gratuito por ahora
          </h2>
          <p className="mt-2 text-hipokratia-800/80">
            Hipokratia Dossier está disponible para usar directamente desde el navegador.
          </p>
          <a
            href="https://dossier.hipokratia.health"
            className="mt-5 inline-block rounded-full bg-salud-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-salud-700"
          >
            Ir a Hipokratia Dossier →
          </a>
        </div>
      </div>
    </section>
  )
}
