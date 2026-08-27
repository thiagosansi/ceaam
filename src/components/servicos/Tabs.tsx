import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

export interface TabItem {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  /** Quando muda, o estado das abas é reiniciado. */
  resetKey?: string
  accentClass?: string
}

/** Abas acessíveis (role=tablist) com navegação por setas. */
export default function Tabs({ tabs, resetKey, accentClass = 'bg-wine' }: TabsProps) {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    setActive(0)
  }, [resetKey])

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next: number | null = null
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length
    if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = tabs.length - 1
    if (next !== null) {
      e.preventDefault()
      setActive(next)
      refs.current[next]?.focus()
    }
  }

  return (
    <div>
      <div role="tablist" aria-label="Detalhes do atendimento" className="flex gap-1 rounded-full bg-white p-1 shadow-card">
        {tabs.map((tab, i) => {
          const selected = i === active
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[i] = el
              }}
              role="tab"
              type="button"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`flex-1 rounded-full px-2 py-2 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40 ${
                selected ? `${accentClass} text-white` : 'text-muted hover:text-navy'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="mt-4 focus:outline-none"
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}
