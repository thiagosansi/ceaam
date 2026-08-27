import { Link, Navigate, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { getOrientacao } from '../data'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import Icon from '../components/ui/Icon'
import Artigo, { Secoes } from '../components/orientacoes/Artigo'
import Checklist from '../components/orientacoes/Checklist'
import Respiracao from '../components/orientacoes/Respiracao'
import { COR_ICONE } from './Orientacoes'

const TIPO_LABEL = { artigo: 'Leitura', checklist: 'Checklist', pratica: 'Prática' } as const

export default function OrientacaoDetalhe() {
  const { id = '' } = useParams()
  const o = getOrientacao(id)
  if (!o) return <Navigate to="/orientacoes" replace />

  return (
    <article className="space-y-5 pb-4">
      <Link
        to="/orientacoes"
        className="inline-flex items-center gap-1 text-sm font-semibold text-wine focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden /> Orientações
      </Link>

      <header className="flex items-start gap-3">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${COR_ICONE[o.cor]}`}>
          <Icon name={o.icone} className="h-6 w-6" strokeWidth={1.8} />
        </span>
        <div>
          <Badge tone={o.cor}>{TIPO_LABEL[o.tipo]}</Badge>
          <h1 className="mt-1 text-2xl font-bold leading-tight text-navy">{o.titulo}</h1>
          <p className="mt-1 text-sm text-muted">{o.resumo}</p>
        </div>
      </header>

      {o.tipo === 'artigo' ? <Artigo secoes={o.secoes} /> : null}

      {o.tipo === 'checklist' ? (
        <>
          <Secoes secoes={o.secoes} />
          <Checklist sinais={o.sinais ?? []} faixas={o.faixas ?? []} />
        </>
      ) : null}

      {o.tipo === 'pratica' ? (
        <>
          <Secoes secoes={o.secoes} />
          <div className="space-y-4">
            {(o.praticas ?? []).map((p, i) =>
              i === 0 ? (
                <Respiracao key={p.titulo} pratica={p} />
              ) : (
                <Card key={p.titulo}>
                  <h3 className="text-base font-bold text-navy">{p.titulo}</h3>
                  <p className="mt-1 text-sm text-muted">{p.descricao}</p>
                  {p.duracaoSeg ? (
                    <Badge tone="muted" className="mt-2">
                      ~{Math.round(p.duracaoSeg / 60)} min
                    </Badge>
                  ) : null}
                  {p.passos ? (
                    <ol className="mt-3 space-y-2">
                      {p.passos.map((s, j) => (
                        <li key={j} className="flex gap-3 text-sm text-ink">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage/25 text-xs font-bold text-navy">
                            {j + 1}
                          </span>
                          <span className="pt-0.5">{s}</span>
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </Card>
              ),
            )}
          </div>
          {o.citacao ? (
            <blockquote className="rounded-2xl border-l-4 border-wine bg-blush/40 p-4 text-sm italic leading-relaxed text-ink">
              “{o.citacao.texto}”
              {o.citacao.autor ? (
                <footer className="mt-2 text-xs font-semibold not-italic text-wine">— {o.citacao.autor}</footer>
              ) : null}
            </blockquote>
          ) : null}
        </>
      ) : null}
    </article>
  )
}
