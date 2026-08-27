import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Check, MessageCircle } from 'lucide-react'
import { fluxo, getServico, institucional } from '../data'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Tabs from '../components/servicos/Tabs'
import ServicoIcon, { COR } from '../components/servicos/ServicoIcon'

const OBJ_BOX: Record<string, string> = {
  wine: 'bg-blush/50 border-wine/40 text-wineDark',
  navy: 'bg-navy/10 border-navy/40 text-navy',
  lilac: 'bg-lilac/20 border-lilac/60 text-navy',
  sage: 'bg-sage/20 border-sage/60 text-navy',
}

export default function ServicoDetalhe() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const servico = getServico(id)

  if (!servico) return <Navigate to="/servicos" replace />

  const cor = COR[servico.cor]
  const especializado = servico.tipo === 'especializado'

  return (
    <div className="space-y-6 pb-6">
      <Link
        to="/servicos"
        className="inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-wine focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Voltar aos serviços
      </Link>

      <header className="flex flex-col items-start gap-3">
        <span className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${cor.solid}`}>
          <ServicoIcon name={servico.icone} className="h-8 w-8" strokeWidth={1.6} />
        </span>
        {especializado ? (
          <p className={`text-xs font-bold uppercase tracking-widest ${cor.text}`}>
            {String(servico.ordem).padStart(2, '0')} <span className="mx-1 text-muted">|</span> Atendimento
            especializado
          </p>
        ) : (
          <p className="text-xs font-bold uppercase tracking-widest text-wine">Área de atuação</p>
        )}
        <h1 className="text-2xl font-bold leading-tight text-navy">{servico.nome}</h1>
        {especializado && servico.titulo ? (
          <div>
            <p className="text-lg font-bold leading-snug text-navy">{servico.titulo}</p>
            {servico.subtitulo ? <p className="mt-1 text-sm leading-relaxed text-muted">{servico.subtitulo}</p> : null}
          </div>
        ) : null}
        <span aria-hidden className={`block h-1 w-14 rounded-full ${cor.solid}`} />
      </header>

      {especializado ? (
        <Tabs
          resetKey={servico.id}
          accentClass={cor.solid.split(' ')[0]}
          tabs={[
            {
              id: 'particularidades',
              label: 'Particularidades',
              content: (
                <Card>
                  <h2 className="text-sm font-bold uppercase tracking-wide text-navy">Particularidades</h2>
                  <ul className="mt-3 space-y-3">
                    {servico.particularidades?.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink">
                        <span aria-hidden className={`mt-2 h-2 w-2 shrink-0 rounded-full ${cor.solid}`} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ),
            },
            {
              id: 'como',
              label: 'Como será feito',
              content: (
                <Card>
                  <h2 className="text-sm font-bold uppercase tracking-wide text-navy">Como será feito</h2>
                  <ol className="mt-3 space-y-3">
                    {servico.comoSeraFeito?.map((p, i) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink">
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${cor.solid}`}
                        >
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{p}</span>
                      </li>
                    ))}
                  </ol>
                </Card>
              ),
            },
            {
              id: 'objetivo',
              label: 'Objetivo',
              content: (
                <div className={`rounded-2xl border p-5 text-center ${OBJ_BOX[servico.cor]}`}>
                  <p className="text-base font-bold leading-relaxed">{servico.objetivo}</p>
                </div>
              ),
            },
          ]}
        />
      ) : (
        <>
          <p className="text-base leading-relaxed text-ink">{servico.descricao}</p>
          <Card>
            <h2 className="text-sm font-bold uppercase tracking-wide text-navy">Como funciona</h2>
            <ol className="mt-3 space-y-3">
              {fluxo.slice(0, 4).map((etapa) => (
                <li key={etapa.numero} className="flex gap-3 text-sm leading-relaxed text-ink">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${cor.solid}`}
                  >
                    {etapa.numero}
                  </span>
                  <span className="pt-0.5">
                    <span className="font-semibold text-navy">{etapa.titulo}.</span> {etapa.descricao}
                  </span>
                </li>
              ))}
            </ol>
          </Card>
          <div className="flex items-start gap-3 rounded-2xl border border-sage/40 bg-sage/15 p-4">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden />
            <p className="text-sm leading-relaxed text-ink">
              Atendimento <strong className="font-bold">gratuito, sigiloso</strong> e realizado por profissionais
              mulheres, de forma integrada às demais áreas do {institucional.sigla}.
            </p>
          </div>
        </>
      )}

      <div className="space-y-2.5 pt-2">
        <Button fullWidth size="lg" onClick={() => navigate(`/agendar?servico=${servico.id}`)}>
          <CalendarDays className="h-5 w-5" aria-hidden />
          Agendar este atendimento
        </Button>
        <Button fullWidth size="lg" variant="outline" onClick={() => navigate('/rede-apoio')}>
          <MessageCircle className="h-5 w-5" aria-hidden />
          Falar com a rede de apoio
        </Button>
      </div>

      <p className="text-center text-xs text-muted">
        {institucional.slogan} • {institucional.cidade}
      </p>
    </div>
  )
}
