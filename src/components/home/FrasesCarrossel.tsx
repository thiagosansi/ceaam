import { Quote } from 'lucide-react'
import type { Frase } from '../../types'

export default function FrasesCarrossel({ frases }: { frases: Frase[] }) {
  return (
    <div
      className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="region"
      aria-label="Frases inspiradoras"
    >
      {frases.map((f, i) => (
        <figure
          key={i}
          className="relative w-[82%] shrink-0 snap-center rounded-2xl border border-blush bg-white p-4 shadow-card"
        >
          <Quote className="absolute right-3 top-3 h-6 w-6 text-rose/70" aria-hidden />
          <blockquote className="pr-6 text-sm italic leading-relaxed text-ink">“{f.texto}”</blockquote>
          {f.autor ? <figcaption className="mt-2 text-xs font-semibold text-wine">— {f.autor}</figcaption> : null}
        </figure>
      ))}
    </div>
  )
}
