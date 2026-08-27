import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import type { SecaoOrientacao } from '../../types'

export function Secoes({ secoes }: { secoes: SecaoOrientacao[] }) {
  return (
    <div className="space-y-5">
      {secoes.map((s) => (
        <section key={s.titulo}>
          <h2 className="mb-2 text-lg font-bold text-navy">{s.titulo}</h2>
          <div className="space-y-2 text-sm leading-relaxed text-ink">
            {s.paragrafos.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {s.lista ? (
            <ul className="mt-2 space-y-1.5 text-sm text-ink">
              {s.lista.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-wine" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  )
}

export default function Artigo({ secoes }: { secoes: SecaoOrientacao[] }) {
  return (
    <div className="space-y-6">
      <Secoes secoes={secoes} />
      <Link
        to="/rede-apoio"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-wine px-5 py-3.5 text-base font-semibold text-white shadow-soft transition-colors hover:bg-wineDark focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40"
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
        Falar com a rede de apoio
      </Link>
    </div>
  )
}
