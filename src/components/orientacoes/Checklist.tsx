import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, LifeBuoy, Users } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import type { FaixaSinais, Sinal } from '../../types'

interface Props {
  sinais: Sinal[]
  faixas: FaixaSinais[]
}

const FAIXA_TONE: Record<FaixaSinais['id'], 'sage' | 'lilac' | 'blush'> = {
  baixo: 'sage',
  medio: 'lilac',
  alto: 'blush',
}

export default function Checklist({ sinais, faixas }: Props) {
  const [marcados, setMarcados] = useState<Set<number>>(() => new Set())

  const pontuacao = useMemo(
    () => sinais.reduce((acc, s, i) => (marcados.has(i) ? acc + s.peso : acc), 0),
    [marcados, sinais],
  )
  const maximo = useMemo(() => sinais.reduce((a, s) => a + s.peso, 0), [sinais])

  const faixa = useMemo(() => {
    if (marcados.size === 0) return null
    return [...faixas].sort((a, b) => b.min - a.min).find((f) => f.min <= pontuacao) ?? null
  }, [faixas, marcados.size, pontuacao])

  const toggle = (i: number) =>
    setMarcados((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  const pct = maximo ? Math.round((pontuacao / maximo) * 100) : 0

  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="mb-3 text-lg font-bold text-navy">A pessoa com quem você convive…</legend>
        <ul className="space-y-2">
          {sinais.map((s, i) => {
            const on = marcados.has(i)
            const id = `sinal-${i}`
            return (
              <li key={id}>
                <label
                  htmlFor={id}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition-colors ${
                    on ? 'border-wine bg-blush/40' : 'border-blush/60 bg-white'
                  }`}
                >
                  <input
                    id={id}
                    type="checkbox"
                    className="peer sr-only"
                    checked={on}
                    onChange={() => toggle(i)}
                  />
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-wine/40 ${
                      on ? 'border-wine bg-wine text-white' : 'border-muted/50 bg-white'
                    }`}
                    aria-hidden
                  >
                    {on ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
                  </span>
                  <span className="text-sm leading-snug text-ink">{s.texto}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </fieldset>

      {/* Contador / barra */}
      <div className="rounded-2xl border border-blush/60 bg-white p-4 shadow-card">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-navy">
            {marcados.size} {marcados.size === 1 ? 'sinal marcado' : 'sinais marcados'}
          </span>
          <span className="text-muted" aria-live="polite">
            Pontuação {pontuacao} / {maximo}
          </span>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-blush/60"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={maximo}
          aria-valuenow={pontuacao}
          aria-label="Pontuação do checklist"
        >
          <div className="h-full rounded-full bg-wine transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-muted">Suas respostas não são salvas nem enviadas.</p>
          <Button variant="ghost" size="sm" onClick={() => setMarcados(new Set())} disabled={marcados.size === 0}>
            Limpar
          </Button>
        </div>
      </div>

      {faixa ? (
        <Card tone={FAIXA_TONE[faixa.id]} role="status" aria-live="polite">
          <h2 className="text-lg font-bold text-navy">{faixa.titulo}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink">{faixa.texto}</p>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              to="/ajuda"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-wine px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-wineDark focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40"
            >
              <LifeBuoy className="h-4 w-4" aria-hidden /> Preciso de ajuda agora
            </Link>
            <Link
              to="/rede-apoio"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-wine px-4 py-2.5 text-sm font-semibold text-wine hover:bg-wine/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40"
            >
              <Users className="h-4 w-4" aria-hidden /> Ver rede de apoio
            </Link>
          </div>
        </Card>
      ) : null}
    </div>
  )
}
