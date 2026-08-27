import type { ReactNode } from 'react'

interface PhoneFrameProps {
  children: ReactNode
}

/**
 * Em telas >= md (768px) envolve o app numa moldura de celular 390x844.
 * Abaixo disso, o app ocupa a viewport inteira (100dvh).
 * O scroll é sempre interno ao AppShell (flex column + min-h-0).
 */
export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="relative min-h-[100dvh] w-full md:flex md:items-center md:justify-center md:bg-gradient-to-br md:from-cream md:via-cream md:to-blush md:p-8">
      {/* blobs decorativos (só desktop) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
        <div className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-lilac/25 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-[28rem] w-[28rem] rounded-full bg-sage/25 blur-3xl" />
        <div className="absolute left-1/3 -bottom-32 h-80 w-80 rounded-full bg-wine/15 blur-3xl" />
        <div className="absolute right-1/4 -top-24 h-72 w-72 rounded-full bg-rose/30 blur-3xl" />
      </div>

      <div className="relative h-[100dvh] w-full md:h-[844px] md:w-[390px] md:shrink-0 md:overflow-hidden md:rounded-phone md:border-[10px] md:border-navyDeep md:bg-navyDeep md:shadow-phone">
        {/* notch */}
        <div aria-hidden className="absolute left-1/2 top-2 z-20 hidden h-6 w-32 -translate-x-1/2 rounded-full bg-navyDeep md:block" />
        <div className="flex h-full w-full flex-col overflow-hidden bg-cream md:rounded-[2.4rem]">
          {children}
        </div>
      </div>
    </div>
  )
}
