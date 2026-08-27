import { NavLink } from 'react-router-dom'
import { BookOpen, HeartHandshake, Home, Info, LifeBuoy } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Tab {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
}

const TABS: Tab[] = [
  { to: '/', label: 'Início', icon: Home, end: true },
  { to: '/orientacoes', label: 'Orientações', icon: BookOpen },
  { to: '/servicos', label: 'Serviços', icon: HeartHandshake },
  { to: '/rede-apoio', label: 'Rede de apoio', icon: LifeBuoy },
  { to: '/sobre', label: 'Sobre', icon: Info },
]

export default function TabBar() {
  return (
    <nav
      aria-label="Navegação principal"
      className="z-10 shrink-0 border-t border-blush/70 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:pb-2"
    >
      <ul className="grid grid-cols-5">
        {TABS.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-1 pb-1 pt-2 text-[10px] font-medium leading-tight transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40 ${
                  isActive ? 'text-wine' : 'text-muted hover:text-navy'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} aria-hidden />
                  <span className="truncate">{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
