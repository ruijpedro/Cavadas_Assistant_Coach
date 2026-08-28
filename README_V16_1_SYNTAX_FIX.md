# Cavadas Manager V16.1 — Syntax Fix

Corrige a falha de compilação da V16.0 em `src/main.jsx`.

Erro corrigido no `loadStep`:
`setPaths((x.paths||[]).map(p=>({...p})));`

Também:
- atualiza a versão para 16.1.0;
- atualiza o nome do APK no workflow;
- adiciona uma verificação de regressão no preflight;
- mantém o Simple Tactical, ícone Android e restantes módulos.
