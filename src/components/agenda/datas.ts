/** Utilidades de data sem dependências externas (pt-BR). */

export function toISO(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function fromISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function hojeISO(): string {
  return toISO(new Date())
}

const fmtLonga = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})
const fmtCurta = new Intl.DateTimeFormat('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })
const fmtMes = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' })

export function formatarLonga(iso: string): string {
  const s = fmtLonga.format(fromISO(iso))
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function formatarCurta(iso: string): string {
  return fmtCurta.format(fromISO(iso)).replace('.', '')
}

export function formatarMes(ano: number, mes: number): string {
  const s = fmtMes.format(new Date(ano, mes, 1))
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const HORARIOS = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']
