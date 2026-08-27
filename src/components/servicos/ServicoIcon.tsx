import {
  Activity,
  Baby,
  Brain,
  Building2,
  ClipboardList,
  Dumbbell,
  Flower2,
  GraduationCap,
  HandHeart,
  Handshake,
  HeartHandshake,
  HeartPlus,
  HeartPulse,
  Megaphone,
  Pill,
  Scale,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  UserCheck,
  Users,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react'
import type { Cor } from '../../types'

const ICONS: Record<string, LucideIcon> = {
  Activity,
  Baby,
  Brain,
  Building2,
  ClipboardList,
  Dumbbell,
  Flower2,
  GraduationCap,
  HandHeart,
  Handshake,
  HeartHandshake,
  HeartPlus,
  HeartPulse,
  Megaphone,
  Pill,
  Scale,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  UserCheck,
  Users,
}

interface ServicoIconProps extends LucideProps {
  name: string
}

/** Resolve nome de ícone (lucide) → componente, com fallback seguro. */
export default function ServicoIcon({ name, ...props }: ServicoIconProps) {
  const Icon = ICONS[name] ?? HeartHandshake
  return <Icon aria-hidden {...props} />
}

/** Classes utilitárias por cor semântica (fundo sólido, fundo suave, texto, borda). */
export const COR: Record<Cor, { solid: string; soft: string; text: string; border: string }> = {
  wine: { solid: 'bg-wine text-white', soft: 'bg-wine/10', text: 'text-wine', border: 'border-wine/40' },
  navy: { solid: 'bg-navy text-white', soft: 'bg-navy/10', text: 'text-navy', border: 'border-navy/40' },
  lilac: { solid: 'bg-lilac text-white', soft: 'bg-lilac/20', text: 'text-lilac', border: 'border-lilac/50' },
  sage: { solid: 'bg-sage text-white', soft: 'bg-sage/20', text: 'text-sage', border: 'border-sage/50' },
}
