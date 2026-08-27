/** Paleta de cores semânticas do CEAAM. */
export type Cor = 'wine' | 'navy' | 'lilac' | 'sage';

/** Nome de ícone do lucide-react (ex.: "HeartHandshake"). */
export type IconeNome = string;

export interface Servico {
  /** slug kebab-case sem acento */
  id: string;
  nome: string;
  resumo: string;
  descricao: string;
  icone: IconeNome;
  cor: Cor;
  tipo: 'area' | 'especializado';
  /** Frase-manchete (apenas especializados) */
  titulo?: string;
  subtitulo?: string;
  particularidades?: string[];
  comoSeraFeito?: string[];
  /** Frase do box colorido (apenas especializados) */
  objetivo?: string;
  ordem: number;
}

export interface SecaoOrientacao {
  titulo: string;
  paragrafos: string[];
  lista?: string[];
}

export interface Sinal {
  texto: string;
  peso: 1 | 2 | 3;
}

export interface FaixaSinais {
  id: 'baixo' | 'medio' | 'alto';
  titulo: string;
  /** pontuação mínima (inclusiva) */
  min: number;
  texto: string;
}

export interface Pratica {
  titulo: string;
  descricao: string;
  duracaoSeg?: number;
  passos?: string[];
}

export interface Orientacao {
  id: string;
  titulo: string;
  resumo: string;
  icone: IconeNome;
  cor: Cor;
  tipo: 'artigo' | 'checklist' | 'pratica';
  secoes: SecaoOrientacao[];
  sinais?: Sinal[];
  faixas?: FaixaSinais[];
  praticas?: Pratica[];
  citacao?: Frase;
}

export interface Contato {
  id: string;
  nome: string;
  numero: string;
  descricao: string;
  tipo: 'emergencia' | 'oficial' | 'ceaam' | 'juridico' | 'social';
  /** true quando o número é ilustrativo (protótipo) */
  ficticio: boolean;
  horario?: string;
}

export interface EtapaFluxo {
  numero: number;
  titulo: string;
  descricao: string;
  icone: IconeNome;
}

export interface Objetivo {
  numero: number;
  verbo: string;
  texto: string;
}

export interface Frase {
  texto: string;
  autor?: string;
}

export interface Pilar {
  titulo: string;
  descricao: string;
  cor: Cor;
  icone: IconeNome;
}

export interface ItemOferta {
  titulo: string;
  descricao: string;
  icone: IconeNome;
}

export interface AppFuncao {
  titulo: string;
  descricao: string;
  icone: IconeNome;
  rota: string;
}

export interface DadosDemonstrativos {
  local: string;
  endereco: string;
  horario: string;
  email: string;
  telefone: string;
  /** e-mail e telefone são ilustrativos */
  ficticio: true;
}

export interface Institucional {
  nomeCompleto: string;
  sigla: string;
  cidade: string;
  slogan: string;
  lema: string;
  tagline: string;
  apresentacao: string[];
  porQue: string[];
  porQueDestaques: ItemOferta[];
  pilares: Pilar[];
  proposta: string[];
  oferece: ItemOferta[];
  objetivoGeral: string;
  objetivos: Objetivo[];
  publicoAlvo: string;
  metodologia: string[];
  metodologiaBase: string[];
  frases: Frase[];
  appIntro: string[];
  appFuncoes: AppFuncao[];
  rede: string[];
  dadosDemonstrativos: DadosDemonstrativos;
}
