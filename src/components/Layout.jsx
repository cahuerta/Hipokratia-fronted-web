import { Outlet, Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/pacientes', label: 'Pacientes' },
  { to: '/profesionales', label: 'Centros Médicos / Profesionales' },
]

const footerPacientes = [
  { to: '/portal', label: 'Portal' },
  { to: '/aprende', label: 'Aprende' },
]

const footerProfesionales = [
  { to: '/gestion', label: 'Gestión' },
  { to: '/dossier', label: 'Dossier' },
  { to: '/catedra', label: 'Cátedra Interactiva' },
]

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-hipokratia-100 bg-hipokratia-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Hipokratia" className="h-9 w-auto" />
            <span className="font-display text-lg font-semibold text-hipokratia-900">
              Hipokratia
            </span>
          </Link>

          <nav className="flex flex-1 flex-wrap items-center justify-center gap-4 md:gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-center text-sm font-medium leading-tight transition-colors ${
                    isActive
                      ? 'text-salud-600'
                      : 'text-hipokratia-800 hover:text-salud-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/contacto"
            className="shrink-0 rounded-full bg-salud-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-salud-700"
          >
            Contacto
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-hipokratia-100 bg-hipokratia-900 text-hipokratia-50">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Hipokratia" className="h-7 w-auto opacity-90" />
            <span className="font-display text-base">Hipokratia</span>
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <Link to="/pacientes" className="text-xs font-semibold uppercase tracking-wide opacity-70 hover:opacity-100">
                Pacientes
              </Link>
              <nav className="mt-3 flex flex-col gap-2">
                {footerPacientes.map((item) => (
                  <Link key={item.to} to={item.to} className="opacity-90 hover:text-salud-400">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <Link to="/profesionales" className="text-xs font-semibold uppercase tracking-wide opacity-70 hover:opacity-100">
                Centros Médicos / Profesionales
              </Link>
              <nav className="mt-3 flex flex-col gap-2">
                {footerProfesionales.map((item) => (
                  <Link key={item.to} to={item.to} className="opacity-90 hover:text-salud-400">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="mt-8 border-t border-hipokratia-50/10 pt-6">
            <Link to="/contacto" className="opacity-90 hover:text-salud-400">Contacto</Link>
          </div>

          <p className="mt-6 text-xs opacity-60">
            © {new Date().getFullYear()} Hipokratia. Tecnología clínica para el cuidado real.
          </p>
        </div>
      </footer>
    </div>
  )
}
