
import React, {useEffect, useMemo, useRef, useState} from 'react'
import {createRoot} from 'react-dom/client'
import {Users, Dumbbell, ClipboardList, CalendarDays, Activity, Languages, Plus, Minus, Save, Trash2, FileText, ChevronLeft, ChevronUp, ChevronDown, ArrowRight, MoveRight, Goal, MousePointer2, Cone, Pencil, X, Clock3, Trophy, BarChart3, CheckCircle2, UserCheck, Image as ImageIcon, BookOpen, Flag, Search, MessageSquare, Target, ShieldCheck} from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import './style.css'

const T={
 pt:{home:'Início',training:'Treinos',exercises:'Exercícios',board:'Quadro Tático',athletes:'Atletas',tests:'Avaliações',callups:'Convocatórias',newAthlete:'Novo atleta',fullName:'Nome completo',dob:'Data de nascimento',height:'Altura',currentWeight:'Peso atual',idealWeight:'Peso ideal',position:'Posição preferida',def:'Processo defensivo',off:'Processo ofensivo',save:'Guardar',delete:'Eliminar',add:'Adicionar',speed:'Velocidade',history:'Histórico',notes:'Notas',search:'Procurar atleta',selected:'Selecionado',game:'Jogo',opponent:'Adversário',date:'Data',time:'Hora',meeting:'Concentração',location:'Local',selectedPlayers:'Convocados',exportPdf:'PDF',selectAll:'Selecionar todos',clear:'Limpar',language:'Idioma',field:'Campo',futsal:'Futsal',football11:'Futebol 11',football7:'Futebol 7',football6:'Futebol 6',attackers:'Atacantes',defenders:'Defensores',goalkeepers:'Guarda-redes',apply:'Aplicar',pass:'Passe',movement:'Movimento',shot:'Remate',select:'Selecionar',phase:'Fase',newPhase:'Nova fase',library:'Biblioteca',classification:'Classificação',maxSpeed:'Velocidade máx.',ageGroup:'Escalão',current:'Atual',ideal:'Ideal',captain:'Capitão',confirmDelete:'Eliminar este atleta?',emptyRoster:'Ainda não existem atletas no plantel.',tapAdd:'Toque em Adicionar para criar o primeiro atleta.',playerAdded:'Novo atleta',kg:'kg',cm:'cm'},
 de:{home:'Start',training:'Training',exercises:'Übungen',board:'Taktiktafel',athletes:'Spieler',tests:'Tests',callups:'Aufgebot',newAthlete:'Neuer Spieler',fullName:'Vollständiger Name',dob:'Geburtsdatum',height:'Größe',currentWeight:'Aktuelles Gewicht',idealWeight:'Idealgewicht',position:'Lieblingsposition',def:'Defensivprozess',off:'Offensivsystem',save:'Speichern',delete:'Löschen',add:'Hinzufügen',speed:'Geschwindigkeit',history:'Verlauf',notes:'Notizen',search:'Spieler suchen',selected:'Ausgewählt',game:'Spiel',opponent:'Gegner',date:'Datum',time:'Uhrzeit',meeting:'Treffpunkt',location:'Ort',selectedPlayers:'Aufgebotene Spieler',exportPdf:'PDF',selectAll:'Alle auswählen',clear:'Leeren',language:'Sprache',field:'Feld',futsal:'Futsal',football11:'Fußball 11',football7:'Fußball 7',football6:'Fußball 6',attackers:'Angreifer',defenders:'Verteidiger',goalkeepers:'Torhüter',apply:'Anwenden',pass:'Pass',movement:'Bewegung',shot:'Schuss',select:'Auswählen',phase:'Phase',newPhase:'Neue Phase',library:'Bibliothek',classification:'Einstufung',maxSpeed:'Max. Geschwindigkeit',ageGroup:'Altersklasse',current:'Aktuell',ideal:'Ideal',captain:'Kapitän',confirmDelete:'Diesen Spieler löschen?',emptyRoster:'Noch keine Spieler im Kader.',tapAdd:'Tippen Sie auf Hinzufügen, um den ersten Spieler anzulegen.',playerAdded:'Neuer Spieler',kg:'kg',cm:'cm'},
 fr:{home:'Accueil',training:'Entraînements',exercises:'Exercices',board:'Tableau tactique',athletes:'Joueurs',tests:'Évaluations',callups:'Convocations',newAthlete:'Nouveau joueur',fullName:'Nom complet',dob:'Date de naissance',height:'Taille',currentWeight:'Poids actuel',idealWeight:'Poids idéal',position:'Poste préféré',def:'Processus défensif',off:'Système offensif',save:'Enregistrer',delete:'Supprimer',add:'Ajouter',speed:'Vitesse',history:'Historique',notes:'Notes',search:'Rechercher un joueur',selected:'Sélectionné',game:'Match',opponent:'Adversaire',date:'Date',time:'Heure',meeting:'Rendez-vous',location:'Lieu',selectedPlayers:'Joueurs convoqués',exportPdf:'PDF',selectAll:'Tout sélectionner',clear:'Effacer',language:'Langue',field:'Terrain',futsal:'Futsal',football11:'Football 11',football7:'Football 7',football6:'Football 6',attackers:'Attaquants',defenders:'Défenseurs',goalkeepers:'Gardiens',apply:'Appliquer',pass:'Passe',movement:'Mouvement',shot:'Tir',select:'Sélectionner',phase:'Phase',newPhase:'Nouvelle phase',library:'Bibliothèque',classification:'Classement',maxSpeed:'Vitesse max.',ageGroup:'Catégorie',current:'Actuel',ideal:'Idéal',captain:'Capitaine',confirmDelete:'Supprimer ce joueur ?',emptyRoster:'Aucun joueur dans l’effectif.',tapAdd:'Touchez Ajouter pour créer le premier joueur.',playerAdded:'Nouveau joueur',kg:'kg',cm:'cm'},
 lb:{home:'Start',training:'Trainingen',exercises:'Übungen',board:'Taktiktafel',athletes:'Spiller',tests:'Evaluatiounen',callups:'Kader',newAthlete:'Neie Spiller',fullName:'Ganzen Numm',dob:'Gebuertsdatum',height:'Gréisst',currentWeight:'Aktuellt Gewiicht',idealWeight:'Idealgewiicht',position:'Liiblingspositioun',def:'Defensive Prozess',off:'Offensive System',save:'Späicheren',delete:'Läschen',add:'Dobäisetzen',speed:'Vitesse',history:'Verlaf',notes:'Notizen',search:'Spiller sichen',selected:'Ausgewielt',game:'Match',opponent:'Géigner',date:'Datum',time:'Auerzäit',meeting:'Treffpunkt',location:'Plaz',selectedPlayers:'Ausgewielte Spiller',exportPdf:'PDF',selectAll:'All auswielen',clear:'Eidel maachen',language:'Sprooch',field:'Terrain',futsal:'Futsal',football11:'Fussball 11',football7:'Fussball 7',football6:'Fussball 6',attackers:'Ugräifer',defenders:'Verdeedeger',goalkeepers:'Goalkeeper',apply:'Uwenden',pass:'Pass',movement:'Beweegung',shot:'Schoss',select:'Auswielen',phase:'Phas',newPhase:'Nei Phas',library:'Bibliothéik',classification:'Klassifikatioun',maxSpeed:'Max. Vitesse',ageGroup:'Altersklass',current:'Aktuell',ideal:'Ideal',captain:'Kapitän',confirmDelete:'Diesen Spieler löschen?',emptyRoster:'Noch keine Spieler im Kader.',tapAdd:'Tippen Sie auf Hinzufügen, um den ersten Spieler anzulegen.',playerAdded:'Neuer Spieler',kg:'kg',cm:'cm'}
, en:{home:'Home',training:'Training',exercises:'Exercises',board:'Tactical Board',athletes:'Players',tests:'Evaluations',callups:'Call-ups',newAthlete:'New player',fullName:'Full name',dob:'Date of birth',height:'Height',currentWeight:'Current weight',idealWeight:'Ideal weight',position:'Preferred position',def:'Defensive process',off:'Offensive system',save:'Save',delete:'Delete',add:'Add',speed:'Speed',history:'History',notes:'Notes',search:'Search player',selected:'Selected',game:'Match',opponent:'Opponent',date:'Date',time:'Time',meeting:'Meeting time',location:'Location',selectedPlayers:'Selected players',exportPdf:'PDF',selectAll:'Select all',clear:'Clear',language:'Language',field:'Pitch',futsal:'Futsal',football11:'Football 11',football7:'Football 7',football6:'Football 6',attackers:'Attackers',defenders:'Defenders',goalkeepers:'Goalkeepers',apply:'Apply',pass:'Pass',movement:'Movement',shot:'Shot',select:'Select',phase:'Phase',newPhase:'New phase',library:'Library',classification:'Classification',maxSpeed:'Max. speed',ageGroup:'Age group',current:'Current',ideal:'Ideal',captain:'Captain',confirmDelete:'Delete this player?',emptyRoster:'There are no players in the squad yet.',tapAdd:'Tap Add to create the first player.',playerAdded:'New player',kg:'kg',cm:'cm'}
}

