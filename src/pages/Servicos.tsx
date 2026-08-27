import { Link } from 'react-router-dom'
import { ChevronRight, HandHeart } from 'lucide-react'
import { areas, especializados, institucional } from '../data'
import ServicoCard from '../components/servicos/ServicoCard'
import { COR } from '../components/servicos/ServicoIcon'

export default function Servicos() {
  return (
    <div className="space-y-8 pb-6">
      <header>
        <p className="text-xs font-bold uppercase tracking-widest text-wine">Atendimento integrado</p>
        <h1 className="mt-1 text-2xl font-bold text-navy">Serviços oferecidos</h1>
        <p className="mt-1 text-sm font-semibold text-wine">Atendimento integral e humanizado</p>
        <span aria-hidden className="mt-3 block h-1 w-14 rounded-full bg-wine/60" />
        <p className="mt-4 text-sm leading-relaxed text-ink">
          O {institucional.sigla} oferece atendimento integrado, com uma equipe multidisciplinar preparada para{' '}
          <strong className="font-bold">acolher, orientar e cuidar de cada mulher</strong> em sua individualidade e
          necessidade.
        </p>
      </header>

      <section aria-labelledby="areas-titulo">
        <h2 id="areas-titulo" className="mb-3 text-lg font-bold text-navy">
          Nossas áreas de atuação
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {areas.map((s) => (
            <ServicoCard key={s.id} servico={s} />
          ))}
        </div>
      </section>

      <section aria-labelledby="esp-titulo">
        <p className="text-xs font-bold uppercase tracking-widest text-wine">Cuidado integrado</p>
        <h2 id="esp-titulo" className="mt-1 text-lg font-bold text-navy">
          Atendimento especializado
        </h2>
        <p className="mt-1 text-sm text-muted">Profissionais mulheres, escuta protegida e decisão compartilhada.</p>
        <ol className="mt-4 space-y-2.5">
          {especializados.map((s) => {
            const cor = COR[s.cor]
            return (
              <li key={s.id}>
                <Link
                  to={`/servicos/${s.id}`}
                  className="flex items-center gap-3 rounded-2xl border border-blush/60 bg-white p-3.5 shadow-card transition-colors hover:border-wine/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40"
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${cor.solid}`}>
                    {String(s.ordem).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-bold text-navy">{s.nome}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted">{s.titulo}</span>
                  </span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-muted" aria-hidden />
                </Link>
              </li>
            )
          })}
        </ol>
      </section>

      <div className="flex items-start gap-3 rounded-2xl border border-sage/40 bg-sage/15 p-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-wine text-white">
          <HandHeart className="h-5 w-5" strokeWidth={1.8} aria-hidden />
        </span>
        <p className="text-sm leading-relaxed text-ink">
          Todos os serviços serão oferecidos de forma <strong className="font-bold">integrada e gratuita</strong>,
          garantindo um atendimento completo, sigiloso e{' '}
          <strong className="font-bold">voltado para o atendimento à mulher</strong>.
        </p>
      </div>
    </div>
  )
}
