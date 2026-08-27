import { Clock, Phone, Info } from 'lucide-react'
import type { Contato } from '../../types'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Card from '../ui/Card'

interface Props {
  contato: Contato
  onVerAviso: (c: Contato) => void
}

export default function ContatoCard({ contato, onVerAviso }: Props) {
  const tel = contato.numero.replace(/\D/g, '')
  return (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold text-navy">{contato.nome}</h3>
        {contato.ficticio ? <Badge tone="muted">CONTATO FICTÍCIO</Badge> : null}
      </div>
      <p className="mt-1 text-2xl font-bold tracking-tight text-wine">{contato.numero}</p>
      <p className="mt-1 text-sm text-ink/80">{contato.descricao}</p>
      {contato.horario ? (
        <p className="mt-2 flex items-center gap-1 text-xs text-muted">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          {contato.horario}
        </p>
      ) : null}
      <div className="mt-3">
        {contato.ficticio ? (
          <Button variant="outline" fullWidth onClick={() => onVerAviso(contato)}>
            <Info className="h-4 w-4" aria-hidden />
            Ver aviso do contato
          </Button>
        ) : (
          <a
            href={`tel:${tel}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-wine px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-wineDark focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Ligar para {contato.numero}
          </a>
        )}
      </div>
    </Card>
  )
}
