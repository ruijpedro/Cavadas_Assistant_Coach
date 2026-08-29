# Cavadas Manager V19.0 — Interpreter V2

Novo motor local/offline para **PDF, PPTX, vídeo e fotografias/esquemas manuscritos**.

- **PPTX Motion V2:** lê dimensão real do slide, IDs/posições dos objetos e `p:animMotion`; converte motion paths em passos.
- **PDF Vision V2:** renderiza realmente cada página e combina texto com deteção geométrica de peças/traços.
- **Imagem/Manuscrito V2:** fotografia ou scan; procura peças circulares/compactas e setas/traços alongados.
- **Video Tracking V2:** amostragem mais densa, IDs persistentes por posição/cor e keyframes por movimento.
- Foi removido o fallback que inventava posições genéricas quando a deteção de vídeo falhava.
- Resultados com confiança inferior a 82% ficam marcados para revisão manual.

Limitação: sem IA/cloud, manuscritos muito sobrepostos, fotos inclinadas/baixa luz, PDFs raster de baixa resolução e vídeo real continuam a exigir correção manual.