const U={
 pt:{games:'Jogos',planning:'Planeamento',dashboard:'Painel da época',nextTraining:'Próximo treino',nextGame:'Próximo jogo',lastResult:'Último resultado',attendance:'Presenças',present:'Presente',absent:'Ausente',justified:'Justificado',unavailable:'Indisponível',seasonStats:'Estatísticas da época',quickActions:'Ações rápidas',newTraining:'Novo treino',newCallup:'Nova convocatória',newGame:'Novo jogo',week:'Semana',rest:'Descanso',eventType:'Tipo',addEvent:'Adicionar',exportImage:'Imagem',minutes:'Minutos',competition:'Competição',saved:'Guardados',squadSummary:'Resumo da época',appearances:'Convocações',trainingAttendance:'Assiduidade',goals:'Golos',assists:'Assistências'},
 de:{games:'Spiele',planning:'Wochenplan',dashboard:'Saisonübersicht',nextTraining:'Nächstes Training',nextGame:'Nächstes Spiel',lastResult:'Letztes Ergebnis',attendance:'Anwesenheit',present:'Anwesend',absent:'Abwesend',justified:'Entschuldigt',unavailable:'Nicht verfügbar',seasonStats:'Saisonstatistik',quickActions:'Schnellaktionen',newTraining:'Neues Training',newCallup:'Neues Aufgebot',newGame:'Neues Spiel',week:'Woche',rest:'Ruhetag',eventType:'Typ',addEvent:'Hinzufügen',exportImage:'Bild',minutes:'Minuten',competition:'Wettbewerb',saved:'Gespeichert',squadSummary:'Saisonübersicht',appearances:'Aufgebote',trainingAttendance:'Anwesenheit',goals:'Tore',assists:'Assists'},
 fr:{games:'Matchs',planning:'Planification',dashboard:'Tableau de saison',nextTraining:'Prochain entraînement',nextGame:'Prochain match',lastResult:'Dernier résultat',attendance:'Présences',present:'Présent',absent:'Absent',justified:'Justifié',unavailable:'Indisponible',seasonStats:'Statistiques de saison',quickActions:'Actions rapides',newTraining:'Nouvel entraînement',newCallup:'Nouvelle convocation',newGame:'Nouveau match',week:'Semaine',rest:'Repos',eventType:'Type',addEvent:'Ajouter',exportImage:'Image',minutes:'Minutes',competition:'Compétition',saved:'Enregistrés',squadSummary:'Résumé de saison',appearances:'Convocations',trainingAttendance:'Assiduité',goals:'Buts',assists:'Passes déc.'},
 lb:{games:'Matcher',planning:'Wochenplang',dashboard:'Saison Iwwersiicht',nextTraining:'Nächst Training',nextGame:'Nächste Match',lastResult:'Lescht Resultat',attendance:'Presenzen',present:'Present',absent:'Absent',justified:'Entschëllegt',unavailable:'Net disponibel',seasonStats:'Saison Statistiken',quickActions:'Schnellaktiounen',newTraining:'Neien Training',newCallup:'Neie Kader',newGame:'Neie Match',week:'Woch',rest:'Rou',eventType:'Typ',addEvent:'Dobäisetzen',exportImage:'Bild',minutes:'Minutten',competition:'Competitioun',saved:'Gespäichert',squadSummary:'Saison Resumé',appearances:'Kaderen',trainingAttendance:'Presenz',goals:'Goler',assists:'Assists'},
 en:{games:'Games',planning:'Planning',dashboard:'Season dashboard',nextTraining:'Next training',nextGame:'Next game',lastResult:'Last result',attendance:'Attendance',present:'Present',absent:'Absent',justified:'Excused',unavailable:'Unavailable',seasonStats:'Season statistics',quickActions:'Quick actions',newTraining:'New training',newCallup:'New call-up',newGame:'New game',week:'Week',rest:'Rest',eventType:'Type',addEvent:'Add',exportImage:'Image',minutes:'Minutes',competition:'Competition',saved:'Saved',squadSummary:'Season summary',appearances:'Call-ups',trainingAttendance:'Attendance',goals:'Goals',assists:'Assists'}
}

async function exportNode(id,kind,filename){
 const el=document.getElementById(id); if(!el)return alert('Conteúdo não disponível.')
 const canvas=await html2canvas(el,{scale:2,backgroundColor:'#ffffff',useCORS:true})
 const img=canvas.toDataURL('image/png')
 if(kind==='png'){const a=document.createElement('a');a.href=img;a.download=filename+'.png';a.click();return}
 const doc=new jsPDF({orientation:'portrait',unit:'mm',format:'a4'})
 const w=190,h=canvas.height*w/canvas.width
 doc.addImage(img,'PNG',10,10,w,Math.min(h,277));doc.save(filename+'.pdf')
}


const initialAthletes=[
 {id:'a7',name:'Denys Zamula',dob:'1984-12-20',height:181,currentWeight:80,idealWeight:71,position:'Universal / Pivô Móvel',defensive:'Misto',offensive:['2-2'],speed:{m5:'',m10:'',m20:'',m30:'',max:''},notes:'Posição preferida: Universal / Pivô Móvel'}, 
 {id:'a1',name:'Bruno Ricardo Faria Costa',dob:'1999-05-26',height:175,currentWeight:69,idealWeight:71,position:'Ala',defensive:'Zona',offensive:['3-1','4-0'],captain:false,speed:{m5:'',m10:'',m20:'',m30:'',max:''},notes:''},
 {id:'a2',name:'André Gaspar Da Silva Gomes',dob:'1989-07-27',height:172,currentWeight:85,idealWeight:78,position:'Universal',defensive:'Misto',offensive:['4-0','3-1'],captain:false,speed:{m5:'',m10:'',m20:'',m30:'',max:''},notes:''},
 {id:'a3',name:'Romeu André Antunes Da Silva Meira',dob:'1994-07-14',height:182,currentWeight:79,idealWeight:77,position:'Guarda-redes',defensive:'Zona',offensive:[],captain:false,speed:{m5:'',m10:'',m20:'',m30:'',max:''},notes:'Preferência defensiva: zona. Sem preferência de sistema ofensivo.'},
 {id:'a4',name:'André João Teves Rocha',dob:'1995-07-17',height:174,currentWeight:66,idealWeight:66,position:'Universal',defensive:'Misto',offensive:[],captain:true,speed:{m5:'',m10:'',m20:'',m30:'',max:''},notes:'Capitão. Processo defensivo: pressão alta individual/misto; meio-campo zona. Sistema ofensivo sem preferência fixa.'},
 {id:'a5',name:'Francisco Maria Ferreira Gomes',dob:'2004-02-07',height:175,currentWeight:71,idealWeight:'69–72',position:'Universal',defensive:'Zona',offensive:['3-1','2-2'],captain:false,speed:{m5:'',m10:'',m20:'',m30:'',max:''},notes:'Jogador de campo; sem preferência específica de posição, desde que não seja guarda-redes.'},
 {id:'a6',name:'Thomas Da Silva Vaz',dob:'2008-12-29',height:187,currentWeight:74,idealWeight:'',position:'Guarda-redes',defensive:'',offensive:[],captain:false,speed:{m5:'',m10:'',m20:'',m30:'',max:''},notes:'Peso ideal e preferências táticas ainda por preencher.'}
]
const positions=['Guarda-redes','Redes Avançado','Fixo','Ala','Pivô Fixo','Pivô Móvel','Universal']
const defensiveOptions=['Zona','Individual','Misto']
const offensiveOptions=['3-1','4-0','2-2']

function useStore(key,initial){
 const [v,setV]=useState(()=>{try{return JSON.parse(localStorage.getItem(key))??initial}catch{return initial}})
 useEffect(()=>localStorage.setItem(key,JSON.stringify(v)),[key,v])
 return [v,setV]
}

