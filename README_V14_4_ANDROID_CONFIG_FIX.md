# Cavadas Manager V14.4 — Android Capacitor Config Fix

Corrige o erro:

`Could not find installation of TypeScript`

Diagnóstico:
- o projeto atual usa `capacitor.config.json`;
- não existe `capacitor.config.ts` no ZIP;
- o GitHub estava a encontrar um `.ts` antigo no repositório.

Correção V14.4:
- remove explicitamente `capacitor.config.ts`, `.mjs` e `.cjs` antigos no workflow;
- valida `capacitor.config.json`;
- recria sempre a pasta `android` do zero;
- executa `cap add android` e `cap sync android` usando o JSON correto;
- mantém pnpm/Corepack e Vite 6.4.3;
- mantém todas as funções V14;
- continua sem IA.
