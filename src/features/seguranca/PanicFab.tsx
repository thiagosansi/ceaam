import { Link, useLocation } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'

/** Botão flutuante "Ajuda" — escondido na própria tela /ajuda. */
export default function PanicFab() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/ajuda')) return null
  return (
    <Link
      to="/ajuda"
      aria-label="Preciso de ajuda agora"
      className="absolute bottom-[calc(4.25rem+env(safe-area-inset-bottom))] right-4 z-20 inline-flex items-center gap-2 rounded-full bg-wine px-4 py-3 text-sm font-bold text-white shadow-soft ring-4 ring-cream transition-colors hover:bg-wineDark focus:outline-none focus-visible:ring-wine/40 md:bottom-[4.75rem]"
    >
      <ShieldAlert className="h-5 w-5" aria-hidden />
      Ajuda
    </Link>
  )
}