function App(){
 const [lang,setLang]=useStore('gw_lang','pt'); const tr={...T[lang],...U[lang]}
 const [page,setPage]=useState('home')
 const [athletes,setAthletes]=useStore('gw_athletes',initialAthletes)
 useEffect(()=>{const k='gw_roster_migrated_v11_4';if(localStorage.getItem(k))return;const ids=new Set(athletes.map(a=>a.id));const missing=initialAthletes.filter(a=>!ids.has(a.id));if(missing.length)setAthletes([...athletes,...missing]);localStorage.setItem(k,'1')},[])
 const [callups,setCallups]=useStore('gw_callups_v12',[])
 const [exercises,setExercises]=useStore('gw_exercises',[])
 const [sessions,setSessions]=useStore('gw_training_sessions_v12',[])
 const [games,setGames]=useStore('gw_games_v12',[])
 const [week,setWeek]=useStore('gw_week_plan_v12',[])
 const [selectedAthlete,setSelectedAthlete]=useState(athletes[0]?.id||null)
 const go=p=>setPage(p)
 return <div className="app">
  <header className="topbar"><div className="brand"><img src="club-crest.jpg"/><div><b>1. FC GRUEFWISS LEIDELENG</b><span>CAVADAS MANAGER · 2026/27</span></div></div><div className="languages"><Languages size={18}/>{['pt','de','fr','lb','en'].map(l=><button key={l} className={lang===l?'active':''} onClick={()=>setLang(l)}>{l.toUpperCase()}</button>)}</div></header>
  <nav className="nav">
   <Nav label={tr.home} icon={<BarChart3/>} active={page==='home'} onClick={()=>go('home')}/>
   <Nav label={tr.athletes} icon={<Users/>} active={page==='athletes'} onClick={()=>go('athletes')}/>
   <Nav label={tr.training} icon={<Dumbbell/>} active={page==='training'} onClick={()=>go('training')}/>
   <Nav label={tr.exercises} icon={<ClipboardList/>} active={page==='exercises'} onClick={()=>go('exercises')}/>
   <Nav label={tr.board} icon={<Activity/>} active={page==='board'} onClick={()=>go('board')}/>
   <Nav label={tr.games} icon={<Trophy/>} active={page==='games'} onClick={()=>go('games')}/>
   <Nav label={lang==='de'?'Spielmodell':lang==='fr'?'Modèle de jeu':lang==='lb'?'Spillmodell':lang==='en'?'Game Model':'Modelo de Jogo'} icon={<BookOpen/>} active={page==='model'} onClick={()=>go('model')}/>
   <Nav label={lang==='de'?'Standards':lang==='fr'?'Coups de pied arrêtés':lang==='lb'?'Standard-Situatiounen':lang==='en'?'Set Pieces':'Bolas Paradas'} icon={<Flag/>} active={page==='setpieces'} onClick={()=>go('setpieces')}/>
   <Nav label={lang==='de'?'Gegner':lang==='fr'?'Adversaires':lang==='lb'?'Géigner':lang==='en'?'Opponents':'Adversários'} icon={<Search/>} active={page==='opponents'} onClick={()=>go('opponents')}/>
   <Nav label={lang==='de'?'Nachspiel':lang==='fr'?'Après-match':lang==='lb'?'Nom Match':lang==='en'?'Post-match':'Pós-jogo'} icon={<MessageSquare/>} active={page==='postmatch'} onClick={()=>go('postmatch')}/>
   <Nav label={tr.callups} icon={<UserCheck/>} active={page==='callups'} onClick={()=>go('callups')}/>
   <Nav label={tr.tests} icon={<Activity/>} active={page==='tests'} onClick={()=>go('tests')}/>
   <Nav label={tr.planning} icon={<CalendarDays/>} active={page==='planning'} onClick={()=>go('planning')}/>
  </nav>
  <main>
   {page==='home'&&<Home tr={tr} athletes={athletes} exercises={exercises} callups={callups} sessions={sessions} games={games} go={go}/>}
   {page==='athletes'&&<Athletes tr={tr} athletes={athletes} setAthletes={setAthletes} selected={selectedAthlete} setSelected={setSelectedAthlete} sessions={sessions} callups={callups} games={games}/>}
   {page==='training'&&<Training tr={tr} exercises={exercises} athletes={athletes} sessions={sessions} setSessions={setSessions}/>}
   {page==='exercises'&&<ExerciseLibrary tr={tr} exercises={exercises} setExercises={setExercises} setPage={setPage}/>}
   {page==='board'&&<Board tr={tr} exercises={exercises} setExercises={setExercises}/>}
   {page==='games'&&<Games tr={tr} athletes={athletes} games={games} setGames={setGames} callups={callups}/>}
   {page==='model'&&<GameModel athletes={athletes}/>}
   {page==='setpieces'&&<SetPieces exercises={exercises} setExercises={setExercises} setPage={setPage}/>}
   {page==='opponents'&&<Opponents/>}
   {page==='postmatch'&&<PostMatch games={games}/>}
   {page==='callups'&&<Callups tr={tr} athletes={athletes} callups={callups} setCallups={setCallups}/>}
   {page==='tests'&&<Tests tr={tr} athletes={athletes} setAthletes={setAthletes}/>}
   {page==='planning'&&<Planner tr={tr} week={week} setWeek={setWeek}/>}
  </main>
 </div>
}
function Nav({label,icon,active,onClick}){return <button className={active?'active':''} onClick={onClick}>{React.cloneElement(icon,{size:20})}<span>{label}</span></button>}
function Home({tr,athletes,exercises,callups,sessions,games,go}){
 const today=new Date().toISOString().slice(0,10)
 const nextTraining=[...sessions].filter(x=>x.date>=today).sort((a,b)=>a.date.localeCompare(b.date))[0]
 const nextGame=[...games].filter(x=>x.date>=today).sort((a,b)=>a.date.localeCompare(b.date))[0]
 const lastGame=[...games].filter(x=>x.date&&x.date<today).sort((a,b)=>b.date.localeCompare(a.date))[0]||games[games.length-1]
 const allEvents=games.flatMap(g=>g.events||[]), goals=allEvents.filter(e=>e.type==='Golo').length, assists=allEvents.filter(e=>e.type==='Assistência').length
 const attendance=sessions.flatMap(s=>Object.entries(s.attendance||{}));const present=attendance.filter(([,v])=>v==='present').length;const rate=attendance.length?Math.round(present/attendance.length*100):0
 return <div className="seasonDashboard">
  <section className="heroDashboard card"><img src="club-crest.jpg"/><div><small>CAVADAS MANAGER</small><h1>{tr.dashboard}</h1><p>1. FC Gruefwiss Leideleng · 2026/27</p></div></section>
  <section className="kpiGrid"><Card n={athletes.length} title={tr.athletes}/><Card n={sessions.length} title={tr.training}/><Card n={games.length} title={tr.games}/><Card n={rate+'%'} title={tr.trainingAttendance}/><Card n={goals} title={tr.goals}/><Card n={assists} title={tr.assists}/></section>
  <section className="dashboardGrid">
   <div className="card dashPanel"><h3>{tr.nextTraining}</h3>{nextTraining?<><b>{nextTraining.title}</b><p>{nextTraining.date} · {nextTraining.total||0} min</p></>:<p className="muted">—</p>}<button onClick={()=>go('training')}>{tr.newTraining}</button></div>
   <div className="card dashPanel"><h3>{tr.nextGame}</h3>{nextGame?<><b>{nextGame.opponent}</b><p>{nextGame.date} · {nextGame.competition||''}</p></>:<p className="muted">—</p>}<button onClick={()=>go('games')}>{tr.newGame}</button></div>
   <div className="card dashPanel"><h3>{tr.lastResult}</h3>{lastGame?<><b>Gruefwiss {lastGame.goalsFor}–{lastGame.goalsAgainst} {lastGame.opponent}</b><p>{lastGame.date||''}</p></>:<p className="muted">—</p>}</div>
   <div className="card dashPanel"><h3>{tr.quickActions}</h3><div className="quickActions"><button onClick={()=>go('callups')}><UserCheck/>{tr.newCallup}</button><button onClick={()=>go('planning')}><CalendarDays/>{tr.planning}</button><button onClick={()=>go('athletes')}><Users/>{tr.athletes}</button></div></div>
  </section>
  <SeasonStats tr={tr} athletes={athletes} games={games} sessions={sessions} callups={callups}/>
 </div>
}
function Card({n,title}){return <div className="stat card"><strong>{n}</strong><span>{title}</span></div>}
function SeasonStats({tr,athletes,games,sessions,callups}){
 const ev=games.flatMap(g=>g.events||[])
 const rows=athletes.map(a=>{const att=sessions.map(s=>s.attendance?.[a.id]).filter(Boolean);const pres=att.filter(x=>x==='present').length;return {a,g:ev.filter(e=>e.playerId===a.id&&e.type==='Golo').length,as:ev.filter(e=>e.playerId===a.id&&e.type==='Assistência').length,shots:ev.filter(e=>e.playerId===a.id&&e.type==='Remate').length,apps:callups.filter(c=>(c.players||[]).includes(a.id)).length,att:att.length?Math.round(pres/att.length*100):0}}).sort((a,b)=>(b.g*3+b.as*2+b.apps)-(a.g*3+a.as*2+a.apps))
 return <section className="card seasonTable"><div className="paneTitle"><h3>{tr.seasonStats}</h3><BarChart3/></div><div className="statsHead seasonRow"><b>{tr.athletes}</b><b>{tr.goals}</b><b>Ass.</b><b>{tr.appearances}</b><b>{tr.trainingAttendance}</b></div>{rows.map(x=><div className="statsRow seasonRow" key={x.a.id}><span>{x.a.name}</span><b>{x.g}</b><b>{x.as}</b><b>{x.apps}</b><b>{x.att}%</b></div>)}</section>
}

