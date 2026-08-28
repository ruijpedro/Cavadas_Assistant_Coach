# Cavadas Manager V14.2 — Preflight Fix

Corrige o falso positivo da V14.1.

O preflight anterior confundia JSX válido como:
`{page==='postmatch'&&<PostMatch ...>}`

com corrupção da navegação.

Na V14.2:
- só são rejeitados padrões inválidos dentro de `active={...}`;
- os módulos Modelo de Jogo, Bolas Paradas, Adversários e Pós-jogo são verificados dentro de `<main>`;
- mantém-se a V14 completa;
- mantém-se pnpm/Corepack;
- continua sem IA.
