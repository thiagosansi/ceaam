import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import type { CheckIn, Humor } from '../../store/saude'
import Button from '../ui/Button'
import Card from '../ui/Card'
import { HUMORES } from './humores'

interface Props {
  hoje: string
  existente?: CheckIn
  onSalvar: (c: Omit<CheckIn, 'atualizadoEm'>) => void
}

export default function CheckInForm({ hoje, existente, onSalvar }: Props) {
  const [humor, setHumor] = useState<Humor | null>(existente?.humor ?? null)
  const [dormiu, setDormiu] = useState<boolean | undefined>(existente?.dormiuBem)
  const [nota, setNota] = useState(existente?.nota ?? '')
  const [salvo, setSalvo] = useState(false)

  useEffect(() => {
    setHumor(existente?.humor ?? null)
    setDormiu(existente?.dormiuBem)
    setNota(existente?.nota ?? '')
  }, [existente])

  const submit = () => {
    if (!humor) return
    onSalvar({ data: hoje, humor, dormiuBem: dormiu, nota: nota.trim() || undefined })
    setSalvo(true)
    window.setTimeout(() => setSalvo(false), 2500)
  }

  return (
    <Card>
      <h2 className="text-base font-bold text-navy">Como você está hoje?</h2>
      {existente ? <p className="mt-0.5 text-xs text-muted">Você já registrou hoje. Salvar de novo substitui o registro.</p> : null}

      <fieldset className="mt-3">
        <legend className="sr-only">Humor</legend>
        <div className="grid grid-cols-5 gap-1">
          {HUMORES.map((h) => {
            const ativo = humor === h.valor
            return (
              <label
                key={h.valor}
                className={`flex cursor-pointer flex-col items-center gap-1 rounded-2xl border px-1 py-2 text-center transition-colors focus-within:ring-2 focus-within:ring-wine/40 ${
                  ativo ? 'border-wine bg-wine/10' : 'border-blush/60 bg-white hover:bg-blush/30'
                }`}
              >
                <input type="radio" name="humor" value={h.valor} checked={ativo} onChange={() => setHumor(h.valor)} className="sr-only" />
                <span className="text-2xl" aria-hidden>
                  {h.emoji}
                </span>
                <span className={`text-[10px] font-semibold leading-tight ${ativo ? 'text-wine' : 'text-navy'}`}>{h.rotulo}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <fieldset className="mt-4">
        <legend className="mb-1 text-sm font-semibold text-navy">
          Dormiu bem? <span className="font-normal text-muted">(opcional)</span>
        </legend>
        <div className="flex gap-2">
          {[
            [true, 'Sim'],
            [false, 'Não'],
          ].map(([v, label]) => {
            const ativo = dormiu === v
            return (
              <label
                key={String(v)}
                className={`flex-1 cursor-pointer rounded-full border py-2 text-center text-sm font-semibold transition-colors focus-within:ring-2 focus-within:ring-wine/40 ${
                  ativo ? 'border-wine bg-wine text-white' : 'border-blush/60 bg-white text-navy hover:bg-wine/10'
                }`}
              >
                <input type="radio" name="dormiu" checked={ativo} onChange={() => setDormiu(v as boolean)} className="sr-only" />
                {label}
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-4">
        <label htmlFor="nota" className="mb-1 block text-sm font-semibold text-navy">
          Nota <span className="font-normal text-muted">(opcional)</span>
        </label>
        <textarea
          id="nota"
          rows={2}
          maxLength={200}
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          placeholder="Algo que queira lembrar sobre hoje"
          className="w-full resize-none rounded-2xl border border-blush/60 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/30"
        />
      </div>

      <Button fullWidth className="mt-3" disabled={!humor} onClick={submit}>
        <Check className="h-4 w-4" aria-hidden />
        {salvo ? 'Salvo!' : existente ? 'Atualizar registro' : 'Salvar'}
      </Button>
      <p className="sr-only" role="status">
        {salvo ? 'Check-in salvo' : ''}
      </p>
    </Card>
  )
}
