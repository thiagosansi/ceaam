import { useState } from 'react'
import { CalendarX, Clock } from 'lucide-react'
import { servicos } from '../../data'
import { useAgendamentos } from '../../store/agendamentos'
import Button from '../ui/Button'
import Card from '../ui/Card'
import AgendaIcon from './icons'
import { formatarLonga } from './datas'

export default function MeusAgendamentos() {
  const { agendamentos, cancel } = useAgendamentos()
  const [confirmando, setConfirmando] = useState<string | null>(null)

  if (agendamentos.length === 0) {
    return (
      <Card tone="blush" className="text-center">
        <CalendarX className="mx-auto h-8 w-8 text-wine/70" aria-hidden />
        <p className="mt-2 text-sm font-semibold text-navy">Nenhum agendamento ainda</p>
        <p className="mt-1 text-xs text-muted">Quando você agendar um atendimento, ele aparecerá aqui.</p>
      </Card>
    )
  }

  return (
    <ul className="space-y-3">
      {agendamentos.map((a) => {
        const s = servicos.find((x) => x.id === a.servicoId)
        const emConfirmacao = confirmando === a.id
        return (
          <li key={a.id}>
            <Card>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-wine/10 text-wine">
                  <AgendaIcon name={s?.icone ?? 'HeartHandshake'} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-navy">{s?.nome ?? a.servicoId}</p>
                  <p className="text-sm text-ink/80">{formatarLonga(a.data)}</p>
                  <p className="flex items-center gap-1 text-sm text-muted">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {a.hora}
                  </p>
                </div>
              </div>
              {emConfirmacao ? (
                <div className="mt-3 rounded-xl bg-blush/50 p-3" role="group" aria-label="Confirmar cancelamento">
                  <p className="text-sm text-ink">Cancelar este agendamento?</p>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" onClick={() => cancel(a.id)}>
                      Sim, cancelar
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setConfirmando(null)}>
                      Manter
                    </Button>
                  </div>
                </div>
              ) : (
                <Button size="sm" variant="outline" className="mt-3" onClick={() => setConfirmando(a.id)}>
                  Cancelar
                </Button>
              )}
            </Card>
          </li>
        )
      })}
    </ul>
  )
}
