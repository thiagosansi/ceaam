import type { EtapaFluxo } from '../types';

export const fluxo = [
  {
    numero: 1,
    titulo: 'Acolhimento e escuta',
    descricao:
      'Recepção humanizada e escuta qualificada para compreender a necessidade de cada mulher.',
    icone: 'HeartHandshake',
  },
  {
    numero: 2,
    titulo: 'Avaliação inicial',
    descricao:
      'Análise da situação e identificação das demandas de saúde, psicológica, social, emocional e jurídica.',
    icone: 'ClipboardList',
  },
  {
    numero: 3,
    titulo: 'Encaminhamento interno',
    descricao:
      'Direcionamento para as áreas e profissionais adequados para cada caso, com plano de atendimento individualizado.',
    icone: 'Users',
  },
  {
    numero: 4,
    titulo: 'Atendimento integral',
    descricao:
      'Acompanhamento nas áreas de saúde, psicologia, assistência social, jurídica, educação e orientação para o bem-estar.',
    icone: 'HandHeart',
  },
  {
    numero: 5,
    titulo: 'Acompanhamento contínuo',
    descricao:
      'Monitoramento da evolução dos atendimentos e apoio constante para garantir a continuidade e resultados positivos.',
    icone: 'Activity',
  },
  {
    numero: 6,
    titulo: 'Fortalecimento e autonomia',
    descricao:
      'Ações que promovem independência, autoestima e protagonismo feminino, ajudando a mulher a reconstruir sua história.',
    icone: 'Sparkles',
  },
] satisfies EtapaFluxo[];
