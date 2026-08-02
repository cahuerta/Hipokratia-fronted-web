import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const servicios = [
  { value: 'gestion', label: 'Hipokratia Gestión' },
  { value: 'catedra', label: 'Hipokratia Cátedra Interactiva' },
  { value: 'portal', label: 'Hipokratia Portal' },
  { value: 'dossier', label: 'Hipokratia Dossier' },
  { value: 'otro', label: 'Otro / no estoy seguro' },
]

export default function Contacto() {
  const [searchParams] = useSearchParams()
  const preseleccionado = searchParams.get('servicio') || ''

  const [enviado, setEnviado] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // Envío real pendiente de conectar (formulario o backend a definir)
    setEnviado(true)
  }

  return (
    <section className="bg-hipokratia-50">
      <div className="mx-auto max-w-2xl px-6 py-24">
        <h1 className="font-display text-4xl font-semibold text-hipokratia-900">
          Conversemos
        </h1>
        <p className="mt-4 text-lg text-hipokratia-800/80">
          Contanos sobre tu centro o institución y te contactamos para coordinar una demo.
        </p>

        {enviado ? (
          <div className="mt-10 rounded-2xl border border-hipokratia-100 bg-white p-8">
            <h2 className="font-display text-xl font-semibold text-hipokratia-900">
              Recibimos tu mensaje
            </h2>
            <p className="mt-2 text-hipokratia-800/80">
              Te vamos a contactar a la brevedad.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-hipokratia-900">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                className="mt-2 w-full rounded-lg border border-hipokratia-100 bg-white px-4 py-3 text-hipokratia-900 focus:border-salud-600 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-hipokratia-900">
                Correo
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-lg border border-hipokratia-100 bg-white px-4 py-3 text-hipokratia-900 focus:border-salud-600 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="servicio" className="block text-sm font-medium text-hipokratia-900">
                Servicio de interés
              </label>
              <select
                id="servicio"
                name="servicio"
                defaultValue={preseleccionado}
                className="mt-2 w-full rounded-lg border border-hipokratia-100 bg-white px-4 py-3 text-hipokratia-900 focus:border-salud-600 focus:outline-none"
              >
                <option value="" disabled>
                  Selecciona un servicio
                </option>
                {servicios.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-hipokratia-900">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                required
                className="mt-2 w-full rounded-lg border border-hipokratia-100 bg-white px-4 py-3 text-hipokratia-900 focus:border-salud-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="rounded-full bg-salud-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-salud-700"
            >
              Enviar
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
