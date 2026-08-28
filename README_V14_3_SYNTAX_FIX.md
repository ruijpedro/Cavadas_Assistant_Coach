# Cavadas Manager V14.3 — Syntax Fix

Corrige o erro de JSX identificado pelo Vite em `src/main.jsx` no módulo Jogos/Scout:

Antes:
`setDraft({...draft,notes:e.target.value)`

Depois:
`setDraft({...draft,notes:e.target.value})`

A V14.3 também reforça o preflight para tentar detetar setters JSX mal fechados antes do Vite.

Mantém:
- pnpm/Corepack;
- Vite 6.4.3;
- Quadro Tático V14;
- Planeamento da Época;
- Modelo de Jogo;
- Bolas Paradas;
- Adversários;
- Pós-jogo;
- sem IA.
