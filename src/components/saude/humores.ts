import type { Humor } from '../../store/saude'

export const HUMORES: { valor: Humor; emoji: string; rotulo: string; cor: string }[] = [
  { valor: 5, emoji: '😄', rotulo: 'Muito bem', cor: '#8ba888' },
  { valor: 4, emoji: '🙂', rotulo: 'Bem', cor: '#a58bc4' },
  { valor: 3, emoji: '😐', rotulo: 'Neutra', cor: '#1e3a5f' },
  { valor: 2, emoji: '😔', rotulo: 'Difícil', cor: '#e8b4b0' },
  { valor: 1, emoji: '😢', rotulo: 'Muito difícil', cor: '#a8455a' },
]

export function humorInfo(v: Humor) {
  return HUMORES.find((h) => h.valor === v) ?? HUMORES[2]
}
