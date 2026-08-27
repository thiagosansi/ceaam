import { useCallback, useEffect, useState } from 'react'
import { PIN_DEMO } from '../../store/seguranca'

interface CalculatorProps {
  onUnlock: () => void
}

type Op = '+' | '-' | '×' | '÷'

function compute(a: number, b: number, op: Op): number {
  switch (op) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '×':
      return a * b
    case '÷':
      return b === 0 ? NaN : a / b
  }
}

function fmt(n: number): string {
  if (Number.isNaN(n)) return 'Erro'
  const s = Number(n.toPrecision(12)).toString()
  return s.length > 14 ? n.toExponential(6) : s
}

const KEYS: Array<{ label: string; kind: 'digit' | 'op' | 'eq' | 'clear' | 'back' | 'dot'; span?: boolean }> = [
  { label: 'C', kind: 'clear' },
  { label: '⌫', kind: 'back' },
  { label: '÷', kind: 'op' },
  { label: '×', kind: 'op' },
  { label: '7', kind: 'digit' },
  { label: '8', kind: 'digit' },
  { label: '9', kind: 'digit' },
  { label: '-', kind: 'op' },
  { label: '4', kind: 'digit' },
  { label: '5', kind: 'digit' },
  { label: '6', kind: 'digit' },
  { label: '+', kind: 'op' },
  { label: '1', kind: 'digit' },
  { label: '2', kind: 'digit' },
  { label: '3', kind: 'digit' },
  { label: '=', kind: 'eq' },
  { label: '0', kind: 'digit', span: true },
  { label: ',', kind: 'dot' },
]

export default function Calculator({ onUnlock }: CalculatorProps) {
  const [display, setDisplay] = useState('0')
  const [acc, setAcc] = useState<number | null>(null)
  const [op, setOp] = useState<Op | null>(null)
  const [fresh, setFresh] = useState(true) // próximo dígito inicia novo número

  const clear = useCallback(() => {
    setDisplay('0')
    setAcc(null)
    setOp(null)
    setFresh(true)
  }, [])

  const digit = useCallback(
    (d: string) => {
      setDisplay((prev) => {
        if (fresh || prev === '0' || prev === 'Erro') return d
        if (prev.replace(/[^\d]/g, '').length >= 12) return prev
        return prev + d
      })
      setFresh(false)
    },
    [fresh],
  )

  const dot = useCallback(() => {
    setDisplay((prev) => {
      if (fresh || prev === 'Erro') return '0,'
      return prev.includes(',') ? prev : prev + ','
    })
    setFresh(false)
  }, [fresh])

  const back = useCallback(() => {
    if (fresh) return
    setDisplay((prev) => (prev.length <= 1 || prev === 'Erro' ? '0' : prev.slice(0, -1)))
  }, [fresh])

  const current = () => parseFloat(display.replace(',', '.')) || 0

  const applyOp = useCallback(
    (next: Op) => {
      const cur = current()
      if (op !== null && acc !== null && !fresh) {
        const r = compute(acc, cur, op)
        setAcc(r)
        setDisplay(fmt(r).replace('.', ','))
      } else if (acc === null) {
        setAcc(cur)
      }
      setOp(next)
      setFresh(true)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [op, acc, fresh, display],
  )

  const equals = useCallback(() => {
    // PIN de desbloqueio: digitar 1904 e "="
    if (op === null && display === PIN_DEMO) {
      onUnlock()
      return
    }
    if (op !== null && acc !== null) {
      const r = compute(acc, current(), op)
      setDisplay(fmt(r).replace('.', ','))
      setAcc(null)
      setOp(null)
    }
    setFresh(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [op, acc, display, onUnlock])

  // Em modo disfarce, o título da aba também não deve entregar o app
  useEffect(() => {
    const anterior = document.title
    document.title = 'Calculadora'
    return () => {
      document.title = anterior
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (/^\d$/.test(e.key)) digit(e.key)
      else if (e.key === '.' || e.key === ',') dot()
      else if (e.key === '+') applyOp('+')
      else if (e.key === '-') applyOp('-')
      else if (e.key === '*') applyOp('×')
      else if (e.key === '/') {
        e.preventDefault()
        applyOp('÷')
      } else if (e.key === 'Enter' || e.key === '=') equals()
      else if (e.key === 'Backspace') back()
      else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') clear()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [digit, dot, applyOp, equals, back, clear])

  const press = (k: (typeof KEYS)[number]) => {
    switch (k.kind) {
      case 'digit':
        return digit(k.label)
      case 'dot':
        return dot()
      case 'op':
        return applyOp(k.label as Op)
      case 'eq':
        return equals()
      case 'clear':
        return clear()
      case 'back':
        return back()
    }
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-neutral-100 text-neutral-900" style={{ fontFamily: 'system-ui, sans-serif' }}>
      <div className="flex shrink-0 items-center justify-between px-5 pb-1 pt-[max(0.75rem,env(safe-area-inset-top))] text-sm text-neutral-500 md:pt-8">
        <span>Calculadora</span>
        {op ? <span aria-hidden>{fmt(acc ?? 0).replace('.', ',')} {op}</span> : null}
      </div>
      <div
        className="flex min-h-0 flex-1 items-end justify-end overflow-hidden px-5 pb-4"
        aria-live="polite"
        aria-label="Visor"
      >
        <span className="truncate text-6xl font-light tabular-nums tracking-tight">{display}</span>
      </div>
      <div className="grid shrink-0 grid-cols-4 gap-2 bg-neutral-200 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {KEYS.map((k) => {
          const isOp = k.kind === 'op' || k.kind === 'eq'
          const isFn = k.kind === 'clear' || k.kind === 'back'
          return (
            <button
              key={k.label}
              type="button"
              onClick={() => press(k)}
              aria-label={k.kind === 'back' ? 'Apagar' : k.kind === 'clear' ? 'Limpar' : k.label}
              className={`h-16 rounded-2xl text-2xl font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 active:scale-95 ${
                k.span ? 'col-span-2' : ''
              } ${k.kind === 'eq' ? 'row-span-2' : ''} ${
                isOp
                  ? 'bg-neutral-700 text-white hover:bg-neutral-600'
                  : isFn
                    ? 'bg-neutral-300 text-neutral-800 hover:bg-neutral-400/70'
                    : 'bg-white text-neutral-900 hover:bg-neutral-50'
              } ${k.kind === 'eq' ? 'h-auto' : ''}`}
            >
              {k.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
