# Cavadas Manager V22.2.2 — Build Fix GR

Correção do preflight do GitHub:
- mantém `GR nossa equipa` e `GR adversário`;
- mantém criação de GR por `role='gk'`;
- preflight deixou de depender de uma frase exata no JSX;
- valida a funcionalidade por padrões do código;
- ZIP passa a ter `package.json`, `src`, `.github`, etc. diretamente na raiz.

Isto evita falhas causadas por estrutura de pasta/nome de texto durante a compilação.
