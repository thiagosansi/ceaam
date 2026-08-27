import {
  Baby,
  Brain,
  Dumbbell,
  Flower2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Megaphone,
  Pill,
  Scale,
  Stethoscope,
  Users,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  Baby,
  Brain,
  Dumbbell,
  Flower2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Megaphone,
  Pill,
  Scale,
  Stethoscope,
  Users,
}

export default function AgendaIcon({ name, ...props }: LucideProps & { name: string }) {
  const Icon = ICONS[name] ?? HeartHandshake
  return <Icon aria-hidden {...props} />
}
