# Cav Assistant Coach v7 Online AI

App de competição para futebol/futsal com Coach AI online.

## Inclui
- React + Vite
- Capacitor Android
- Coach AI via backend `/api/coach-ai`
- Google Sheets via Apps Script
- Relatórios PDF
- Workflows GitHub para Web e Android

## Instalação local
```bash
npm install
npm run dev
```

## Build Web
```bash
npm run build
```

## OpenAI
A chave **não deve ficar no React**. Configura no backend/Vercel/GitHub Secrets:

```env
OPENAI_API_KEY=sk-proj-...
```

## Google Sheets
1. Cria uma Google Sheet.
2. Abre Extensões > Apps Script.
3. Cola o conteúdo de `scripts/google-apps-script.js`.
4. Corre `setup` uma vez.
5. Publica como Aplicação Web.
6. Cola o URL no separador Google da app ou em `.env`:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
```

## Android
```bash
npm run build
npx cap add android
npx cap sync android
```

Depois usa o workflow `Build Android APK` no GitHub.
