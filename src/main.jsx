import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Brain, CalendarDays, ClipboardList, Download, FileText, Goal, LayoutDashboard, MessageCircle, Plus, Save, Shield, Target, Trash2, Trophy, Users, Zap, Activity, Network, Dumbbell, BarChart3 } from 'lucide-react'
import jsPDF from 'jspdf'
import './style.css'

const STORAGE_KEY = 'cav_assistant_coach_v3'

const initialData = {
  activeMatchId: 1,
  athletes: [
    { id: 1, name: 'João Silva', number: 9, position: 'Pivot', foot: 'Direito', age: 16, status: 'Disponível' },
    { id: 2, name: 'Miguel Costa', number: 7, position: 'Ala Esquerdo', foot: 'Esquerdo', age: 15, status: 'Disponível' },
    { id: 3, name: 'Tiago Lopes', number: 10, position: 'Ala Direito', foot: 'Direito', age: 16, status: 'Condicionado' },
    { id: 4, name: 'Rafael Gomes', number: 5, position: 'Fixo', foot: 'Direito', age: 17, status: 'Disponível' },
    { id: 5, name: 'Diogo Ramos', number: 1, position: 'Guarda-redes', foot: 'Direito', age: 16, status: 'Disponível' }
  ],
  matches: [
    { id: 1, opponent: 'Adversário A', date: '2026-06-12', competition: 'Campeonato', sport: 'Futsal', system: '3-1', result: '3-2', notes: 'Testar ligação pivot + segundo poste.' }
  ],
  events: [
    { id: 101, matchId: 1, type: 'Pivotagem', athleteId: 1, athlete: 'João Silva', zone: 'Corredor direito', minute: '08:12', createdAt: new Date().toISOString() },
    { id: 102, matchId: 1, type: 'Segundo poste', athleteId: 2, athlete: 'Miguel Costa', zone: 'Ofensivo esquerdo', minute: '08:18', createdAt: new Date().toISOString() },
    { id: 103, matchId: 1, type: 'Golo', athleteId: 2, athlete: 'Miguel Costa', zone: 'Segundo poste', minute: '08:22', createdAt: new Date().toISOString() },
    { id: 104, matchId: 1, type: 'Recuperação', athleteId: 4, athlete: 'Rafael Gomes', zone: 'Centro', minute: '15:40', createdAt: new Date().toISOString() },
    { id: 105, matchId: 1, type: 'Perda', athleteId: 3, athlete: 'Tiago Lopes', zone: 'Defensivo direito', minute: '19:05', createdAt: new Date().toISOString() }
  ],
  trainings: [
    { id: 1, date: '2026-06-09', objective: 'Finalização ao segundo poste', duration: 75 },
    { id: 2, date: '2026-06-11', objective: 'Transição defensiva após perda', duration: 60 }
  ],
  rivals: [
    { id: 1, name: 'Adversário A', system: '3-1', strength: 'Transição rápida', weakness: 'Defesa do segundo poste', keyPlayer: 'Nº10' }
  ]
}

function loadData(){ try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || initialData } catch { return initialData } }
function saveData(data){ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) }
function uid(){ return Date.now() + Math.floor(Math.random() * 1000) }

