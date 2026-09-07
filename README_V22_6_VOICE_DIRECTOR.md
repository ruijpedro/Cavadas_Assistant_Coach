# Cavadas Manager V22.6 — Voice Director

Melhorias do motor e interface de voz:
- direção ofensiva configurável: `ATACAMOS → / ←`;
- comandos simultâneos são agrupados no mesmo passo da animação;
- `↶ Voz` desfaz a última animação criada por comando;
- ações interpretadas podem ser reordenadas ou eliminadas antes de confirmar;
- novo léxico: bloqueio/cortina, tabela/devolução, entrelinhas/quebrar linha, abrir/dar largura, primeiro/segundo pau;
- tabela e remate passam a ter marcação própria no esquema;
- mantém voz nativa Android + fallback Web Speech + comando escrito;
- tudo continua editável antes e depois da criação.

Fluxo:
`Dizer jogada → interpretar → ajustar ações → criar animação → PLAY → guardar`.
