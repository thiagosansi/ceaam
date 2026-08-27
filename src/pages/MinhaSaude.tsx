import { Link } from 'react-router-dom'
import { ChevronRight, Leaf, Moon, Trash2 } from 'lucide-react'
import { hojeISO, useCheckIns } from '../store/saude'
import Card from '../components/ui/Card'
import SectionTitle from '../components/ui/SectionTitle'
import CheckInForm from '../components/saude/CheckInForm'
import GraficoSemana from '../components/saude/GraficoSemana'
import { humorInfo } from '../components/saude/humores'

const fmtData = new Intl.DateTimeFormat('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })

export default function MinhaSaude() {
  const { checkins, salvar, apagar } = useCheckIns()
  const hoje = hojeISO()
  const deHoje = checkins.find((c) => c.data === hoje)

  return (
    <div className="space-y-5 pb-4">
      <SectionTitle as="h1" subtitle="Acompanhe seu bem-estar físico e emocional.">
        Minha saúde
      </SectionTitle>

      <CheckInForm hoje={hoje} existente={deHoje} onSalvar={salvar} />

      <section aria-labelledby="semana">
        <SectionTitle>
          <span id="semana">Últimos 7 dias</span>
        </SectionTitle>
        <Card>
          <GraficoSemana checkins={checkins} />
        </Card>
      </section>

      <section aria-labelledby="historico">
        <SectionTitle>
          <span id="historico">Histórico</span>
        </SectionTitle>
        {checkins.length === 0 ? (
          <p className="text-sm text-muted">Nenhum registro ainda.</p>
        ) : (
          <ul className="space-y-2">
            {checkins.map((c) => {
              const info = humorInfo(c.humor)
              const label = fmtData.format(new Date(c.data + 'T12:00:00')).replace(/\./g, '')
              return (
                <li key={c.data}>
                  <Card className="flex items-start gap-3 !p-3">
                    <span className="text-2xl" aria-hidden>
                      {info.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-navy">
                        {info.rotulo}
                        <span className="ml-2 font-normal text-muted">{c.data === hoje ? 'Hoje' : label}</span>
                      </p>
                      {c.dormiuBem !== undefined ? (
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                          <Moon className="h-3 w-3" aria-hidden />
                          {c.dormiuBem ? 'Dormiu bem' : 'Não dormiu bem'}
                        </p>
                      ) : null}
                      {c.nota ? <p className="mt-1 text-sm text-ink/80">{c.nota}</p> : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => apagar(c.data)}
                      aria-label={`Apagar registro de ${label}`}
                      className="rounded-full p-2 text-muted transition-colors hover:bg-wine/10 hover:text-wine focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  </Card>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <Link to="/orientacoes/bem-estar" className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40 rounded-2xl">
        <Card tone="sage" className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage text-white">
            <Leaf className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-navy">Dica de bem-estar</p>
            <p className="text-sm text-ink/80">Respirar fundo por um minuto já ajuda. Veja práticas e conteúdos para cuidar de você.</p>
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-navy" aria-hidden />
        </Card>
      </Link>

      <p className="text-center text-xs text-muted">Seus registros ficam apenas neste aparelho (protótipo).</p>
    </div>
  )
}
