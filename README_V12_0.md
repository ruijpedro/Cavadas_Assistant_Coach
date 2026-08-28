# Cavadas Manager V12.0 — Season Hub

Sem IA.

## Build corrigido
- Node 20.19.4 e npm 10.9.2 fixos no GitHub Actions.
- Vite 6.4.3 e plugin React 4.3.4 fixos.
- o workflow nunca executa `npx vite build`; usa exclusivamente o Vite instalado pelo projeto.
- 3 tentativas de instalação, limpeza de cache e validação explícita de `node_modules/.bin/vite`.
- APK usa o Capacitor local (`./node_modules/.bin/cap`).

## Evolução funcional
1. Dashboard de época completo.
2. Presenças por treino: presente, ausente, justificado, indisponível.
3. Treinos ligados ao plantel e ficha individual.
4. Jogos/Scout com convocatória, cinco inicial, minutos e eventos.
5. Ficha individual com convocatórias, jogos, golos, assistências e assiduidade.
6. Planeamento semanal.
7. Convocatórias profissionais exportáveis em PDF e PNG com símbolo Gruefwiss.
8. Fichas de treino exportáveis em PDF e PNG com símbolo Gruefwiss.
9. Estatísticas globais da época.
10. Mantém Exercícios e Quadro Tático integrados.
11. PT / DE / FR / LB / EN.
