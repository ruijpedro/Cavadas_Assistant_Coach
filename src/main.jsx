
import React, {useEffect, useMemo, useRef, useState} from 'react'
import {createRoot} from 'react-dom/client'
import {Users, Dumbbell, ClipboardList, CalendarDays, Activity, Languages, Plus, Minus, Save, Trash2, FileText, ChevronLeft, ChevronUp, ChevronDown, ArrowRight, MoveRight, Goal, MousePointer2, Cone, Pencil, X, Clock3} from 'lucide-react'
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
 const [lang,setLang]=useStore('gw_lang','pt'); const tr=T[lang]
 const [page,setPage]=useState('home')
 const [athletes,setAthletes]=useStore('gw_athletes',initialAthletes)
 useEffect(()=>{
   // Migração executada apenas uma vez nesta versão.
   // Depois disso o plantel fica totalmente nas mãos do utilizador:
   // atletas adicionados ou eliminados não são recriados automaticamente.
   const migrationKey='gw_roster_migrated_v11_4'
   if(localStorage.getItem(migrationKey)) return
   const ids=new Set(athletes.map(a=>a.id))
   const missing=initialAthletes.filter(a=>!ids.has(a.id))
   if(missing.length) setAthletes([...athletes,...missing])
   localStorage.setItem(migrationKey,'1')
 },[])
 const [callups,setCallups]=useStore('gw_callups',[])
 const [exercises,setExercises]=useStore('gw_exercises',[])
 const [selectedAthlete,setSelectedAthlete]=useState(athletes[0]?.id||null)
 const [callup,setCallup]=useState({opponent:'',date:'',time:'',meeting:'',location:'',players:[]})
 return <div className="app">
   <header className="topbar">
    <div className="brand"><img src="club-crest.jpg"/><div><b>1. FC GRUEFWISS LEIDELENG</b><span>CAVADAS MANAGER</span></div></div>
    <div className="languages"><Languages size={18}/>{['pt','de','fr','lb','en'].map(l=><button key={l} className={lang===l?'active':''} onClick={()=>setLang(l)}>{l.toUpperCase()}</button>)}</div>
   </header>
   <nav className="nav">
    <Nav label={tr.home} icon={<CalendarDays/>} active={page==='home'} onClick={()=>setPage('home')}/>
    <Nav label={tr.training} icon={<Dumbbell/>} active={page==='training'} onClick={()=>setPage('training')}/>
    <Nav label={tr.exercises} icon={<ClipboardList/>} active={page==='exercises'} onClick={()=>setPage('exercises')}/>
    <Nav label={tr.board} icon={<Activity/>} active={page==='board'} onClick={()=>setPage('board')}/>
    <Nav label={tr.athletes} icon={<Users/>} active={page==='athletes'} onClick={()=>setPage('athletes')}/>
    <Nav label={tr.tests} icon={<Activity/>} active={page==='tests'} onClick={()=>setPage('tests')}/>
    <Nav label={tr.callups} icon={<ClipboardList/>} active={page==='callups'} onClick={()=>setPage('callups')}/>
   </nav>
   <main>
    {page==='home'&&<Home tr={tr} athletes={athletes} exercises={exercises} callups={callups}/>}
    {page==='athletes'&&<Athletes tr={tr} athletes={athletes} setAthletes={setAthletes} selected={selectedAthlete} setSelected={setSelectedAthlete}/>}
    {page==='tests'&&<Tests tr={tr} athletes={athletes} setAthletes={setAthletes}/>}
    {page==='callups'&&<Callups tr={tr} athletes={athletes} callup={callup} setCallup={setCallup} callups={callups} setCallups={setCallups}/>}
    {page==='board'&&<Board tr={tr} exercises={exercises} setExercises={setExercises}/>}
    {page==='exercises'&&<ExerciseLibrary tr={tr} exercises={exercises} setPage={setPage}/>}
    {page==='training'&&<Training tr={tr} exercises={exercises}/>}
   </main>
 </div>
}

