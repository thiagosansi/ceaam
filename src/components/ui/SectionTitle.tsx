import type { ReactNode } from 'react'

interface SectionTitleProps {
  children: ReactNode
  subtitle?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

export default function SectionTitle({ children, subtitle, as: Tag = 'h2', className = '' }: SectionTitleProps) {
  const sizes = { h1: 'text-2xl', h2: 'text-lg', h3: 'text-base' } as const
  return (
    <div className={`mb-3 ${className}`}>
      <Tag className={`${sizes[Tag]} font-bold text-navy`}>{children}</Tag>
      {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
    </div>
  )
}
