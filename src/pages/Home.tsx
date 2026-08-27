import { Link } from 'react-router-dom'
import { ChevronRight, LifeBuoy } from 'lucide-react'
import { institucional } from '../data'
import Icon from '../components/ui/Icon'
import Card from '../components/ui/Card'
import SectionTitle from '../components/ui/SectionTitle'
import Ilustracao from '../components/home/Ilustracao'
import FuncaoCard from '../components/home/FuncaoCard'
import FrasesCarrossel from '../components/home/FrasesCarrossel'

const ATALHOS = [
  { titulo: 'Nossos serviços', icone: 'HeartHandshake', rota: '/servicos', cor: 'bg-blush/50 text-wine' },
  { titulo: 'Direitos e prevenção', icone: 'Scale', rota: '/orientacoes/direitos', cor: 'bg-navy/10 text-navy' },
  { titulo: 'Bem-estar', icone: 'Flower2', rota: '/orientacoes/bem-estar', cor: 'bg-lilac/20 text-navy' },
  { titulo: 'Rede de apoio', icone: 'Users', rota: '/rede-apoio', cor: 'bg-sage/20 text-navy' },
]

function lerNome(): string | null {
  try {
    const n = window.localStorage.getItem('ceaam.nome')
    return n && n.trim() ? n.trim() : null
  } catch {
    return null
  }
}

export default function Home() {
  const nome = lerNome()

  return (
    <div className="space-y-6 pb-4">
      {/* Saudação */}
      <section className="relative overflow-hidden">
        <Ilustracao className="pointer-events-none absolute -right-4 -top-3 h-32 w-32 opacity-30" />
        <h1 className="text-3xl font-bold text-navy">{nome ? `Olá, ${nome}` : 'Olá'}</h1>
        <p className="mt-1 max-w-[60%] text-sm text-muted">Estamos com você, em cada passo.</p>
      </section>

      {/* Destaque Preciso de ajuda */}
      <Link
        to="/ajuda"
        className="flex items-center gap-3 rounded-2xl border border-rose bg-blush p-4 shadow-soft transition-transform active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-wine text-white">
          <LifeBuoy className="h-6 w-6" aria-hidden />
        </span>
        <span className="flex-1">
          <span className="block text-lg font-bold text-wineDark">Preciso de ajuda</span>
          <span className="block text-xs text-ink/80">Contatos, orientação e apoio imediato, com sigilo.</span>
        </span>
        <ChevronRight className="h-5 w-5 text-wine" aria-hidden />
      </Link>

      {/* Funções do app */}
      <section aria-labelledby="funcoes">
        <h2 id="funcoes" className="sr-only">
          Funções do aplicativo
        </h2>
        <div className="space-y-3">
          {institucional.appFuncoes.map((f, i) => (
            <FuncaoCard key={f.rota} funcao={f} index={i} />
          ))}
        </div>
      </section>

      {/* Como podemos apoiar */}
      <section>
        <SectionTitle>Como podemos apoiar</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {ATALHOS.map((a) => (
            <Link
              key={a.rota}
              to={a.rota}
              className="flex flex-col gap-2 rounded-2xl border border-blush/60 bg-white p-3 shadow-card transition-transform active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40"
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${a.cor}`}>
                <Icon name={a.icone} className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span className="text-sm font-semibold text-navy">{a.titulo}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Rede de mulheres */}
      <Card className="border-navy bg-navy text-white">
        <p className="text-lg font-bold leading-snug">Uma rede de mulheres, para mulheres.</p>
        <p className="mt-2 text-sm leading-relaxed text-white/85">{institucional.rede[0]}</p>
      </Card>

      {/* Frases */}
      <section>
        <SectionTitle>Para lembrar</SectionTitle>
        <FrasesCarrossel frases={institucional.frases} />
      </section>

      <footer className="pt-2 text-center text-xs font-semibold tracking-wide text-muted">
        Gratuito · Humanizado · Sigiloso
      </footer>
    </div>
  )
}
