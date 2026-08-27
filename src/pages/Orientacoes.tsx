import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { orientacoes } from '../data'
import Icon from '../components/ui/Icon'
import SectionTitle from '../components/ui/SectionTitle'
import type { Cor } from '../types'

export const COR_ICONE: Record<Cor, string> = {
  wine: 'bg-blush/60 text-wine',
  navy: 'bg-navy/10 text-navy',
  lilac: 'bg-lilac/25 text-navy',
  sage: 'bg-sage/25 text-navy',
}

export default function Orientacoes() {
  return (
    <div className="space-y-4 pb-4">
      <SectionTitle as="h1" subtitle="Conteúdos demonstrativos sobre prevenção, direitos e bem-estar.">
        Orientações e autocuidado
      </SectionTitle>

      <div className="grid grid-cols-1 gap-3">
        {orientacoes.map((o) => (
          <Link
            key={o.id}
            to={`/orientacoes/${o.id}`}
            className="flex gap-3 rounded-2xl border border-blush/60 bg-white p-4 shadow-card transition-transform active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40"
          >
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${COR_ICONE[o.cor]}`}>
              <Icon name={o.icone} className="h-6 w-6" strokeWidth={1.8} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-bold text-navy">{o.titulo}</span>
              <span className="mt-0.5 block text-sm text-muted">{o.resumo}</span>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-wine">
                Ler orientação <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
