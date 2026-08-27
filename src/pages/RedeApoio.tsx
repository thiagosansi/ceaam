import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Phone, ShieldAlert } from 'lucide-react'
import { contatos } from '../data'
import type { Contato } from '../types'
import SectionTitle from '../components/ui/SectionTitle'
import ContatoCard from '../components/rede/ContatoCard'
import AvisoContatoSheet from '../components/rede/AvisoContatoSheet'

const GRUPOS: { titulo: string; tipos: Contato['tipo'][] }[] = [
  { titulo: 'Emergência', tipos: ['emergencia'] },
  { titulo: 'Atendimento oficial', tipos: ['oficial'] },
  { titulo: 'CEAAM e parceiros', tipos: ['ceaam', 'juridico', 'social'] },
]

export default function RedeApoio() {
  const [aviso, setAviso] = useState<Contato | null>(null)
  const fechar = useCallback(() => setAviso(null), [])

  return (
    <div className="space-y-6 pb-4">
      <SectionTitle as="h1" subtitle="Contatos e serviços para você não passar por isso sozinha.">
        Rede de apoio
      </SectionTitle>

      <section
        aria-labelledby="ajuda-agora"
        className="rounded-2xl bg-wine p-4 text-white shadow-soft"
      >
        <h2 id="ajuda-agora" className="flex items-center gap-2 text-lg font-bold">
          <AlertTriangle className="h-5 w-5" aria-hidden />
          Precisa de ajuda agora?
        </h2>
        <p className="mt-1 text-sm text-white/90">
          Em caso de perigo imediato, ligue para o 190. Este protótipo não envia localização nem
          aciona uma central automaticamente.
        </p>
        <div className="mt-3 grid gap-2">
          <a
            href="tel:190"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-wine transition-colors hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Ligar para 190
          </a>
          <Link
            to="/ajuda"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white bg-white px-4 py-2.5 text-sm font-semibold text-wine transition-colors hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <ShieldAlert className="h-4 w-4" aria-hidden />
            Acionar botão de pânico
          </Link>
        </div>
      </section>

      {GRUPOS.map((g) => {
        const lista = contatos.filter((c) => g.tipos.includes(c.tipo))
        if (lista.length === 0) return null
        return (
          <section key={g.titulo} aria-label={g.titulo}>
            <SectionTitle>{g.titulo}</SectionTitle>
            <div className="space-y-3">
              {lista.map((c) => (
                <ContatoCard key={c.id} contato={c} onVerAviso={setAviso} />
              ))}
            </div>
          </section>
        )
      })}

      <p className="rounded-2xl bg-blush/50 p-3 text-center text-xs text-ink/80">
        Se você está em perigo, ligue <strong>190</strong>. Em caso de violência contra a mulher,
        ligue <strong>180</strong> (24h, gratuito).
      </p>

      <AvisoContatoSheet contato={aviso} onClose={fechar} />
    </div>
  )
}
