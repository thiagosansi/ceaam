import { formatarMes, hojeISO, toISO } from './datas'

interface Props {
  value: string | null
  onChange: (iso: string) => void
}

const DIAS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

function Mes({ ano, mes, value, onChange }: Props & { ano: number; mes: number }) {
  const hoje = hojeISO()
  const primeiro = new Date(ano, mes, 1)
  const totalDias = new Date(ano, mes + 1, 0).getDate()
  const offset = primeiro.getDay()
  const celulas: (Date | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: totalDias }, (_, i) => new Date(ano, mes, i + 1)),
  ]

  return (
    <div>
      <h3 className="mb-2 text-sm font-bold text-navy">{formatarMes(ano, mes)}</h3>
      <div className="grid grid-cols-7 gap-1 text-center" role="grid" aria-label={formatarMes(ano, mes)}>
        {DIAS.map((d, i) => (
          <div key={i} className="text-[11px] font-semibold text-muted" aria-hidden>
            {d}
          </div>
        ))}
        {celulas.map((d, i) => {
          if (!d) return <div key={`v${i}`} aria-hidden />
          const iso = toISO(d)
          const passado = iso < hoje
          const domingo = d.getDay() === 0
          const disabled = passado || domingo
          const selecionado = value === iso
          const ehHoje = iso === hoje
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              aria-pressed={selecionado}
              aria-label={`${d.getDate()} de ${formatarMes(ano, mes)}${ehHoje ? ' (hoje)' : ''}${disabled ? ' indisponível' : ''}`}
              onClick={() => onChange(iso)}
              className={`relative aspect-square rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40 ${
                selecionado
                  ? 'bg-wine text-white shadow-soft'
                  : disabled
                    ? 'cursor-not-allowed text-muted/40 line-through'
                    : 'text-ink hover:bg-wine/10'
              } ${ehHoje && !selecionado ? 'ring-1 ring-wine' : ''}`}
            >
              {d.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function Calendario({ value, onChange }: Props) {
  const agora = new Date()
  const atual = { ano: agora.getFullYear(), mes: agora.getMonth() }
  const prox = new Date(atual.ano, atual.mes + 1, 1)
  return (
    <div className="space-y-5">
      <Mes ano={atual.ano} mes={atual.mes} value={value} onChange={onChange} />
      <Mes ano={prox.getFullYear()} mes={prox.getMonth()} value={value} onChange={onChange} />
      <p className="text-xs text-muted">Domingos e datas passadas não estão disponíveis. Hoje aparece contornado.</p>
    </div>
  )
}
