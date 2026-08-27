# CEAAM — protótipo do aplicativo

Protótipo mobile-first do aplicativo do **CEAAM (Centro Especializado de Assistência e Apoio à Mulher)**, de Feira de Santana – BA. O app reúne, num só lugar, orientações de prevenção e direitos, os serviços oferecidos pelo centro, agendamento de atendimento, acompanhamento de bem-estar, rede de apoio e recursos de segurança (saída rápida, botão de pânico simulado e modo disfarce).

É um **protótipo navegável para demonstração**: não há backend, cadastro nem envio real de alertas. Veja a seção "O que é simulado".

## Stack

- Vite 8 + React 18 + TypeScript
- Tailwind CSS 3
- react-router-dom 6 (rotas com `React.lazy` / code-splitting)
- lucide-react (ícones)
- vite-plugin-pwa (manifest + service worker com precache, `autoUpdate`)
- Deploy: Vercel (SPA com rewrite para `index.html`)

## Como rodar

```bash
npm i
npm run dev        # http://localhost:5173
npm run build      # gera dist/ (tsc + vite build + service worker)
npm run preview    # serve dist/ em http://localhost:4173
```

Em telas ≥ 768 px o app aparece dentro de uma moldura de celular (390×844) com scroll interno; abaixo disso ocupa a tela inteira, como no dispositivo.

## Estrutura de pastas

```
.
├── index.html                 # meta tags PWA, fonte DM Sans
├── public/                    # manifest.webmanifest, ícones (svg, 180/192/512 png)
├── scripts/gen-icons.mjs      # gera os PNGs de ícone sem dependências
├── vercel.json                # rewrite SPA
├── vite.config.ts             # react + VitePWA
└── src/
    ├── App.tsx                # rotas (lazy) + PhoneFrame + DisguiseGate
    ├── components/
    │   ├── AppShell.tsx       # header, <main> rolável, TabBar, PanicFab, título da aba
    │   ├── PhoneFrame.tsx     # moldura de celular em desktop
    │   ├── TabBar.tsx         # navegação inferior (5 abas)
    │   ├── ui/                # Button, Card, Badge, Icon, SectionTitle
    │   ├── home/ orientacoes/ servicos/ agenda/ saude/ rede/ sobre/
    ├── data/                  # conteúdo tipado (serviços, orientações, contatos, institucional, fluxo)
    ├── features/seguranca/    # Ajuda (countdown), Calculator (disfarce), quickExit, contatos de confiança
    ├── pages/                 # uma página por rota
    ├── store/                 # localStorage + useSyncExternalStore (agendamentos, saúde, segurança)
    └── types.ts
```

Rotas: `/`, `/orientacoes`, `/orientacoes/:id`, `/servicos`, `/servicos/:id`, `/agendar`, `/minha-saude`, `/rede-apoio`, `/sobre`, `/ajuda` (qualquer outra redireciona para `/`).

## Roteiro de demonstração (5–8 min)

1. **Saída rápida (30 s)** — Na Home, mostre o botão "Saída rápida" no topo (ou `Esc` 3× no teclado). Ele substitui a página atual por uma busca de previsão do tempo, sem deixar o app no histórico. Volte para a URL do app.
2. **Home (30 s)** — Saudação, atalho em destaque "Preciso de ajuda", cartões com as funções do app, atalhos e frases de acolhimento.
3. **Preciso de ajuda → countdown (1 min)** — Toque em "Preciso de ajuda" (ou no botão flutuante "Ajuda"). Toque em "Acionar rede de apoio": uma contagem de 5 s começa; toque em "Cancelar" para interromper. Deixe terminar uma vez para ver "Alerta simulado enviado" (lista os contatos de confiança cadastrados). Mostre "Ligar 190/180" (só abre o discador) e cadastre um contato de confiança.
4. **Serviços → Psicologia → Agendar (1,5 min)** — Aba "Serviços": áreas de atuação e atendimentos especializados. Abra "Psicologia", troque as abas "Particularidades / Como será feito / Objetivo" e toque em "Agendar este atendimento". No agendamento: escolha data (dias úteis), horário, opcionalmente o nome, e confirme. Veja "Meus agendamentos".
5. **Minha saúde (45 s)** — Faça um check-in de humor (com "Dormiu bem?" e nota) e salve. Aparece o gráfico dos últimos 7 dias e o histórico. Salvar de novo no mesmo dia substitui o registro.
6. **Orientações → sinais → bem-estar (1,5 min)** — Aba "Orientações". Abra "Reconheça os sinais" e marque alguns itens: a pontuação e a mensagem de orientação mudam por faixa. Volte e abra "Cuide do seu bem-estar": toque em "Iniciar" na respiração 4-4-6 (o círculo guia inspirar/segurar/expirar) e mostre o grounding 5-4-3-2-1.
7. **Rede de apoio (30 s)** — Contatos de emergência (190, 180, SAMU…) e serviços locais. Toque em "Ver aviso do contato" para mostrar que os números locais são ilustrativos.
8. **Sobre → fluxo (30 s)** — Missão, contexto de Feira de Santana e o fluxo de atendimento (stepper).
9. **Modo disfarce com PIN (1 min)** — Em "Preciso de ajuda" → "Configurações de segurança", ative "Modo disfarce". Abra o app numa **nova aba** (ou feche e abra): aparece uma calculadora funcional. Digite `1904` e toque em `=` para destravar. Para encerrar, desative o modo disfarce no mesmo lugar.

## O que é simulado

- **Sem backend**: nenhum dado sai do dispositivo. Agendamentos, check-ins de saúde, contatos de confiança e configurações ficam em `localStorage` (o destravamento do disfarce fica em `sessionStorage`).
- **Contatos locais fictícios**: os números de DEAM, CEAAM, Defensoria e CRAS/CREAS são ilustrativos e sinalizados como tal na interface. Só 190, 180, SAMU e similares são números reais.
- **Ligações**: acontecem apenas via link `tel:` ao tocar em "Ligar" — nada é discado automaticamente.
- **Botão de pânico / alerta à rede de apoio**: o countdown e a mensagem "alerta enviado" são simulação; nenhuma mensagem, SMS ou localização é enviada.
- **Agendamentos e lembretes**: não há agenda real nem notificações.
- **Conteúdo**: os textos institucionais seguem o material do CEAAM; orientações e práticas são conteúdo demonstrativo.

## Próximos passos (fase 2)

- **Backend e autenticação** (ex.: Supabase/Firebase): contas, agendamentos reais integrados à agenda do centro, sincronização entre dispositivos e sigilo adequado dos dados (LGPD).
- **Notificações**: lembretes de consulta e check-in via push (web e nativo).
- **Alerta real à rede de apoio**: envio de SMS/WhatsApp e localização aos contatos de confiança, com consentimento e política clara.
- **Publicação nas lojas**: empacotar com Capacitor (ou Expo), com ícones, splash e permissões nativas (ligação, localização, notificações).
- **Integração com a rede de proteção**: números e horários reais da DEAM, Defensoria, CRAS/CREAS e rede municipal, mantidos pelo CEAAM em um painel administrativo.
- **Acessibilidade e pesquisa com usuárias**: testes com o público-alvo, leitores de tela, tamanhos de fonte e modo de alto contraste.
