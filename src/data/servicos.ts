import type { Servico } from '../types';

export const areas = [
  {
    id: 'acolhimento',
    nome: 'Acolhimento',
    resumo: 'Escuta qualificada, empatia e respeito desde o primeiro contato.',
    descricao:
      'Recepção com empatia, escuta e respeito. Aqui, cada mulher encontra um lugar seguro para ser ouvida, sem julgamentos.',
    icone: 'HeartHandshake',
    cor: 'wine',
    tipo: 'area',
    ordem: 1,
  },
  {
    id: 'saude',
    nome: 'Saúde',
    resumo: 'Atendimento médico e de enfermagem com foco na saúde física da mulher.',
    descricao:
      'Atendimento médico e de enfermagem voltado à saúde física da mulher, com cuidado preventivo e acompanhamento contínuo.',
    icone: 'Stethoscope',
    cor: 'navy',
    tipo: 'area',
    ordem: 2,
  },
  {
    id: 'saude-mental',
    nome: 'Saúde Mental',
    resumo: 'Apoio psicológico individual e grupal para fortalecimento emocional.',
    descricao:
      'Apoio psicológico individual e em grupo, com escuta protegida, para elaborar vivências e fortalecer recursos internos.',
    icone: 'Brain',
    cor: 'lilac',
    tipo: 'area',
    ordem: 3,
  },
  {
    id: 'atendimento-juridico',
    nome: 'Atendimento Jurídico',
    resumo: 'Orientação e encaminhamento jurídico para garantia de direitos.',
    descricao:
      'Orientação jurídica e encaminhamentos para garantir acesso a direitos, medidas protetivas e benefícios.',
    icone: 'Scale',
    cor: 'navy',
    tipo: 'area',
    ordem: 4,
  },
  {
    id: 'assistencia-social',
    nome: 'Assistência Social',
    resumo: 'Apoio e encaminhamentos para acesso a benefícios, programas e serviços sociais.',
    descricao:
      'Apoio e encaminhamentos para acesso a benefícios, programas e serviços sociais, articulando a rede de proteção.',
    icone: 'Users',
    cor: 'sage',
    tipo: 'area',
    ordem: 5,
  },
  {
    id: 'mae-e-familia',
    nome: 'Atenção à Mãe e à Família',
    resumo: 'Suporte especial para mães solo e mães de filhos com necessidades especiais.',
    descricao:
      'Suporte especial para mães solo e mães de filhos com necessidades especiais, com orientação e acompanhamento familiar.',
    icone: 'Baby',
    cor: 'wine',
    tipo: 'area',
    ordem: 6,
  },
  {
    id: 'educacao-e-capacitacao',
    nome: 'Educação e Capacitação',
    resumo: 'Oficinas, cursos e ações que promovem autonomia e geração de renda.',
    descricao:
      'Oficinas, cursos e ações educativas que promovem autonomia, empoderamento e geração de renda.',
    icone: 'GraduationCap',
    cor: 'sage',
    tipo: 'area',
    ordem: 7,
  },
  {
    id: 'orientacao-e-prevencao',
    nome: 'Orientação e Prevenção',
    resumo: 'Ações educativas sobre direitos, prevenção da violência e promoção do bem-estar.',
    descricao:
      'Ações educativas sobre direitos, prevenção da violência e promoção do bem-estar físico e emocional.',
    icone: 'Megaphone',
    cor: 'lilac',
    tipo: 'area',
    ordem: 8,
  },
] satisfies Servico[];

