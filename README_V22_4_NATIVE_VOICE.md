# Cavadas Manager V22.4 — Voz Nativa Android

O botão 🎙️ Comando de voz passa a usar primeiro reconhecimento de voz nativo no APK Android através de `@capacitor-community/speech-recognition` 7.0.1, compatível com Capacitor 7.

Fluxo:
1. Tocar em `🎙️ Comando de voz`.
2. Autorizar o microfone na primeira utilização.
3. Ditar a instrução tática.
4. A app transcreve a frase.
5. Tocar em `Interpretar`.
6. Rever `Interpretei assim`.
7. `Confirmar e criar animação`.
8. Rever em `▶ PLAY`.

A WebApp mantém fallback para Web Speech API e o comando escrito continua sempre disponível.
