import { useCallback, useSyncExternalStore } from 'react'

export type Humor = 1 | 2 | 3 | 4 | 5

export interface CheckIn {
  /** yyyy-mm-dd */
  data: string
  humor: Humor
  dormiuBem?: boolean
  nota?: string
  atualizadoEm: string
}

const KEY = 'ceaam.checkins'
const listeners = new Set<() => void>()
let cache: CheckIn[] | null = null

function read(): CheckIn[] {
  if (cache) return cache
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? (JSON.parse(raw) as unknown) : []
    cache = Array.isArray(parsed) ? (parsed as CheckIn[]) : []
  } catch {
    cache = []
  }
  return cache
}

function write(next: CheckIn[]) {
  cache = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* localStorage indisponível */
  }
  listeners.forEach((l) => l())
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function hojeISO(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function useCheckIns() {
  const checkins = useSyncExternalStore(subscribe, read, read)

  /** Salva o check-in do dia (substitui se já existir). */
  const salvar = useCallback((c: Omit<CheckIn, 'atualizadoEm'>) => {
    const outros = read().filter((x) => x.data !== c.data)
    write([...outros, { ...c, atualizadoEm: new Date().toISOString() }])
  }, [])

  const apagar = useCallback((data: string) => {
    write(read().filter((x) => x.data !== data))
  }, [])

  const ordenados = [...checkins].sort((a, b) => b.data.localeCompare(a.data))
  return { checkins: ordenados, salvar, apagar }
}
