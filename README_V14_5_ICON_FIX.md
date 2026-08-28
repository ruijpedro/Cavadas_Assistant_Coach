# Cavadas Manager V14.5 — Android Launcher Icon Fix

Corrige o ícone genérico no telemóvel.

Causa:
o workflow anterior copiava `ic_launcher.png`, mas o Android launcher podia usar
`ic_launcher_round`, que continuava a ser o recurso genérico criado pelo Capacitor.

V14.5:
- aplica o emblema oficial em `ic_launcher.png`;
- cria/aplica `ic_launcher_round.png` em mdpi/hdpi/xhdpi/xxhdpi/xxxhdpi;
- cria os recursos adaptativos normal e round para Android 8+;
- força o AndroidManifest a usar:
  - `@mipmap/ic_launcher`
  - `@mipmap/ic_launcher_round`
- verifica todos os recursos antes do Gradle;
- mantém a V14.4, pnpm/Corepack e sem IA.