function App(){
  const [tab, setTab] = useState('dashboard')
  const [data, setData] = useState(loadData)
  const [selectedAthlete, setSelectedAthlete] = useState(data.athletes[0]?.id || '')
  const [selectedZone, setSelectedZone] = useState('Centro ofensivo')
  const [coachQuestion, setCoachQuestion] = useState('O que devo treinar esta semana?')
  const [forms, setForms] = useState({
    athlete: { name: '', number: '', position: 'Ala', foot: 'Direito', age: '', status: 'Disponível' },
    match: { opponent: '', date: '', competition: '', sport: 'Futsal', system: '3-1', result: '', notes: '' },
    rival: { name: '', system: '3-1', strength: '', weakness: '', keyPlayer: '' }
  })

  const update = (next) => { setData(next); saveData(next) }
  const activeMatch = data.matches.find(m => m.id === Number(data.activeMatchId)) || data.matches[0]
  const stats = useMemo(() => calculateStats(data, activeMatch?.id), [data, activeMatch?.id])
  const patterns = useMemo(() => detectPatterns(data, activeMatch?.id), [data, activeMatch?.id])
  const dna = useMemo(() => calculateTeamDNA(data), [data])
  const trainingPlan = useMemo(() => generateTrainingPlan(stats, patterns, dna), [stats, patterns, dna])

  const addEvent = (type) => {
    const athlete = data.athletes.find(a => a.id === Number(selectedAthlete))
    const ev = { id: uid(), matchId: activeMatch?.id || 1, type, athleteId: athlete?.id || null, athlete: athlete?.name || 'Sem atleta', zone: selectedZone, minute: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }), createdAt: new Date().toISOString() }
    update({ ...data, events: [ev, ...data.events] })
  }
  const addAthlete = () => {
    if(!forms.athlete.name.trim()) return
    const next = { ...forms.athlete, id: uid(), number: Number(forms.athlete.number || 0), age: Number(forms.athlete.age || 0) }
    update({ ...data, athletes: [...data.athletes, next] })
    setForms(f => ({ ...f, athlete: { name: '', number: '', position: 'Ala', foot: 'Direito', age: '', status: 'Disponível' } }))
  }
  const addMatch = () => {
    if(!forms.match.opponent.trim()) return
    const next = { ...forms.match, id: uid() }
    update({ ...data, matches: [next, ...data.matches], activeMatchId: next.id })
    setForms(f => ({ ...f, match: { opponent: '', date: '', competition: '', sport: 'Futsal', system: '3-1', result: '', notes: '' } }))
  }
  const addRival = () => {
    if(!forms.rival.name.trim()) return
    update({ ...data, rivals: [{ ...forms.rival, id: uid() }, ...data.rivals] })
    setForms(f => ({ ...f, rival: { name: '', system: '3-1', strength: '', weakness: '', keyPlayer: '' } }))
  }
  const deleteEvent = (id) => update({ ...data, events: data.events.filter(e => e.id !== id) })

  const exportPdf = () => {
    const doc = new jsPDF()
    let y = 18
    doc.setFontSize(18); doc.text('Cav Assistant Coach', 14, y); y += 8
    doc.setFontSize(10); doc.text('Apoia a decisão. Nunca substitui o treinador.', 14, y); y += 12
    doc.setFontSize(12); doc.text(`Jogo: ${activeMatch?.opponent || '-'} | ${activeMatch?.date || '-'}`, 14, y); y += 8
    doc.text(`Sistema: ${activeMatch?.system || '-'} | Resultado: ${activeMatch?.result || '-'}`, 14, y); y += 10
    doc.text(`Eventos: ${stats.total} | Golos: ${stats.goals} | Remates: ${stats.shots} | Eficácia: ${stats.efficiency}%`, 14, y); y += 8
    doc.text(`Team DNA: ${dna.label} | Transição ${dna.transition}% | Posse ${dna.possession}% | Pressão ${dna.press}%`, 14, y); y += 12
    doc.setFontSize(13); doc.text('Leitura Coach AI', 14, y); y += 8
    doc.setFontSize(10); doc.splitTextToSize(coachAnswer(data, stats, patterns, dna, trainingPlan, coachQuestion), 180).forEach(line => { doc.text(line, 14, y); y += 6 })
    y += 4; doc.setFontSize(13); doc.text('Plano de Treino Sugerido', 14, y); y += 8; doc.setFontSize(10)
    trainingPlan.forEach((t, i) => { doc.text(`${i+1}. ${t.title} - ${t.duration} min - ${t.reason}`, 14, y); y += 6 })
    y += 4; doc.setFontSize(13); doc.text('Padrões Táticos', 14, y); y += 8; doc.setFontSize(10)
    patterns.forEach(p => { doc.text(`- ${p.title}: ${p.value}`, 14, y); y += 6 })
    doc.save('Cav_Assistant_Coach_v3_Intelligence.pdf')
  }

  return <div className="app">
    <header className="hero"><div className="brandMark"><img src="/coach-logo.svg" alt="Cav Assistant Coach" /></div><div><h1>Cav Assistant Coach</h1><p>Apoia a decisão. Nunca substitui o treinador.</p></div></header>
    <nav className="tabs">
      <button onClick={()=>setTab('dashboard')} className={tab==='dashboard'?'active':''}><LayoutDashboard size={18}/>Dashboard</button>
      <button onClick={()=>setTab('plantel')} className={tab==='plantel'?'active':''}><Users size={18}/>Plantel</button>
      <button onClick={()=>setTab('jogos')} className={tab==='jogos'?'active':''}><CalendarDays size={18}/>Jogos</button>
      <button onClick={()=>setTab('scout')} className={tab==='scout'?'active':''}><Target size={18}/>Scout</button>
      <button onClick={()=>setTab('dna')} className={tab==='dna'?'active':''}><Activity size={18}/>Team DNA</button>
      <button onClick={()=>setTab('training')} className={tab==='training'?'active':''}><Dumbbell size={18}/>Training AI</button>
      <button onClick={()=>setTab('tactical')} className={tab==='tactical'?'active':''}><ClipboardList size={18}/>Tactical</button>
      <button onClick={()=>setTab('adversarios')} className={tab==='adversarios'?'active':''}><Shield size={18}/>Adversários</button>
      <button onClick={()=>setTab('ai')} className={tab==='ai'?'active':''}><Brain size={18}/>Coach AI</button>
    </nav>
    <main>
      {tab === 'dashboard' && <Dashboard stats={stats} patterns={patterns} activeMatch={activeMatch} data={data} dna={dna} />}
      {tab === 'plantel' && <Roster athletes={data.athletes} events={data.events} form={forms.athlete} setForm={(athlete)=>setForms({...forms, athlete})} addAthlete={addAthlete} />}
      {tab === 'jogos' && <Matches data={data} setActive={(id)=>update({...data, activeMatchId:id})} form={forms.match} setForm={(match)=>setForms({...forms, match})} addMatch={addMatch} exportPdf={exportPdf} />}
      {tab === 'scout' && <Scout athletes={data.athletes} selectedAthlete={selectedAthlete} setSelectedAthlete={setSelectedAthlete} selectedZone={selectedZone} setSelectedZone={setSelectedZone} addEvent={addEvent} events={stats.events} deleteEvent={deleteEvent} activeMatch={activeMatch} />}
      {tab === 'dna' && <TeamDNA dna={dna} patterns={patterns} />}
      {tab === 'training' && <TrainingAI plan={trainingPlan} stats={stats} />}
      {tab === 'tactical' && <TacticalBoard patterns={patterns} />}
      {tab === 'adversarios' && <Rivals rivals={data.rivals} form={forms.rival} setForm={(rival)=>setForms({...forms, rival})} addRival={addRival} />}
      {tab === 'ai' && <CoachAI question={coachQuestion} setQuestion={setCoachQuestion} answer={coachAnswer(data, stats, patterns, dna, trainingPlan, coachQuestion)} exportPdf={exportPdf} />}
    </main>
  </div>
}