function Athletes({tr,athletes,setAthletes,selected,setSelected,sessions=[],callups=[],games=[]}){
 const [q,setQ]=useState(''); const list=athletes.filter(a=>a.name.toLowerCase().includes(q.toLowerCase())); const current=athletes.find(a=>a.id===selected)||null
 useEffect(()=>{if(!athletes.length){if(selected!==null)setSelected(null);return}if(!selected||!athletes.some(a=>a.id===selected))setSelected(athletes[0].id)},[athletes,selected])
 function add(){const a={id:'a'+Date.now(),name:'',dob:'',height:'',currentWeight:'',idealWeight:'',position:'Ala',defensive:'Zona',offensive:['3-1'],captain:false,speed:{m5:'',m10:'',m20:'',m30:'',max:''},notes:''};setAthletes([...athletes,a]);setSelected(a.id);setQ('')}
 function update(k,v){setAthletes(athletes.map(a=>a.id===selected?{...a,[k]:v}:a))}
 function removeCurrent(){if(!current)return;if(!window.confirm(`${tr.confirmDelete}\n\n${current.name||tr.newAthlete}`))return;const r=athletes.filter(a=>a.id!==selected);setAthletes(r);setSelected(r[0]?.id||null)}
 const ev=games.flatMap(g=>g.events||[]);const att=current?sessions.map(s=>s.attendance?.[current.id]).filter(Boolean):[];const present=att.filter(x=>x==='present').length
 const summary=current?{games:games.filter(g=>(g.playerMinutes&&g.playerMinutes[current.id]!=null)||(g.events||[]).some(e=>e.playerId===current.id)).length,callups:callups.filter(c=>(c.players||[]).includes(current.id)).length,goals:ev.filter(e=>e.playerId===current.id&&e.type==='Golo').length,assists:ev.filter(e=>e.playerId===current.id&&e.type==='Assistência').length,attendance:att.length?Math.round(present/att.length*100):0}:null
 return <div className="split"><aside className="listPane"><div className="paneTitle rosterTitle"><div><h2>{tr.athletes}</h2><small>{athletes.length}</small></div><button className="primary rosterAdd" onClick={add}><Plus/> {tr.add}</button></div><input className="rosterSearch" placeholder={tr.search} value={q} onChange={e=>setQ(e.target.value)}/><div className="rosterList">{list.map(a=><button className={'athleteRow '+(selected===a.id?'selected':'')} onClick={()=>setSelected(a.id)} key={a.id}><span className="avatar">{a.name?a.name.split(' ').map(x=>x[0]).slice(0,2).join(''):'+'}</span><div><b>{a.name||tr.newAthlete}</b><small>{a.position}</small></div></button>)}</div>{!athletes.length&&<div className="emptyRoster"><Users size={42}/><b>{tr.emptyRoster}</b><span>{tr.tapAdd}</span><button className="primary" onClick={add}><Plus/> {tr.add}</button></div>}</aside>
 <section className="detailPane">{current?<><div className="paneTitle athleteActions"><h2>{current.name||tr.newAthlete}</h2><div className="athleteActionButtons"><button className="secondary" onClick={add}><Plus/> {tr.add}</button><button className="danger" onClick={removeCurrent}><Trash2/> {tr.delete}</button></div></div>
 <div className="athleteSeasonSummary"><div><strong>{summary.goals}</strong><span>{tr.goals}</span></div><div><strong>{summary.assists}</strong><span>Ass.</span></div><div><strong>{summary.callups}</strong><span>{tr.appearances}</span></div><div><strong>{summary.attendance}%</strong><span>{tr.trainingAttendance}</span></div></div>
 <div className="formGrid"><Field label={tr.fullName}><input value={current.name} onChange={e=>update('name',e.target.value)}/></Field><Field label={tr.dob}><input type="date" value={current.dob} onChange={e=>update('dob',e.target.value)}/></Field><Field label={tr.height}><input type="number" value={current.height} onChange={e=>update('height',e.target.value)}/><i>{tr.cm}</i></Field><Field label={tr.currentWeight}><input type="number" value={current.currentWeight} onChange={e=>update('currentWeight',e.target.value)}/><i>{tr.kg}</i></Field><Field label={tr.idealWeight}><input value={current.idealWeight} onChange={e=>update('idealWeight',e.target.value)}/><i>{tr.kg}</i></Field><Field label={tr.position}><select value={current.position} onChange={e=>update('position',e.target.value)}>{positions.map(x=><option key={x}>{x}</option>)}</select></Field><Field label={tr.def}><select value={current.defensive} onChange={e=>update('defensive',e.target.value)}><option value="">—</option>{defensiveOptions.map(x=><option key={x}>{x}</option>)}</select></Field><Field label={tr.off}><div className="chips">{offensiveOptions.map(x=><button type="button" key={x} className={(current.offensive||[]).includes(x)?'active':''} onClick={()=>update('offensive',(current.offensive||[]).includes(x)?current.offensive.filter(y=>y!==x):[...(current.offensive||[]),x])}>{x}</button>)}</div></Field><Field label={tr.captain}><input type="checkbox" checked={!!current.captain} onChange={e=>update('captain',e.target.checked)}/></Field></div><h3>{tr.speed}</h3><SpeedFields tr={tr} athlete={current} onChange={v=>update('speed',v)}/><Field label={tr.notes}><textarea rows="5" value={current.notes||''} onChange={e=>update('notes',e.target.value)}/></Field></>:<div className="emptyRoster"><Users size={48}/><b>{tr.emptyRoster}</b></div>}</section></div>
}

function Field({label,children}){return <label className="field"><span>{label}</span><div>{children}</div></label>}
function SpeedFields({tr,athlete,onChange}){return <div className="speedGrid">{['m5','m10','m20','m30','max'].map(k=><Field key={k} label={k==='max'?tr.maxSpeed:k.replace('m','')+' m'}><input type="number" step=".01" value={athlete.speed[k]} onChange={e=>onChange({...athlete.speed,[k]:e.target.value})}/></Field>)}</div>}

function Tests({tr,athletes,setAthletes}){return <section className="card"><h2>{tr.tests}</h2><div className="tableWrap"><table><thead><tr><th>{tr.fullName}</th><th>5 m</th><th>10 m</th><th>20 m</th><th>30 m</th><th>{tr.maxSpeed}</th></tr></thead><tbody>{athletes.map(a=><tr key={a.id}><td>{a.name}</td>{['m5','m10','m20','m30','max'].map(k=><td key={k}>{a.speed[k]||'—'}</td>)}</tr>)}</tbody></table></div></section>}

