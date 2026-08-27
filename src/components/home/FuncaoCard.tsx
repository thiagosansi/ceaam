import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Icon from '../ui/Icon'
import type { AppFuncao } from '../../types'

const TONES = [
  'bg-blush/40 border-blush',
  'bg-sage/15 border-sage/40',
  'bg-lilac/15 border-lilac/40',
  'bg-white border-blush/60',
]

export default function FuncaoCard({ funcao, index }: { funcao: AppFuncao; index: number }) {
  const panico = funcao.rota === '/ajuda'
  const tone = panico ? 'bg-wine border-wine text-white' : `${TONES[index % TONES.length]} text-navy`
  return (
    <Link
      to={funcao.rota}
      className={`flex items-center gap-3 rounded-2xl border p-4 shadow-card transition-transform active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40 ${tone}`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${panico ? 'bg-white/15' : 'bg-white'}`}
      >
        <Icon name={funcao.icone} className={`h-6 w-6 ${panico ? 'text-white' : 'text-wine'}`} strokeWidth={1.8} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-bold leading-tight">{funcao.titulo}</span>
        <span className={`block text-xs ${panico ? 'text-white/85' : 'text-muted'}`}>{funcao.descricao}</span>
      </span>
      <ChevronRight className={`h-5 w-5 shrink-0 ${panico ? 'text-white' : 'text-wine'}`} aria-hidden />
    </Link>
  )
}
