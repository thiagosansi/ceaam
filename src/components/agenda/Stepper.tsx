import { Check } from 'lucide-react'

const PASSOS = ['Serviço', 'Data', 'Horário', 'Confirmação']

export default function Stepper({ atual }: { atual: number }) {
  return (
    <ol className="flex items-center gap-1" aria-label={`Passo ${atual} de ${PASSOS.length}`}>
      {PASSOS.map((label, i) => {
        const n = i + 1
        const feito = n < atual
        const ativo = n === atual
        return (
          <li key={label} className="flex flex-1 flex-col items-center gap-1" aria-current={ativo ? 'step' : undefined}>
            <div className="flex w-full items-center">
              <div className={`h-0.5 flex-1 ${i === 0 ? 'opacity-0' : feito || ativo ? 'bg-wine' : 'bg-blush'}`} />
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  feito ? 'bg-wine text-white' : ativo ? 'bg-wine text-white ring-4 ring-wine/20' : 'bg-blush text-muted'
                }`}
              >
                {feito ? <Check className="h-4 w-4" aria-hidden /> : n}
              </span>
              <div className={`h-0.5 flex-1 ${i === PASSOS.length - 1 ? 'opacity-0' : feito ? 'bg-wine' : 'bg-blush'}`} />
            </div>
            <span className={`text-[10px] font-medium ${ativo ? 'text-wine' : 'text-muted'}`}>{label}</span>
          </li>
        )
      })}
    </ol>
  )
}
