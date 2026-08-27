import type { Contato } from '../types';

export const contatos = [
  {
    id: 'ligue-180',
    nome: 'Central de Atendimento à Mulher',
    numero: '180',
    descricao: 'Orientação, escuta e registro de denúncias de violência contra a mulher. Gratuito e sigiloso.',
    tipo: 'oficial',
    ficticio: false,
    horario: '24 horas',
  },
  {
    id: 'policia-190',
    nome: 'Polícia Militar',
    numero: '190',
    descricao: 'Emergência policial. Ligue em situação de perigo imediato.',
    tipo: 'emergencia',
    ficticio: false,
    horario: '24 horas',
  },
  {
    id: 'samu-192',
    nome: 'SAMU',
    numero: '192',
    descricao: 'Atendimento médico de urgência e emergência.',
    tipo: 'emergencia',
    ficticio: false,
    horario: '24 horas',
  },
  {
    id: 'bombeiros-193',
    nome: 'Corpo de Bombeiros',
    numero: '193',
    descricao: 'Resgate, incêndios e outras emergências.',
    tipo: 'emergencia',
    ficticio: false,
    horario: '24 horas',
  },
  {
    id: 'disque-100',
    nome: 'Disque Direitos Humanos',
    numero: '100',
    descricao: 'Denúncias de violações de direitos humanos, inclusive contra crianças, adolescentes e idosos.',
    tipo: 'oficial',
    ficticio: false,
    horario: '24 horas',
  },
  {
    id: 'ceaam',
    nome: 'CEAAM Feira de Santana',
    numero: '(75) 3000-0000',
    descricao: 'Centro Especializado de Assistência e Apoio à Mulher. Acolhimento, orientação e agendamento.',
    tipo: 'ceaam',
    ficticio: true,
    horario: 'Horário de atendimento em definição',
  },
  {
    id: 'defensoria',
    nome: 'Defensoria Pública',
    numero: '(75) 3000-0001',
    descricao: 'Assistência jurídica gratuita, medidas protetivas e orientação sobre direitos.',
    tipo: 'juridico',
    ficticio: true,
  },
  {
    id: 'deam',
    nome: 'DEAM Feira de Santana',
    numero: '(75) 3000-0002',
    descricao: 'Delegacia Especializada de Atendimento à Mulher. Registro de ocorrências e pedido de medidas protetivas.',
    tipo: 'oficial',
    ficticio: true,
  },
  {
    id: 'cras-creas',
    nome: 'CRAS / CREAS',
    numero: '(75) 3000-0003',
    descricao: 'Assistência social: benefícios, programas e acompanhamento de famílias em situação de vulnerabilidade.',
    tipo: 'social',
    ficticio: true,
  },
] satisfies Contato[];

export const emergencia: Contato[] = contatos.filter(
  (c) => c.tipo === 'emergencia' || c.id === 'ligue-180',
);

export function getContato(id: string): Contato | undefined {
  return contatos.find((c) => c.id === id);
}
