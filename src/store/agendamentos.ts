import { useCallback, useSyncExternalStore } from 'react'

export interface Agendamento {
  id: string
  servicoId: string
  /** yyyy-mm-dd */
  data: string
  /** HH:mm */
  hora: string
  criadoEm: string
}

const KEY = 'ceaam.agendamentos'
const listeners = new Set<() => void>()
let cache: Agendamento[] | null = null

function read(): Agendamento[] {
  if (cache) return cache
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? (JSON.parse(raw) as unknown) : []
    cache = Array.isArray(parsed) ? (parsed as Agendamento[]) : []
  } catch {
    cache = []
  }
  return cache
}

function write(next: Agendamento[]) {
  cache = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* localStorage indisponível: mantém apenas em memória */
  }
  listeners.forEach((l) => l())
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function ordenar(lista: Agendamento[]): Agendamento[] {
  return [...lista].sort((a, b) => `${a.data} ${a.hora}`.localeCompare(`${b.data} ${b.hora}`))
}

export function useAgendamentos() {
  const agendamentos = useSyncExternalStore(subscribe, read, read)

  const add = useCallback((servicoId: string, data: string, hora: string): Agendamento => {
    const novo: Agendamento = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      servicoId,
      data,
      hora,
      criadoEm: new Date().toISOString(),
    }
    write([...read(), novo])
    return novo
  }, [])

  const cancel = useCallback((id: string) => {
    write(read().filter((a) => a.id !== id))
  }, [])

  return { agendamentos: ordenar(agendamentos), add, cancel }
}
