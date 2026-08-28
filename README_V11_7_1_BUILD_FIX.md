# Cavadas Manager V11.7.1 — GitHub Build Fix

Correção do erro `npm error Exit handler never called!`.

- npm fixado em 10.9.2 no GitHub Actions;
- limpeza de `node_modules` e cache antes da instalação;
- repetição automática de uma instalação falhada;
- Vite e plugin React declarados explicitamente em `devDependencies`;
- build só começa após verificar `node_modules/.bin/vite`;
- `npm run build` em vez de `npx vite build`, impedindo o npx de instalar uma versão aleatória do Vite;
- Capacitor chamado com `npx --no-install`;
- Android verifica a existência de `gradlew` antes da compilação.