function scoreEvent(type){ const s = { Golo: 5, Assistência: 4, 'Passe chave': 3, Remate: 2, Recuperação: 2, Interceção: 2, Pivotagem: 2, 'Segundo poste': 2, '1x1 ganho': 2, 'Bola parada': 1, Perda: -2, '1x1 perdido': -1 }; return s[type] || 1 }
function calculateStats(data, matchId){
  const events = data.events.filter(e => e.matchId === matchId)
  const byType = events.reduce((acc, ev) => { acc[ev.type] = (acc[ev.type] || 0) + 1; return acc }, {})
  const goals = byType.Golo || 0, shots = byType.Remate || 0, losses = byType.Perda || 0, recoveries = byType.Recuperação || 0, secondPost = byType['Segundo poste'] || 0, pivot = byType.Pivotagem || 0, keyPass = byType['Passe chave'] || 0
  const efficiency = shots + goals > 0 ? Math.round((goals / (shots + goals)) * 100) : 0
  return { byType, total: events.length, goals, shots, losses, recoveries, secondPost, pivot, keyPass, efficiency, events }
}
function detectPatterns(data, matchId){
  const events = data.events.filter(e => e.matchId === matchId)
  const byZone = countBy(events, 'zone'), byAthleteScore = {}
  events.forEach(e => { byAthleteScore[e.athlete] = (byAthleteScore[e.athlete] || 0) + scoreEvent(e.type) })
  const topZone = topEntry(byZone), topAthlete = topEntry(byAthleteScore)
  const pivotRight = events.filter(e => e.type === 'Pivotagem' && e.zone.toLowerCase().includes('direito')).length
  const secondPost = events.filter(e => e.type === 'Segundo poste' || e.zone === 'Segundo poste').length
  const lossesRight = events.filter(e => e.type === 'Perda' && e.zone.toLowerCase().includes('direito')).length
  const recoveriesHigh = events.filter(e => e.type === 'Recuperação' && e.zone.toLowerCase().includes('ofensivo')).length
  const patterns = []
  if(pivotRight || secondPost) patterns.push({ title: 'Pivot à direita + segundo poste', value: `${pivotRight} pivotagens à direita / ${secondPost} entradas`, note: 'Padrão ofensivo a observar e repetir quando houver eficácia.' })
  if(lossesRight) patterns.push({ title: 'Risco no corredor direito', value: `${lossesRight} perdas registadas`, note: 'Pode exigir cobertura interior e reação à perda.' })
  if(recoveriesHigh) patterns.push({ title: 'Pressão alta eficaz', value: `${recoveriesHigh} recuperações ofensivas`, note: 'Boa base para transição curta e finalização rápida.' })
  if(topZone) patterns.push({ title: 'Zona dominante', value: `${topZone[0]} (${topZone[1]} ações)`, note: 'Zona com maior volume de ações.' })
  if(topAthlete) patterns.push({ title: 'Atleta mais influente', value: `${topAthlete[0]} (${topAthlete[1]} pts)`, note: 'Score ponderado por golos, assistências, recuperação e perdas.' })
  return patterns
}
function calculateTeamDNA(data){
  const e = data.events
  const total = Math.max(e.length, 1)
  const transitionRaw = e.filter(x => ['Recuperação','Interceção','1x1 ganho'].includes(x.type)).length / total
  const possessionRaw = e.filter(x => ['Passe chave','Pivotagem','Assistência','Segundo poste'].includes(x.type)).length / total
  const pressRaw = e.filter(x => x.type === 'Recuperação' && x.zone.toLowerCase().includes('ofensivo')).length / total
  const riskRaw = e.filter(x => ['Perda','1x1 perdido'].includes(x.type)).length / total
  const transition = Math.round(transitionRaw * 100), possession = Math.round(possessionRaw * 100), press = Math.round(pressRaw * 100), risk = Math.round(riskRaw * 100)
  let label = 'Equipa em construção'
  if(transition >= possession && transition >= 25) label = 'Equipa vertical / transição'
  if(possession > transition && possession >= 25) label = 'Equipa posicional'
  if(press >= 18) label = 'Equipa de pressão alta'
  return { transition, possession, press, risk, label }
}
function generateTrainingPlan(stats, patterns, dna){
  const plan = []
  if(stats.losses >= 2 || dna.risk >= 18) plan.push({ title:'Transição defensiva após perda', duration:15, reason:'Perdas acima do desejável e necessidade de reação imediata.' })
  if(stats.secondPost < 3) plan.push({ title:'Finalização ao segundo poste', duration:12, reason:'Poucas entradas ao segundo poste registadas.' })
  if(stats.pivot < 3) plan.push({ title:'Ligação ao pivot e apoio frontal', duration:14, reason:'Pivot ainda pouco envolvido no jogo.' })
  if(stats.efficiency < 35) plan.push({ title:'Finalização rápida após recuperação', duration:10, reason:'Eficácia ofensiva baixa para o volume de finalizações.' })
  if(plan.length < 3) plan.push({ title:'Bolas paradas ofensivas', duration:10, reason:'Rotina curta para criar vantagem sem aumentar carga.' })
  return plan.slice(0,4)
}
function coachAnswer(data, stats, patterns, dna, trainingPlan, question){
  const q = question.toLowerCase()
  if(q.includes('treinar')) return `Prioridade da semana: ${trainingPlan.map(x=>x.title).join(', ')}. A decisão final é sempre do treinador; a IA apenas apoia com base nos eventos registados.`
  if(q.includes('dna') || q.includes('identidade')) return `Team DNA atual: ${dna.label}. Transição ${dna.transition}%, posse/ataque posicional ${dna.possession}%, pressão alta ${dna.press}% e risco por perda ${dna.risk}%.`
  if(q.includes('atacar')) return `Ataque: ${stats.goals} golos, ${stats.shots} remates, ${stats.keyPass} passes chave, ${stats.pivot} pivotagens e ${stats.secondPost} entradas ao segundo poste. ${patterns[0] ? 'Padrão relevante: ' + patterns[0].title + '.' : 'Ainda faltam mais dados.'}`
  if(q.includes('defender')) return `Defesa: ${stats.recoveries} recuperações, ${stats.byType.Interceção || 0} interceções e ${stats.losses} perdas. Se as perdas ocorrerem em zona defensiva, priorizar reação à perda e cobertura interior.`
  if(q.includes('melhor') || q.includes('influente')) return patterns.find(p => p.title === 'Atleta mais influente')?.value || 'Ainda não há eventos suficientes para identificar o atleta mais influente.'
  if(q.includes('advers')) return `Cruza a ficha do adversário com os teus padrões. Se o adversário for frágil no segundo poste e a tua equipa tiver pivotagem eficaz, vale testar fixação do pivot e ataque do ala ao segundo poste.`
  return `Leitura geral: ${stats.total} eventos registados, eficácia ${stats.efficiency}%, perdas ${stats.losses}, recuperações ${stats.recoveries}. Team DNA: ${dna.label}. Sugestão principal: ${trainingPlan[0]?.title || 'registar mais eventos'}.`
}
function countBy(list, key){ return list.reduce((a,x)=>{ a[x[key]]=(a[x[key]]||0)+1; return a }, {}) }
function topEntry(obj){ return Object.entries(obj).sort((a,b)=>b[1]-a[1])[0] }

