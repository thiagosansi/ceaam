import type { EtapaFluxo } from '../../types'
import ServicoIcon from '../servicos/ServicoIcon'

interface StepperProps {
  etapas: EtapaFluxo[]
}

/** Stepper vertical: círculo numerado alternando wine/navy, linha conectando, título + descrição. */
export default function Stepper({ etapas }: StepperProps) {
  return (
    <ol className="relative">
      {etapas.map((etapa, i) => {
        const isWine = i % 2 === 0
        const last = i === etapas.length - 1
        return (
          <li key={etapa.numero} className="relative flex gap-4 pb-6 last:pb-0">
            {!last ? (
              <span aria-hidden className="absolute bottom-0 left-5 top-10 w-0.5 bg-blush" />
            ) : null}
            <span
              className={`relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                isWine ? 'bg-wine' : 'bg-navy'
              }`}
            >
              {String(etapa.numero).padStart(2, '0')}
            </span>
            <div className="flex-1 rounded-2xl border border-blush/60 bg-white p-3.5 shadow-card">
              <div className="flex items-center gap-2">
                <ServicoIcon
                  name={etapa.icone}
                  className={`h-4 w-4 ${isWine ? 'text-wine' : 'text-navy'}`}
                  strokeWidth={2}
                />
                <h3 className={`text-sm font-bold ${isWine ? 'text-wine' : 'text-navy'}`}>{etapa.titulo}</h3>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink">{etapa.descricao}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
