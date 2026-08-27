import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  tone?: 'white' | 'blush' | 'lilac' | 'sage'
}

const TONES: Record<NonNullable<CardProps['tone']>, string> = {
  white: 'bg-white border-blush/60',
  blush: 'bg-blush/50 border-blush',
  lilac: 'bg-lilac/15 border-lilac/40',
  sage: 'bg-sage/15 border-sage/40',
}

export default function Card({ children, tone = 'white', className = '', ...rest }: CardProps) {
  return (
    <div className={`rounded-2xl border p-4 shadow-card ${TONES[tone]} ${className}`} {...rest}>
      {children}
    </div>
  )
}