function Nav({label,icon,active,onClick}){return <button className={active?'active':''} onClick={onClick}>{React.cloneElement(icon,{size:20})}<span>{label}</span></button>}
function Home({tr,athletes,exercises,callups}){return <section className="homeCards"><Card n={athletes.length} title={tr.athletes}/><Card n={exercises.length} title={tr.exercises}/><Card n={callups.length} title={tr.callups}/><div className="welcome card"><img src="club-crest.jpg"/><div><h1>1. FC Gruefwiss Leideleng</h1><p>Época 2026/27 • Futsal & Futebol</p></div></div></section>}
function Card({n,title}){return <div className="stat card"><strong>{n}</strong><span>{title}</span></div>}

function Athletes({tr,athletes,setAthletes,selected,setSelected}){
 const [q,setQ]=useState('')
 const list=athletes.filter(a=>a.name.toLowerCase().includes(q.toLowerCase()))
 const current=athletes.find(a=>a.id===selected)||null

 useEffect(()=>{
   if(!athletes.length){
     if(selected!==null) setSelected(null)
     return
   }
   if(!selected || !athletes.some(a=>a.id===selected)) setSelected(athletes[0].id)
 },[athletes,selected])

 function add(){
   const a={
     id:'a'+Date.now(),
     name:'',
     dob:'',
     height:'',
     currentWeight:'',
     idealWeight:'',
     position:'Ala',
     defensive:'Zona',
     offensive:['3-1'],
     captain:false,
     speed:{m5:'',m10:'',m20:'',m30:'',max:''},
     notes:''
   }
   setAthletes([...athletes,a])
   setSelected(a.id)
   setQ('')
 }

 function update(k,v){
   setAthletes(athletes.map(a=>a.id===selected?{...a,[k]:v}:a))
 }

 function removeCurrent(){
   if(!current) return
   if(!window.confirm(`${tr.confirmDelete}\n\n${current.name||tr.newAthlete}`)) return
   const remaining=athletes.filter(a=>a.id!==selected)
   setAthletes(remaining)
   setSelected(remaining[0]?.id||null)
 }

 return <div className="split">
   <aside className="listPane">
     <div className="paneTitle rosterTitle">
       <div><h2>{tr.athletes}</h2><small>{athletes.length} {tr.athletes.toLowerCase()}</small></div>
       <button className="primary rosterAdd" onClick={add}><Plus/> {tr.add}</button>
     </div>

     <input className="rosterSearch" placeholder={tr.search} value={q} onChange={e=>setQ(e.target.value)}/>

     <div className="rosterList">
       {list.map(a=><button className={'athleteRow '+(selected===a.id?'selected':'')} onClick={()=>setSelected(a.id)} key={a.id}>
         <span className="avatar">{a.name? a.name.split(' ').map(x=>x[0]).slice(0,2).join(''):'+'}</span>
         <div><b>{a.name||tr.newAthlete}</b><small>{a.position}</small></div>
       </button>)}
     </div>

     {!athletes.length&&<div className="emptyRoster">
       <Users size={42}/>
       <b>{tr.emptyRoster}</b>
       <span>{tr.tapAdd}</span>
       <button className="primary" onClick={add}><Plus/> {tr.add}</button>
     </div>}
   </aside>

   <section className="detailPane">
     {current?<>
       <div className="paneTitle athleteActions">
         <h2>{current.name||tr.newAthlete}</h2>
         <div className="athleteActionButtons">
           <button className="secondary" onClick={add}><Plus/> {tr.add}</button>
           <button className="danger" onClick={removeCurrent}><Trash2/> {tr.delete}</button>
         </div>
       </div>

       <div className="formGrid">
         <Field label={tr.fullName}><input autoFocus={!current.name} value={current.name} onChange={e=>update('name',e.target.value)}/></Field>
         <Field label={tr.dob}><input type="date" value={current.dob} onChange={e=>update('dob',e.target.value)}/></Field>
         <Field label={tr.height}><input type="number" inputMode="decimal" value={current.height} onChange={e=>update('height',e.target.value)}/><i>{tr.cm}</i></Field>
         <Field label={tr.currentWeight}><input type="number" inputMode="decimal" value={current.currentWeight} onChange={e=>update('currentWeight',e.target.value)}/><i>{tr.kg}</i></Field>
         <Field label={tr.idealWeight}><input type="text" inputMode="decimal" value={current.idealWeight} onChange={e=>update('idealWeight',e.target.value)}/><i>{tr.kg}</i></Field>
         <Field label={tr.position}><select value={current.position} onChange={e=>update('position',e.target.value)}>{positions.map(x=><option key={x}>{x}</option>)}</select></Field>
         <Field label={tr.def}><select value={current.defensive} onChange={e=>update('defensive',e.target.value)}><option value="">—</option>{defensiveOptions.map(x=><option key={x}>{x}</option>)}</select></Field>
         <Field label={tr.off}><div className="chips">{offensiveOptions.map(x=><button type="button" key={x} className={current.offensive.includes(x)?'active':''} onClick={()=>update('offensive',current.offensive.includes(x)?current.offensive.filter(y=>y!==x):[...current.offensive,x])}>{x}</button>)}</div></Field>
         <Field label={tr.captain}><label className="toggleCaptain"><input type="checkbox" checked={!!current.captain} onChange={e=>update('captain',e.target.checked)}/><span>{tr.captain}</span></label></Field>
       </div>

       <h3>{tr.speed}</h3>
       <SpeedFields tr={tr} athlete={current} onChange={s=>update('speed',s)}/>
       <Field label={tr.notes}><textarea rows="5" value={current.notes} onChange={e=>update('notes',e.target.value)}/></Field>
     </>:<div className="emptyDetail">
       <Users size={54}/>
       <h2>{tr.emptyRoster}</h2>
       <p>{tr.tapAdd}</p>
       <button className="primary" onClick={add}><Plus/> {tr.add}</button>
     </div>}
   </section>
 </div>
}