function Dashboard({stats, patterns, activeMatch, data, dna}){ return <section className="grid"><Card icon={<Goal/>} title="Golos" value={stats.goals}/><Card icon={<Target/>} title="Remates" value={stats.shots}/><Card icon={<Zap/>} title="Recuperações" value={stats.recoveries}/><Card icon={<Activity/>} title="Team DNA" value={dna.label}/><div className="panel half"><h2>Jogo ativo</h2><p><b>{activeMatch?.opponent || 'Sem jogo'}</b></p><p>{activeMatch?.sport} · {activeMatch?.system} · {activeMatch?.competition}</p><p>{activeMatch?.date} · Resultado: {activeMatch?.result || '-'}</p></div><div className="panel half"><h2>Alertas IA</h2>{patterns.length ? patterns.map(p=><Alert key={p.title} p={p}/>) : <p>Sem padrões. Regista eventos no Scout Match.</p>}</div><div className="panel wide"><h2>Base de dados</h2><div className="miniGrid"><span>Atletas: <b>{data.athletes.length}</b></span><span>Jogos: <b>{data.matches.length}</b></span><span>Eventos: <b>{data.events.length}</b></span><span>Adversários: <b>{data.rivals.length}</b></span></div></div></section> }
function Card({icon,title,value}){ return <div className="card">{icon}<span>{title}</span><strong>{value}</strong></div> }
function Alert({p}){ return <div className="alert"><b>{p.title}</b><span>{p.value}</span><small>{p.note}</small></div> }
function Roster({athletes, events, form, setForm, addAthlete}){ return <section className="panel"><h2>Plantel + Perfil IA</h2><div className="formGrid"><input placeholder="Nome" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input placeholder="Nº" value={form.number} onChange={e=>setForm({...form,number:e.target.value})}/><select value={form.position} onChange={e=>setForm({...form,position:e.target.value})}>{['Guarda-redes','Fixo','Ala','Ala Esquerdo','Ala Direito','Pivot'].map(x=><option key={x}>{x}</option>)}</select><select value={form.foot} onChange={e=>setForm({...form,foot:e.target.value})}><option>Direito</option><option>Esquerdo</option><option>Ambos</option></select><input placeholder="Idade" value={form.age} onChange={e=>setForm({...form,age:e.target.value})}/><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Disponível</option><option>Condicionado</option><option>Lesionado</option><option>Indisponível</option></select></div><button className="primary" onClick={addAthlete}><Plus size={18}/>Adicionar atleta</button>{athletes.map(a => { const evs=events.filter(e=>e.athleteId===a.id); const score=evs.reduce((s,e)=>s+scoreEvent(e.type),0); return <div className="row" key={a.id}><b>#{a.number} {a.name}</b><span>{a.position} · Pé {a.foot} · {a.status} · Perfil IA: {profileLabel(a, evs)} · Score {score}</span></div> })}</section> }
function profileLabel(a, evs){ if(a.position==='Pivot') return 'Fixador / apoio frontal'; if(evs.filter(e=>e.type==='Recuperação').length>=2) return 'Pressionante'; if(evs.filter(e=>e.type==='Golo').length) return 'Finalizador'; return 'Em análise' }
function Matches({data, setActive, form, setForm, addMatch, exportPdf}){ return <section className="panel"><h2>Jogos</h2><div className="formGrid"><input placeholder="Adversário" value={form.opponent} onChange={e=>setForm({...form,opponent:e.target.value})}/><input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/><input placeholder="Competição" value={form.competition} onChange={e=>setForm({...form,competition:e.target.value})}/><select value={form.sport} onChange={e=>setForm({...form,sport:e.target.value})}><option>Futsal</option><option>Futebol</option></select><select value={form.system} onChange={e=>setForm({...form,system:e.target.value})}><option>3-1</option><option>4-0</option><option>2-2</option><option>1-2-1</option><option>4-3-3</option><option>4-2-3-1</option></select><input placeholder="Resultado" value={form.result} onChange={e=>setForm({...form,result:e.target.value})}/></div><textarea placeholder="Notas do jogo" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/><button className="primary" onClick={addMatch}><Plus size={18}/>Criar jogo</button><button className="ghost" onClick={exportPdf}><Download size={18}/>Exportar relatório PDF</button>{data.matches.map(m => <div className={data.activeMatchId===m.id?'row selected':'row'} key={m.id} onClick={()=>setActive(m.id)}><b>{m.opponent}</b><span>{m.date} · {m.sport} · {m.system} · {m.result || '-'}</span></div>)}</section> }
function Scout({athletes, selectedAthlete, setSelectedAthlete, selectedZone, setSelectedZone, addEvent, events, deleteEvent, activeMatch}){ const buttons = ['Golo','Remate','Assistência','Passe chave','Recuperação','Interceção','Perda','1x1 ganho','1x1 perdido','Pivotagem','Segundo poste','Bola parada']; const zones = ['Defensivo esquerdo','Defensivo centro','Defensivo direito','Centro esquerdo','Centro','Centro direito','Ofensivo esquerdo','Centro ofensivo','Ofensivo direito','Segundo poste','Corredor direito','Corredor esquerdo']; return <section className="panel"><h2>Scout Match · {activeMatch?.opponent}</h2><div className="formline"><select value={selectedAthlete} onChange={e=>setSelectedAthlete(e.target.value)}>{athletes.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}</select><select value={selectedZone} onChange={e=>setSelectedZone(e.target.value)}>{zones.map(z=><option key={z}>{z}</option>)}</select></div><MiniField selectedZone={selectedZone} setSelectedZone={setSelectedZone}/><div className="buttonGrid">{buttons.map(b=><button key={b} onClick={()=>addEvent(b)}>{b}</button>)}</div><h3>Últimos eventos</h3>{events.slice(0,14).map(e=><div className="row" key={e.id}><b>{e.type}</b><span>{e.minute} · {e.athlete} · {e.zone}</span><button className="iconBtn" onClick={()=>deleteEvent(e.id)}><Trash2 size={16}/></button></div>)}</section> }
function MiniField({selectedZone,setSelectedZone}){ const zones=['Defensivo esquerdo','Defensivo centro','Defensivo direito','Centro esquerdo','Centro','Centro direito','Ofensivo esquerdo','Centro ofensivo','Ofensivo direito']; return <div className="miniField">{zones.map(z=><button key={z} onClick={()=>setSelectedZone(z)} className={selectedZone===z?'active':''}>{z.replace('Defensivo ','D. ').replace('Ofensivo ','O. ').replace('Centro ','C. ')}</button>)}</div> }
function TeamDNA({dna, patterns}){ return <section className="panel"><h2>Team DNA</h2><div className="dnaHero"><strong>{dna.label}</strong><span>Identidade calculada pelos eventos registados.</span></div><Meter label="Transição" value={dna.transition}/><Meter label="Ataque posicional" value={dna.possession}/><Meter label="Pressão alta" value={dna.press}/><Meter label="Risco por perda" value={dna.risk}/><h3>Padrões que alimentam o DNA</h3>{patterns.map(p=><Alert key={p.title} p={p}/>)}</section> }
function Meter({label,value}){ return <div className="meter"><span>{label}</span><div><i style={{width:`${Math.min(value,100)}%`}}></i></div><b>{value}%</b></div> }
function TrainingAI({plan, stats}){ return <section className="panel"><h2>Training Generator AI</h2><p className="muted">Transforma problemas do jogo em exercícios curtos para a semana.</p>{plan.map((p,i)=><div className="training" key={p.title}><b>{i+1}. {p.title}</b><span>{p.duration} min</span><small>{p.reason}</small></div>)}<div className="aiBox"><Dumbbell/><p>Dados usados: {stats.losses} perdas, {stats.secondPost} entradas ao segundo poste, {stats.pivot} pivotagens, eficácia {stats.efficiency}%.</p></div></section> }
function TacticalBoard({patterns}){ return <section className="panel"><h2>Tactical Board</h2><div className="field"><div className="midline"></div><div className="move m1"></div><div className="move m2"></div><div className="player p1">P</div><div className="player p2">AE</div><div className="player p3">AD</div><div className="player p4">F</div><div className="player p5">GR</div></div><h3>Padrões atuais</h3>{patterns.length ? patterns.map(p=><Alert key={p.title} p={p}/>) : <p>Sem padrões registados.</p>}</section> }
function Rivals({rivals, form, setForm, addRival}){ return <section className="panel"><h2>Adversários</h2><div className="formGrid"><input placeholder="Nome" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><select value={form.system} onChange={e=>setForm({...form,system:e.target.value})}><option>3-1</option><option>4-0</option><option>2-2</option><option>4-3-3</option><option>4-2-3-1</option></select><input placeholder="Ponto forte" value={form.strength} onChange={e=>setForm({...form,strength:e.target.value})}/><input placeholder="Fragilidade" value={form.weakness} onChange={e=>setForm({...form,weakness:e.target.value})}/><input placeholder="Jogador-chave" value={form.keyPlayer} onChange={e=>setForm({...form,keyPlayer:e.target.value})}/></div><button className="primary" onClick={addRival}><Plus size={18}/>Adicionar adversário</button>{rivals.map(r=><div className="row" key={r.id}><b>{r.name}</b><span>{r.system} · Forte: {r.strength} · Fraco: {r.weakness} · Chave: {r.keyPlayer}</span></div>)}</section> }
function CoachAI({question,setQuestion,answer,exportPdf}){ return <section className="panel"><h2>Coach AI Intelligence</h2><p className="muted">v3 inclui Team DNA, padrões táticos, perfil IA e plano de treino automático. A IA sugere; o treinador decide.</p><textarea value={question} onChange={e=>setQuestion(e.target.value)} /><div className="quick"><button onClick={()=>setQuestion('O que devo treinar esta semana?')}>Treino</button><button onClick={()=>setQuestion('Qual é o Team DNA?')}>Team DNA</button><button onClick={()=>setQuestion('Como estamos a atacar?')}>Ataque</button><button onClick={()=>setQuestion('Como estamos a defender?')}>Defesa</button><button onClick={()=>setQuestion('Quem está mais influente?')}>Influência</button><button onClick={()=>setQuestion('Como explorar o adversário?')}>Adversário</button></div><div className="aiBox"><MessageCircle/><p>{answer}</p></div><button className="primary" onClick={exportPdf}><FileText size={18}/>Gerar PDF Intelligence</button></section> }

createRoot(document.getElementById('root')).render(<App />)
