import type { Orientacao } from '../types';

export const orientacoes = [
  {
    id: 'direitos',
    titulo: 'Conheça seus direitos',
    resumo: 'A Lei Maria da Penha em linguagem simples e onde buscar ajuda.',
    icone: 'Scale',
    cor: 'navy',
    tipo: 'artigo',
    secoes: [
      {
        titulo: 'O que diz a Lei Maria da Penha',
        paragrafos: [
          'A Lei 11.340/2006, conhecida como Lei Maria da Penha, protege mulheres contra a violência doméstica e familiar. Ela vale para qualquer relação de afeto ou convivência: companheiro, ex-companheiro, namorado, familiar ou pessoa que more na mesma casa.',
          'A lei reconhece que violência não é só agressão física. Ela também nomeia e protege contra outras formas de violência:',
        ],
        lista: [
          'Física: bater, empurrar, machucar ou ameaçar com objetos.',
          'Psicológica: humilhar, ameaçar, isolar, controlar ou manipular.',
          'Sexual: forçar ou constranger a qualquer ato sexual sem consentimento.',
          'Patrimonial: reter, destruir ou controlar dinheiro, documentos e bens.',
          'Moral: caluniar, difamar ou injuriar.',
        ],
      },
      {
        titulo: 'Medidas protetivas',
        paragrafos: [
          'As medidas protetivas de urgência são decisões da Justiça para garantir a sua segurança. Elas podem determinar, por exemplo, que o agressor se afaste de você, da sua casa e do seu local de trabalho, e que não faça contato por nenhum meio.',
          'Você pode pedir a medida protetiva na DEAM (Delegacia Especializada de Atendimento à Mulher) ou por meio da Defensoria Pública. O pedido não exige advogado e deve ser analisado pela Justiça em até 48 horas.',
        ],
      },
      {
        titulo: 'Onde buscar ajuda',
        paragrafos: [
          'Você não precisa passar por isso sozinha. Estes são alguns caminhos possíveis, e a equipe do CEAAM pode ajudar você a decidir por onde começar:',
        ],
        lista: [
          'DEAM: registro de ocorrência e pedido de medidas protetivas.',
          'Defensoria Pública: assistência jurídica gratuita e acompanhamento do caso.',
          'Ministério Público: fiscaliza o cumprimento da lei e pode atuar em seu favor.',
          'Judiciário: decide sobre as medidas protetivas e os processos.',
          'Ligue 180: escuta, orientação e denúncia, 24 horas, em todo o Brasil.',
        ],
      },
      {
        titulo: 'Como o CEAAM pode ajudar',
        paragrafos: [
          'Na Assistência Jurídica do CEAAM você recebe escuta reservada e objetiva, sem precisar repetir o relato mais de uma vez, explicação clara dos seus direitos e ajuda para organizar documentos. A orientação fortalece as suas escolhas; situações de risco exigem acionamento imediato da rede de proteção.',
        ],
      },
    ],
  },
  {
    id: 'sinais',
    titulo: 'Reconheça os sinais',
    resumo: 'Um checklist acolhedor para perceber situações que merecem atenção.',
    icone: 'Eye',
    cor: 'wine',
    tipo: 'checklist',
    secoes: [
      {
        titulo: 'Antes de começar',
        paragrafos: [
          'Muitas formas de violência começam de maneira sutil e vão se tornando parte da rotina. Este checklist não é um diagnóstico: é um convite para olhar com carinho para a sua história.',
          'Marque o que faz sentido para você. Nada do que aparecer aqui é culpa sua.',
        ],
      },
    ],
    sinais: [
      { texto: 'Controla com quem você fala, para onde vai ou o que veste.', peso: 2 },
      { texto: 'Afasta você de amigas, familiares ou colegas de trabalho.', peso: 2 },
      { texto: 'Humilha, xinga ou diminui você, em público ou em casa.', peso: 2 },
      { texto: 'Faz você duvidar da própria memória ou percepção das coisas.', peso: 2 },
      { texto: 'Vigia seu celular, redes sociais ou mensagens.', peso: 1 },
      { texto: 'Controla seu dinheiro, impede você de trabalhar ou retém documentos.', peso: 2 },
      { texto: 'Destrói ou ameaça destruir objetos seus.', peso: 2 },
      { texto: 'Espalha mentiras ou expõe sua intimidade para outras pessoas.', peso: 2 },
      { texto: 'Pressiona ou força você a ter relações sexuais quando não quer.', peso: 3 },
      { texto: 'Ameaça machucar você, seus filhos, familiares ou animais.', peso: 3 },
      { texto: 'Já empurrou, segurou com força, bateu ou machucou você.', peso: 3 },
      { texto: 'Você sente medo de como a pessoa vai reagir e evita contrariá-la.', peso: 2 },
    ],
    faixas: [
      {
        id: 'baixo',
        titulo: 'Vale a pena ficar atenta',
        min: 0,
        texto:
          'Você marcou poucos sinais, e isso já mostra que está olhando com cuidado para a sua vida. Se algo aqui incomodou, confie nessa percepção. Conversar com alguém de confiança ou com a equipe do CEAAM pode ajudar a entender melhor o que você está sentindo.',
      },
      {
        id: 'medio',
        titulo: 'Você merece apoio',
        min: 5,
        texto:
          'Alguns dos sinais que você marcou indicam situações que podem estar ferindo a sua liberdade e o seu bem-estar. Isso não é culpa sua. Você não precisa decidir nada agora, mas saiba que existe uma rede de apoio pronta para acolher você, sem julgamentos. Considere procurar o CEAAM ou ligar 180.',
      },
      {
        id: 'alto',
        titulo: 'Sua segurança importa',
        min: 10,
        texto:
          'Os sinais que você marcou indicam risco à sua integridade. Você não está sozinha e nada disso é culpa sua. Em perigo imediato, ligue 190. Para escuta e orientação, ligue 180 a qualquer hora. A equipe do CEAAM, a DEAM e a Defensoria Pública podem ajudar você a montar um plano de proteção no seu ritmo.',
      },
    ],
  },
  {
    id: 'bem-estar',
    titulo: 'Cuide do seu bem-estar',
    resumo: 'Práticas simples de respiração e presença para momentos difíceis.',
    icone: 'Flower2',
    cor: 'lilac',
    tipo: 'pratica',
    citacao: {
      texto: 'Cuidar de mim mesma não é autoindulgência, é autopreservação.',
      autor: 'Audre Lorde',
    },
    secoes: [
      {
        titulo: 'Um momento para você',
        paragrafos: [
          'Cuidar de si não é luxo: é uma forma de proteção. As práticas abaixo são curtas, podem ser feitas em qualquer lugar e não substituem o acompanhamento profissional. Se precisar, a equipe de Psicologia do CEAAM está disponível.',
        ],
      },
    ],
    praticas: [
      {
        titulo: 'Respiração 4-4-6',
        descricao:
          'Uma respiração lenta para acalmar o corpo quando a ansiedade aperta. Repita por cerca de um minuto.',
        duracaoSeg: 60,
        passos: [
          'Inspire pelo nariz contando até 4.',
          'Segure o ar contando até 4.',
          'Solte o ar pela boca, devagar, contando até 6.',
          'Repita o ciclo de 4 a 6 vezes.',
        ],
      },
      {
        titulo: 'Grounding 5-4-3-2-1',
        descricao:
          'Uma prática para trazer a mente de volta ao presente usando os cinco sentidos.',
        duracaoSeg: 120,
        passos: [
          'Note 5 coisas que você consegue ver.',
          'Note 4 coisas que você consegue tocar.',
          'Note 3 sons que você consegue ouvir.',
          'Note 2 cheiros que você consegue sentir.',
          'Note 1 sabor ou algo bom que você pode lembrar.',
        ],
      },
      {
        titulo: 'Pausa de autocuidado',
        descricao:
          'Três minutos só seus. Escolha uma coisa pequena e gentil para fazer por você agora.',
        duracaoSeg: 180,
        passos: [
          'Beba um copo de água com calma.',
          'Solte os ombros e relaxe a mandíbula.',
          'Diga para si mesma: "Eu mereço cuidado."',
          'Se puder, mande uma mensagem para alguém de confiança.',
        ],
      },
    ],
  },
  {
    id: 'rede',
    titulo: 'Prepare uma rede de apoio',
    resumo: 'Pessoas de confiança, plano de segurança e um combinado simples.',
    icone: 'Users',
    cor: 'sage',
    tipo: 'artigo',
    secoes: [
      {
        titulo: 'Pessoas de confiança',
        paragrafos: [
          'Uma rede de apoio começa com poucas pessoas: uma amiga, uma vizinha, alguém da família ou do trabalho. Escolha quem escuta sem julgar e conte, no seu tempo, o que estiver confortável para contar.',
          'Combine com essas pessoas como você vai avisar se precisar de ajuda e o que elas devem fazer nesse caso.',
        ],
      },
      {
        titulo: 'Plano de segurança',
        paragrafos: [
          'Um plano de segurança é um conjunto de combinados pensados com calma, para que você não precise decidir tudo em um momento de medo. Alguns pontos para considerar:',
        ],
        lista: [
          'Identifique um lugar seguro para onde ir, e como chegar até lá.',
          'Guarde uma pequena reserva de dinheiro, se for possível.',
          'Salve os números 180, 190 e das suas pessoas de confiança no celular.',
          'Se houver crianças, combine com elas um sinal para buscar ajuda.',
          'Evite cômodos sem saída (banheiro, cozinha) durante uma discussão.',
        ],
      },
      {
        titulo: 'Documentos importantes',
        paragrafos: [
          'Mantenha cópias ou fotos dos documentos em um lugar seguro, como a casa de uma pessoa de confiança ou um e-mail só seu:',
        ],
        lista: [
          'RG, CPF e certidões (nascimento, casamento).',
          'Documentos dos filhos e cartão de vacina.',
          'Cartão do SUS e receitas de medicamentos.',
          'Comprovante de residência e documentos de bens.',
          'Boletins de ocorrência e medidas protetivas, se houver.',
        ],
      },
      {
        titulo: 'Palavra-código',
        paragrafos: [
          'Combine com suas pessoas de confiança uma palavra ou frase simples, que não chame atenção, para avisar que você precisa de ajuda. Pode ser o nome de uma receita, uma pergunta sobre um filme ou um emoji específico.',
          'Ao receber a palavra-código, a pessoa já sabe o que fazer: ligar para você, ir até você ou acionar o 190.',
        ],
      },
      {
        titulo: 'Conte com o CEAAM',
        paragrafos: [
          'O Serviço Social e a Psicologia do CEAAM podem ajudar você a construir esse plano com calma, respeitando o seu ritmo e a sua autonomia. Você decide cada passo.',
        ],
      },
    ],
  },
] satisfies Orientacao[];

export function getOrientacao(id: string): Orientacao | undefined {
  return orientacoes.find((o) => o.id === id);
}
