import { useEffect, useRef } from 'react'
import { Outlet, useLocation, useMatches } from 'react-router-dom'
import { X } from 'lucide-react'
import TabBar from './TabBar'
import PanicFab from '../features/seguranca/PanicFab'
import { quickExit, registerEscapeShortcut } from '../features/seguranca/quickExit'

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 text-wine"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M14.5 10c-1.6 3-1 7 1.3 9.3c-.6 3 .4 6 2.4 7.4" />
        <path d="M14.5 10c3-3 8.4-2.2 10.4 1.4c1.8 3.4.6 7.6-2 10c-.8 1.2-.6 3 0 4.4" />
        <path d="M22.9 25.8c5 2 8.2 5.4 8.8 10" />
        <path d="M18.2 26.7c-5 1.6-8.6 5-9.2 9.2" />
      </svg>
      <span className="text-xl font-bold tracking-tight text-navy">CEAAM</span>
    </div>
  )
}

export default function AppShell() {
  // Atalho: Escape 3x em 1,5s dispara a saída rápida
  useEffect(() => registerEscapeShortcut(), [])

  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const matches = useMatches()

  // O container de scroll é o <main>, não a window: volta ao topo a cada rota
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
  }, [pathname])

  // Título da aba por rota (definido em `handle.title` no App.tsx)
  useEffect(() => {
    const titulo = [...matches].reverse().find((m) => (m.handle as { title?: string } | undefined)?.title)
    const t = (titulo?.handle as { title?: string } | undefined)?.title
    document.title = t ? `${t} · CEAAM` : 'CEAAM'
  }, [matches])

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col bg-cream">
      <header className="z-10 flex shrink-0 items-center justify-between border-b border-blush/70 bg-cream/95 px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur md:pt-8">
        <Logo />
        <button
          type="button"
          onClick={quickExit}
          className="inline-flex items-center gap-1 rounded-full border border-wine px-3 py-1.5 text-xs font-semibold text-wine transition-colors hover:bg-wine hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40"
          aria-label="Saída rápida: sair do aplicativo imediatamente (ou Esc 3 vezes)"
          title="Saída rápida (Esc 3×)"
        >
          <X className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
          Saída rápida
        </button>
      </header>

      <main ref={mainRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-20 pt-4">
        <div key={pathname} className="page-enter min-h-full">
          <Outlet />
        </div>
      </main>

      <PanicFab />
      <TabBar />
    </div>
  )
}
