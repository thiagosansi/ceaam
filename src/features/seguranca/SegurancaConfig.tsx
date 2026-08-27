import { Calculator as CalcIcon, DoorOpen, KeyRound } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { PIN_DEMO, useSeguranca } from '../../store/seguranca'
import { quickExit } from './quickExit'

/** Configurações de segurança: modo disfarce, saída rápida e PIN. */
export default function SegurancaConfig() {
  const { disfarceAtivo, setDisfarceAtivo } = useSeguranca()

  return (
    <div className="space-y-3">
      <Card>
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
              <CalcIcon className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="font-semibold text-navy">Modo disfarce</p>
              <p className="mt-0.5 text-sm text-muted">
                Ao abrir, o app aparece como uma calculadora comum. Ninguém percebe que é o CEAAM.
              </p>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={disfarceAtivo}
            aria-label="Ativar modo disfarce"
            onClick={() => setDisfarceAtivo(!disfarceAtivo)}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40 ${
              disfarceAtivo ? 'bg-wine' : 'bg-muted/30'
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                disfarceAtivo ? 'left-1 translate-x-5' : 'left-1'
              }`}
            />
          </button>
        </div>
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-cream p-3 text-sm text-ink">
          <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-wine" aria-hidden />
          <p>
            Para destravar, digite o PIN na calculadora e toque em <strong>=</strong>. PIN de demonstração:{' '}
            <Badge tone="wine" className="font-mono text-sm">
              {PIN_DEMO} =
            </Badge>
          </p>
        </div>
        {disfarceAtivo ? (
          <p className="mt-2 text-xs text-muted">
            Ativo. Na próxima vez que abrir o app (nova aba ou sessão), a calculadora aparecerá primeiro.
          </p>
        ) : null}
      </Card>

      <Card>
        <div className="flex gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-wine/10 text-wine">
            <DoorOpen className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-navy">Saída rápida</p>
            <p className="mt-0.5 text-sm text-muted">
              O botão no topo (ou a tecla <kbd className="rounded bg-cream px-1 font-mono text-xs">Esc</kbd> 3 vezes
              seguidas) sai do app na hora e abre uma página de previsão do tempo, sem deixar esta tela no
              histórico.
            </p>
            <Button variant="outline" size="sm" className="mt-3" onClick={quickExit}>
              Testar saída rápida
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