export const especializados = [
  {
    id: 'psiquiatria',
    nome: 'Psiquiatria',
    resumo: 'Cuidado médico especializado para sofrimento psíquico, crises e transtornos mentais.',
    descricao:
      'Consulta médica com escuta qualificada, avaliação do estado mental e análise de riscos, com sigilo e decisão compartilhada.',
    icone: 'Pill',
    cor: 'lilac',
    tipo: 'especializado',
    titulo: 'Avaliar, estabilizar e acompanhar com decisão compartilhada',
    subtitulo: 'Cuidado médico especializado para sofrimento psíquico, crises e transtornos mentais.',
    particularidades: [
      'Consulta médica com escuta qualificada, avaliação do estado mental e análise de riscos.',
      'Considera sintomas, histórico, sono, medicamentos e uso de substâncias.',
      'Pode diagnosticar e prescrever quando indicado, com sigilo e decisão compartilhada.',
    ],
    comoSeraFeito: [
      'Encaminhamento após acolhimento, triagem ou indicação da equipe.',
      'Consulta individual e reservada, com avaliação clínica e de riscos.',
      'Plano integrado, retornos programados e articulação com a rede.',
      'Em risco imediato, encaminhamento ao serviço de urgência adequado.',
    ],
    objetivo:
      'Objetivo: cuidar do sofrimento e ampliar a autonomia, sem reduzir a mulher ao diagnóstico.',
    ordem: 1,
  },
  {
    id: 'psicologia',
    nome: 'Psicologia',
    resumo:
      'Acolhimento psicológico para elaborar vivências, fortalecer recursos internos e recuperar projetos de vida.',
    descricao:
      'Escuta sem julgamento, com respeito ao tempo, aos limites e à história de cada mulher, em abordagem sensível a traumas.',
    icone: 'Brain',
    cor: 'wine',
    tipo: 'especializado',
    titulo: 'Escuta protegida para reconstruir autonomia emocional',
    subtitulo:
      'Acolhimento psicológico para elaborar vivências, fortalecer recursos internos e recuperar projetos de vida.',
    particularidades: [
      'Escuta sem julgamento, com respeito ao tempo, aos limites e à história de cada mulher.',
      'Abordagem sensível a traumas, evitando repetição do relato e revitimização.',
      'Avaliação e acompanhamento individual ou em grupo, com registro mínimo e sigilo.',
    ],
    comoSeraFeito: [
      'Acolhimento para compreender a demanda, a rede de apoio e possíveis riscos.',
      'Definição conjunta dos objetivos e da frequência dos encontros.',
      'Sessões individuais e, quando adequado, atividades coletivas de fortalecimento.',
      'Encaminhamento articulado para psiquiatria, assistência jurídica ou rede de proteção.',
    ],
    objetivo: 'A mulher define o ritmo do relato: acolher não significa pressionar para contar.',
    ordem: 2,
  },
  {
    id: 'massoterapia',
    nome: 'Massoterapia',
    resumo:
      'Prática complementar voltada ao relaxamento, alívio de tensões e percepção segura do próprio corpo.',
    descricao:
      'Atendimento complementar com consentimento explícito, privacidade e direito de interromper a sessão a qualquer momento.',
    icone: 'Flower2',
    cor: 'sage',
    tipo: 'especializado',
    titulo: 'Toque com consentimento, limites claros e foco no bem-estar',
    subtitulo:
      'Prática complementar voltada ao relaxamento, alívio de tensões e percepção segura do próprio corpo.',
    particularidades: [
      'Atendimento complementar: não diagnostica nem substitui cuidados médicos ou psicológicos.',
      'Consentimento explícito, privacidade e direito de interromper a sessão.',
      'Triagem de dor, lesões e restrições; técnica e intensidade adaptadas ao conforto.',
    ],
    comoSeraFeito: [
      'Anamnese breve, explicação do atendimento e confirmação do consentimento.',
      'Definição conjunta das regiões corporais e técnicas autorizadas.',
      'Sessão individual com higiene, privacidade e comunicação constante.',
      'Registro da resposta e encaminhamento quando houver contraindicação.',
    ],
    objetivo: 'Nenhuma técnica será realizada sem consentimento claro e possibilidade de recusa.',
    ordem: 3,
  },
  {
    id: 'educacao-fisica',
    nome: 'Educação Física',
    resumo:
      'Atividades corporais para saúde, autoestima, socialização, autonomia e qualidade de vida.',
    descricao:
      'Exercícios adaptados, sem pressão estética ou comparação de desempenho, com progressão gradual e respeito à dor.',
    icone: 'Dumbbell',
    cor: 'navy',
    tipo: 'especializado',
    titulo: 'Movimento seguro, gradual e adaptado a cada mulher',
    subtitulo:
      'Atividades corporais para saúde, autoestima, socialização, autonomia e qualidade de vida.',
    particularidades: [
      'Avaliação das condições de saúde, rotina, limitações, preferências e objetivos.',
      'Exercícios adaptados, sem pressão estética ou comparação de desempenho.',
      'Progressão gradual, respeito à dor e monitoramento da evolução funcional.',
    ],
    comoSeraFeito: [
      'Triagem, anamnese e avaliação funcional.',
      'Plano simples, seguro e possível de manter na rotina.',
      'Sessões individuais ou em grupo: mobilidade, força, equilíbrio e condicionamento.',
      'Reavaliações e articulação com a equipe diante de sinais de alerta.',
    ],
    objetivo:
      'O foco é saúde e autonomia: cada evolução será comparada apenas com o próprio percurso.',
    ordem: 4,
  },
  {
    id: 'assistencia-juridica',
    nome: 'Assistência Jurídica',
    resumo:
      'Orientação sobre direitos, medidas de proteção e caminhos legais, com sigilo e respeito à autonomia.',
    descricao:
      'Escuta reservada e objetiva, explicação de direitos e medidas protetivas, e encaminhamento à rede de proteção.',
    icone: 'Scale',
    cor: 'wine',
    tipo: 'especializado',
    titulo: 'Informação jurídica clara para decisões conscientes e proteção',
    subtitulo:
      'Orientação sobre direitos, medidas de proteção e caminhos legais, com sigilo e respeito à autonomia.',
    particularidades: [
      'Escuta reservada e objetiva, evitando repetição do relato e exposição desnecessária.',
      'Explicação de direitos, medidas protetivas e alternativas cíveis, familiares e criminais.',
      'Organização de provas e documentos; atuação judicial somente por profissional habilitado.',
    ],
    comoSeraFeito: [
      'Identificação da demanda, da urgência e de eventual risco imediato.',
      'Levantamento dos fatos, documentos e providências já adotadas.',
      'Orientação simples e definição conjunta dos próximos passos.',
      'Encaminhamento à DEAM, Defensoria, Ministério Público ou Judiciário.',
    ],
    objetivo:
      'A orientação fortalece escolhas; situações de risco exigem acionamento imediato da rede de proteção.',
    ordem: 5,
  },
  {
    id: 'servico-social',
    nome: 'Serviço Social',
    resumo:
      'Atendimento socioassistencial para identificar necessidades, orientar direitos e articular a rede de proteção.',
    descricao:
      'Escuta qualificada, orientação sobre benefícios e serviços públicos, e plano de acompanhamento construído com a mulher.',
    icone: 'Handshake',
    cor: 'sage',
    tipo: 'especializado',
    titulo: 'Acolhimento social para acessar direitos e fortalecer autonomia',
    subtitulo:
      'Atendimento socioassistencial para identificar necessidades, orientar direitos e articular a rede de proteção.',
    particularidades: [
      'Escuta qualificada e avaliação das condições sociais, familiares, econômicas e da rede de apoio.',
      'Orientação sobre benefícios, serviços públicos, documentação e acesso a direitos.',
      'Plano de acompanhamento construído com a mulher, respeitando sigilo, autonomia e não revitimização.',
    ],
    comoSeraFeito: [
      'Acolhimento e identificação de demandas, vulnerabilidades e riscos.',
      'Construção conjunta do plano de acompanhamento e dos encaminhamentos necessários.',
      'Articulação com saúde, assistência social, educação, habitação, trabalho e rede de proteção.',
      'Acompanhamento dos encaminhamentos, com registro mínimo e retorno programado.',
    ],
    objetivo:
      'O Serviço Social conecta direitos e oportunidades, sem decidir pela mulher nem substituir sua autonomia.',
    ordem: 6,
  },
] satisfies Servico[];

export const servicos: Servico[] = [...areas, ...especializados];

export function getServico(id: string): Servico | undefined {
  return servicos.find((s) => s.id === id);
}
