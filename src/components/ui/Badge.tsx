import type { ReactNode } from 'react'

type BadgeTone = 'wine' | 'navy' | 'lilac' | 'sage' | 'muted'

interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}

const TONES: Record<BadgeTone, string> = {
  wine: 'bg-wine/10 text-wine',
  navy: 'bg-navy/10 text-navy',
  lilac: 'bg-lilac/20 text-navy',
  sage: 'bg-sage/20 text-navy',
  muted: 'bg-muted/10 text-muted',
}

export default function Badge({ children, tone = 'wine', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${TONES[tone]} ${className}`}>
      {children}
    </span>
  )
}
