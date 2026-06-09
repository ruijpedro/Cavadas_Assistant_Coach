import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Brain, CalendarDays, ClipboardList, Download, RefreshCw, Shield, Trophy, Users, Wifi, Zap } from 'lucide-react'
import jsPDF from 'jspdf'
import './style.css'

const uid = () => Math.random().toString(36).slice(2, 10)
const nowIso = () => new Date().toISOString()

const DEFAULT_ATLETAS = [
  { id:'a1', nome:'João', numero:'9', posicao:'Pivot', pe:'Direito', estado:'Disponível' },
  { id:'a2', nome:'Miguel', numero:'7', posicao:'Ala', pe:'Esquerdo', estado:'Disponível' },
  { id:'a3', nome:'Pedro', numero:'10', posicao:'Ala', pe:'Direito', estado:'Disponível' },
  { id:'a4', nome:'Rafael', numero:'1', posicao:'GR', pe:'Direito', estado:'Disponível' }
]

const EVENTOS = ['Golo','Assistência','Remate','Recuperação','Perda','Interceção','Pivotagem','Entrada 2.º poste','1x1 ganho','1x1 perdido','Erro defensivo']
const ZONAS = ['Esquerda','Centro','Direita','Defesa','Ataque','Segundo poste']

function getLocal(key, fallback){
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)) } catch { return fallback }
}
function setLocal(key, value){ localStorage.setItem(key, JSON.stringify(value)) }

async function postJson(url, payload){
  const r = await fetch(url, { method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify(payload) })
  const data = await r.json().catch(()=>({}))
  if(!r.ok) throw new Error(data.error || 'Erro de comunicação')
  return data
}

function buildStats(eventos){
  const count = (tipo) => eventos.filter(e => e.evento === tipo).length
  const byPlayer = {}
  eventos.forEach(e => {
    byPlayer[e.jogador] ||= { jogador:e.jogador, total:0, golos:0, assistencias:0, perdas:0, recuperacoes:0 }
    byPlayer[e.jogador].total++
    if(e.evento === 'Golo') byPlayer[e.jogador].golos++
    if(e.evento === 'Assistência') byPlayer[e.jogador].assistencias++
    if(e.evento === 'Perda') byPlayer[e.jogador].perdas++
    if(e.evento === 'Recuperação') byPlayer[e.jogador].recuperacoes++
  })
  return {
    total:eventos.length,
    golos:count('Golo'), remates:count('Remate'), assistencias:count('Assistência'),
    perdas:count('Perda'), recuperacoes:count('Recuperação'), intercecoes:count('Interceção'),
    pivotagens:count('Pivotagem'), segundoPoste:count('Entrada 2.º poste'),
    jogadores:Object.values(byPlayer).sort((a,b)=>b.total-a.total)
  }
}

