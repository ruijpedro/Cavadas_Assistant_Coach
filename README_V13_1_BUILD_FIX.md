# V13.1 — npm build fix

O erro `Exit handler never called!` está documentado no npm CLI e reproduz-se com npm 10.9.2.

Esta versão:
- remove a fixação `npm@10.9.2`;
- deixa de usar `npm install` no GitHub Actions;
- usa Node 20.19.4 + Corepack + pnpm 10.15.0;
- mantém Vite 6.4.3 e plugin-react 4.3.4 do projeto;
- usa o mesmo método para WebApp e Android;
- verifica Vite/Capacitor antes do build;
- mantém todas as funcionalidades V13.0.

Não reintroduz IA.
