export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido' });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'OPENAI_API_KEY não configurada no backend.' });
    return;
  }

  try {
    const body = req.body || {};
    const pergunta = body.pergunta || 'Analisa o jogo.';
    const contexto = body.contexto || {};

    const systemPrompt = `És o Cav Assistant Coach, um assistente técnico de futebol/futsal.
Regras obrigatórias:
- Nunca substituis nem mandas no treinador.
- Dás apoio à decisão com base nos dados fornecidos.
- Respondes em português de Portugal.
- Sê objetivo, prático e útil para treinador principal, adjunto ou analista.
- Quando não houver dados suficientes, diz isso claramente.
- Estrutura a resposta em: Diagnóstico, Evidências, Sugestões para o treinador.`;

    const userPrompt = `Pergunta do treinador: ${pergunta}\n\nDados disponíveis:\n${JSON.stringify(contexto, null, 2)}`;

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.35,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ]
      })
    });

    const data = await r.json();
    if (!r.ok) {
      res.status(r.status).json({ error: data?.error?.message || 'Erro OpenAI' });
      return;
    }

    res.status(200).json({ resposta: data.choices?.[0]?.message?.content || 'Sem resposta da IA.' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Erro inesperado.' });
  }
}
