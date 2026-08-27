import { Link } from 'react-router-dom'
import type { Servico } from '../../types'
import ServicoIcon, { COR } from './ServicoIcon'

interface ServicoCardProps {
  servico: Servico
}

/** Card de área de atuação (grid 2 colunas). */
export default function ServicoCard({ servico }: ServicoCardProps) {
  const cor = COR[servico.cor]
  return (
    <Link
      to={`/servicos/${servico.id}`}
      className="flex flex-col gap-2.5 rounded-2xl border border-blush/60 bg-white p-3.5 shadow-card transition-colors hover:border-wine/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40"
    >
      <span className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${cor.solid}`}>
        <ServicoIcon name={servico.icone} className="h-5 w-5" strokeWidth={1.8} />
      </span>
      <span className="text-sm font-bold leading-snug text-navy">{servico.nome}</span>
      <span className="text-xs leading-relaxed text-muted">{servico.resumo}</span>
    </Link>
  )
}
