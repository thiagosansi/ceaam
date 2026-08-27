import { useSyncExternalStore } from 'react'

export interface ContatoConfianca {
  id: string
  nome: string
  telefone: string
}

export interface SegurancaState {
  disfarceAtivo: boolean
}

export const STORAGE_KEY = 'ceaam.seguranca'
export const CONTATOS_KEY = 'ceaam.contatosConfianca'
export const UNLOCK_KEY = 'ceaam.disfarce.destravado'
export const PIN_DEMO = '1904'
export const MAX_CONTATOS = 3

function safeGet(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key)
  } catch {
    return null
  }
}
function safeSet(storage: Storage, key: string, value: string) {
  try {
    storage.setItem(key, value)
  } catch {
    /* storage indisponível */
  }
}

/* ---------- estado geral de segurança ---------- */
function loadState(): SegurancaState {
  const raw = safeGet(localStorage, STORAGE_KEY)
  if (!raw) return { disfarceAtivo: false }
  try {
    const parsed = JSON.parse(raw) as Partial<SegurancaState>
    return { disfarceAtivo: Boolean(parsed.disfarceAtivo) }
  } catch {
    return { disfarceAtivo: false }
  }
}

let state: SegurancaState = loadState()
const listeners = new Set<() => void>()
function emit() {
  listeners.forEach((l) => l())
}
function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}
function getSnapshot() {
  return state
}

export function setDisfarceAtivo(ativo: boolean) {
  state = { ...state, disfarceAtivo: ativo }
  safeSet(localStorage, STORAGE_KEY, JSON.stringify(state))
  if (ativo) {
    // ao ativar, o app já está aberto: mantém destravado nesta sessão
    setDestravado(true)
  }
  emit()
}

export function useSeguranca() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return { disfarceAtivo: s.disfarceAtivo, setDisfarceAtivo }
}

/* ---------- destravado (por sessão) ---------- */
let destravado = safeGet(sessionStorage, UNLOCK_KEY) === '1'
const unlockListeners = new Set<() => void>()
function subscribeUnlock(l: () => void) {
  unlockListeners.add(l)
  return () => unlockListeners.delete(l)
}
function getUnlock() {
  return destravado
}
export function setDestravado(v: boolean) {
  destravado = v
  safeSet(sessionStorage, UNLOCK_KEY, v ? '1' : '0')
  unlockListeners.forEach((l) => l())
}
export function useDestravado() {
  return useSyncExternalStore(subscribeUnlock, getUnlock, getUnlock)
}

/* ---------- contatos de confiança ---------- */
function loadContatos(): ContatoConfianca[] {
  const raw = safeGet(localStorage, CONTATOS_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((c) => c && typeof c.nome === 'string' && typeof c.telefone === 'string')
      .slice(0, MAX_CONTATOS)
      .map((c, i) => ({ id: String(c.id ?? i), nome: c.nome, telefone: c.telefone }))
  } catch {
    return []
  }
}
let contatos: ContatoConfianca[] = loadContatos()
const contatosListeners = new Set<() => void>()
function subscribeContatos(l: () => void) {
  contatosListeners.add(l)
  return () => contatosListeners.delete(l)
}
function getContatos() {
  return contatos
}
function persistContatos() {
  safeSet(localStorage, CONTATOS_KEY, JSON.stringify(contatos))
  contatosListeners.forEach((l) => l())
}

export function normalizarTelefone(v: string) {
  return v.replace(/[^\d+]/g, '')
}
export function telefoneValido(v: string) {
  const digits = v.replace(/\D/g, '')
  return digits.length >= 8 && digits.length <= 13
}

export function addContato(nome: string, telefone: string): string | null {
  const n = nome.trim()
  const t = telefone.trim()
  if (!n) return 'Informe um nome.'
  if (!telefoneValido(t)) return 'Informe um telefone válido (com DDD).'
  if (contatos.length >= MAX_CONTATOS) return `Você pode salvar até ${MAX_CONTATOS} contatos.`
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
  contatos = [...contatos, { id, nome: n, telefone: t }]
  persistContatos()
  return null
}
export function updateContato(id: string, nome: string, telefone: string): string | null {
  const n = nome.trim()
  const t = telefone.trim()
  if (!n) return 'Informe um nome.'
  if (!telefoneValido(t)) return 'Informe um telefone válido (com DDD).'
  contatos = contatos.map((c) => (c.id === id ? { ...c, nome: n, telefone: t } : c))
  persistContatos()
  return null
}
export function removeContato(id: string) {
  contatos = contatos.filter((c) => c.id !== id)
  persistContatos()
}
export function useContatosConfianca() {
  return useSyncExternalStore(subscribeContatos, getContatos, getContatos)
}
