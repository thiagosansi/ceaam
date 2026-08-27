import { Clock, Mail, MapPin, Phone, Target, Users } from 'lucide-react'
import { fluxo, institucional } from '../data'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import SectionTitle from '../components/ui/SectionTitle'
import Stepper from '../components/sobre/Stepper'
import ServicoIcon, { COR } from '../components/servicos/ServicoIcon'
import type { Cor } from '../types'

const ALT_CORES: Cor[] = ['wine', 'navy', 'lilac', 'sage']

function LogoGrande() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="h-20 w-20 text-wine"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14.5 10c-1.6 3-1 7 1.3 9.3c-.6 3 .4 6 2.4 7.4" />
      <path d="M14.5 10c3-3 8.4-2.2 10.4 1.4c1.8 3.4.6 7.6-2 10c-.8 1.2-.6 3 0 4.4" />
      <path d="M22.9 25.8c5 2 8.2 5.4 8.8 10" />
      <path d="M18.2 26.7c-5 1.6-8.6 5-9.2 9.2" />
    </svg>
  )
}

function Eyebrow({ children }: { children: string }) {
  return <p className="text-xs font-bold uppercase tracking-widest text-wine">{children}</p>
}

export default function Sobre() {
  const i = institucional
  const dados = i.dadosDemonstrativos

  return (
    <div className="space-y-8 pb-6">
      {/* Apresentação */}
      <Card className="flex flex-col items-center px-5 py-6 text-center">
        <LogoGrande />
        <p className="mt-3 text-3xl font-bold tracking-tight text-navy">{i.sigla}</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">{i.nomeCompleto}</p>
        <h1 className="mt-4 text-xl font-bold leading-snug text-wine">{i.slogan}</h1>
        <span aria-hidden className="mt-3 block h-1 w-14 rounded-full bg-wine/60" />
        <div className="mt-4 space-y-3 text-left">
          {i.apresentacao.map((p) => (
            <p key={p} className="text-sm leading-relaxed text-ink">
              {p}
            </p>
          ))}
        </div>
      </Card>

      {/* Por que */}
      <section aria-labelledby="porque-titulo">
        <Eyebrow>Contexto</Eyebrow>
        <h2 id="porque-titulo" className="mt-1 text-lg font-bold text-navy">
          Por que Feira de Santana precisa do {i.sigla}?
        </h2>
        <div className="mt-3 space-y-3">
          {[i.porQue[0], i.porQue[1], i.porQue[5]].map((p) => (
            <p key={p} className="text-sm leading-relaxed text-ink">
              {p}
            </p>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {i.porQueDestaques.map((d, idx) => {
            const cor = COR[ALT_CORES[idx % ALT_CORES.length]]
            return (
              <div key={d.titulo} className={`rounded-2xl border p-3.5 ${cor.soft} ${cor.border}`}>
                <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${cor.solid}`}>
                  <ServicoIcon name={d.icone} className="h-4 w-4" strokeWidth={2} />
                </span>
                <p className="mt-2.5 text-sm font-bold leading-snug text-navy">{d.titulo}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink">{d.descricao}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Pilares */}
      <section aria-labelledby="oferecemos-titulo">
        <Eyebrow>Nossos pilares</Eyebrow>
        <h2 id="oferecemos-titulo" className="mt-1 text-lg font-bold text-navy">
          O que oferecemos
        </h2>
        <ul className="mt-3 space-y-2.5">
          {i.pilares.map((p) => {
            const cor = COR[p.cor]
            return (
              <li key={p.titulo} className={`flex items-center gap-3 rounded-full border py-2 pl-2 pr-4 ${cor.soft} ${cor.border}`}>
                <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${cor.solid}`}>
                  <ServicoIcon name={p.icone} className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-navy">{p.titulo}</span>
                  <span className="block text-xs leading-snug text-ink">{p.descricao}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Fluxo */}
      <section aria-labelledby="fluxo-titulo">
        <Eyebrow>Metodologia</Eyebrow>
        <h2 id="fluxo-titulo" className="mt-1 text-lg font-bold text-navy">
          Fluxo de atendimento
        </h2>
        <p className="mb-4 mt-1 text-sm text-muted">Como o {i.sigla} vai funcionar, passo a passo.</p>
        <Stepper etapas={fluxo} />
      </section>

      {/* Objetivos */}
      <section aria-labelledby="objetivos-titulo">
        <Eyebrow>Propósito que transforma realidades</Eyebrow>
        <h2 id="objetivos-titulo" className="mt-1 text-lg font-bold text-navy">
          Objetivos do {i.sigla}
        </h2>
        <Card tone="blush" className="mt-3 flex gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-white">
            <Target className="h-5 w-5" strokeWidth={1.8} aria-hidden />
          </span>
          <div>
            <h3 className="text-sm font-bold text-navy">Objetivo geral</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink">{i.objetivoGeral}</p>
          </div>
        </Card>
        <h3 className="mt-5 text-sm font-bold text-wine">Nossos objetivos específicos</h3>
        <ol className="mt-2 space-y-2">
          {i.objetivos.map((o) => (
            <li key={o.numero} className="flex items-center gap-3 rounded-2xl bg-blush/40 p-3">
              <span className="text-lg font-bold text-navy">{String(o.numero).padStart(2, '0')}</span>
              <p className="text-sm leading-relaxed text-ink">
                <strong className="font-bold text-navy">{o.verbo}</strong> {o.texto}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Público-alvo */}
      <Card tone="blush" className="flex gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-wine text-white">
          <Users className="h-5 w-5" strokeWidth={1.8} aria-hidden />
        </span>
        <div>
          <h2 className="text-base font-bold text-wine">Público-alvo</h2>
          <p className="mt-1 text-sm leading-relaxed text-ink">{i.publicoAlvo}</p>
        </div>
      </Card>

      {/* Metodologia */}
      <section aria-labelledby="metodologia-titulo">
        <SectionTitle subtitle="Princípios que guiam o atendimento.">
          <span id="metodologia-titulo">Metodologia</span>
        </SectionTitle>
        <div className="space-y-3">
          {i.metodologia.map((p) => (
            <p key={p} className="text-sm leading-relaxed text-ink">
              {p}
            </p>
          ))}
        </div>
        <div className="mt-4 rounded-2xl bg-navy p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-widest">Nossa metodologia é baseada em:</p>
          <ul className="mt-2.5 space-y-2">
            {i.metodologiaBase.map((b) => (
              <li key={b} className="flex gap-2.5 text-sm leading-relaxed">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Dados demonstrativos */}
      <div className="rounded-2xl border border-muted/20 bg-muted/10 p-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-navy">Dados institucionais demonstrativos</h2>
          <Badge tone="muted">Dados fictícios</Badge>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-ink">
          <li className="flex gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden />
            <span>
              {dados.local} — {dados.endereco}
            </span>
          </li>
          <li className="flex gap-2.5">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden />
            <span>{dados.horario}</span>
          </li>
          <li className="flex gap-2.5">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden />
            <span>{dados.email}</span>
          </li>
          <li className="flex gap-2.5">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden />
            <span>{dados.telefone}</span>
          </li>
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Este protótipo usa dados ilustrativos. Endereço, e-mail e telefone serão definidos na implantação.
        </p>
      </div>

      <footer className="text-center">
        <p className="text-base font-bold text-wine">{i.lema}</p>
        <p className="mt-1 text-xs text-muted">
          {i.slogan} • {i.cidade}
        </p>
      </footer>
    </div>
  )
}
