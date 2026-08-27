import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Phone, ShieldAlert, Users, Settings2, Info } from 'lucide-react'
import { emergencia } from '../../data/contatos'
import { useContatosConfianca } from '../../store/seguranca'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import SectionTitle from '../../components/ui/SectionTitle'
import ContatosConfianca from './ContatosConfianca'
import SegurancaConfig from './SegurancaConfig'

const COUNTDOWN = 5
type Fase = 'idle' | 'contando' | 'enviado'

const c190 = emergencia.find((c) => c.numero === '190')
const c180 = emergencia.find((c) => c.numero === '180')

export default function Ajuda() {
  const [fase, setFase] = useState<Fase>('idle')
  const [restante, setRestante] = useState(COUNTDOWN)
  const timerRef = useRef<number | null>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const contatos = useContatosConfianca()

  const limpar = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const iniciar = () => {
    setRestante(COUNTDOWN)
    setFase('contando')
  }
  const cancelar = () => {
    limpar()
    setFase('idle')
    setRestante(COUNTDOWN)
  }

  useEffect(() => {
    if (fase !== 'contando') return
    cancelRef.current?.focus()
    timerRef.current = window.setInterval(() => {
      setRestante((r) => {
        if (r <= 1) {
          limpar()
          setFase('enviado')
          return 0
        }
        return r - 1
      })
    }, 1000)
    return limpar
  }, [fase])

  const R = 54
  const circ = 2 * Math.PI * R
  const progresso = restante / COUNTDOWN

  return (
    <div className="-mx-4 -mt-4 flex min-h-full flex-col">
      {/* Cabeçalho wine */}
      <section className="bg-gradient-to-b from-wineDark via-wine to-wine px-5 pb-8 pt-6 text-white">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
          <ShieldAlert className="h-4 w-4" aria-hidden />
          Ajuda imediata
        </div>
        <h1 className="text-2xl font-bold leading-tight text-white">Precisa de ajuda agora?</h1>
        <p className="mt-2 text-sm text-white/90">
          Em caso de perigo imediato, ligue para o <strong>190</strong>.
        </p>

        <div className="mt-5 flex flex-col items-center gap-4" aria-live="assertive" aria-atomic="true">
          {fase === 'idle' ? (
            <button
              type="button"
              onClick={iniciar}
              className="flex h-40 w-40 flex-col items-center justify-center gap-1 rounded-full bg-white text-wine shadow-phone ring-8 ring-white/20 transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-white/60 active:scale-95"
            >
              <ShieldAlert className="h-10 w-10" aria-hidden />
              <span className="px-4 text-center text-sm font-bold leading-tight">Acionar rede de apoio</span>
            </button>
          ) : null}

          {fase === 'contando' ? (
            <>
              <div className="relative h-40 w-40">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden>
                  <circle cx="60" cy="60" r={R} fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="6" />
                  <circle
                    cx="60"
                    cy="60"
                    r={R}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={circ * (1 - progresso)}
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold tabular-nums">{restante}</span>
                  <span className="text-xs text-white/80">segundos</span>
                </div>
              </div>
              <p className="text-sm text-white/90">Enviando alerta aos seus contatos de confiança…</p>
              <button
                ref={cancelRef}
                type="button"
                onClick={cancelar}
                className="w-full max-w-xs rounded-full bg-white px-5 py-3.5 text-base font-bold text-wine shadow-soft focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
              >
                Cancelar
              </button>
            </>
          ) : null}

          {fase === 'enviado' ? (
            <div className="w-full rounded-2xl bg-white/15 p-4">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="h-5 w-5" aria-hidden />
                Alerta simulado enviado
              </div>
              {contatos.length > 0 ? (
                <ul className="mt-2 space-y-1 text-sm text-white/90">
                  {contatos.map((c) => (
                    <li key={c.id} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-white/70" aria-hidden />
                      {c.nome} · {c.telefone}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-white/90">
                  Nenhum contato de confiança cadastrado. Adicione abaixo para que sejam avisados.
                </p>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 text-white hover:bg-white/10"
                onClick={cancelar}
              >
                Voltar
              </Button>
            </div>
          ) : null}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <a
            href="tel:190"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-wine shadow-soft focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Ligar 190
          </a>
          <a
            href="tel:180"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-4 py-3 text-sm font-bold text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Ligar 180
          </a>
        </div>
        <p className="mt-2 text-center text-[11px] text-white/80">
          {c190?.nome} · {c180?.nome}
        </p>
      </section>

      <div className="space-y-6 px-4 pb-6 pt-4">
        <div className="flex items-start gap-2 rounded-xl border border-lilac/40 bg-lilac/15 p-3 text-xs text-navy" role="note">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-lilac" aria-hidden />
          <p>
            <strong>Protótipo:</strong> nenhuma ligação ou mensagem é enviada automaticamente. Ligações só acontecem
            ao tocar em "Ligar".
          </p>
        </div>

        <section>
          <SectionTitle subtitle="Pessoas que seriam avisadas ao acionar a rede de apoio.">
            <span className="inline-flex items-center gap-2">
              <Users className="h-5 w-5 text-wine" aria-hidden />
              Contatos de confiança
            </span>
          </SectionTitle>
          <ContatosConfianca />
        </section>

        <section>
          <SectionTitle subtitle="Recursos para usar o app com discrição.">
            <span className="inline-flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-wine" aria-hidden />
              Configurações de segurança
            </span>
          </SectionTitle>
          <SegurancaConfig />
        </section>

        <Card tone="blush" className="text-sm text-ink">
          <p className="font-semibold text-navy">Outros números úteis</p>
          <ul className="mt-2 space-y-1">
            {emergencia.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-2">
                <span>{c.nome}</span>
                <a href={`tel:${c.numero}`} className="font-bold text-wine underline-offset-2 hover:underline">
                  {c.numero}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