function App(){
  const [tab,setTab]=useState('dashboard')
  const [atletas,setAtletas]=useState(()=>getLocal('cac_atletas', DEFAULT_ATLETAS))
  const [jogos,setJogos]=useState(()=>getLocal('cac_jogos', [{id:'j1', data:new Date().toISOString().slice(0,10), adversario:'Adversário Teste', competicao:'Competição', resultado:''}]))
  const [eventos,setEventos]=useState(()=>getLocal('cac_eventos', []))
  const [adversarios,setAdversarios]=useState(()=>getLocal('cac_adversarios', []))
  const [jogoId,setJogoId]=useState(()=>getLocal('cac_jogo_atual','j1'))
  const [minuto,setMinuto]=useState('1')
  const [jogador,setJogador]=useState(DEFAULT_ATLETAS[0].nome)
  const [zona,setZona]=useState('Centro')
  const [pergunta,setPergunta]=useState('O que devo corrigir ao intervalo?')
  const [resposta,setResposta]=useState('')
  const [loading,setLoading]=useState(false)
  const [googleUrl,setGoogleUrl]=useState(import.meta.env.VITE_GOOGLE_SCRIPT_URL || '')
  const aiEndpoint = import.meta.env.VITE_COACH_AI_ENDPOINT || '/api/coach-ai'

  useEffect(()=>setLocal('cac_atletas', atletas),[atletas])
  useEffect(()=>setLocal('cac_jogos', jogos),[jogos])
  useEffect(()=>setLocal('cac_eventos', eventos),[eventos])
  useEffect(()=>setLocal('cac_adversarios', adversarios),[adversarios])
  useEffect(()=>setLocal('cac_jogo_atual', jogoId),[jogoId])

  const eventosJogo = useMemo(()=>eventos.filter(e=>e.jogoId===jogoId),[eventos,jogoId])
  const stats = useMemo(()=>buildStats(eventosJogo),[eventosJogo])
  const jogoAtual = jogos.find(j=>j.id===jogoId) || jogos[0]

  function addEvento(tipo){
    const ev = { id:uid(), jogoId, minuto, jogador, evento:tipo, zona, obs:'', createdAt:nowIso() }
    setEventos([ev,...eventos])
    if(googleUrl) postJson(googleUrl,{table:'EVENTOS',data:ev}).catch(()=>{})
  }

  async function perguntarAI(tipo='chat'){
    setLoading(true); setResposta('')
    try{
      const contexto = { tipo, jogoAtual, stats, eventos:eventosJogo.slice(0,200), atletas, adversarios }
      const data = await postJson(aiEndpoint,{ pergunta, contexto })
      setResposta(data.resposta || 'Sem resposta.')
    }catch(err){
      setResposta(`Não foi possível contactar a IA online. Verifica backend/API key.\n\nDetalhe: ${err.message}`)
    }finally{ setLoading(false) }
  }

  async function importarGoogle(){
    if(!googleUrl) return alert('Cola primeiro o URL do Apps Script.')
    const r = await fetch(googleUrl)
    const data = await r.json()
    if(data.atletas?.length) setAtletas(data.atletas)
    if(data.jogos?.length) setJogos(data.jogos)
    if(data.eventos?.length) setEventos(data.eventos)
    if(data.adversarios?.length) setAdversarios(data.adversarios)
  }

  function exportPDF(){
    const doc = new jsPDF()
    doc.setFontSize(16); doc.text('Cav Assistant Coach - Relatório', 14, 18)
    doc.setFontSize(11)
    doc.text(`Jogo: ${jogoAtual?.adversario || ''}`, 14, 30)
    doc.text(`Golos: ${stats.golos} | Remates: ${stats.remates} | Perdas: ${stats.perdas} | Recuperações: ${stats.recuperacoes}`, 14, 38)
    const lines = doc.splitTextToSize(resposta || 'Sem análise IA gerada.', 180)
    doc.text(lines, 14, 52)
    doc.save('Cav_Assistant_Coach_Relatorio.pdf')
  }

  return <div className="app">
    <header className="topbar">
      <div className="brand"><div className="logo">2Y</div><div><h1>Cav Assistant Coach</h1><p>Apoia a decisão. Nunca substitui o treinador.</p></div></div>
      <div className="online"><Wifi size={18}/> Online AI</div>
    </header>
    <nav className="tabs">
      <button onClick={()=>setTab('dashboard')} className={tab==='dashboard'?'active':''}><Trophy/>Dashboard</button>
      <button onClick={()=>setTab('plantel')} className={tab==='plantel'?'active':''}><Users/>Plantel</button>
      <button onClick={()=>setTab('jogos')} className={tab==='jogos'?'active':''}><CalendarDays/>Jogos</button>
      <button onClick={()=>setTab('scout')} className={tab==='scout'?'active':''}><Zap/>Scout</button>
      <button onClick={()=>setTab('ai')} className={tab==='ai'?'active':''}><Brain/>Coach AI</button>
      <button onClick={()=>setTab('google')} className={tab==='google'?'active':''}><RefreshCw/>Google</button>
    </nav>

    <main>
      {tab==='dashboard' && <section className="grid">
        <Card title="Jogo atual" icon={<Shield/>}><b>{jogoAtual?.adversario}</b><p>{jogoAtual?.data} · {jogoAtual?.competicao}</p></Card>
        <Card title="Eventos" icon={<ClipboardList/>}><b>{stats.total}</b><p>registos neste jogo</p></Card>
        <Card title="Ataque" icon={<Trophy/>}><b>{stats.golos} golos · {stats.remates} remates</b><p>{stats.segundoPoste} entradas ao 2.º poste</p></Card>
        <Card title="Alertas IA" icon={<Brain/>}><p>{stats.perdas>stats.recuperacoes?'Perdas superiores às recuperações.':'Equilíbrio defensivo aceitável nos dados registados.'}</p></Card>
      </section>}

      {tab==='plantel' && <section className="panel"><h2>Plantel competitivo</h2><div className="cards">{atletas.map(a=><div className="player" key={a.id}><b>#{a.numero} {a.nome}</b><span>{a.posicao} · Pé {a.pe}</span><small>{a.estado}</small></div>)}</div></section>}

      {tab==='jogos' && <section className="panel"><h2>Jogos</h2><select value={jogoId} onChange={e=>setJogoId(e.target.value)}>{jogos.map(j=><option key={j.id} value={j.id}>{j.data} · {j.adversario}</option>)}</select><button onClick={()=>{const j={id:uid(),data:new Date().toISOString().slice(0,10),adversario:'Novo adversário',competicao:'Competição',resultado:''};setJogos([j,...jogos]);setJogoId(j.id)}}>Adicionar jogo</button></section>}

      {tab==='scout' && <section className="panel"><h2>Scout Match</h2><div className="formrow"><input value={minuto} onChange={e=>setMinuto(e.target.value)} placeholder="Min"/><select value={jogador} onChange={e=>setJogador(e.target.value)}>{atletas.map(a=><option key={a.id}>{a.nome}</option>)}</select><select value={zona} onChange={e=>setZona(e.target.value)}>{ZONAS.map(z=><option key={z}>{z}</option>)}</select></div><div className="eventgrid">{EVENTOS.map(ev=><button key={ev} onClick={()=>addEvento(ev)}>{ev}</button>)}</div><h3>Últimos eventos</h3>{eventosJogo.slice(0,8).map(e=><p className="event" key={e.id}>{e.minuto}' · {e.jogador} · <b>{e.evento}</b> · {e.zona}</p>)}</section>}

      {tab==='ai' && <section className="panel"><h2>Coach AI Online</h2><textarea value={pergunta} onChange={e=>setPergunta(e.target.value)} /><div className="actions"><button onClick={()=>perguntarAI('chat')} disabled={loading}>{loading?'A analisar...':'Perguntar à IA'}</button><button onClick={()=>{setPergunta('Analisa a primeira parte e diz o que devo corrigir ao intervalo.'); setTimeout(()=>perguntarAI('intervalo'),50)}}>Análise intervalo</button><button onClick={()=>{setPergunta('Gera relatório pós-jogo com positivos, negativos, padrões e treino recomendado.'); setTimeout(()=>perguntarAI('pos-jogo'),50)}}>Relatório pós-jogo</button><button onClick={exportPDF}><Download/> PDF</button></div><pre className="answer">{resposta || 'A resposta da IA aparece aqui.'}</pre></section>}

      {tab==='google' && <section className="panel"><h2>Google Sheets Online</h2><p>Cola o URL do Apps Script publicado como Web App.</p><input value={googleUrl} onChange={e=>setGoogleUrl(e.target.value)} placeholder="https://script.google.com/macros/s/.../exec"/><div className="actions"><button onClick={importarGoogle}>Importar Google Sheets</button><button onClick={()=>alert('Os novos eventos já são enviados automaticamente quando o URL está configurado.')}>Sincronização ativa</button></div><p className="note">O código do Apps Script está em <b>scripts/google-apps-script.js</b>.</p></section>}
    </main>
  </div>
}

function Card({title, icon, children}){ return <div className="card"><div className="cardtitle">{icon}<span>{title}</span></div>{children}</div> }

createRoot(document.getElementById('root')).render(<App />)
