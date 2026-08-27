import {
  Activity,
  Baby,
  Brain,
  Building2,
  CalendarDays,
  Circle,
  ClipboardList,
  Dumbbell,
  Eye,
  Flower2,
  GraduationCap,
  HandHeart,
  Handshake,
  HeartHandshake,
  HeartPlus,
  HeartPulse,
  Megaphone,
  MessageCircle,
  Pill,
  Scale,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Sparkles,
  Stethoscope,
  UserCheck,
  Users,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react'
import type { IconeNome } from '../../types'

interface IconProps extends LucideProps {
  name: IconeNome
}

/**
 * Mapa estático nome → ícone lucide usado pela camada de dados (src/data/*).
 * Importar `icons` inteiro do lucide-react traria ~1500 ícones para o bundle;
 * aqui só entram os nomes realmente usados. Fallback: Circle.
 */
const ICONES: Record<string, LucideIcon> = {
  Activity,
  Baby,
  Brain,
  Building2,
  CalendarDays,
  ClipboardList,
  Dumbbell,
  Eye,
  Flower2,
  GraduationCap,
  HandHeart,
  Handshake,
  HeartHandshake,
  HeartPlus,
  HeartPulse,
  Megaphone,
  MessageCircle,
  Pill,
  Scale,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Sparkles,
  Stethoscope,
  UserCheck,
  Users,
}

/** Resolve nome de ícone lucide (ex.: "HeartPulse") → componente. Fallback: Circle. */
export default function Icon({ name, ...rest }: IconProps) {
  const Cmp = ICONES[name] ?? Circle
  return <Cmp aria-hidden {...rest} />
}
