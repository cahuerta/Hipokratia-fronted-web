const beneficios = [
  'Explica en palabras simples qué dice la evidencia sobre tu diagnóstico',
  'Busca en la literatura médica mundial, sin jerga técnica',
  'Indicador de confiabilidad claro: qué tan respaldado está cada tema',
  'Conversación por etapas: podés seguir preguntando sobre tu condición',
]

export default function Aprende() {
  return (
    <section className="bg-hipokratia-50">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <span className="rounded-full bg-hipokratia-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-hipokratia-800">
          Hipokratia Aprende
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold text-hipokratia-900 md:text-5xl">
          Entiende lo que dice la ciencia sobre tu salud
        </h1>
        <p className="mt-6 text-lg text-hipokratia-800/80">
          Hipokratia Aprende traduce la evidencia científica a un lenguaje que cualquier
          persona puede entender: sin papers, sin jerga, solo lo que realmente significa
          para tu diagnóstico.
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
            Hipokratia Aprende está disponible para usar directamente desde el navegador.
          </p>
          <a
            href="https://aprende.hipokratia.health"
            className="mt-5 inline-block rounded-full bg-salud-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-salud-700"
          >
            Ir a Hipokratia Aprende →
          </a>
        </div>
      </div>
    </section>
  )
}
