import { useEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import Button from '../ui/Button'
import type { Pratica } from '../../types'

interface Fase {
  nome: string
  seg: number
  escala: number
}

const PADRAO: Fase[] = [
  { nome: 'Inspire', seg: 4, escala: 1 },
  { nome: 'Segure', seg: 4, escala: 1 },
  { nome: 'Expire', seg: 6, escala: 0.6 },
]

/** Extrai fases dos passos ("Inspire ... até 4", "Segure ... 4", "Solte ... 6"). Fallback: 4-4-6. */
function fasesDe(passos?: string[]): Fase[] {
  if (!passos) return PADRAO
  const achar = (re: RegExp) => {
    const p = passos.find((s) => re.test(s))
    const n = p?.match(/(\d+)/)?.[1]
    return n ? Number(n) : undefined
  }
  const insp = achar(/inspire/i)
  const seg = achar(/segure/i)
  const exp = achar(/solte|expire/i)
  if (!insp || !seg || !exp) return PADRAO
  return [
    { nome: 'Inspire', seg: insp, escala: 1 },
    { nome: 'Segure', seg, escala: 1 },
    { nome: 'Expire', seg: exp, escala: 0.6 },
  ]
}

export default function Respiracao({ pratica }: { pratica: Pratica }) {
  const fases = useMemo(() => fasesDe(pratica.passos), [pratica.passos])
  const [ativo, setAtivo] = useState(false)
  const [fase, setFase] = useState(0)
  const [ciclos, setCiclos] = useState(0)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (!ativo) return
    timer.current = window.setTimeout(() => {
      setFase((f) => {
        const next = (f + 1) % fases.length
        if (next === 0) setCiclos((c) => c + 1)
        return next
      })
    }, fases[fase].seg * 1000)
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [ativo, fase, fases])

  const alternar = () => {
    if (ativo) {
      setAtivo(false)
      setFase(0)
    } else {
      setCiclos(0)
      setFase(0)
      setAtivo(true)
    }
  }

  const atual = fases[fase]
  const escala = ativo ? atual.escala : 0.6
  const duracao = ativo ? atual.seg : 0.6
  const alvo = Math.round((pratica.duracaoSeg ?? 60) / fases.reduce((a, f) => a + f.seg, 0))

  return (
    <div className="rounded-2xl border border-lilac/40 bg-lilac/15 p-4 shadow-card">
      <h3 className="text-base font-bold text-navy">{pratica.titulo}</h3>
      <p className="mt-1 text-sm text-muted">{pratica.descricao}</p>

      <div className="my-5 flex flex-col items-center">
        <div className="relative flex h-44 w-44 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full bg-lilac/30"
            style={{
              transform: `scale(${escala * 1.15})`,
              transition: `transform ${duracao}s ease-in-out`,
            }}
            aria-hidden
          />
          <div
            className="absolute inset-4 rounded-full bg-gradient-to-br from-lilac to-wine/70 shadow-soft"
            style={{
              transform: `scale(${escala})`,
              transition: `transform ${duracao}s ease-in-out`,
            }}
            aria-hidden
          />
          <p className="relative text-center text-white" aria-live="assertive" aria-atomic>
            <span className="block text-xl font-bold drop-shadow">{ativo ? atual.nome : 'Pronta?'}</span>
            <span className="block text-xs opacity-90">{ativo ? `${atual.seg}s` : 'toque em Iniciar'}</span>
          </p>
        </div>
        <p className="mt-3 text-sm text-navy" aria-live="polite">
          Ciclos: <strong>{ciclos}</strong>
          {alvo ? <span className="text-muted"> · sugestão: {alvo}</span> : null}
        </p>
      </div>

      <Button fullWidth onClick={alternar} aria-pressed={ativo}>
        {ativo ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
        {ativo ? 'Parar' : 'Iniciar'}
      </Button>

      {pratica.passos ? (
        <ol className="mt-4 space-y-1 text-xs text-muted">
          {pratica.passos.map((p, i) => (
            <li key={i}>
              {i + 1}. {p}
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  )
}
