/** Ilustração de linha decorativa: perfil feminino + folhas (estilo do material institucional). */
export default function Ilustracao({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`text-wine ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* rosto / perfil */}
      <path d="M52 22c-9 3-15 12-13 22 1 6 4 10 3 16-1 5-5 8-5 13" />
      <path d="M52 22c8-4 20-2 25 6 5 8 3 20-3 27-2 3-3 7-1 11" />
      <path d="M64 40c2 2 3 5 2 8M70 52c-2 3-5 4-8 3" />
      {/* cabelo */}
      <path d="M54 26c12-2 22 6 24 18 1 9-2 17-8 24-3 4-3 9 0 13" />
      <path d="M46 34c-4 8-3 18 2 26 3 5 3 10 1 15" />
      <path d="M80 46c4 8 4 18-1 26-3 5-2 10 1 14" />
      {/* folhas */}
      <path d="M22 100c6-14 18-22 32-22" />
      <path d="M30 92c1-6 5-10 11-11-1 6-5 10-11 11zM38 84c2-5 6-8 11-8-1 5-5 8-11 8zM26 99c-4-3-6-8-5-13 5 1 8 5 5 13z" />
      <path d="M98 108c-4-12-12-20-24-22" />
      <path d="M90 100c-5-1-9-4-10-9 5 0 9 3 10 9zM84 92c-4-1-7-4-8-8 4 0 7 3 8 8z" />
    </svg>
  )
}
