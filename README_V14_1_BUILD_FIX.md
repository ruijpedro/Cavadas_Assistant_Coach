# Cavadas Manager V14.1 — JSX + Build Fix

Este build corrige especificamente o erro:

`Expected "..." but found "page"`

que vinha da V13.1, onde os componentes Modelo de Jogo / Bolas Paradas /
Adversários / Pós-jogo tinham sido inseridos dentro do atributo `active`
do botão Quadro.

Na V14.1:
- a navegação está reconstruída corretamente;
- os módulos V13 são renderizados dentro de `<main>`;
- mantém-se o Quadro Tático V14;
- mantém-se a periodização da época;
- mantém-se pnpm/Corepack;
- acrescenta-se `scripts/preflight.mjs`;
- `pnpm run build` executa o preflight antes do Vite;
- continua sem IA.