function Games({tr,athletes,games,setGames,callups}){
 const empty={opponent:'',date:'',time:'',location:'',competition:'',goalsFor:0,goalsAgainst:0,notes:'',events:[],callupId:'',starters:[],playerMinutes:{}}
 const [draft,setDraft]=useState(empty),[event,setEvent]=useState({minute:'',type:'Golo',playerId:''})
 const types=['Golo','Assistência','Remate','Recuperação','Perda','Interceção','1x1 ganho','1x1 perdido','Erro defensivo','Entrada 2.º poste']
 const c=callups.find(x=>x.id===draft.callupId);const eligible=c?athletes.filter(a=>(c.players||[]).includes(a.id)):athletes
 const addEvent=()=>{if(!event.playerId)return;setDraft({...draft,events:[...draft.events,{...event,id:'ev'+Date.now()}]});setEvent({...event,minute:'',playerId:''})}
 const save=()=>{if(!draft.opponent)return alert('Indique o adversário.');setGames([...games,{...draft,id:'g'+Date.now()}]);setDraft(empty)}
 const toggleStarter=id=>setDraft({...draft,starters:draft.starters.includes(id)?draft.starters.filter(x=>x!==id):[...draft.starters,id]})
 return <div className="gamesWorkspace"><section className="card gameEditor"><div className="paneTitle"><div><h2>{tr.games}</h2><small>Scout · 2026/27</small></div><Trophy/></div>
 <div className="callupLinkBox"><Field label={tr.callups}><select value={draft.callupId} onChange={e=>setDraft({...draft,callupId:e.target.value,starters:[],playerMinutes:{}})}><option value="">Plantel completo</option>{callups.map(x=><option key={x.id} value={x.id}>{x.opponent} · {x.date}</option>)}</select></Field><div className="callupSummary"><Users/><div><b>{eligible.length} {tr.athletes.toLowerCase()}</b><span>{c?tr.callups:tr.athletes}</span></div></div></div>
 <div className="gameForm"><Field label={tr.opponent}><input value={draft.opponent} onChange={e=>setDraft({...draft,opponent:e.target.value})}/></Field><Field label={tr.competition}><input value={draft.competition} onChange={e=>setDraft({...draft,competition:e.target.value})}/></Field><Field label={tr.date}><input type="date" value={draft.date} onChange={e=>setDraft({...draft,date:e.target.value})}/></Field><Field label={tr.time}><input type="time" value={draft.time} onChange={e=>setDraft({...draft,time:e.target.value})}/></Field><Field label={tr.location}><input value={draft.location} onChange={e=>setDraft({...draft,location:e.target.value})}/></Field><div className="scoreBox"><span>Gruefwiss</span><input type="number" min="0" value={draft.goalsFor} onChange={e=>setDraft({...draft,goalsFor:+e.target.value})}/><b>—</b><input type="number" min="0" value={draft.goalsAgainst} onChange={e=>setDraft({...draft,goalsAgainst:+e.target.value})}/><span>{draft.opponent||tr.opponent}</span></div></div>
 <h3>Cinco inicial</h3><div className="starterGrid">{eligible.map(a=><button key={a.id} className={draft.starters.includes(a.id)?'starter active':'starter'} onClick={()=>toggleStarter(a.id)}><b>{a.name}</b><small>{a.position}</small></button>)}</div>
 <h3>{tr.minutes}</h3><div className="minutesGrid">{eligible.map(a=><label key={a.id}><span>{a.name}</span><input type="number" min="0" value={draft.playerMinutes[a.id]??''} onChange={e=>setDraft({...draft,playerMinutes:{...draft.playerMinutes,[a.id]:e.target.value}})}/></label>)}</div>
 <h3>Scout</h3><div className="eventEntry"><input type="number" min="0" placeholder="Min." value={event.minute} onChange={e=>setEvent({...event,minute:e.target.value})}/><select value={event.type} onChange={e=>setEvent({...event,type:e.target.value})}>{types.map(x=><option key={x}>{x}</option>)}</select><select value={event.playerId} onChange={e=>setEvent({...event,playerId:e.target.value})}><option value="">{tr.athletes}…</option>{eligible.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}</select><button className="primary" onClick={addEvent}><Plus/>{tr.addEvent}</button></div><div className="eventList">{draft.events.map(ev=><div className="gameEvent" key={ev.id}><b>{ev.minute||0}'</b><span>{ev.type}</span><strong>{athletes.find(a=>a.id===ev.playerId)?.name}</strong><button className="dangerLite" onClick={()=>setDraft({...draft,events:draft.events.filter(x=>x.id!==ev.id)})}><X/></button></div>)}</div><Field label={tr.notes}><textarea rows="3" value={draft.notes} onChange={e=>setDraft({...draft,notes:e.target.value})}/></Field><button className="primary wideAction" onClick={save}><Save/>{tr.save}</button></section>
 <aside className="card gamesHistory"><div className="paneTitle"><h3>{tr.history}</h3><small>{games.length}</small></div>{games.slice().reverse().map(g=><div className="gameCard" key={g.id}><div><b>Gruefwiss {g.goalsFor}–{g.goalsAgainst} {g.opponent}</b><small>{g.date||'—'} · {g.competition||'—'}</small></div><button className="dangerLite" onClick={()=>setGames(games.filter(x=>x.id!==g.id))}><Trash2/></button></div>)}</aside><SeasonStats tr={tr} athletes={athletes} games={games} sessions={[]} callups={callups}/></div>
}

function Callups({tr,athletes,callups,setCallups}){
 const empty={opponent:'',competition:'',date:'',time:'',meeting:'',location:'',notes:'',players:[]};const [draft,setDraft]=useState(empty)
 const toggle=id=>setDraft({...draft,players:draft.players.includes(id)?draft.players.filter(x=>x!==id):[...draft.players,id]})
 const save=()=>{if(!draft.opponent||!draft.players.length)return alert('Preencha o adversário e escolha os atletas.');setCallups([...callups,{...draft,id:'c'+Date.now()}]);setDraft(empty)}
 return <div className="callupLayout"><section className="card"><div className="paneTitle"><h2>{tr.callups}</h2><UserCheck/></div><div className="formGrid"><Field label={tr.opponent}><input value={draft.opponent} onChange={e=>setDraft({...draft,opponent:e.target.value})}/></Field><Field label={tr.competition}><input value={draft.competition} onChange={e=>setDraft({...draft,competition:e.target.value})}/></Field><Field label={tr.date}><input type="date" value={draft.date} onChange={e=>setDraft({...draft,date:e.target.value})}/></Field><Field label={tr.time}><input type="time" value={draft.time} onChange={e=>setDraft({...draft,time:e.target.value})}/></Field><Field label={tr.meeting}><input type="time" value={draft.meeting} onChange={e=>setDraft({...draft,meeting:e.target.value})}/></Field><Field label={tr.location}><input value={draft.location} onChange={e=>setDraft({...draft,location:e.target.value})}/></Field></div><div className="callupQuick"><button onClick={()=>setDraft({...draft,players:athletes.map(a=>a.id)})}>{tr.selectAll}</button><button onClick={()=>setDraft({...draft,players:athletes.filter(a=>(a.position||'').includes('Guarda-redes')).map(a=>a.id)})}>Só GR</button><button onClick={()=>setDraft({...draft,players:[]})}>{tr.clear}</button></div><div className="athletePicker compact">{athletes.map(a=><button key={a.id} className={draft.players.includes(a.id)?'active':''} onClick={()=>toggle(a.id)}><span className="avatar">{a.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</span><div><b>{a.name}</b><small>{a.position}</small></div></button>)}</div><Field label={tr.notes}><textarea rows="3" value={draft.notes} onChange={e=>setDraft({...draft,notes:e.target.value})}/></Field><button className="primary wideAction" onClick={save}><Save/>{tr.save} · {draft.players.length}</button></section>
 <aside className="card"><div className="paneTitle"><h3>{tr.history}</h3><small>{callups.length}</small></div>{callups.slice().reverse().map(c=><div className="exportItem" key={c.id}><div id={'callup-'+c.id} className="brandedExport"><div className="exportBrand"><img src="club-crest.jpg"/><div><b>1. FC GRUEFWISS LEIDELENG</b><span>CONVOCATÓRIA · 2026/27</span></div></div><h2>Gruefwiss vs {c.opponent}</h2><p>{c.competition||''}</p><div className="exportMeta"><span>{c.date||'—'} · {c.time||'—'}</span><span>{c.location||'—'}</span><span>Concentração: {c.meeting||'—'}</span></div><div className="exportPlayers">{athletes.filter(a=>(c.players||[]).includes(a.id)).map((a,i)=><div key={a.id}><b>{String(i+1).padStart(2,'0')}</b><span>{a.name}</span><small>{a.position}</small></div>)}</div></div><div className="exportButtons"><button onClick={()=>exportNode('callup-'+c.id,'pdf','convocatoria-'+c.opponent)}><FileText/>PDF</button><button onClick={()=>exportNode('callup-'+c.id,'png','convocatoria-'+c.opponent)}><ImageIcon/>{tr.exportImage}</button><button className="dangerLite" onClick={()=>setCallups(callups.filter(x=>x.id!==c.id))}><Trash2/></button></div></div>)}</aside></div>
}


function GameModel({athletes}){
 const [model,setModel]=useStore('gw_game_model_v13',{identity:'',offensive:'4-0',defensive:'Zona',pressing:'',transitionAttack:'',transitionDefence:'',principles:[],notes:''})
 const [principle,setPrinciple]=useState('')
 const upd=(k,v)=>setModel({...model,[k]:v})
 const add=()=>{if(principle.trim()){upd('principles',[...(model.principles||[]),principle.trim()]);setPrinciple('')}}
 return <div className="v13TwoCol"><section className="card"><div className="paneTitle"><div><h2>Modelo de Jogo</h2><small>Identidade e princípios da equipa</small></div><BookOpen/></div>
  <Field label="Identidade / ideia de jogo"><textarea rows="4" value={model.identity||''} onChange={e=>upd('identity',e.target.value)}/></Field>
  <div className="formGrid"><Field label="Organização ofensiva"><select value={model.offensive} onChange={e=>upd('offensive',e.target.value)}><option>4-0</option><option>3-1</option><option>2-2</option><option>Dinâmico / híbrido</option></select></Field><Field label="Organização defensiva"><select value={model.defensive} onChange={e=>upd('defensive',e.target.value)}><option>Zona</option><option>Individual</option><option>Misto</option></select></Field></div>
  <Field label="Pressão"><textarea rows="3" value={model.pressing||''} onChange={e=>upd('pressing',e.target.value)}/></Field>
  <Field label="Transição ofensiva"><textarea rows="3" value={model.transitionAttack||''} onChange={e=>upd('transitionAttack',e.target.value)}/></Field>
  <Field label="Transição defensiva"><textarea rows="3" value={model.transitionDefence||''} onChange={e=>upd('transitionDefence',e.target.value)}/></Field>
 </section><aside className="card"><h3>Princípios da equipa</h3><div className="inlineAdd"><input value={principle} onChange={e=>setPrinciple(e.target.value)} placeholder="Novo princípio"/><button className="primary" onClick={add}><Plus/></button></div><div className="principleList">{(model.principles||[]).map((x,i)=><div key={i}><Target/><span>{x}</span><button onClick={()=>upd('principles',model.principles.filter((_,n)=>n!==i))}><X/></button></div>)}</div><Field label="Notas"><textarea rows="8" value={model.notes||''} onChange={e=>upd('notes',e.target.value)}/></Field></aside></div>
}

function SetPieces({exercises,setExercises,setPage}){
 const kinds=['Canto ofensivo','Canto defensivo','Lateral ofensivo','Lateral defensivo','Livre direto','Livre indireto','5x4 / GR avançado','Defesa 4x5']
 const setpieces=exercises.filter(x=>x.isSetPiece)
 const create=k=>{const ex={id:'sp'+Date.now(),title:k,author:'Cavadas Manager',category:'Bola parada',phase:'Aplicação em jogo',duration:10,objective:'',description:'',notes:'',isSetPiece:true,field:'futsal',players:mkPlayers(5,4,1),ball:{x:50,y:50},paths:[],objects:[],phases:['Fase 1']};setExercises([...exercises,ex]);localStorage.setItem('gw_board_edit_exercise',ex.id);setPage('board')}
 return <div className="card"><div className="paneTitle"><div><h2>Bolas Paradas</h2><small>Biblioteca ligada ao Quadro Tático</small></div><Flag/></div><div className="setPieceTypes">{kinds.map(k=><button onClick={()=>create(k)} key={k}><Plus/><b>{k}</b><small>Criar e desenhar</small></button>)}</div><h3>Jogadas guardadas</h3><div className="setPieceSaved">{setpieces.map(x=><button key={x.id} onClick={()=>{localStorage.setItem('gw_board_edit_exercise',x.id);setPage('board')}}><Flag/><span><b>{x.title}</b><small>{x.description||'Abrir no quadro tático'}</small></span><Pencil/></button>)}</div></div>
}

function Opponents(){
 const [items,setItems]=useStore('gw_opponents_v13',[])
 const [d,setD]=useState({name:'',competition:'',system:'',strengths:'',weaknesses:'',setpieces:'',notes:''})
 const save=()=>{if(!d.name)return;setItems([...items,{...d,id:'op'+Date.now()}]);setD({name:'',competition:'',system:'',strengths:'',weaknesses:'',setpieces:'',notes:''})}
 return <div className="v13TwoCol"><section className="card"><div className="paneTitle"><div><h2>Adversários</h2><small>Scouting pré-jogo</small></div><Search/></div><div className="formGrid"><Field label="Equipa"><input value={d.name} onChange={e=>setD({...d,name:e.target.value})}/></Field><Field label="Competição"><input value={d.competition} onChange={e=>setD({...d,competition:e.target.value})}/></Field><Field label="Sistema habitual"><input value={d.system} onChange={e=>setD({...d,system:e.target.value})}/></Field></div><Field label="Pontos fortes"><textarea rows="3" value={d.strengths} onChange={e=>setD({...d,strengths:e.target.value})}/></Field><Field label="Fragilidades a explorar"><textarea rows="3" value={d.weaknesses} onChange={e=>setD({...d,weaknesses:e.target.value})}/></Field><Field label="Bolas paradas"><textarea rows="3" value={d.setpieces} onChange={e=>setD({...d,setpieces:e.target.value})}/></Field><button className="primary wideAction" onClick={save}><Save/> Guardar adversário</button></section><aside className="card"><h3>Arquivo de adversários</h3>{items.length?items.slice().reverse().map(x=><div className="opponentCard" key={x.id}><div><b>{x.name}</b><small>{x.system||'Sistema não definido'} · {x.competition||''}</small><p>{x.weaknesses||'Sem observações.'}</p></div><button className="dangerLite" onClick={()=>setItems(items.filter(i=>i.id!==x.id))}><Trash2/></button></div>):<p className="muted">Ainda não existem adversários analisados.</p>}</aside></div>
}

function PostMatch({games=[]}){
 const [reviews,setReviews]=useStore('gw_postmatch_v13',[])
 const [gameId,setGameId]=useState(''),[r,setR]=useState({rating:3,worked:'',failed:'',offensive:'',defensive:'',transition:'',setpieces:'',next:''})
 const save=()=>{if(!gameId)return;setReviews([...reviews,{...r,id:'pm'+Date.now(),gameId,date:new Date().toISOString()}]);setR({rating:3,worked:'',failed:'',offensive:'',defensive:'',transition:'',setpieces:'',next:''})}
 const upd=(k,v)=>setR({...r,[k]:v})
 return <div className="v13TwoCol"><section className="card"><div className="paneTitle"><div><h2>Análise Pós-jogo</h2><small>Reflexão técnica ligada ao jogo</small></div><MessageSquare/></div><Field label="Jogo"><select value={gameId} onChange={e=>setGameId(e.target.value)}><option value="">Selecionar…</option>{games.map(g=><option value={g.id} key={g.id}>{g.opponent} · {g.date||''} · {g.goalsFor}-{g.goalsAgainst}</option>)}</select></Field><Field label="Avaliação global (1–5)"><input type="range" min="1" max="5" value={r.rating} onChange={e=>upd('rating',Number(e.target.value))}/><b className="ratingValue">{r.rating}/5</b></Field><Field label="O que funcionou"><textarea rows="3" value={r.worked} onChange={e=>upd('worked',e.target.value)}/></Field><Field label="O que falhou"><textarea rows="3" value={r.failed} onChange={e=>upd('failed',e.target.value)}/></Field><Field label="Organização ofensiva"><textarea rows="2" value={r.offensive} onChange={e=>upd('offensive',e.target.value)}/></Field><Field label="Organização defensiva"><textarea rows="2" value={r.defensive} onChange={e=>upd('defensive',e.target.value)}/></Field><Field label="Próximo treino — prioridades"><textarea rows="3" value={r.next} onChange={e=>upd('next',e.target.value)}/></Field><button className="primary wideAction" onClick={save}><Save/> Guardar análise</button></section><aside className="card"><h3>Reflexões guardadas</h3>{reviews.length?reviews.slice().reverse().map(x=>{const g=games.find(a=>a.id===x.gameId);return <div className="reviewCard" key={x.id}><ShieldCheck/><div><b>{g?.opponent||'Jogo'}</b><small>Avaliação {x.rating}/5</small><p>{x.next||x.worked||'Sem resumo.'}</p></div><button className="dangerLite" onClick={()=>setReviews(reviews.filter(i=>i.id!==x.id))}><Trash2/></button></div>}):<p className="muted">Ainda não existem análises pós-jogo.</p>}</aside></div>
}

function Board({tr,exercises,setExercises}){
 const basePlayers=[
  {id:'a1',team:'a',x:22,y:42,label:'1'},{id:'a2',team:'a',x:35,y:25,label:'2'},
  {id:'a3',team:'a',x:35,y:59,label:'3'},{id:'a4',team:'a',x:48,y:42,label:'4'},
  {id:'d1',team:'d',x:68,y:28,label:'1'},{id:'d2',team:'d',x:68,y:56,label:'2'},
  {id:'d3',team:'d',x:79,y:42,label:'3'}
 ]
 const [sport,setSport]=useState('futsal')
 const [players,setPlayers]=useState(basePlayers)
 const [ball,setBall]=useState({x:52,y:42})
 const [tool,setTool]=useState('select')
 const [drag,setDrag]=useState(null)
 const [pathStart,setPathStart]=useState(null)
 const [paths,setPaths]=useState([])
 const [steps,setSteps]=useState([{id:Date.now(),name:'Passo 1',players:basePlayers.map(p=>({...p})),ball:{x:52,y:42},paths:[]}])
 const [step,setStep]=useState(0)
 const [playing,setPlaying]=useState(false)

 const snap=()=>({players:players.map(p=>({...p})),ball:{...ball},paths:paths.map(p=>({...p}))})
 const saveStep=()=>setSteps(v=>v.map((x,i)=>i===step?{...x,...snap()}:x))
 const loadStep=i=>{
   const x=steps[i]; if(!x)return
   setPlayers((x.players||[]).map(p=>({...p}))); setBall({...x.ball}); setPaths((x.paths||[]).map(p=>({...p})); setStep(i)
 }
 const point=e=>{
   const r=e.currentTarget.getBoundingClientRect()
   return {x:Math.max(2,Math.min(98,(e.clientX-r.left)/r.width*100)),y:Math.max(3,Math.min(97,(e.clientY-r.top)/r.height*100))}
 }
 const down=e=>{
   if(playing)return
   const p=point(e)
   if(tool==='move'||tool==='pass')setPathStart(p)
 }
 const move=e=>{
   if(!drag||playing)return
   const p=point(e)
   if(drag.kind==='ball')setBall(p)
   else setPlayers(v=>v.map(x=>x.id===drag.id?{...x,...p}:x))
 }
 const up=e=>{
   if(playing)return
   if(pathStart){
     const p=point(e)
     setPaths(v=>[...v,{id:Date.now()+Math.random(),type:tool,x1:pathStart.x,y1:pathStart.y,x2:p.x,y2:p.y}])
     setPathStart(null)
   }
   setDrag(null)
 }
 const addPlayer=team=>{
   const n=players.filter(p=>p.team===team).length+1
   setPlayers(v=>[...v,{id:team+Date.now(),team,x:team==='a'?30:70,y:50,label:String(n)}])
 }
 const nextStep=()=>{
   saveStep()
   const n={id:Date.now(),name:`Passo ${steps.length+1}`,...snap(),paths:[]}
   setSteps(v=>[...v,n]); setPaths([]); setStep(steps.length)
 }
 const lerp=(a,b,t)=>a+(b-a)*t
 const animate=(a,b)=>new Promise(resolve=>{
   const t0=performance.now(), duration=1100
   const frame=now=>{
     const q=Math.min(1,(now-t0)/duration), t=q<.5?2*q*q:1-Math.pow(-2*q+2,2)/2
     setPlayers((b.players||[]).map(bp=>{
       const ap=(a.players||[]).find(x=>x.id===bp.id)||bp
       return {...bp,x:lerp(ap.x,bp.x,t),y:lerp(ap.y,bp.y,t)}
     }))
     const ab=a.ball||b.ball, bb=b.ball||ab
     setBall({x:lerp(ab.x,bb.x,t),y:lerp(ab.y,bb.y,t)})
     if(q<1)requestAnimationFrame(frame); else resolve()
   }
   requestAnimationFrame(frame)
 })
 const play=async()=>{
   saveStep()
   const seq=steps.map((x,i)=>i===step?{...x,...snap()}:x)
   if(seq.length<2){alert('Cria o Passo 2 e move os jogadores ou a bola.');return}
   setPlaying(true); setPaths([])
   setPlayers(seq[0].players.map(p=>({...p})));setBall({...seq[0].ball});setStep(0)
   for(let i=0;i<seq.length-1;i++){await animate(seq[i],seq[i+1]);setStep(i+1)}
   setPlaying(false)
 }
 const saveExercise=()=>{
   saveStep()
   const item={id:Date.now(),name:`Jogada ${new Date().toLocaleDateString()}`,category:'Tática',sport,board:{players,ball,steps},createdAt:new Date().toISOString()}
   setExercises([...(exercises||[]),item]);alert('Jogada guardada')
 }
 const erase=()=>setPaths(v=>v.slice(0,-1))
 return <div className="simpleBoard">
  <div className="card simpleHead">
   <div><h2>Quadro Tático</h2><small>Cria a jogada diretamente no campo</small></div>
   <select value={sport} onChange={e=>setSport(e.target.value)}><option value="futsal">Futsal</option><option value="football11">Futebol 11</option><option value="football7">Futebol 7</option><option value="football6">Futebol 6</option></select>
  </div>

  <div className="card coachTools">
   <button className={tool==='select'?'active':''} onClick={()=>setTool('select')}>☝ Mover peças</button>
   <button onClick={()=>addPlayer('a')}>＋ Nossa equipa</button>
   <button onClick={()=>addPlayer('d')}>＋ Adversário</button>
   <button className={tool==='move'?'active':''} onClick={()=>setTool('move')}>➜ Movimento</button>
   <button className={tool==='pass'?'active':''} onClick={()=>setTool('pass')}>⚽ Passe</button>
   <button onClick={erase}>↶ Apagar seta</button>
  </div>

  <div className="card pitchCard">
   <div className={`coachPitch ${sport}`} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={()=>{setDrag(null);setPathStart(null)}}>
    <div className="pitchHalf"/><div className="pitchCircle"/><div className="pitchSpot"/>
    <div className="pitchArea left"/><div className="pitchArea right"/>
    <div className="pitchGoal left"/><div className="pitchGoal right"/>
    <svg className="coachLines" viewBox="0 0 100 100" preserveAspectRatio="none">
     <defs><marker id="arrowMove" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z"/></marker><marker id="arrowPass" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z"/></marker></defs>
     {paths.map(p=><line key={p.id} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} className={p.type} markerEnd={`url(#${p.type==='pass'?'arrowPass':'arrowMove'})`}/>)}
    </svg>
    {players.map(p=><div key={p.id} className={`coachPiece ${p.team}`} style={{left:`${p.x}%`,top:`${p.y}%`}}
      onPointerDown={e=>{e.stopPropagation();if(tool==='select')setDrag({kind:'player',id:p.id})}}>{p.label}</div>)}
    <div className="coachBall" style={{left:`${ball.x}%`,top:`${ball.y}%`}} onPointerDown={e=>{e.stopPropagation();if(tool==='select')setDrag({kind:'ball'})}}>⚽</div>
   </div>
  </div>

  <div className="card playSteps">
   <div className="steps">
    {steps.map((x,i)=><button key={x.id} className={i===step?'active':''} onClick={()=>{saveStep();loadStep(i)}}>{i+1}</button>)}
    <button className="addStep" onClick={nextStep}>＋ Passo</button>
   </div>
   <div className="playButtons">
    <button className="bigPlay" onClick={play} disabled={playing}>{playing?'A reproduzir…':'▶ PLAY'}</button>
    <button onClick={saveExercise}><Save/> Guardar</button>
   </div>
   <div className="coachHint"><b>Como usar:</b> posiciona → <b>+ Passo</b> → move jogadores/bola → <b>PLAY</b>.</div>
  </div>
 </div>
}


function Counter({label,v,set}){return <div className="counter"><span>{label}</span><div><button onClick={()=>set(Math.max(0,v-1))}><Minus/></button><b>{v}</b><button onClick={()=>set(v+1)}><Plus/></button></div></div>}
function mkPlayers(a,d,gr){const out=[];for(let i=0;i<a;i++)out.push({id:'a'+i,n:i+1,team:'blue',x:25+(i%3)*15,y:25+Math.floor(i/3)*20});for(let i=0;i<d;i++)out.push({id:'d'+i,n:'X',team:'red',x:65+(i%2)*12,y:28+Math.floor(i/2)*18});for(let i=0;i<gr;i++)out.push({id:'g'+i,n:'GR',team:'yellow',x:i?92:8,y:50});return out}
function FieldSvg({type}){if(type==='futsal')return <svg className="fieldSvg" viewBox="0 0 120 78" preserveAspectRatio="none"><rect x="4" y="4" width="112" height="70" rx="1.5" fill="none" stroke="white"/><line x1="60" y1="4" x2="60" y2="74" stroke="white"/><circle cx="60" cy="39" r="6" fill="none" stroke="white"/><path d="M4 24 C19 24 19 54 4 54" fill="none" stroke="white"/><path d="M116 24 C101 24 101 54 116 54" fill="none" stroke="white"/><circle cx="16" cy="39" r=".8" fill="white"/><circle cx="28" cy="39" r=".8" fill="white"/><circle cx="104" cy="39" r=".8" fill="white"/><circle cx="92" cy="39" r=".8" fill="white"/></svg>;return <svg className="fieldSvg" viewBox="0 0 120 78" preserveAspectRatio="none"><rect x="4" y="4" width="112" height="70" fill="none" stroke="white"/><line x1="60" y1="4" x2="60" y2="74" stroke="white"/><circle cx="60" cy="39" r="9" fill="none" stroke="white"/><rect x="4" y="18" width="18" height="42" fill="none" stroke="white"/><rect x="98" y="18" width="18" height="42" fill="none" stroke="white"/><rect x="4" y="29" width="7" height="20" fill="none" stroke="white"/><rect x="109" y="29" width="7" height="20" fill="none" stroke="white"/></svg>}
function ExerciseLibrary({tr,exercises,setExercises,setPage}){
 const items=exercises,setItems=setExercises
 const [sel,setSel]=useState(items[0]?.id||null),[q,setQ]=useState('')
 const cur=items.find(x=>x.id===sel)||null
 useEffect(()=>{if(items.length&&!items.some(x=>x.id===sel))setSel(items[0].id);if(!items.length)setSel(null)},[items,sel])
 const add=()=>{const x={id:'ex'+Date.now(),title:'',author:'Cavadas Manager',playersCount:8,equipment:'',category:'',phase:'',duration:10,objective:'',description:'',image:'',notes:'',field:'futsal',players:mkPlayers(4,4,0),ball:{x:50,y:50},paths:[],objects:[],phases:['Fase 1']};setItems([...items,x]);setSel(x.id)}
 const upd=(k,v)=>setItems(items.map(x=>x.id===sel?{...x,[k]:v}:x))
 const del=()=>{if(cur&&confirm('Eliminar este exercício?')){const n=items.filter(x=>x.id!==sel);setItems(n);setSel(n[0]?.id||null)}}
 const photo=e=>{const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=()=>upd('image',r.result);r.readAsDataURL(f)}
 const editBoard=()=>{if(!cur)return;localStorage.setItem('gw_board_edit_exercise',cur.id);setPage('board')}
 const list=items.filter(x=>((x.title||x.name||'')+' '+(x.category||'')).toLowerCase().includes(q.toLowerCase()))
 const pcount=cur?.playersCount ?? cur?.players?.length ?? 0
 return <div className="exerciseWorkspace">
  <aside className="exerciseLibrary card"><div className="paneTitle"><div><h2>{tr.exercises}</h2><small>{items.length} exercícios</small></div><button className="primary" onClick={add}><Plus/> {tr.add}</button></div>
   <input placeholder="Pesquisar exercício" value={q} onChange={e=>setQ(e.target.value)}/>
   <div className="exerciseList">{list.map(x=><button key={x.id} className={'exerciseListItem '+(x.id===sel?'selected':'')} onClick={()=>setSel(x.id)}><div className="exerciseThumb">{x.image?<img src={x.image}/>:<Activity/>}</div><div><b>{x.title||x.name||'Novo exercício'}</b><small>{x.category||'Sem categoria'} · {x.playersCount??x.players?.length??0} jogadores</small></div></button>)}</div>
  </aside>
  <section className="exerciseDetail card">{cur?<>
   <div className="exerciseHeader"><div className="exerciseTitleFields"><input className="exerciseTitle" placeholder="Nome do exercício" value={cur.title||cur.name||''} onChange={e=>upd('title',e.target.value)}/><input className="exerciseAuthor" placeholder="Autor" value={cur.author||''} onChange={e=>upd('author',e.target.value)}/></div><div className="exerciseActions"><button className="secondary" onClick={editBoard}><Pencil/> Editar desenho</button><button className="danger" onClick={del}><Trash2/> {tr.delete}</button></div></div>
   <label className="exerciseImage">{cur.image?<img src={cur.image}/>:<div className="imagePlaceholder"><Activity size={54}/><b>Imagem opcional do exercício</b><span>O desenho tático é editado diretamente no Quadro</span></div>}<input type="file" accept="image/*" onChange={photo}/><span className="imageEdit">Alterar imagem</span></label>
   <div className="exerciseMetrics"><div><strong>{pcount}</strong><span>Número de jogadores</span></div><div><span>Duração</span><b>{cur.duration||0} min</b></div></div>
   <div className="exerciseForm">
    <Field label="Número de jogadores"><input type="number" min="1" value={pcount} onChange={e=>upd('playersCount',Number(e.target.value))}/></Field>
    <Field label="Duração (min)"><input type="number" min="1" value={cur.duration||10} onChange={e=>upd('duration',Number(e.target.value))}/></Field>
    <Field label="Material"><input value={cur.equipment||''} onChange={e=>upd('equipment',e.target.value)}/></Field>
    <Field label="Categoria"><select value={cur.category||''} onChange={e=>upd('category',e.target.value)}><option value="">—</option><option>Tática ofensiva</option><option>Tática defensiva</option><option>Técnica</option><option>Físico</option><option>Guarda-redes</option><option>Bola parada</option><option>Jogo reduzido</option></select></Field>
    <Field label="Fase"><select value={cur.phase||''} onChange={e=>upd('phase',e.target.value)}><option value="">—</option><option>Aquecimento</option><option>Aquisição de competências</option><option>Desenvolvimento</option><option>Aplicação em jogo</option><option>Retorno à calma</option></select></Field>
    <Field label="Objetivo"><textarea rows="3" value={cur.objective||''} onChange={e=>upd('objective',e.target.value)}/></Field>
    <Field label="Descrição / organização"><textarea rows="5" value={cur.description||''} onChange={e=>upd('description',e.target.value)}/></Field>
    <Field label="Observações"><textarea rows="4" value={cur.notes||''} onChange={e=>upd('notes',e.target.value)}/></Field>
   </div>
  </>:<div className="emptyDetail"><Activity size={54}/><h2>Biblioteca de exercícios vazia</h2><button className="primary" onClick={add}><Plus/> {tr.add}</button></div>}</section>
 </div>
}
function Training({tr,exercises,athletes,sessions,setSessions}){
 const empty={title:'Treino',date:'',time:'',location:'',theme:'',notes:'',exerciseIds:[],attendance:{}};const [draft,setDraft]=useState(empty)
 const total=draft.exerciseIds.reduce((s,id)=>s+(Number(exercises.find(x=>x.id===id)?.duration)||0),0)
 const move=(i,d)=>{const j=i+d;if(j<0||j>=draft.exerciseIds.length)return;const a=[...draft.exerciseIds];[a[i],a[j]]=[a[j],a[i]];setDraft({...draft,exerciseIds:a})}
 const setAtt=(id,status)=>setDraft({...draft,attendance:{...draft.attendance,[id]:status}})
 const save=()=>{if(!draft.exerciseIds.length)return alert('Adicione pelo menos um exercício.');setSessions([...sessions,{...draft,id:'tr'+Date.now(),total}]);setDraft(empty)}
 return <div className="trainingWorkspace"><section className="card trainingBuilder"><div className="paneTitle"><div><h2>{tr.training}</h2><small>2026/27</small></div><div className="trainingTotal"><Clock3/><b>{total} min</b></div></div><div className="trainingHead"><Field label="Nome"><input value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})}/></Field><Field label={tr.date}><input type="date" value={draft.date} onChange={e=>setDraft({...draft,date:e.target.value})}/></Field><Field label={tr.time}><input type="time" value={draft.time} onChange={e=>setDraft({...draft,time:e.target.value})}/></Field><Field label={tr.location}><input value={draft.location} onChange={e=>setDraft({...draft,location:e.target.value})}/></Field><Field label="Tema"><input value={draft.theme} onChange={e=>setDraft({...draft,theme:e.target.value})}/></Field></div>
 <h3>Sequência</h3><div className="sessionSequence">{draft.exerciseIds.map((id,i)=>{const x=exercises.find(e=>e.id===id);return <div className="sessionExercise" key={id+'-'+i}><span className="orderNo">{i+1}</span><div><b>{x?.title||'Exercício'}</b><small>{x?.phase||'—'} · {x?.duration||0} min</small></div><div className="sessionBtns"><button onClick={()=>move(i,-1)}><ChevronUp/></button><button onClick={()=>move(i,1)}><ChevronDown/></button><button className="dangerLite" onClick={()=>setDraft({...draft,exerciseIds:draft.exerciseIds.filter((_,n)=>n!==i)})}><X/></button></div></div>})}</div>
 <h3>{tr.attendance}</h3><div className="attendanceGrid">{athletes.map(a=><div className="attendanceRow" key={a.id}><b>{a.name}</b><div>{[['present',tr.present],['absent',tr.absent],['justified',tr.justified],['unavailable',tr.unavailable]].map(([k,l])=><button key={k} className={draft.attendance[a.id]===k?k:''} onClick={()=>setAtt(a.id,k)}>{l}</button>)}</div></div>)}</div><Field label={tr.notes}><textarea rows="3" value={draft.notes} onChange={e=>setDraft({...draft,notes:e.target.value})}/></Field><button className="primary wideAction" onClick={save}><Save/>{tr.save} · {total} min</button></section>
 <aside className="card trainingExercisePicker"><h3>{tr.library}</h3><div>{exercises.map(x=><button className="pickExercise" onClick={()=>setDraft({...draft,exerciseIds:[...draft.exerciseIds,x.id]})} key={x.id}><Plus/><div><b>{x.title||'Exercício'}</b><small>{x.category||'—'} · {x.duration||0} min</small></div></button>)}</div></aside>
 <section className="card savedSessions"><div className="paneTitle"><h3>{tr.saved}</h3><small>{sessions.length}</small></div>{sessions.slice().reverse().map(s=><div className="exportItem" key={s.id}><div id={'training-'+s.id} className="brandedExport trainingExport"><div className="exportBrand"><img src="club-crest.jpg"/><div><b>1. FC GRUEFWISS LEIDELENG</b><span>TREINO · 2026/27</span></div></div><h2>{s.title}</h2><p>{s.date||'—'} · {s.time||'—'} · {s.location||'—'} · {s.total||0} min</p>{s.theme&&<h4>{s.theme}</h4>}<ol>{(s.exerciseIds||[]).map(id=>{const x=exercises.find(e=>e.id===id);return <li key={id}><b>{x?.title||'Exercício'}</b> <span>{x?.duration||0} min · {x?.phase||''}</span></li>})}</ol><div className="attendanceSummary">{Object.values(s.attendance||{}).filter(x=>x==='present').length}/{athletes.length} {tr.present.toLowerCase()}</div></div><div className="exportButtons"><button onClick={()=>exportNode('training-'+s.id,'pdf','treino-'+(s.date||s.id))}><FileText/>PDF</button><button onClick={()=>exportNode('training-'+s.id,'png','treino-'+(s.date||s.id))}><ImageIcon/>{tr.exportImage}</button><button className="dangerLite" onClick={()=>setSessions(sessions.filter(x=>x.id!==s.id))}><Trash2/></button></div></div>)}</section></div>
}
function Planner({tr,week,setWeek}){
 const days=['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo']
 const [draft,setDraft]=useState({day:'Segunda',type:'Treino',title:'',time:''})
 const [cycles,setCycles]=useStore('gw_periodization_v14',[])
 const [cycle,setCycle]=useState({level:'Macrociclo',title:'Época 2026/27',start:'',end:'',objective:'',load:'Média'})
 const add=()=>{if(!draft.title)return;setWeek([...week,{...draft,id:'w'+Date.now()}]);setDraft({...draft,title:'',time:''})}
 const addCycle=()=>{if(!cycle.title)return;setCycles([...cycles,{...cycle,id:'cy'+Date.now()}]);setCycle({...cycle,title:'',objective:''})}
 return <div className="periodizationPage">
  <section className="card periodHero"><div><small>CAVADAS MANAGER · 2026/27</small><h2>Planeamento da Época</h2><p>Macrociclo → Mesociclo → Microciclo → Unidade de treino</p></div><CalendarDays size={42}/></section>
  <section className="periodGrid">
   <div className="card"><div className="paneTitle"><h3>Periodização</h3><Target/></div>
    <div className="cycleForm"><Field label="Nível"><select value={cycle.level} onChange={e=>setCycle({...cycle,level:e.target.value})}><option>Macrociclo</option><option>Mesociclo</option><option>Microciclo</option><option>Unidade de treino</option></select></Field><Field label="Nome"><input value={cycle.title} onChange={e=>setCycle({...cycle,title:e.target.value})}/></Field><Field label="Início"><input type="date" value={cycle.start} onChange={e=>setCycle({...cycle,start:e.target.value})}/></Field><Field label="Fim"><input type="date" value={cycle.end} onChange={e=>setCycle({...cycle,end:e.target.value})}/></Field><Field label="Carga"><select value={cycle.load} onChange={e=>setCycle({...cycle,load:e.target.value})}><option>Baixa</option><option>Média</option><option>Alta</option><option>Recuperação</option></select></Field></div>
    <Field label="Objetivo"><textarea rows="3" value={cycle.objective} onChange={e=>setCycle({...cycle,objective:e.target.value})}/></Field><button className="primary wideAction" onClick={addCycle}><Plus/> Adicionar período</button>
   </div>
   <div className="card"><h3>Mapa da época</h3><div className="cycleList">{cycles.length?cycles.map(c=><div className={'cycle '+c.level.toLowerCase().replaceAll(' ','-')} key={c.id}><div><b>{c.level} · {c.title}</b><small>{c.start||'—'} → {c.end||'—'} · Carga {c.load}</small><p>{c.objective||'Sem objetivo definido.'}</p></div><button className="dangerLite" onClick={()=>setCycles(cycles.filter(x=>x.id!==c.id))}><Trash2/></button></div>):<p className="muted">Comece pelo macrociclo da época e divida-o progressivamente.</p>}</div></div>
  </section>
  <section className="card plannerForm"><div className="paneTitle"><h2>{tr.planning} semanal</h2><CalendarDays/></div><div className="plannerInputs"><select value={draft.day} onChange={e=>setDraft({...draft,day:e.target.value})}>{days.map(x=><option key={x}>{x}</option>)}</select><select value={draft.type} onChange={e=>setDraft({...draft,type:e.target.value})}><option>Treino</option><option>Jogo</option><option>Descanso</option><option>Reunião</option><option>Vídeo</option><option>Recuperação</option></select><input placeholder="Título" value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})}/><input type="time" value={draft.time} onChange={e=>setDraft({...draft,time:e.target.value})}/><button className="primary" onClick={add}><Plus/>{tr.add}</button></div></section>
  <section className="weekGrid">{days.map(day=><div className="dayCard card" key={day}><h3>{day}</h3>{week.filter(x=>x.day===day).map(x=><div className={'planItem '+x.type.toLowerCase()} key={x.id}><b>{x.time||'—'} · {x.type}</b><span>{x.title}</span><button onClick={()=>setWeek(week.filter(y=>y.id!==x.id))}><X/></button></div>)}</div>)}</section>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>)