function Field({label,children}){return <label className="field"><span>{label}</span><div>{children}</div></label>}
function SpeedFields({tr,athlete,onChange}){return <div className="speedGrid">{['m5','m10','m20','m30','max'].map(k=><Field key={k} label={k==='max'?tr.maxSpeed:k.replace('m','')+' m'}><input type="number" step=".01" value={athlete.speed[k]} onChange={e=>onChange({...athlete.speed,[k]:e.target.value})}/></Field>)}</div>}

function Tests({tr,athletes,setAthletes}){return <section className="card"><h2>{tr.tests}</h2><div className="tableWrap"><table><thead><tr><th>{tr.fullName}</th><th>5 m</th><th>10 m</th><th>20 m</th><th>30 m</th><th>{tr.maxSpeed}</th></tr></thead><tbody>{athletes.map(a=><tr key={a.id}><td>{a.name}</td>{['m5','m10','m20','m30','max'].map(k=><td key={k}>{a.speed[k]||'—'}</td>)}</tr>)}</tbody></table></div></section>}

function Callups({tr,athletes,callup,setCallup,callups,setCallups}){
 function toggle(id){setCallup({...callup,players:callup.players.includes(id)?callup.players.filter(x=>x!==id):[...callup.players,id]})}
 function save(){setCallups([{...callup,id:'c'+Date.now()},...callups]);setCallup({...callup,players:[]})}
 async function pdf(){const doc=new jsPDF();doc.setFontSize(18);doc.text('1. FC Gruefwiss Leideleng',15,18);doc.setFontSize(13);doc.text(`${tr.opponent}: ${callup.opponent}`,15,30);doc.text(`${tr.date}: ${callup.date}  ${tr.time}: ${callup.time}`,15,40);doc.text(`${tr.location}: ${callup.location}`,15,50);doc.text(`${tr.meeting}: ${callup.meeting}`,15,60);doc.text(tr.selectedPlayers+':',15,75);let y=85;athletes.filter(a=>callup.players.includes(a.id)).forEach(a=>{doc.text('• '+a.name+' — '+a.position,20,y);y+=8});doc.save('convocatoria_gruefwiss.pdf')}
 return <section className="callupLayout"><div className="card"><h2>{tr.callups}</h2><div className="formGrid"><Field label={tr.opponent}><input value={callup.opponent} onChange={e=>setCallup({...callup,opponent:e.target.value})}/></Field><Field label={tr.date}><input type="date" value={callup.date} onChange={e=>setCallup({...callup,date:e.target.value})}/></Field><Field label={tr.time}><input type="time" value={callup.time} onChange={e=>setCallup({...callup,time:e.target.value})}/></Field><Field label={tr.meeting}><input type="time" value={callup.meeting} onChange={e=>setCallup({...callup,meeting:e.target.value})}/></Field><Field label={tr.location}><input value={callup.location} onChange={e=>setCallup({...callup,location:e.target.value})}/></Field></div><div className="actionRow"><button onClick={()=>setCallup({...callup,players:athletes.map(a=>a.id)})}>{tr.selectAll}</button><button onClick={()=>setCallup({...callup,players:[]})}>{tr.clear}</button><button className="primary" onClick={save}><Save/> {tr.save}</button><button onClick={pdf}><FileText/> {tr.exportPdf}</button></div></div>
 <div className="card"><h3>{tr.selectedPlayers}: {callup.players.length}</h3><div className="athletePicker">{athletes.map(a=><button key={a.id} onClick={()=>toggle(a.id)} className={callup.players.includes(a.id)?'active':''}><span className="avatar">{a.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</span><div><b>{a.name}</b><small>{a.position}</small></div></button>)}</div></div></section>
}

function Board({tr,exercises,setExercises}){
 const ref=useRef()
 const [field,setField]=useState('futsal'),[a,setA]=useState(5),[d,setD]=useState(4),[gr,setGr]=useState(1)
 const [players,setPlayers]=useState(()=>mkPlayers(5,4,1)),[ball,setBall]=useState({x:50,y:50}),[objects,setObjects]=useState([])
 const [mode,setMode]=useState('select'),[drag,setDrag]=useState(null),[start,setStart]=useState(null),[paths,setPaths]=useState([])
 const [phase,setPhase]=useState(0),[phases,setPhases]=useState(['Fase 1']),[editingId,setEditingId]=useState(null)

 useEffect(()=>{
   const id=localStorage.getItem('gw_board_edit_exercise')
   if(!id)return
   const ex=exercises.find(x=>x.id===id)
   if(ex){
     setEditingId(id)
     setField(ex.field||ex.diagram?.field||'futsal')
     setPlayers(ex.players||ex.diagram?.players||mkPlayers(5,4,1))
     setBall(ex.ball||ex.diagram?.ball||{x:50,y:50})
     setPaths(ex.paths||ex.diagram?.paths||[])
     setObjects(ex.objects||ex.diagram?.objects||[])
     setPhases(ex.phases||ex.diagram?.phases||['Fase 1'])
     setPhase(0)
   }
   localStorage.removeItem('gw_board_edit_exercise')
 },[])

 function apply(){setPlayers(mkPlayers(a,d,gr))}
 function pxy(e){const r=ref.current.getBoundingClientRect();return{x:(e.clientX-r.left)/r.width*100,y:(e.clientY-r.top)/r.height*100}}
 function down(e,id,type){e.stopPropagation();if(mode==='select')setDrag({id,type});else if(['move','pass','shot'].includes(mode))setStart(pxy(e))}
 function move(e){
   if(!drag)return
   const p=pxy(e)
   if(drag.type==='ball')setBall(p)
   else if(drag.type==='obj')setObjects(objects.map(x=>x.id===drag.id?{...x,...p}:x))
   else setPlayers(players.map(x=>x.id===drag.id?{...x,...p}:x))
 }
 function boardDown(e){
   const p=pxy(e)
   if(['move','pass','shot'].includes(mode)) setStart(p)
   if(mode==='cone') setObjects([...objects,{id:'o'+Date.now(),type:'cone',...p}])
   if(mode==='minigoal') setObjects([...objects,{id:'o'+Date.now(),type:'minigoal',...p}])
 }
 function boardUp(e){
   if(start&&['move','pass','shot'].includes(mode)){setPaths([...paths,{from:start,to:pxy(e),type:mode,phase}]);setStart(null)}
   setDrag(null)
 }
 function eraseAt(kind,id){
   if(mode!=='erase')return false
   if(kind==='player')setPlayers(players.filter(x=>x.id!==id))
   if(kind==='object')setObjects(objects.filter(x=>x.id!==id))
   return true
 }
 function save(){
   const diagram={field,players,ball,paths,objects,phases}
   if(editingId){
     setExercises(exercises.map(x=>x.id===editingId?{...x,...diagram,diagram}:x))
     alert('Desenho do exercício atualizado.')
   }else{
     const ex={id:'e'+Date.now(),title:`Exercício ${exercises.length+1}`,author:'Cavadas Manager',playersCount:players.length,equipment:'',category:'',phase:'',duration:10,objective:'',description:'',notes:'',image:'',...diagram,diagram}
     setExercises([...exercises,ex])
     setEditingId(ex.id)
     alert('Exercício guardado.')
   }
 }
 function newBoard(){
   setEditingId(null);setField('futsal');setPlayers(mkPlayers(5,4,1));setBall({x:50,y:50});setObjects([]);setPaths([]);setPhases(['Fase 1']);setPhase(0)
 }
 return <div className="boardLayout">
  <aside className="card controls">
   <div className="paneTitle"><h2>{tr.board}</h2>{editingId&&<span className="editingBadge">A editar exercício</span>}</div>
   <select value={field} onChange={e=>setField(e.target.value)}><option value="futsal">{tr.futsal}</option><option value="football11">{tr.football11}</option><option value="football7">{tr.football7}</option><option value="football6">{tr.football6}</option></select>
   <Counter label={tr.attackers} v={a} set={setA}/><Counter label={tr.defenders} v={d} set={setD}/><Counter label={tr.goalkeepers} v={gr} set={setGr}/>
   <button className="primary" onClick={apply}>{tr.apply}</button>
   <div className="toolGrid">
    {[['select',MousePointer2,tr.select],['move',MoveRight,tr.movement],['pass',ArrowRight,tr.pass],['shot',Goal,tr.shot],['cone',Cone,'Cone'],['minigoal',Goal,'Mini-baliza'],['erase',Trash2,'Apagar']].map(([k,I,l])=><button key={k} className={mode===k?'active':''} onClick={()=>setMode(k)}><I/>{l}</button>)}
   </div>
   <button className="primary" onClick={save}><Save/> {editingId?'Atualizar exercício':tr.save}</button>
   <button className="secondary" onClick={newBoard}><Plus/> Novo quadro</button>
  </aside>
  <section>
   <div className={'pitch '+field} ref={ref} onPointerDown={boardDown} onPointerMove={move} onPointerUp={boardUp}>
    <FieldSvg type={field}/>
    <svg className="arrows" viewBox="0 0 100 100" preserveAspectRatio="none">{paths.filter(x=>x.phase===phase).map((x,i)=><line key={i} x1={x.from.x} y1={x.from.y} x2={x.to.x} y2={x.to.y} className={x.type}/>)}</svg>
    {players.map(x=><div key={x.id} onClick={()=>eraseAt('player',x.id)} onPointerDown={e=>down(e,x.id,'p')} className={'token '+x.team} style={{left:x.x+'%',top:x.y+'%'}}>{x.n}</div>)}
    {objects.map(x=><div key={x.id} onClick={()=>eraseAt('object',x.id)} onPointerDown={e=>down(e,x.id,'obj')} className={'boardObject '+x.type} style={{left:x.x+'%',top:x.y+'%'}}>{x.type==='cone'?'▲':'▭'}</div>)}
    <div onClick={()=>{if(mode==='erase')setBall({x:50,y:50})}} onPointerDown={e=>down(e,'ball','ball')} className="ball" style={{left:ball.x+'%',top:ball.y+'%'}}>⚽</div>
   </div>
   <div className="timeline">{phases.map((x,i)=><button className={phase===i?'active':''} onClick={()=>setPhase(i)} key={i}>{x}</button>)}<button onClick={()=>{setPhases([...phases,`Fase ${phases.length+1}`]);setPhase(phases.length)}}><Plus/>{tr.newPhase}</button></div>
  </section>
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
function Training({tr,exercises}){
 const [sessions,setSessions]=useStore('gw_training_sessions_v11_6',[])
 const [draft,setDraft]=useState({title:'Treino',date:'',notes:'',exerciseIds:[]})
 const total=draft.exerciseIds.reduce((s,id)=>s+(Number(exercises.find(x=>x.id===id)?.duration)||0),0)
 const addEx=id=>setDraft({...draft,exerciseIds:[...draft.exerciseIds,id]})
 const removeAt=i=>setDraft({...draft,exerciseIds:draft.exerciseIds.filter((_,n)=>n!==i)})
 const move=(i,dir)=>{
   const j=i+dir;if(j<0||j>=draft.exerciseIds.length)return
   const a=[...draft.exerciseIds];[a[i],a[j]]=[a[j],a[i]];setDraft({...draft,exerciseIds:a})
 }
 const save=()=>{
   if(!draft.exerciseIds.length){alert('Adicione pelo menos um exercício.');return}
   setSessions([...sessions,{...draft,id:'tr'+Date.now(),total}])
   setDraft({title:'Treino',date:'',notes:'',exerciseIds:[]})
 }
 return <div className="trainingWorkspace">
  <section className="card trainingBuilder">
   <div className="paneTitle"><div><h2>{tr.training}</h2><small>Montar sessão</small></div><div className="trainingTotal"><Clock3/><b>{total} min</b></div></div>
   <div className="trainingHead"><Field label="Nome do treino"><input value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})}/></Field><Field label="Data"><input type="date" value={draft.date} onChange={e=>setDraft({...draft,date:e.target.value})}/></Field></div>
   <h3>Sequência do treino</h3>
   <div className="sessionSequence">{draft.exerciseIds.length?draft.exerciseIds.map((id,i)=>{const x=exercises.find(e=>e.id===id);return <div className="sessionExercise" key={id+'-'+i}><span className="orderNo">{i+1}</span><div><b>{x?.title||x?.name||'Exercício'}</b><small>{x?.phase||'Sem fase'} · {x?.duration||0} min</small></div><div className="sessionBtns"><button onClick={()=>move(i,-1)}><ChevronUp/></button><button onClick={()=>move(i,1)}><ChevronDown/></button><button className="dangerLite" onClick={()=>removeAt(i)}><X/></button></div></div>}):<div className="trainingEmpty"><Dumbbell size={42}/><p>Escolha exercícios da biblioteca abaixo.</p></div>}</div>
   <Field label="Notas do treino"><textarea rows="3" value={draft.notes} onChange={e=>setDraft({...draft,notes:e.target.value})}/></Field>
   <button className="primary wideAction" onClick={save}><Save/> Guardar sessão · {total} min</button>
  </section>
  <aside className="card trainingExercisePicker"><h3>Biblioteca de exercícios</h3><div>{exercises.map(x=><button className="pickExercise" onClick={()=>addEx(x.id)} key={x.id}><Plus/><div><b>{x.title||x.name||'Exercício'}</b><small>{x.category||'Sem categoria'} · {x.duration||0} min</small></div></button>)}</div></aside>
  <section className="card savedSessions"><div className="paneTitle"><h3>Treinos guardados</h3><small>{sessions.length}</small></div>{sessions.length?sessions.slice().reverse().map(s=><div className="savedSession" key={s.id}><div><b>{s.title}</b><small>{s.date||'Sem data'} · {s.exerciseIds.length} exercícios</small></div><strong>{s.total} min</strong><button className="dangerLite" onClick={()=>setSessions(sessions.filter(x=>x.id!==s.id))}><Trash2/></button></div>):<p className="muted">Ainda não existem sessões guardadas.</p>}</section>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>)
