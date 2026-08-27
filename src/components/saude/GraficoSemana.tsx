import type { CheckIn } from '../../store/saude'
import { hojeISO } from '../../store/saude'
import { humorInfo } from './humores'

const fmtDia = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' })

function ultimos7(): string[] {
  const dias: string[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    dias.push(hojeISO(d))
  }
  return dias
}

export default function GraficoSemana({ checkins }: { checkins: CheckIn[] }) {
  const dias = ultimos7()
  const porDia = new Map(checkins.map((c) => [c.data, c]))
  const temAlgum = dias.some((d) => porDia.has(d))

  const W = 320
  const H = 120
  const padB = 22
  const padT = 8
  const colW = W / 7
  const barW = 22
  const alturaMax = H - padB - padT

  if (!temAlgum) {
    return (
      <div className="rounded-2xl bg-blush/40 p-4 text-center">
        <p className="text-sm font-semibold text-navy">Sem registros nos últimos 7 dias</p>
        <p className="mt-1 text-xs text-muted">Faça seu primeiro check-in acima para ver o gráfico.</p>
      </div>
    )
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Humor dos últimos 7 dias: ${dias
        .map((d) => {
          const c = porDia.get(d)
          return `${fmtDia.format(new Date(d + 'T12:00:00'))} ${c ? humorInfo(c.humor).rotulo : 'sem registro'}`
        })
        .join(', ')}`}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const y = padT + alturaMax - (alturaMax * n) / 5
        return <line key={n} x1={0} x2={W} y1={y} y2={y} stroke="#f0d5d3" strokeWidth={1} strokeDasharray="2 3" />
      })}
      {dias.map((d, i) => {
        const c = porDia.get(d)
        const cx = colW * i + colW / 2
        const ehHoje = d === hojeISO()
        const label = fmtDia.format(new Date(d + 'T12:00:00')).replace('.', '')
        if (!c) {
          return (
            <g key={d}>
              <rect x={cx - barW / 2} y={padT + alturaMax - 4} width={barW} height={4} rx={2} fill="#f0d5d3" />
              <text x={cx} y={H - 6} textAnchor="middle" fontSize={10} fill="#6b6b6b" fontWeight={ehHoje ? 700 : 400}>
                {label}
              </text>
            </g>
          )
        }
        const h = (alturaMax * c.humor) / 5
        const info = humorInfo(c.humor)
        return (
          <g key={d}>
            <rect x={cx - barW / 2} y={padT + alturaMax - h} width={barW} height={h} rx={6} fill={info.cor} />
            <text x={cx} y={padT + alturaMax - h - 4} textAnchor="middle" fontSize={12}>
              {info.emoji}
            </text>
            <text x={cx} y={H - 6} textAnchor="middle" fontSize={10} fill="#1e3a5f" fontWeight={ehHoje ? 700 : 500}>
              {label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
