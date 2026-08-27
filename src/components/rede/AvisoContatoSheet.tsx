import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { Contato } from '../../types'
import Button from '../ui/Button'

interface Props {
  contato: Contato | null
  onClose: () => void
}

export default function AvisoContatoSheet({ contato, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!contato) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [contato, onClose])

  if (!contato) return null

  return (
    <div className="absolute inset-0 z-30 flex items-end" role="presentation">
      <button
        type="button"
        aria-label="Fechar aviso"
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="aviso-titulo"
        aria-describedby="aviso-texto"
        className="relative w-full rounded-t-3xl bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-soft"
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-blush" aria-hidden />
        <div className="flex items-start justify-between gap-3">
          <h2 id="aviso-titulo" className="text-lg font-bold text-navy">
            Número ilustrativo
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-full p-1 text-muted hover:bg-navy/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <p id="aviso-texto" className="mt-2 text-sm text-ink/80">
          O número <strong className="text-wine">{contato.numero}</strong> de{' '}
          <strong>{contato.nome}</strong> é apenas ilustrativo neste protótipo. O contato real será
          configurado na versão final do aplicativo.
        </p>
        <p className="mt-2 text-sm text-ink/80">
          Se você precisa de ajuda agora, ligue <strong>190</strong> (emergência) ou{' '}
          <strong>180</strong> (Central de Atendimento à Mulher, 24h, gratuito).
        </p>
        <Button fullWidth className="mt-4" onClick={onClose}>
          Entendi
        </Button>
      </div>
    </div>
  )
}
