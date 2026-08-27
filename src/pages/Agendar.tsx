import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, BellRing, CalendarCheck, Check, ChevronRight } from 'lucide-react'
import { servicos } from '../data'
import type { Agendamento } from '../store/agendamentos'
import { useAgendamentos } from '../store/agendamentos'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import SectionTitle from '../components/ui/SectionTitle'
import Stepper from '../components/agenda/Stepper'
import Calendario from '../components/agenda/Calendario'
import MeusAgendamentos from '../components/agenda/MeusAgendamentos'
import AgendaIcon from '../components/agenda/icons'
import { HORARIOS, formatarLonga } from '../components/agenda/datas'

const lista = [...servicos].sort((a, b) => a.ordem - b.ordem)

function lerNome(): string {
  try {
    return localStorage.getItem('ceaam.nome') ?? ''
  } catch {
    return ''
  }
}

function salvarNome(n: string) {
  try {
    if (n.trim()) localStorage.setItem('ceaam.nome', n.trim())
  } catch {
    /* ignore */
  }
}

export default function Agendar() {
  const [params] = useSearchParams()
  const { agendamentos, add } = useAgendamentos()

  const inicial = params.get('servico')
  const preSelecionado = inicial && servicos.some((s) => s.id === inicial) ? inicial : null

  const [aba, setAba] = useState<'novo' | 'meus'>('novo')
  const [passo, setPasso] = useState(preSelecionado ? 2 : 1)
  const [servicoId, setServicoId] = useState<string | null>(preSelecionado)
  const [data, setData] = useState<string | null>(null)
  const [hora, setHora] = useState<string | null>(null)
  const [nome, setNome] = useState(lerNome)
  const [sucesso, setSucesso] = useState<Agendamento | null>(null)

  useEffect(() => {
    if (preSelecionado) {
      setServicoId(preSelecionado)
      setPasso(2)
    }
  }, [preSelecionado])

  const servico = servicos.find((s) => s.id === servicoId) ?? null
  const ocupados = useMemo(
    () => new Set(agendamentos.filter((a) => a.data === data).map((a) => a.hora)),
    [agendamentos, data],
  )

  const reiniciar = () => {
    setSucesso(null)
    setPasso(1)
    setServicoId(null)
    setData(null)
    setHora(null)
  }

  const confirmar = () => {
    if (!servicoId || !data || !hora) return
    salvarNome(nome)
    setSucesso(add(servicoId, data, hora))
  }

  return (
    <div className="space-y-4 pb-4">
      <SectionTitle as="h1" subtitle="Escolha data e horário com facilidade.">
        Agendar atendimento
      </SectionTitle>

      <p className="rounded-2xl border border-lilac/40 bg-lilac/15 px-3 py-2 text-xs font-medium text-navy" role="note">
        Demonstração — nenhum atendimento real é marcado.
      </p>

      <div className="grid grid-cols-2 rounded-full bg-blush/50 p-1" role="tablist" aria-label="Agendamento">
        {(
          [
            ['novo', 'Novo agendamento'],
            ['meus', `Meus agendamentos${agendamentos.length ? ` (${agendamentos.length})` : ''}`],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={aba === k}
            onClick={() => setAba(k)}
            className={`rounded-full px-3 py-2 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40 ${
              aba === k ? 'bg-white text-wine shadow-card' : 'text-muted hover:text-navy'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {aba === 'meus' ? (
        <section role="tabpanel" aria-label="Meus agendamentos">
          <MeusAgendamentos />
        </section>
      ) : sucesso ? (
        <Card tone="sage" className="text-center" role="status">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage text-white">
            <Check className="h-8 w-8" strokeWidth={3} aria-hidden />
          </span>
          <h2 className="mt-3 text-lg font-bold text-navy">Agendamento confirmado!</h2>
          <p className="mt-2 text-sm text-ink">
            <strong>{servico?.nome}</strong>
            <br />
            {formatarLonga(sucesso.data)} às {sucesso.hora}
          </p>
          <p className="mt-3 flex items-center justify-center gap-1 text-xs text-muted">
            <BellRing className="h-3.5 w-3.5" aria-hidden />
            Você receberá lembrete — simulado
          </p>
          <div className="mt-4 grid gap-2">
            <Button
              fullWidth
              onClick={() => {
                setAba('meus')
                reiniciar()
              }}
            >
              <CalendarCheck className="h-4 w-4" aria-hidden />
              Ver meus agendamentos
            </Button>
            <Button fullWidth variant="ghost" onClick={reiniciar}>
              Fazer outro agendamento
            </Button>
          </div>
        </Card>
      ) : (
        <section role="tabpanel" aria-label="Novo agendamento" className="space-y-4">
          <Stepper atual={passo} />

          {passo > 1 ? (
            <button
              type="button"
              onClick={() => setPasso((p) => p - 1)}
              className="inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-wine focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Voltar
            </button>
          ) : null}

          {passo === 1 ? (
            <fieldset>
              <legend className="mb-2 text-base font-bold text-navy">Qual serviço você procura?</legend>
              <div className="grid grid-cols-2 gap-2">
                {lista.map((s) => {
                  const ativo = servicoId === s.id
                  return (
                    <label
                      key={s.id}
                      className={`flex cursor-pointer items-center gap-2 rounded-2xl border p-3 text-left text-sm font-semibold transition-colors focus-within:ring-2 focus-within:ring-wine/40 ${
                        ativo ? 'border-wine bg-wine/10 text-wine' : 'border-blush/60 bg-white text-navy hover:bg-blush/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="servico"
                        value={s.id}
                        checked={ativo}
                        onChange={() => setServicoId(s.id)}
                        className="sr-only"
                      />
                      <AgendaIcon name={s.icone} className="h-5 w-5 shrink-0" />
                      <span className="leading-tight">{s.nome}</span>
                    </label>
                  )
                })}
              </div>
              <Button fullWidth className="mt-4" disabled={!servicoId} onClick={() => setPasso(2)}>
                Continuar
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Button>
            </fieldset>
          ) : null}

          {passo === 2 ? (
            <div>
              <h2 className="mb-2 text-base font-bold text-navy">Escolha a data</h2>
              {servico ? (
                <p className="mb-3 text-sm text-muted">
                  Serviço: <strong className="text-navy">{servico.nome}</strong>
                </p>
              ) : null}
              <Card>
                <Calendario
                  value={data}
                  onChange={(iso) => {
                    setData(iso)
                    setHora(null)
                  }}
                />
              </Card>
              <Button fullWidth className="mt-4" disabled={!data} onClick={() => setPasso(3)}>
                Continuar
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          ) : null}

          {passo === 3 && data ? (
            <fieldset>
              <legend className="mb-1 text-base font-bold text-navy">Escolha o horário</legend>
              <p className="mb-3 text-sm text-muted">{formatarLonga(data)}</p>
              <div className="grid grid-cols-3 gap-2">
                {HORARIOS.map((h) => {
                  const ocupado = ocupados.has(h)
                  const ativo = hora === h
                  return (
                    <label
                      key={h}
                      className={`flex items-center justify-center rounded-full border py-2.5 text-sm font-semibold transition-colors focus-within:ring-2 focus-within:ring-wine/40 ${
                        ocupado
                          ? 'cursor-not-allowed border-blush/60 bg-blush/30 text-muted/50 line-through'
                          : ativo
                            ? 'cursor-pointer border-wine bg-wine text-white shadow-soft'
                            : 'cursor-pointer border-blush/60 bg-white text-navy hover:bg-wine/10'
                      }`}
                    >
                      <input
                        type="radio"
                        name="hora"
                        value={h}
                        disabled={ocupado}
                        checked={ativo}
                        onChange={() => setHora(h)}
                        className="sr-only"
                      />
                      {h}
                    </label>
                  )
                })}
              </div>
              <p className="mt-2 text-xs text-muted">Horários riscados já estão ocupados.</p>
              <Button fullWidth className="mt-4" disabled={!hora} onClick={() => setPasso(4)}>
                Continuar
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Button>
            </fieldset>
          ) : null}

          {passo === 4 && servico && data && hora ? (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-navy">Confirme seu agendamento</h2>
              <Card>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted">Serviço</dt>
                    <dd className="text-right font-semibold text-navy">{servico.nome}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted">Data</dt>
                    <dd className="text-right font-semibold text-navy">{formatarLonga(data)}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted">Horário</dt>
                    <dd className="text-right font-semibold text-navy">{hora}</dd>
                  </div>
                </dl>
              </Card>
              <div>
                <label htmlFor="nome" className="mb-1 block text-sm font-semibold text-navy">
                  Como prefere ser chamada? <span className="font-normal text-muted">(opcional)</span>
                </label>
                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  maxLength={40}
                  autoComplete="given-name"
                  placeholder="Seu nome ou apelido"
                  className="w-full rounded-2xl border border-blush/60 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/30"
                />
              </div>
              <Button fullWidth size="lg" onClick={confirmar}>
                <Check className="h-5 w-5" aria-hidden />
                Confirmar agendamento
              </Button>
            </div>
          ) : null}
        </section>
      )}

      {servico && aba === 'novo' && !sucesso ? (
        <p className="text-center text-xs text-muted">
          <Link to={`/servicos/${servico.id}`} className="underline hover:text-wine">
            Saiba mais sobre {servico.nome}
          </Link>
        </p>
      ) : null}
    </div>
  )
}
