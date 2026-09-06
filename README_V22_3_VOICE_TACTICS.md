# Cavadas Manager V22.3 — Comandos Táticos por Voz

## Quadro Tático
Novos comandos:
- 🎙️ Comando de voz
- ⌨️ Comando escrito

Fluxo:
1. Ditar/escrever a jogada.
2. A app mostra **Interpretei assim**.
3. O treinador confirma ou corrige.
4. Só após confirmação são criados novos passos no quadro.
5. Rever em ▶ PLAY e guardar/guardar variante.

Exemplo:
`Jogador 2 faz diagonal para o lado direito da baliza. Jogador 3 remata cruzado para o segundo poste e o jogador 2 finaliza para golo.`

Vocabulário inicial:
diagonal, paralela, primeiro/segundo poste, direita/esquerda, pivô, apoio, passe, remate, remate cruzado e finalização.

## Reconhecimento de voz
Usa a Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`) quando disponível.
Em navegadores/WebViews sem suporte, o painel continua funcional por texto.
O reconhecimento nunca altera o quadro diretamente: existe sempre confirmação do treinador.

## Nota tática
O motor é um parser determinístico inicial, não substitui a leitura do treinador. A jogada gerada permanece totalmente editável.
