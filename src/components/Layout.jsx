import { Outlet, Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/misalud', label: 'MiSalud' },
  { to: '/ficha-clinica', label: 'Ficha Clínica' },
  { to: '/evidenciamed', label: 'EvidenciaMed' },
  { to: '/docencia', label: 'Docencia' },
]

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-hipokratia-100 bg-hipokratia-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Hipokratia" className="h-9 w-auto" />
            <span className="font-display text-lg font-semibold text-hipokratia-900">
              Hipokratia
            </span>
          </Link>

          <nav className="hidden gap-8 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
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
            className="rounded-full bg-salud-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-salud-700"
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
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Hipokratia" className="h-7 w-auto opacity-90" />
              <span className="font-display text-base">Hipokratia</span>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 opacity-90">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to} className="hover:text-salud-400">
                  {item.label}
                </Link>
              ))}
              <Link to="/contacto" className="hover:text-salud-400">Contacto</Link>
            </nav>
          </div>
          <p className="mt-6 text-xs opacity-60">
            © {new Date().getFullYear()} Hipokratia. Tecnología clínica para el cuidado real.
          </p>
        </div>
      </footer>
    </div>
  )
}
