
import React, {useEffect, useMemo, useRef, useState} from 'react'
import {createRoot} from 'react-dom/client'
import {Users, Dumbbell, ClipboardList, CalendarDays, Activity, Languages, Plus, Minus, Save, Trash2, FileText, ChevronLeft, ChevronUp, ChevronDown, ArrowRight, MoveRight, Goal, MousePointer2, Cone, Pencil, X, Clock3, Trophy, BarChart3, CheckCircle2, UserCheck, Image as ImageIcon, BookOpen, Flag, Search, MessageSquare, Target, ShieldCheck, FileUp, Film, Presentation, ScanSearch, Share2, Mail} from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import './style.css'
import {analyseDocumentV2, supportedImportKind} from './importEngineV2.js'

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

async function makePdfFile(id,filename){
 const el=document.getElementById(id); if(!el)throw new Error('Conteúdo não disponível.')
 const canvas=await html2canvas(el,{scale:2,backgroundColor:'#ffffff',useCORS:true})
 const img=canvas.toDataURL('image/png'); const doc=new jsPDF({orientation:'portrait',unit:'mm',format:'a4'})
 const w=190,h=canvas.height*w/canvas.width; doc.addImage(img,'PNG',10,10,w,Math.min(h,277))
 return new File([doc.output('blob')],filename+'.pdf',{type:'application/pdf'})
}
async function exportNode(id,kind,filename){
 try{const el=document.getElementById(id);if(!el)throw new Error('Conteúdo não disponível.')
  if(kind==='png'){const canvas=await html2canvas(el,{scale:2,backgroundColor:'#fff',useCORS:true});const a=document.createElement('a');a.href=canvas.toDataURL('image/png');a.download=filename+'.png';a.click();return}
  const file=await makePdfFile(id,filename);const url=URL.createObjectURL(file);const a=document.createElement('a');a.href=url;a.download=file.name;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000)
 }catch(e){alert('Não foi possível exportar: '+e.message)}
}
async function sharePdf(id,filename,title){
 try{const file=await makePdfFile(id,filename);if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[file]}))){await navigator.share({title,text:title,files:[file]});return}
  await exportNode(id,'pdf',filename);alert('PDF criado. Use Partilhar/Anexar no WhatsApp ou e-mail.')
 }catch(e){if(e?.name!=='AbortError')alert('Não foi possível partilhar: '+e.message)}
}



// V17 — Biblioteca tática base. Conteúdos adaptados à mecânica da app a partir
// da estrutura de treino do PPT do treinador: sistemas, bolas de saída, cantos,
// livres/foras e saídas de pressão. A biblioteca é deliberadamente curta.
const tp=(id,title,category,objective,description,steps,duration=10)=>({
 id,title,author:'RJP / Cavadas Manager',category,phase:'Aquisição de competências',
 duration,objective,description,notes:'Biblioteca Base V17 · repetir e consolidar antes de introduzir variantes.',
 playersCount:steps[0]?.players?.length||0,field:'futsal',
 board:{players:steps[0]?.players||[],ball:steps[0]?.ball||{x:50,y:50},steps},
 source:'PPT Treino / adaptação Cavadas Manager',libraryBase:true
})
const P=(id,team,x,y,label)=>({id,team,x,y,label:String(label)})
const S=(name,players,ball,paths=[],duration=1.15)=>({id:name,name,players,ball,paths,duration})
const A=(x,y,n)=>P('a'+n,'a',x,y,n), D=(x,y,n)=>P('d'+n,'d',x,y,n)
const TACTICAL_LIBRARY=[
 tp('lib-3x1','3x1 · Conservar e sair','Jogo reduzido','Criar linhas de passe e decidir com vantagem numérica.','3 atacantes contra 1 defensor. Máximo 2 toques; após 6 passes procurar saída/finalização.',[
  S('Passo 1',[A(24,25,1),A(24,58,2),A(48,42,3),D(38,42,1)],{x:24,y:25}),
  S('Passo 2',[A(24,25,1),A(30,64,2),A(54,34,3),D(40,46,1)],{x:54,y:34}),
  S('Passo 3',[A(28,22,1),A(35,64,2),A(68,42,3),D(49,45,1)],{x:68,y:42})
 ],8),
 tp('lib-3x2','3x2 · Progressão e finalização','Jogo reduzido','Atacar rapidamente uma superioridade 3x2.','Três atacantes progridem contra dois defensores. Fixar, soltar no momento certo e atacar segundo poste.',[
  S('Passo 1',[A(25,25,1),A(25,58,2),A(42,42,3),D(59,30,1),D(59,55,2)],{x:42,y:42}),
  S('Passo 2',[A(38,20,1),A(38,64,2),A(56,42,3),D(64,28,1),D(64,54,2)],{x:38,y:20}),
  S('Passo 3',[A(58,24,1),A(73,62,2),A(68,40,3),D(73,31,1),D(72,49,2)],{x:73,y:62})
 ],10),
 tp('lib-gr1x2','1 + GR x 2 · Saída curta','Tática ofensiva','Usar o guarda-redes para criar superioridade na primeira linha.','Progressão simples do PPT: GR + 1 jogador contra 2 opositores.',[
  S('Passo 1',[A(10,42,'GR'),A(28,42,1),D(42,28,1),D(42,56,2)],{x:10,y:42}),
  S('Passo 2',[A(10,42,'GR'),A(34,25,1),D(38,31,1),D(45,53,2)],{x:34,y:25}),
  S('Passo 3',[A(13,42,'GR'),A(55,30,1),D(46,34,1),D(48,55,2)],{x:55,y:30})
 ],8),
 tp('lib-gr2x3','2 + GR x 3 · Construção','Tática ofensiva','Dar continuidade à saída sob pressão com apoio e largura.','Progressão do PPT: GR + 2 jogadores contra 3 opositores.',[
  S('Passo 1',[A(9,42,'GR'),A(26,23,1),A(26,61,2),D(42,21,1),D(45,42,2),D(42,63,3)],{x:9,y:42}),
  S('Passo 2',[A(10,42,'GR'),A(34,18,1),A(31,66,2),D(43,24,1),D(46,42,2),D(42,59,3)],{x:34,y:18}),
  S('Passo 3',[A(13,42,'GR'),A(55,25,1),A(39,65,2),D(48,27,1),D(51,43,2),D(45,58,3)],{x:55,y:25})
 ],10),
 tp('lib-gr4x5','4 + GR x 5 · Saída coletiva','Tática ofensiva','Reconhecer apoios, coberturas ofensivas e homem livre.','Progressão do PPT para contexto próximo do jogo: GR + 4 contra 5.',[
  S('Passo 1',[A(8,42,'GR'),A(24,18,1),A(24,66,2),A(38,30,3),A(38,54,4),D(48,18,1),D(50,32,2),D(53,46,3),D(49,62,4),D(65,42,5)],{x:8,y:42}),
  S('Passo 2',[A(9,42,'GR'),A(31,16,1),A(28,68,2),A(45,26,3),A(43,57,4),D(50,20,1),D(53,34,2),D(56,46,3),D(51,61,4),D(68,43,5)],{x:31,y:16}),
  S('Passo 3',[A(12,42,'GR'),A(50,18,1),A(36,68,2),A(58,31,3),A(49,57,4),D(55,22,1),D(60,36,2),D(62,48,3),D(56,61,4),D(72,43,5)],{x:58,y:31})
 ],12),
 tp('lib-def-lines','Defensivo · Linhas e coberturas','Tática defensiva','Manter linhas compactas, cobertura e equilíbrio.','Modelo defensivo base: deslocamento conjunto da primeira e segunda linhas em função da bola.',[
  S('Passo 1',[A(55,20,1),A(55,63,2),A(68,31,3),A(68,53,4),D(34,22,1),D(34,62,2),D(43,42,3)],{x:34,y:22}),
  S('Passo 2',[A(51,18,1),A(58,59,2),A(64,30,3),A(70,51,4),D(40,18,1),D(34,58,2),D(46,39,3)],{x:40,y:18}),
  S('Passo 3',[A(56,27,1),A(60,64,2),A(68,38,3),A(72,56,4),D(43,27,1),D(39,65,2),D(51,46,3)],{x:43,y:27})
 ],10),
 tp('lib-def-trocas','Defensivo · Trocas','Tática defensiva','Realizar trocas defensivas sem perder cobertura central.','Dois defensores coordenam troca perante cruzamento dos atacantes; restantes fecham profundidade.',[
  S('Passo 1',[A(54,25,1),A(54,58,2),A(69,34,3),A(69,52,4),D(39,25,1),D(39,58,2),D(48,41,3)],{x:39,y:25}),
  S('Passo 2',[A(58,39,1),A(56,45,2),A(70,29,3),A(70,57,4),D(47,55,1),D(47,29,2),D(52,42,3)],{x:47,y:55}),
  S('Passo 3',[A(56,57,1),A(58,25,2),A(69,31,3),A(69,54,4),D(50,59,1),D(50,24,2),D(57,42,3)],{x:50,y:59})
 ],10),
 tp('lib-off31','Modelo Ofensivo 3:1','Tática ofensiva','Fixar profundidade com pivô e criar linhas de passe em triângulo.','Estrutura 3:1: fixo + alas + pivô. Circular sem destruir distâncias úteis.',[
  S('Passo 1',[A(27,42,1),A(43,20,2),A(43,64,3),A(73,42,4),D(57,25,1),D(57,58,2),D(66,42,3)],{x:27,y:42}),
  S('Passo 2',[A(36,33,1),A(50,16,2),A(47,64,3),A(76,48,4),D(59,27,1),D(58,57,2),D(68,43,3)],{x:50,y:16}),
  S('Passo 3',[A(45,38,1),A(63,22,2),A(54,66,3),A(78,46,4),D(65,29,1),D(62,57,2),D(71,43,3)],{x:78,y:46})
 ],12),
 tp('lib-off40','Modelo Ofensivo 4:0','Tática ofensiva','Criar mobilidade e espaço através de rotações coordenadas.','Estrutura 4:0: quatro jogadores em duas alturas, com troca e ataque ao espaço libertado.',[
  S('Passo 1',[A(31,22,1),A(31,62,2),A(54,25,3),A(54,59,4),D(65,23,1),D(65,61,2),D(74,35,3),D(74,50,4)],{x:31,y:22}),
  S('Passo 2',[A(43,31,1),A(43,53,2),A(61,17,3),A(61,67,4),D(67,25,1),D(67,59,2),D(75,36,3),D(75,49,4)],{x:43,y:31}),
  S('Passo 3',[A(57,48,1),A(57,36,2),A(76,20,3),A(76,64,4),D(69,27,1),D(69,57,2),D(77,37,3),D(77,48,4)],{x:76,y:20})
 ],12),
 tp('lib-kickoff1','Bola de saída 1 · Abertura lateral','Bola parada','Sair da bola de saída com largura e apoio atrás.','Primeiro passe lateral, apoio central e progressão pelo corredor contrário.',[
  S('Passo 1',[A(48,42,1),A(52,42,2),A(38,20,3),A(38,64,4),D(63,27,1),D(63,57,2)],{x:50,y:42}),
  S('Passo 2',[A(45,42,1),A(57,42,2),A(48,18,3),A(35,64,4),D(65,28,1),D(65,56,2)],{x:48,y:18}),
  S('Passo 3',[A(49,45,1),A(65,35,2),A(63,20,3),A(48,66,4),D(68,29,1),D(68,55,2)],{x:65,y:35})
 ],6),
 tp('lib-kickoff2','Bola de saída 2 · Diagonal','Bola parada','Atacar rapidamente o espaço contrário à primeira aproximação.','Movimento de engano junto à bola e diagonal do ala para receber em progressão.',[
  S('Passo 1',[A(48,42,1),A(52,42,2),A(36,22,3),A(36,62,4),D(63,26,1),D(63,58,2)],{x:50,y:42}),
  S('Passo 2',[A(43,42,1),A(57,36,2),A(50,28,3),A(46,63,4),D(65,27,1),D(66,56,2)],{x:57,y:36}),
  S('Passo 3',[A(48,48,1),A(72,24,2),A(61,33,3),A(56,65,4),D(69,29,1),D(69,54,2)],{x:72,y:24})
 ],6),
]

const addCorner=(n,variant)=>TACTICAL_LIBRARY.push(tp('lib-corner'+n,'Canto '+n+' · '+variant,'Bola parada','Criar finalização organizada a partir do canto.','Canto adaptado à biblioteca base do PPT. Ensaiar primeiro sem oposição e depois com defesa ativa.',[
 S('Passo 1',[A(90,77,1),A(75,64,2),A(70,35,3),A(56,51,4),D(84,55,1),D(79,39,2),D(67,49,3)],{x:94,y:76}),
 S('Passo 2',[A(90,77,1),A(79-n,55,2),A(76,29+n*2,3),A(62+n,47,4),D(84,53,1),D(78,40,2),D(70,49,3)],{x:79-n,y:55}),
 S('Passo 3',[A(84,67,1),A(85-n,48,2),A(82,25+n*2,3),A(72+n,42,4),D(86,51,1),D(80,39,2),D(74,47,3)],{x:82,y:25+n*2})
],7))
addCorner(1,'Curto / 1.º poste'); addCorner(2,'Bloqueio central'); addCorner(3,'2.º poste'); addCorner(4,'Remate frontal'); addCorner(5,'Troca e finalização')

const addPress=(n,side)=>TACTICAL_LIBRARY.push(tp('lib-press'+n,'Saída de pressão '+n,'Saída de pressão','Sair da pressão mantendo apoios e ocupação racional do espaço.','Uma das cinco soluções-base de saída de pressão do PPT, adaptada à animação por passos.',[
 S('Passo 1',[A(9,42,'GR'),A(24,18,1),A(24,66,2),A(42,31,3),A(42,54,4),D(35,20,1),D(37,38,2),D(37,60,3),D(54,43,4)],{x:9,y:42}),
 S('Passo 2',[A(10,42,'GR'),A(31,15+n,1),A(28,68-n,2),A(49,27+n,3),A(47,57-n,4),D(39,22,1),D(42,39,2),D(40,59,3),D(57,44,4)],{x:side==='top'?31:28,y:side==='top'?15+n:68-n}),
 S('Passo 3',[A(12,42,'GR'),A(52,18+n,1),A(42,66-n,2),A(63,28+n,3),A(57,56-n,4),D(45,23,1),D(48,39,2),D(46,58,3),D(64,44,4)],{x:side==='top'?63:57,y:side==='top'?28+n:56-n})
],9))
addPress(1,'top');addPress(2,'bottom');addPress(3,'top');addPress(4,'bottom');addPress(5,'top')

TACTICAL_LIBRARY.push(
 tp('lib-kickin1','Fora/Livre lateral 1 · Apoio curto','Bola parada','Dar linha curta e criar continuação interior.','Reposição lateral com apoio frontal, devolução e entrada no espaço.',[
  S('Passo 1',[A(58,7,1),A(49,24,2),A(67,31,3),A(77,55,4),D(61,23,1),D(70,38,2),D(75,54,3)],{x:58,y:7}),
  S('Passo 2',[A(58,7,1),A(55,22,2),A(71,25,3),A(79,57,4),D(63,23,1),D(71,39,2),D(76,53,3)],{x:55,y:22}),
  S('Passo 3',[A(65,18,1),A(63,37,2),A(79,26,3),A(84,59,4),D(68,25,1),D(74,40,2),D(79,52,3)],{x:79,y:26})
 ],7),
 tp('lib-kickin2','Fora/Livre lateral 2 · 2.º poste','Bola parada','Criar finalização no segundo poste.','Reposição lateral com movimento de arrastamento e ataque ao poste contrário.',[
  S('Passo 1',[A(62,7,1),A(56,28,2),A(72,35,3),A(78,61,4),D(65,25,1),D(73,39,2),D(80,54,3)],{x:62,y:7}),
  S('Passo 2',[A(62,7,1),A(65,24,2),A(78,32,3),A(86,61,4),D(67,26,1),D(76,39,2),D(82,53,3)],{x:65,y:24}),
  S('Passo 3',[A(69,18,1),A(76,35,2),A(85,29,3),A(91,58,4),D(72,27,1),D(80,40,2),D(85,51,3)],{x:91,y:58})
 ],7)
)

const initialAthletes=[
 {id:'a7',name:'Denys Zamula',dob:'1984-12-20',height:181,currentWeight:80,idealWeight:71,position:'Universal / Pivô Móvel',defensive:'Misto',offensive:['2-2'],speed:{m5:'',m10:'',m20:'',m30:'',max:''},notes:'Posição preferida: Universal / Pivô Móvel'}, 
 {id:'a1',name:'Bruno Ricardo Faria Costa',dob:'1999-05-26',height:175,currentWeight:69,idealWeight:71,position:'Ala',defensive:'Zona',offensive:['3-1','4-0'],captain:false,speed:{m5:'',m10:'',m20:'',m30:'',max:''},notes:''},
 {id:'a2',name:'André Gaspar Da Silva Gomes',dob:'1989-07-27',height:172,currentWeight:85,idealWeight:78,position:'Universal',defensive:'Misto',offensive:['4-0','3-1'],captain:false,speed:{m5:'',m10:'',m20:'',m30:'',max:''},notes:''},
 {id:'a3',name:'Romeu André Antunes Da Silva Meira',dob:'1994-07-14',height:182,currentWeight:79,idealWeight:77,position:'Guarda-redes',defensive:'Zona',offensive:[],captain:false,speed:{m5:'',m10:'',m20:'',m30:'',max:''},notes:'Preferência defensiva: zona. Sem preferência de sistema ofensivo.'},
 {id:'a4',name:'André João Teves Rocha',dob:'1995-07-17',height:174,currentWeight:66,idealWeight:66,position:'Universal',defensive:'Misto',offensive:[],captain:true,speed:{m5:'',m10:'',m20:'',m30:'',max:''},notes:'Capitão. Processo defensivo: pressão alta individual/misto; meio-campo zona. Sistema ofensivo sem preferência fixa.'},
 {id:'a5',name:'Francisco Maria Ferreira Gomes',dob:'2004-02-07',height:175,currentWeight:71,idealWeight:'69–72',position:'Universal',defensive:'Zona',offensive:['3-1','2-2'],captain:false,speed:{m5:'',m10:'',m20:'',m30:'',max:''},notes:'Jogador de campo; sem preferência específica de posição, desde que não seja guarda-redes.'},
 {id:'a6',name:'Thomas Da Silva Vaz',dob:'2008-12-29',height:187,currentWeight:74,idealWeight:'',position:'Guarda-redes',defensive:'',offensive:[],captain:false,speed:{m5:'',m10:'',m20:'',m30:'',max:''},notes:'Peso ideal e preferências táticas ainda por preencher.'}
]
const GK_EXERCISES=[
 {id:'gk01',title:'GR 1 · Deslocamento + enquadramento',category:'🧤 Específico GR',phase:'Técnica',duration:8,objective:'Ajustar posição à bola e manter enquadramento.',description:'GR desloca-se entre referências da baliza e enquadra sucessivos portadores. Corrigir base, distância e alinhamento.',notes:'Progressão: aumentar velocidade e incluir remate final.',gkSpecific:true},
 {id:'gk02',title:'GR 2 · Defesa de remate frontal',category:'🧤 Específico GR',phase:'Técnica',duration:8,objective:'Defender remates a diferentes alturas e controlar a segunda ação.',description:'Série curta de remates frontais com reposicionamento entre ações.',notes:'Valorizar controlo da bola ou desvio seguro.',gkSpecific:true},
 {id:'gk03',title:'GR 3 · Remate lateral + redução do ângulo',category:'🧤 Específico GR',phase:'Técnico-tática',duration:9,objective:'Reduzir ângulo sem perder equilíbrio.',description:'Finalizador recebe lateralmente; GR ajusta, avança quando adequado e reage ao remate.',notes:'Progressão: permitir passe ao segundo poste.',gkSpecific:true},
 {id:'gk04',title:'GR 4 · 1x1 — temporização e intervenção',category:'🧤 Específico GR',phase:'Decisão',duration:10,objective:'Escolher quando temporizar, atacar a bola ou bloquear.',description:'Atacante conduz para 1x1. GR lê distância, toque e apoio do atacante.',notes:'Evitar saída automática; decisão depende do estímulo.',gkSpecific:true},
 {id:'gk05',title:'GR 5 · Defesa baixa / bloqueio',category:'🧤 Específico GR',phase:'Técnica',duration:8,objective:'Responder a finalização curta e baixa.',description:'Finalizações próximas alternadas; GR trabalha base, bloqueio e recuperação.',notes:'Qualidade antes de volume.',gkSpecific:true},
 {id:'gk06',title:'GR 6 · Duas ações consecutivas',category:'🧤 Específico GR',phase:'Reação',duration:9,objective:'Defender, recuperar posição e responder novamente.',description:'Primeira finalização gera segunda bola deliberada noutra zona.',notes:'Observar velocidade de recuperação e orientação.',gkSpecific:true},
 {id:'gk07',title:'GR 7 · Reposição rápida com a mão',category:'🧤 Específico GR',phase:'Transição ofensiva',duration:8,objective:'Iniciar transição com precisão e decisão.',description:'Após defesa controlada, GR identifica alvo livre e repõe rapidamente.',notes:'Variar distância, lado e pressão temporal.',gkSpecific:true},
 {id:'gk08',title:'GR 8 · Jogo com os pés sob pressão',category:'🧤 Específico GR',phase:'Construção',duration:10,objective:'Receber orientado e escolher linha de passe segura.',description:'GR participa na primeira fase contra pressão condicionada.',notes:'Criar solução curta e alternativa de segurança.',gkSpecific:true},
 {id:'gk09',title:'GR 9 · Inferioridade 2x1 / 3x2 + GR',category:'🧤 Específico GR',phase:'Tática',duration:12,objective:'Coordenar GR e defensores em inferioridade.',description:'Alternar 2x1 e 3x2. GR orienta cobertura, temporiza e decide intervenção.',notes:'Trabalhar comunicação e proteção do segundo poste.',gkSpecific:true},
 {id:'gk10',title:'GR 10 · Situação real integrada',category:'🧤 Específico GR',phase:'Jogo',duration:12,objective:'Ligar construção, perda, defesa, recuperação e transição.',description:'Sequência contínua com GR integrado no jogo e decisões não pré-programadas.',notes:'Usar regras SE/ENTÃO e variar estímulos.',gkSpecific:true}
]

function tacticalAssessment(x){
 const ps=x?.board?.steps?.[0]?.players||[]; const own=ps.filter(p=>p.team!=='d'), opp=ps.filter(p=>p.team==='d');
 const spread=own.length?Math.max(...own.map(p=>p.y))-Math.min(...own.map(p=>p.y)):0
 const findings=[]; if(own.length>=4&&spread<28)findings.push('Equipa muito concentrada: confirmar largura e linhas de passe.');
 if(own.length&&opp.length)findings.push('Confirmar coberturas antes de acelerar a ação e preservar equilíbrio após perda.');
 const proposals=[
  {name:'Solução A · manter estrutura',text:'Preservar a estrutura reconhecida, criando primeiro uma linha de passe segura e só depois acelerar.'},
  {name:'Solução B · criar homem livre',text:'Fixar um defensor e coordenar apoio/movimento para libertar um terceiro jogador.'},
  {name:'Solução C · variante de segurança',text:'Se a primeira linha fechar, circular/reciclar e reorganizar antes de procurar profundidade.'}
 ];
 return {findings:findings.length?findings:['Estrutura plausível. Validar intenção, adversário e momento do jogo antes de aplicar.'],proposals};
}

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
 useEffect(()=>{
  const k='gw_tactical_library_v17_1'
  if(localStorage.getItem(k))return
  const baseIds=new Set(TACTICAL_LIBRARY.map(x=>x.id))
  const userItems=(exercises||[]).filter(x=>!baseIds.has(x.id))
  setExercises([...userItems,...TACTICAL_LIBRARY])
  localStorage.setItem(k,'1')
 },[])
 useEffect(()=>{const k='gw_gk_library_v20';if(localStorage.getItem(k))return;const ids=new Set((exercises||[]).map(x=>x.id));setExercises([...(exercises||[]),...GK_EXERCISES.filter(x=>!ids.has(x.id))]);localStorage.setItem(k,'1')},[])
 const [sessions,setSessions]=useStore('gw_training_sessions_v12',[])
 const [games,setGames]=useStore('gw_games_v12',[])
 const [week,setWeek]=useStore('gw_week_plan_v12',[])
 const [selectedAthlete,setSelectedAthlete]=useState(athletes[0]?.id||null)
 const go=p=>setPage(p)
 return <div className="app">
  <header className="topbar"><div className="brand"><img src="club-crest.jpg"/><div><b>CAVADAS MANAGER</b><span>ÉPOCA 26/27</span><span>Autor RJP</span></div></div><div className="languages"><Languages size={18}/>{['pt','de','fr','lb','en'].map(l=><button key={l} className={lang===l?'active':''} onClick={()=>setLang(l)}>{l.toUpperCase()}</button>)}</div></header>
  <nav className="nav">
   <Nav label={tr.home} icon={<BarChart3/>} active={page==='home'} onClick={()=>go('home')}/>
   <Nav label={tr.athletes} icon={<Users/>} active={page==='athletes'} onClick={()=>go('athletes')}/>
   <Nav label={tr.training} icon={<Dumbbell/>} active={page==='training'} onClick={()=>go('training')}/>
   <Nav label={tr.exercises} icon={<ClipboardList/>} active={page==='exercises'} onClick={()=>go('exercises')}/>
   <Nav label={lang==='de'?'Taktik-Import':lang==='fr'?'Import tactique':lang==='lb'?'Taktik-Import':lang==='en'?'Tactical Import':'Importar Tática'} icon={<FileUp/>} active={page==='importer'} onClick={()=>go('importer')}/>
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
   {page==='importer'&&<TacticalImporter lang={lang} exercises={exercises} setExercises={setExercises} setPage={setPage}/>}
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
 <aside className="card"><div className="paneTitle"><h3>{tr.history}</h3><small>{callups.length}</small></div>{callups.slice().reverse().map(c=><div className="exportItem" key={c.id}><div id={'callup-'+c.id} className="brandedExport"><div className="exportBrand"><img src="club-crest.jpg"/><div><b>1. FC GRUEFWISS LEIDELENG</b><span>CONVOCATÓRIA · 2026/27</span></div></div><h2>Gruefwiss vs {c.opponent}</h2><p>{c.competition||''}</p><div className="exportMeta"><span>{c.date||'—'} · {c.time||'—'}</span><span>{c.location||'—'}</span><span>Concentração: {c.meeting||'—'}</span></div><div className="exportPlayers">{athletes.filter(a=>(c.players||[]).includes(a.id)).map((a,i)=><div key={a.id}><b>{String(i+1).padStart(2,'0')}</b><span>{a.name}</span><small>{a.position}</small></div>)}</div><div className="ackTitle"><b>TOMADA DE CONHECIMENTO DA CONVOCATÓRIA</b><small>Os atletas convocados declaram ter tomado conhecimento da presente convocatória.</small></div><div className="signatureTable">{athletes.filter(a=>(c.players||[]).includes(a.id)).map((a,i)=><div key={'sig-'+a.id}><span>{i+1}. {a.name}</span><i>Assinatura</i></div>)}</div><div className="docWatermark">RJP</div></div><div className="exportButtons"><button onClick={()=>exportNode('callup-'+c.id,'pdf','convocatoria-'+c.opponent)}><FileText/>PDF</button><button onClick={()=>sharePdf('callup-'+c.id,'convocatoria-'+c.opponent,'Convocatória · Gruefwiss vs '+c.opponent)}><Share2/>WhatsApp / Partilhar</button><button onClick={()=>sharePdf('callup-'+c.id,'convocatoria-'+c.opponent,'Convocatória · Gruefwiss vs '+c.opponent)}><Mail/>E-mail</button><button onClick={()=>exportNode('callup-'+c.id,'png','convocatoria-'+c.opponent)}><ImageIcon/>{tr.exportImage}</button><button className="dangerLite" onClick={()=>setCallups(callups.filter(x=>x.id!==c.id))}><Trash2/></button></div></div>)}</aside></div>
}


function GameModel({athletes}){
 const [model,setModel]=useStore('gw_game_model_v13',{identity:'',offensive:'4-0',pivotHeight:'Equilibrado',wingDemand:'Equilibrada',defensive:'Zona',pressing:'',transitionAttack:'',transitionDefence:'',principles:[],notes:''})
 const [principle,setPrinciple]=useState('')
 const upd=(k,v)=>setModel({...model,[k]:v})
 const add=()=>{if(principle.trim()){upd('principles',[...(model.principles||[]),principle.trim()]);setPrinciple('')}}
 return <div className="v13TwoCol"><section className="card"><div className="paneTitle"><div><h2>Modelo de Jogo</h2><small>Identidade e princípios da equipa</small></div><BookOpen/></div>
  <Field label="Identidade / ideia de jogo"><textarea rows="4" value={model.identity||''} onChange={e=>upd('identity',e.target.value)}/></Field>
  <div className="formGrid"><Field label="Organização ofensiva"><select value={model.offensive} onChange={e=>upd('offensive',e.target.value)}><option>4-0</option><option>3-1</option><option>2-2</option><option>Dinâmico / híbrido</option></select></Field><Field label="Organização defensiva"><select value={model.defensive} onChange={e=>upd('defensive',e.target.value)}><option>Zona</option><option>Individual</option><option>Misto</option></select></Field></div>
  {model.offensive==='3-1'&&<><div className="formGrid"><Field label="Altura do pivô"><select value={model.pivotHeight||'Equilibrado'} onChange={e=>upd('pivotHeight',e.target.value)}><option>Alto / profundo</option><option>Equilibrado</option><option>Baixo / apoio</option></select></Field><Field label="Disponibilidade física dos alas"><select value={model.wingDemand||'Equilibrada'} onChange={e=>upd('wingDemand',e.target.value)}><option>Alta</option><option>Equilibrada</option><option>Controlada</option></select></Field></div>{model.pivotHeight==='Alto / profundo'&&<div className="tacticalAdvice"><b>3:1 · Pivô alto</b><p>O pivô fixa e dá profundidade. Os alas necessitam maior disponibilidade física para dar apoio, atacar zonas de finalização e chegar ao segundo poste. O fixo deve assegurar circulação e equilíbrio após perda.</p></div>}</>}
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


const IMPORT_TEXT={
 pt:{title:'Importador Tático',sub:'PDF · PowerPoint · Vídeo → animação editável → Biblioteca',choose:'Escolher ficheiro',analyse:'Analisar',working:'A analisar…',found:'conteúdos detetados',open:'Abrir animação',save:'Guardar na Biblioteca',saved:'Guardado',hint:'A análise é local no dispositivo. Confirma sempre os movimentos antes de usar num treino.',pdf:'PDF',ppt:'PowerPoint',video:'Vídeo',no:'Ainda não há uma análise.',confidence:'Confiança',steps:'passos',players:'peças',kind:'Tipo',source:'Fonte'},
 de:{title:'Taktik-Import',sub:'PDF · PowerPoint · Video → editierbare Animation → Bibliothek',choose:'Datei wählen',analyse:'Analysieren',working:'Analyse…',found:'Inhalte erkannt',open:'Animation öffnen',save:'In Bibliothek speichern',saved:'Gespeichert',hint:'Die Analyse erfolgt lokal. Bewegungen vor dem Training immer prüfen.',pdf:'PDF',ppt:'PowerPoint',video:'Video',no:'Noch keine Analyse.',confidence:'Sicherheit',steps:'Schritte',players:'Spieler',kind:'Typ',source:'Quelle'},
 fr:{title:'Import tactique',sub:'PDF · PowerPoint · Vidéo → animation modifiable → Bibliothèque',choose:'Choisir fichier',analyse:'Analyser',working:'Analyse…',found:'contenus détectés',open:'Ouvrir animation',save:'Enregistrer dans la bibliothèque',saved:'Enregistré',hint:'L’analyse se fait localement. Vérifiez toujours les mouvements avant l’entraînement.',pdf:'PDF',ppt:'PowerPoint',video:'Vidéo',no:'Aucune analyse pour le moment.',confidence:'Confiance',steps:'étapes',players:'joueurs',kind:'Type',source:'Source'},
 lb:{title:'Taktik-Import',sub:'PDF · PowerPoint · Video → editéierbar Animatioun → Bibliothéik',choose:'Fichier wielen',analyse:'Analyséieren',working:'Analyséieren…',found:'Inhalter erkannt',open:'Animatioun opmaachen',save:'An d’Bibliothéik späicheren',saved:'Gespäichert',hint:'D’Analyse leeft lokal. Beweegunge virum Training ëmmer kontrolléieren.',pdf:'PDF',ppt:'PowerPoint',video:'Video',no:'Nach keng Analyse.',confidence:'Sécherheet',steps:'Schrëtt',players:'Spiller',kind:'Typ',source:'Quell'},
 en:{title:'Tactical Import',sub:'PDF · PowerPoint · Video → editable animation → Library',choose:'Choose file',analyse:'Analyse',working:'Analysing…',found:'items detected',open:'Open animation',save:'Save to Library',saved:'Saved',hint:'Analysis runs locally on the device. Always confirm movements before using them in training.',pdf:'PDF',ppt:'PowerPoint',video:'Video',no:'No analysis yet.',confidence:'Confidence',steps:'steps',players:'pieces',kind:'Type',source:'Source'}
}
const clamp=(v,a=2,b=98)=>Math.max(a,Math.min(b,v))
const catFromTitle=t=>{const x=(t||'').toLowerCase();if(x.includes('canto')||x.includes('corner'))return'Bola parada · Canto';if(x.includes('press'))return'Saída de pressão';if(x.includes('fora')||x.includes('lateral')||x.includes('kick-in'))return'Bola parada · Fora';if(x.includes('def'))return'Tática defensiva';if(x.includes('ofens')||x.includes('attack'))return'Tática ofensiva';return'Importado'}
const defaultImported=(title,source,steps,confidence=70)=>({id:'imp'+Date.now()+Math.random().toString(36).slice(2),title:title||'Tática importada',author:'Cavadas Manager · Importador V18',category:catFromTitle(title),phase:'Aquisição de competências',duration:10,objective:'',description:'Importação automática/semi-automática. Rever antes de utilizar.',notes:'V18 · movimentos importados devem ser confirmados pelo treinador.',playersCount:steps[0]?.players?.length||0,field:'futsal',board:{players:steps[0]?.players||[],ball:steps[0]?.ball||{x:50,y:50},steps},source,imported:true,confidence})
function makeDiagramSteps(seed=0,count=4){
 const base=[{id:'a1',team:'a',x:18,y:25,label:'1'},{id:'a2',team:'a',x:23,y:62,label:'2'},{id:'a3',team:'a',x:42,y:33,label:'3'},{id:'a4',team:'a',x:47,y:58,label:'4'},{id:'d1',team:'d',x:65,y:28,label:'1'},{id:'d2',team:'d',x:69,y:54,label:'2'}]
 return Array.from({length:count},(_,i)=>({id:'imp-step-'+seed+'-'+i,name:'Passo '+(i+1),duration:1.1,players:base.map((p,k)=>({...p,x:clamp(p.x+i*(p.team==='a'?5:2)+(k%2?i:-i)*.8),y:clamp(p.y+Math.sin((i+k+seed)*.9)*4)})),ball:{x:clamp(20+i*10),y:clamp(25+(i%2)*25)},paths:[]}))
}
async function analysePdf(file){
 const pdfjs=await import('pdfjs-dist/legacy/build/pdf.mjs');pdfjs.GlobalWorkerOptions.workerSrc=new URL('pdfjs-dist/legacy/build/pdf.worker.mjs',import.meta.url).toString()
 const data=new Uint8Array(await file.arrayBuffer()),doc=await pdfjs.getDocument({data}).promise,out=[];let pending=null
 for(let n=1;n<=Math.min(doc.numPages,30);n++){
  const page=await doc.getPage(n),txt=await page.getTextContent(),raw=txt.items.map(x=>x.str).join(' ').trim();const title=(raw.match(/(CANTO[^.]{0,45}|SA[IÍ]DA DE PRESS[ÃA]O[^.]{0,45}|LIVRE[^.]{0,45}|FORA[^.]{0,45}|3\s*[:xX]\s*1[^.]{0,30}|4\s*[:xX]\s*0[^.]{0,30}|2\s*[:xX]\s*1[^.]{0,30}|3\s*[:xX]\s*2[^.]{0,30})/i)||[])[1]
  if(title){const item=defaultImported(title.trim()+` · pág. ${n}`,`${file.name} · PDF pág. ${n}`,makeDiagramSteps(n,4),58);out.push(item);pending=item}
  else if(pending&&raw.length<80){const extra=makeDiagramSteps(n,1)[0];extra.name='Passo '+(pending.board.steps.length+1);pending.board.steps.push(extra)}
 }
 if(!out.length)out.push(defaultImported(file.name.replace(/\.pdf$/i,''),`${file.name} · PDF`,makeDiagramSteps(1,4),42))
 return out
}
function xmlText(node,tag){return[...node.getElementsByTagName(tag)].map(x=>x.textContent||'').join(' ').trim()}
async function analysePptx(file){
 const JSZip=(await import('jszip')).default,zip=await JSZip.loadAsync(await file.arrayBuffer()),slides=Object.keys(zip.files).filter(x=>/^ppt\/slides\/slide\d+\.xml$/.test(x)).sort((a,b)=>Number(a.match(/\d+/)[0])-Number(b.match(/\d+/)[0]));const parser=new DOMParser(),groups=[];let current=null
 for(const path of slides){const xml=parser.parseFromString(await zip.file(path).async('text'),'application/xml'),n=Number(path.match(/slide(\d+)/)[1]),text=xmlText(xml,'a:t')||xmlText(xml,'t'),title=(text.match(/(CANTO[^\n]{0,50}|SA[IÍ]DA DE PRESS[ÃA]O[^\n]{0,50}|LIVRE(?: LATERAL| CENTRAL)?[^\n]{0,40}|BOLA DE SA[IÍ]DA[^\n]{0,40}|3\s*:\s*1|4\s*:\s*0|2\s*:\s*2|LINHAS DEFENSIVAS|TROCAS)/i)||[])[1]
  const shapes=[];for(const sp of [...xml.getElementsByTagName('p:sp'),...xml.getElementsByTagName('sp')]){const label=xmlText(sp,'a:t')||xmlText(sp,'t');const off=sp.getElementsByTagName('a:off')[0]||sp.getElementsByTagName('off')[0];if(!off)continue;const x=Number(off.getAttribute('x')||0),y=Number(off.getAttribute('y')||0);if(/^\d{1,2}$/.test(label)||/GR/i.test(label))shapes.push({id:'p'+(shapes.length+1),team:shapes.length<5?'a':'d',x:clamp(5+(x%9000000)/9000000*90),y:clamp(5+(y%5000000)/5000000*90),label})}
  const step={id:'ppt-'+n,name:'Passo '+((current?.steps.length||0)+1),duration:1.1,players:shapes.length?shapes:makeDiagramSteps(n,1)[0].players,ball:{x:50,y:50},paths:[]}
  if(title){current={title:title.trim(),start:n,steps:[step]};groups.push(current)}else if(current&&current.steps.length<7)current.steps.push(step)
 }
 const out=groups.map(g=>defaultImported(g.title+` · slides ${g.start}–${g.start+g.steps.length-1}`,`${file.name} · PPTX`,g.steps,76));return out.length?out:[defaultImported(file.name.replace(/\.pptx$/i,''),`${file.name} · PPTX`,makeDiagramSteps(3,5),48)]
}
function componentsFromFrame(ctx,w,h){
 const d=ctx.getImageData(0,0,w,h).data,pts=[]
 for(let y=4;y<h;y+=5)for(let x=4;x<w;x+=5){const i=(y*w+x)*4,r=d[i],g=d[i+1],b=d[i+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b);if(mx-mn>70&&mx>115&&!(g>r*1.25&&g>b*1.15))pts.push({x:x/w*100,y:y/h*100,r,g,b})}
 const clusters=[];for(const p of pts){let c=clusters.find(c=>Math.hypot(c.x-p.x,c.y-p.y)<5);if(c){c.x=(c.x*c.n+p.x)/(c.n+1);c.y=(c.y*c.n+p.y)/(c.n+1);c.n++}else clusters.push({...p,n:1})}
 return clusters.filter(c=>c.n>=2).sort((a,b)=>b.n-a.n).slice(0,10).map((c,i)=>({id:'v'+i,team:c.r>c.b?'d':'a',x:clamp(c.x),y:clamp(c.y),label:String(i+1)}))
}
async function analyseVideo(file,setProgress){
 const url=URL.createObjectURL(file),v=document.createElement('video');v.src=url;v.muted=true;v.playsInline=true;await new Promise((res,rej)=>{v.onloadedmetadata=res;v.onerror=rej});const duration=Math.min(v.duration||20,90),samples=Math.max(4,Math.min(9,Math.ceil(duration/5))),canvas=document.createElement('canvas');canvas.width=480;canvas.height=270;const ctx=canvas.getContext('2d'),steps=[];let prev=[]
 for(let i=0;i<samples;i++){v.currentTime=duration*(i/(samples-1));await new Promise(res=>{v.onseeked=()=>res()});ctx.drawImage(v,0,0,canvas.width,canvas.height);let found=componentsFromFrame(ctx,canvas.width,canvas.height);if(found.length<3)found=prev.length?prev:makeDiagramSteps(i,1)[0].players;else if(prev.length){found=found.map((p,k)=>{const q=[...prev].sort((a,b)=>Math.hypot(a.x-p.x,a.y-p.y)-Math.hypot(b.x-p.x,b.y-p.y))[0];return{...p,id:q?.id||p.id,label:q?.label||p.label,team:q?.team||p.team}})};prev=found;steps.push({id:'vid-'+i,name:'Frame '+(i+1),duration:Math.max(.7,duration/(samples-1)/2),players:found,ball:{x:50,y:50},paths:[]});setProgress?.(Math.round((i+1)/samples*100))}
 URL.revokeObjectURL(url);return[defaultImported(file.name.replace(/\.[^.]+$/,''),`${file.name} · vídeo ${duration.toFixed(1)} s`,steps,foundQuality(steps))]
}
const foundQuality=steps=>{const n=steps.reduce((a,s)=>a+(s.players?.length||0),0)/(steps.length||1);return Math.round(Math.max(30,Math.min(72,35+n*4)))}
function TacticalImporter({lang,exercises,setExercises,setPage}){
 const t=IMPORT_TEXT[lang]||IMPORT_TEXT.pt,[file,setFile]=useState(null),[items,setItems]=useState([]),[busy,setBusy]=useState(false),[error,setError]=useState(''),[progress,setProgress]=useState(0),[saved,setSaved]=useState(new Set())
 const kind=file?supportedImportKind(file):null
 const analyse=async()=>{if(!file)return;setBusy(true);setError('');setItems([]);setProgress(0);try{setItems(await analyseDocumentV2(file,setProgress))}catch(e){console.error(e);setError(e?.message||String(e))}finally{setBusy(false)}}
 const save=x=>{const item={...x,id:'imp'+Date.now()+Math.random().toString(36).slice(2)};setExercises([...(exercises||[]),item]);setSaved(new Set([...saved,x.id]));return item}
 const open=x=>{const item=save(x);localStorage.setItem('gw_board_edit_exercise',item.id);setPage('board')}
 return <div className="tacticalImporter">
  <section className="card importHero"><div><small>V20.0.4 · DOCUMENTOS + PARTILHA · LOCAL / OFFLINE</small><h2>{t.title}</h2><p>PDF · PowerPoint · Vídeo · Foto / esquema manuscrito → animação editável → Biblioteca</p></div><ScanSearch size={46}/></section>
  <section className="card importDrop"><div className="importTypes"><span><FileText/>PDF</span><span><Presentation/>PPTX</span><span><Film/>VIDEO</span><span><ImageIcon/>FOTO / MANUSCRITO</span></div>
   <label className="filePicker"><FileUp size={30}/><b>{file?file.name:t.choose}</b><small>PDF · PPTX · JPG/PNG/WebP · MP4/WebM/MOV</small><input type="file" accept=".pdf,.pptx,.jpg,.jpeg,.png,.webp,.bmp,video/mp4,video/webm,video/quicktime" onChange={e=>{setFile(e.target.files?.[0]||null);setItems([]);setError('');setProgress(0)}}/></label>
   <button className="primary importAnalyse" disabled={!file||busy} onClick={analyse}>{busy?t.working:<><ScanSearch/> {t.analyse}</>}</button>
   {busy&&<div className="progressTrack"><i style={{width:progress+'%'}}/><span>{progress}%</span></div>}{error&&<div className="importError">{error}</div>}
   <p className="importHint">Motor V2: geometria + cores + objetos + trajetórias. Em manuscritos/fotos, confirma as peças e setas antes de guardar.</p></section>
  <section className="importResults">{items.length?<><div className="resultsTitle"><h3>{items.length} {t.found}</h3><small>{file?.name}</small></div>{items.map(x=><article className="card importCard" key={x.id}><div className="importBadge">{x.category}</div><h3>{x.title}</h3><p>{x.description}</p><div className="importMeta"><span><b>{x.board?.steps?.length||0}</b> {t.steps}</span><span><b>{x.playersCount||0}</b> {t.players}</span><span><b>{x.confidence||0}%</b> {t.confidence}</span></div><div className="miniTactic"><div className="miniHalf"/>{(x.board?.steps?.[0]?.players||[]).map(p=><i key={p.id} className={p.team==='d'?'opp':''} style={{left:p.x+'%',top:p.y+'%'}}>{p.label}</i>)}</div><small><b>{x.importEngine}</b> · {t.source}: {x.source}</small>{x.reviewRequired&&<div className="importError">⚠ Rever/corrigir antes de usar — confiança abaixo do nível automático.</div>}<div className="tacticalAdvice"><b>🧠 Diagnóstico tático</b>{tacticalAssessment(x).findings.map((f,i)=><p key={i}>{f}</p>)}<b>Propostas válidas para revisão do treinador</b>{tacticalAssessment(x).proposals.map((p,i)=><details key={i}><summary>{p.name}</summary><p>{p.text}</p></details>)}<small>Base de princípios: ocupação de espaço, linhas de passe, equilíbrio, cobertura, superioridade e reação à perda. A proposta é apoio à decisão, não substitui a opção do treinador.</small></div><div className="importActions"><button onClick={()=>save(x)} disabled={saved.has(x.id)}><Save/>{saved.has(x.id)?t.saved:t.save}</button><button className="primary" onClick={()=>open(x)}><Activity/>{t.open}</button></div></article>)}</>:<div className="card importEmpty"><ScanSearch size={54}/><p>{t.no}</p><small>Também podes fotografar um esquema desenhado à mão e importar a imagem.</small></div>}</section>
 </div>
}
function Board({tr,exercises,setExercises}){
 const editId=localStorage.getItem('gw_board_edit_exercise')
 const editEx=(exercises||[]).find(x=>x.id===editId)
 const storedSteps=editEx?.board?.steps
 const fallbackPlayers=[
  {id:'a1',team:'a',x:22,y:42,label:'1'},{id:'a2',team:'a',x:35,y:25,label:'2'},
  {id:'a3',team:'a',x:35,y:59,label:'3'},{id:'a4',team:'a',x:48,y:42,label:'4'},
  {id:'d1',team:'d',x:68,y:28,label:'1'},{id:'d2',team:'d',x:68,y:56,label:'2'},
  {id:'d3',team:'d',x:79,y:42,label:'3'}
 ]
 const initialSteps=storedSteps?.length?storedSteps:[{id:Date.now(),name:'Passo 1',players:fallbackPlayers.map(p=>({...p})),ball:{x:52,y:42},paths:[],duration:1.15}]
 const [title,setTitle]=useState(editEx?.title||'Nova jogada')
 const [sport,setSport]=useState(editEx?.field||'futsal')
 const [steps,setSteps]=useState(initialSteps)
 const [step,setStep]=useState(0)
 const [players,setPlayers]=useState((initialSteps[0].players||fallbackPlayers).map(p=>({...p})))
 const [ball,setBall]=useState({...((initialSteps[0]?.ball)||{x:52,y:42})})
 const [paths,setPaths]=useState((initialSteps[0].paths||[]).map(p=>({...p})))
 const [tool,setTool]=useState('select')
 const [drag,setDrag]=useState(null)
 const [pathStart,setPathStart]=useState(null)
 const [playing,setPlaying]=useState(false)
 const [speed,setSpeed]=useState(1)
 const [fullscreen,setFullscreen]=useState(false)
 const stopRef=useRef(false)

 const snap=()=>({players:players.map(p=>({...p})),ball:{...ball},paths:paths.map(p=>({...p})),duration:steps[step]?.duration||1.15})
 const commitSteps=()=>steps.map((x,i)=>i===step?{...x,...snap()}:x)
 const saveStep=()=>setSteps(commitSteps())
 const loadStep=i=>{
   const x=steps[i]; if(!x)return
   setPlayers((x.players||[]).map(p=>({...p})));setBall({...x.ball});setPaths((x.paths||[]).map(p=>({...p})));setStep(i)
 }
 const point=e=>{const r=e.currentTarget.getBoundingClientRect();return{x:Math.max(2,Math.min(98,(e.clientX-r.left)/r.width*100)),y:Math.max(3,Math.min(97,(e.clientY-r.top)/r.height*100))}}
 const down=e=>{if(playing)return;const p=point(e);if(tool==='move'||tool==='pass')setPathStart(p)}
 const move=e=>{if(!drag||playing)return;const p=point(e);if(drag.kind==='ball')setBall(p);else setPlayers(v=>v.map(x=>x.id===drag.id?{...x,...p}:x))}
 const up=e=>{if(playing)return;if(pathStart){const q=point(e);setPaths(v=>[...v,{id:Date.now()+Math.random(),type:tool,x1:pathStart.x,y1:pathStart.y,x2:q.x,y2:q.y}]);setPathStart(null)}setDrag(null)}
 const addPlayer=team=>{const n=players.filter(p=>p.team===team).length+1;setPlayers(v=>[...v,{id:team+Date.now(),team,x:team==='a'?30:70,y:50,label:String(n)}])}
 const nextStep=()=>{const now=commitSteps();const n={id:Date.now(),name:`Passo ${now.length+1}`,players:players.map(p=>({...p})),ball:{...ball},paths:[],duration:1.15};setSteps([...now,n]);setPaths([]);setStep(now.length)}
 const duplicate=()=>{const now=commitSteps(),n={...now[step],id:Date.now(),name:`Passo ${now.length+1}`,players:players.map(p=>({...p})),ball:{...ball},paths:paths.map(p=>({...p}))};setSteps([...now,n]);setStep(now.length)}
 const lerp=(a,b,t)=>a+(b-a)*t
 const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2
 const curvePoint=(a,b,t,bend)=>{
   const mx=(a.x+b.x)/2,my=(a.y+b.y)/2,dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1
   const c={x:mx-dy/len*bend,y:my+dx/len*bend}
   const u=1-t
   return{x:u*u*a.x+2*u*t*c.x+t*t*b.x,y:u*u*a.y+2*u*t*c.y+t*t*b.y}
 }
 const moved=(a,b)=>Math.hypot((b.x||0)-(a.x||0),(b.y||0)-(a.y||0))>.4
 const animate=(a,b,index)=>new Promise(resolve=>{
   const base=(b.duration||1.15)*1000/speed,t0=performance.now()
   const amap=new Map((a.players||[]).map(x=>[x.id,x]))
   const movers=(b.players||[]).filter(bp=>moved(amap.get(bp.id)||bp,bp))
   const frame=now=>{
     if(stopRef.current){resolve();return}
     const raw=Math.min(1,(now-t0)/base)
     setPlayers((b.players||[]).map((bp,k)=>{
       const ap=amap.get(bp.id)||bp
       if(!moved(ap,bp))return{...bp}
       // stagger only slightly; simultaneous tactical actions remain simultaneous
       const order=Math.max(0,movers.findIndex(x=>x.id===bp.id))
       const delay=Math.min(.16,order*.035)
       const q=Math.max(0,Math.min(1,(raw-delay)/(1-delay))),t=ease(q)
       const bend=((k%2===0)?1:-1)*Math.min(3.2,Math.hypot(bp.x-ap.x,bp.y-ap.y)*.055)
       const pos=curvePoint(ap,bp,t,bend)
       return{...bp,...pos}
     }))
     const ab=a.ball||b.ball,bb=b.ball||ab
     if(moved(ab,bb)){
       // ball starts a fraction after the run trigger and travels faster
       const qb=Math.max(0,Math.min(1,(raw-.10)/.62)),tb=ease(qb)
       const bp=curvePoint(ab,bb,tb,1.1)
       setBall(bp)
     }else setBall({...bb})
     if(raw<1)requestAnimationFrame(frame);else{setPlayers((b.players||[]).map(x=>({...x})));setBall({...bb});resolve()}
   };requestAnimationFrame(frame)
 })
 const play=async()=>{
   setFullscreen(true)
   const seq=commitSteps();if(seq.length<2)return alert('A jogada precisa de pelo menos 2 passos.')
   stopRef.current=false;setPlaying(true);setPaths([]);setPlayers(seq[0].players.map(p=>({...p})));setBall({...seq[0].ball});setStep(0)
   await new Promise(r=>setTimeout(r,280/speed))
   for(let i=0;i<seq.length-1&&!stopRef.current;i++){await animate(seq[i],seq[i+1],i);setStep(i+1);if(!stopRef.current)await new Promise(r=>setTimeout(r,150/speed))}
   setPlaying(false)
 }
 const stop=()=>{stopRef.current=true;setPlaying(false)}
 useEffect(()=>{
   const esc=e=>{if(e.key==='Escape')setFullscreen(false)}
   window.addEventListener('keydown',esc);return()=>window.removeEventListener('keydown',esc)
 },[])
 const setDuration=v=>setSteps(xs=>xs.map((x,i)=>i===step?{...x,duration:Number(v)}:x))
 const saveExercise=()=>{
   const finalSteps=commitSteps(),existing=(exercises||[]).find(x=>x.id===editId)
   if(existing){setExercises(exercises.map(x=>x.id===editId?{...x,title,field:sport,playersCount:players.length,board:{players,ball,steps:finalSteps},updatedAt:new Date().toISOString()}:x));alert('Jogada atualizada na biblioteca.')}
   else{const item={id:'play'+Date.now(),title,author:'Cavadas Manager',category:'Jogada',phase:'Aplicação em jogo',duration:10,objective:'',description:'',field:sport,playersCount:players.length,board:{players,ball,steps:finalSteps},createdAt:new Date().toISOString()};setExercises([...(exercises||[]),item]);localStorage.setItem('gw_board_edit_exercise',item.id);alert('Jogada guardada na biblioteca.')}
 }
 const saveVariant=()=>{const finalSteps=commitSteps(),item={...(editEx||{}),id:'variant'+Date.now(),title:(title||'Jogada')+' · Variante',author:'Cavadas Manager',libraryBase:false,field:sport,playersCount:players.length,board:{players,ball,steps:finalSteps},createdAt:new Date().toISOString()};setExercises([...(exercises||[]),item]);localStorage.setItem('gw_board_edit_exercise',item.id);setTitle(item.title);alert('Variante guardada.')}
 return <div className="simpleBoard">
  <div className="card simpleHead"><div><small>{editEx?.libraryBase?'BIBLIOTECA BASE · ANIMAÇÃO V17.1':'QUADRO TÁTICO'}</small><input className="boardTitleInput" value={title} onChange={e=>setTitle(e.target.value)}/><div className="boardSub">Movimentos naturais · bola mais rápida · ações simultâneas · velocidade ajustável</div></div><select value={sport} onChange={e=>setSport(e.target.value)}><option value="futsal">Futsal</option><option value="football11">Futebol 11</option><option value="football7">Futebol 7</option><option value="football6">Futebol 6</option></select></div>
  <div className="card coachTools"><button className={tool==='select'?'active':''} onClick={()=>setTool('select')}>☝ Mover peças</button><button onClick={()=>addPlayer('a')}>＋ Nossa equipa</button><button onClick={()=>addPlayer('d')}>＋ Adversário</button><button className={tool==='move'?'active':''} onClick={()=>setTool('move')}>➜ Movimento</button><button className={tool==='pass'?'active':''} onClick={()=>setTool('pass')}>⚽ Passe</button><button onClick={()=>setPaths(v=>v.slice(0,-1))}>↶ Apagar seta</button></div>
  <div className={fullscreen?'pitchFullscreen':'card pitchCard'}>
   <div className="pitchViewportBar">
    <button className="viewportBtn" onClick={()=>setFullscreen(v=>!v)}>{fullscreen?'✕ Fechar':'⛶ Ecrã inteiro'}</button>
    <span>{fullscreen?title:'O campo adapta-se automaticamente ao ecrã'}</span>
    {fullscreen&&(playing?<button className="viewportPlay" onClick={stop}>■ STOP</button>:<button className="viewportPlay" onClick={play}>▶ PLAY</button>)}
   </div>
   <div className="pitchFit"><div className={`coachPitch ${sport}`} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={()=>{setDrag(null);setPathStart(null)}}>
   <div className="pitchHalf"/><div className="pitchCircle"/><div className="pitchSpot"/><div className="pitchArea left"/><div className="pitchArea right"/><div className="pitchGoal left"/><div className="pitchGoal right"/>
   {!playing&&<svg className="coachLines" viewBox="0 0 100 100" preserveAspectRatio="none"><defs><marker id="arrowMove" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z"/></marker><marker id="arrowPass" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z"/></marker></defs>{paths.map(p=><line key={p.id} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} className={p.type} markerEnd={`url(#${p.type==='pass'?'arrowPass':'arrowMove'})`}/>)}</svg>}
   {players.map(p=><div key={p.id} className={`coachPiece ${p.team}`} style={{left:`${p.x}%`,top:`${p.y}%`}} onPointerDown={e=>{e.stopPropagation();if(tool==='select')setDrag({kind:'player',id:p.id})}}>{p.label}</div>)}
   <div className="coachBall" style={{left:`${ball.x}%`,top:`${ball.y}%`}} onPointerDown={e=>{e.stopPropagation();if(tool==='select')setDrag({kind:'ball'})}}>⚽</div>
  </div></div></div>
  <div className="card playSteps">
   <div className="steps">{steps.map((x,i)=><button key={x.id} className={i===step?'active':''} onClick={()=>{saveStep();loadStep(i)}}>{i+1}</button>)}<button className="addStep" onClick={nextStep}>＋ Passo</button><button className="addStep" onClick={duplicate}>Duplicar</button></div>
   <div className="animControls"><label>Passo {step+1} <select value={steps[step]?.duration||1.15} onChange={e=>setDuration(e.target.value)}><option value=".7">0,7 s</option><option value=".9">0,9 s</option><option value="1.15">1,15 s</option><option value="1.4">1,4 s</option><option value="1.8">1,8 s</option></select></label><label>Velocidade <select value={speed} onChange={e=>setSpeed(Number(e.target.value))}><option value=".5">0,5×</option><option value="1">1×</option><option value="1.5">1,5×</option><option value="2">2×</option></select></label></div>
   <div className="playButtons">{playing?<button className="bigPlay" onClick={stop}>■ STOP</button>:<button className="bigPlay" onClick={play}>▶ PLAY</button>}<button onClick={saveExercise}><Save/> Guardar</button>{editEx&&<button onClick={saveVariant}><Plus/> Guardar variante</button>}</div>
   <div className="coachHint"><b>PLAY:</b> os movimentos podem decorrer em simultâneo; a bola reage depois do gatilho e percorre o passe mais depressa. As setas desaparecem durante a reprodução.</div>
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
   <div className="exerciseList">{list.map(x=><button key={x.id} className={'exerciseListItem '+(x.id===sel?'selected':'')} onClick={()=>setSel(x.id)}><div className="exerciseThumb">{x.image?<img src={x.image}/>:<Activity/>}</div><div><b>{x.title||x.name||'Novo exercício'}</b><small>{x.libraryBase?'★ Biblioteca Base · ':''}{x.category||'Sem categoria'} · {x.playersCount??x.players?.length??0} jogadores</small></div></button>)}</div>
  </aside>
  <section className="exerciseDetail card">{cur?<>
   <div className="exerciseHeader"><div className="exerciseTitleFields"><input className="exerciseTitle" placeholder="Nome do exercício" value={cur.title||cur.name||''} onChange={e=>upd('title',e.target.value)}/><input className="exerciseAuthor" placeholder="Autor" value={cur.author||''} onChange={e=>upd('author',e.target.value)}/></div><div className="exerciseActions"><button className="primary" onClick={editBoard}><Activity/> ▶ Abrir animação</button><button className="danger" onClick={del}><Trash2/> {tr.delete}</button></div></div>
   <label className="exerciseImage">{cur.image?<img src={cur.image}/>:<div className="imagePlaceholder"><Activity size={54}/><b>Imagem opcional do exercício</b><span>{cur.libraryBase?'Jogada pronta para abrir, reproduzir e adaptar':'O desenho tático é editado diretamente no Quadro'}</span></div>}<input type="file" accept="image/*" onChange={photo}/><span className="imageEdit">Alterar imagem</span></label>
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
 const [picker,setPicker]=useState('all')
 const [feedback,setFeedback]=useStore('gw_training_feedback_v20_0_2',[])
 const empty={title:'Treino',date:'',time:'',location:'',theme:'',notes:'',exerciseIds:[],attendance:{}};const [draft,setDraft]=useState(empty)
 const total=draft.exerciseIds.reduce((s,id)=>s+(Number(exercises.find(x=>x.id===id)?.duration)||0),0)
 const move=(i,d)=>{const j=i+d;if(j<0||j>=draft.exerciseIds.length)return;const a=[...draft.exerciseIds];[a[i],a[j]]=[a[j],a[i]];setDraft({...draft,exerciseIds:a})}
 const setAtt=(id,status)=>setDraft({...draft,attendance:{...draft.attendance,[id]:status}})
 const save=()=>{if(!draft.exerciseIds.length)return alert('Adicione pelo menos um exercício.');setSessions([...sessions,{...draft,id:'tr'+Date.now(),total}]);setDraft(empty)}
 return <div className="trainingWorkspace"><section className="card trainingBuilder"><div className="paneTitle"><div><h2>{tr.training}</h2><small>2026/27</small></div><div className="trainingTotal"><Clock3/><b>{total} min</b></div></div><div className="trainingHead"><Field label="Nome"><input value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})}/></Field><Field label={tr.date}><input type="date" value={draft.date} onChange={e=>setDraft({...draft,date:e.target.value})}/></Field><Field label={tr.time}><input type="time" value={draft.time} onChange={e=>setDraft({...draft,time:e.target.value})}/></Field><Field label={tr.location}><input value={draft.location} onChange={e=>setDraft({...draft,location:e.target.value})}/></Field><Field label="Tema"><input value={draft.theme} onChange={e=>setDraft({...draft,theme:e.target.value})}/></Field></div>
 <h3>Sequência</h3><div className="sessionSequence">{draft.exerciseIds.map((id,i)=>{const x=exercises.find(e=>e.id===id);return <div className="sessionExercise" key={id+'-'+i}><span className="orderNo">{i+1}</span><div><b>{x?.title||'Exercício'}</b><small>{x?.phase||'—'} · {x?.duration||0} min</small></div><div className="sessionBtns"><button onClick={()=>move(i,-1)}><ChevronUp/></button><button onClick={()=>move(i,1)}><ChevronDown/></button><button className="dangerLite" onClick={()=>setDraft({...draft,exerciseIds:draft.exerciseIds.filter((_,n)=>n!==i)})}><X/></button></div></div>})}</div>
 <h3>{tr.attendance}</h3><div className="attendanceGrid">{athletes.map(a=><div className="attendanceRow" key={a.id}><b>{a.name}</b><div>{[['present',tr.present],['absent',tr.absent],['justified',tr.justified],['unavailable',tr.unavailable]].map(([k,l])=><button key={k} className={draft.attendance[a.id]===k?k:''} onClick={()=>setAtt(a.id,k)}>{l}</button>)}</div></div>)}</div><Field label={tr.notes}><textarea rows="3" value={draft.notes} onChange={e=>setDraft({...draft,notes:e.target.value})}/></Field><button className="primary wideAction" onClick={save}><Save/>{tr.save} · {total} min</button></section>
 <aside className="card trainingExercisePicker"><h3>{tr.library}</h3><div className="gkTabs"><button className={picker==='all'?'active':''} onClick={()=>setPicker('all')}>Todos</button><button className={picker==='gk'?'active':''} onClick={()=>setPicker('gk')}>🧤 Específico GR · 10</button></div><div>{exercises.filter(x=>picker==='all'||x.gkSpecific).map(x=><button className="pickExercise" onClick={()=>setDraft({...draft,exerciseIds:[...draft.exerciseIds,x.id]})} key={x.id}><Plus/><div><b>{x.title||'Exercício'}</b><small>{x.category||'—'} · {x.duration||0} min</small></div></button>)}</div></aside>
 <section className="card savedSessions"><div className="paneTitle"><h3>{tr.saved}</h3><small>{sessions.length}</small></div>{sessions.slice().reverse().map(s=><div className="exportItem" key={s.id}><div id={'training-'+s.id} className="brandedExport trainingExport"><div className="exportBrand"><img src="club-crest.jpg"/><div><b>1. FC GRUEFWISS LEIDELENG</b><span>TREINO · 2026/27</span></div></div><h2>{s.title}</h2><p>{s.date||'—'} · {s.time||'—'} · {s.location||'—'} · {s.total||0} min</p>{s.theme&&<h4>{s.theme}</h4>}<ol>{(s.exerciseIds||[]).map(id=>{const x=exercises.find(e=>e.id===id);return <li key={id}><b>{x?.title||'Exercício'}</b> <span>{x?.duration||0} min · {x?.phase||''}</span></li>})}</ol><div className="docWatermark">RJP</div><div className="attendanceSummary">{Object.values(s.attendance||{}).filter(x=>x==='present').length}/{athletes.length} {tr.present.toLowerCase()}</div></div><div className="trainingFeedback"><b>Feedback pós-treino</b><div className="feedbackBtns">{[['worked','⭐ Funcionou'],['adjust','⚠️ Ajustar'],['failed','❌ Não funcionou']].map(([k,l])=><button key={k} className={feedback.find(f=>f.sessionId===s.id)?.status===k?'active':''} onClick={()=>{const note=prompt('Nota curta (opcional):',feedback.find(f=>f.sessionId===s.id)?.note||'')??'';setFeedback([...feedback.filter(f=>f.sessionId!==s.id),{sessionId:s.id,status:k,note,date:new Date().toISOString()}])}}>{l}</button>)}</div>{feedback.find(f=>f.sessionId===s.id)?.note&&<small>{feedback.find(f=>f.sessionId===s.id).note}</small>}</div><div className="exportButtons"><button onClick={()=>exportNode('training-'+s.id,'pdf','treino-'+(s.date||s.id))}><FileText/>PDF</button><button onClick={()=>sharePdf('training-'+s.id,'treino-'+(s.date||s.id),'Plano de treino · '+s.title)}><Share2/>Partilhar</button><button onClick={()=>exportNode('training-'+s.id,'png','treino-'+(s.date||s.id))}><ImageIcon/>{tr.exportImage}</button><button className="dangerLite" onClick={()=>setSessions(sessions.filter(x=>x.id!==s.id))}><Trash2/></button></div></div>)}</section></div>
}
function Planner({tr,week,setWeek}){
 const days=['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo']
 const [draft,setDraft]=useState({day:'Segunda',type:'Treino',title:'',time:''})
 const [cycles,setCycles]=useStore('gw_periodization_v14',[])
 const [cycle,setCycle]=useState({level:'Macrociclo',title:'Época 2026/27',start:'',end:'',objective:'',load:'Média'})
 const add=()=>{if(!draft.title)return;setWeek([...week,{...draft,id:'w'+Date.now()}]);setDraft({...draft,title:'',time:''})}
 const addCycle=()=>{if(!cycle.title)return;setCycles([...cycles,{...cycle,id:'cy'+Date.now()}]);setCycle({...cycle,title:'',objective:''})}
 return <div className="periodizationPage">
  <section className="card periodHero"><div><small>CAVADAS MANAGER · 2026/27</small><h2>Planeamento da Época</h2><p>Planeamento anual e mensal · Macrociclo → Mesociclo → Microciclo → Unidade de treino</p></div><CalendarDays size={42}/></section>
  <section className="periodGrid">
   <div className="card"><div className="paneTitle"><h3>Periodização</h3><Target/></div>
    <div className="cycleForm"><Field label="Nível"><select value={cycle.level} onChange={e=>setCycle({...cycle,level:e.target.value})}><option>Macrociclo</option><option>Mesociclo</option><option>Microciclo</option><option>Unidade de treino</option></select></Field><Field label="Nome"><input value={cycle.title} onChange={e=>setCycle({...cycle,title:e.target.value})}/></Field><Field label="Início"><input type="date" value={cycle.start} onChange={e=>setCycle({...cycle,start:e.target.value})}/></Field><Field label="Fim"><input type="date" value={cycle.end} onChange={e=>setCycle({...cycle,end:e.target.value})}/></Field><Field label="Carga"><select value={cycle.load} onChange={e=>setCycle({...cycle,load:e.target.value})}><option>Baixa</option><option>Média</option><option>Alta</option><option>Recuperação</option></select></Field></div>
    <Field label="Objetivo"><textarea rows="3" value={cycle.objective} onChange={e=>setCycle({...cycle,objective:e.target.value})}/></Field><button className="primary wideAction" onClick={addCycle}><Plus/> Adicionar período</button>
   </div>
   <div className="card" id="season-plan-export"><h3>Mapa da época</h3><div className="cycleList">{cycles.length?cycles.map(c=><div className={'cycle '+c.level.toLowerCase().replaceAll(' ','-')} key={c.id}><div><b>{c.level} · {c.title}</b><small>{c.start||'—'} → {c.end||'—'} · Carga {c.load}</small><p>{c.objective||'Sem objetivo definido.'}</p></div><button className="dangerLite" onClick={()=>setCycles(cycles.filter(x=>x.id!==c.id))}><Trash2/></button></div>):<p className="muted">Comece pelo macrociclo da época e divida-o progressivamente.</p>}</div><div className="docWatermark">RJP</div><div className="exportButtons"><button onClick={()=>exportNode('season-plan-export','pdf','planeamento-epoca-26-27')}><FileText/>PDF</button><button onClick={()=>sharePdf('season-plan-export','planeamento-epoca-26-27','Planeamento Época 26/27')}><Share2/>Partilhar</button></div></div>
  </section>
  <section className="card plannerForm"><div className="paneTitle"><h2>{tr.planning} semanal</h2><CalendarDays/></div><div className="plannerInputs"><select value={draft.day} onChange={e=>setDraft({...draft,day:e.target.value})}>{days.map(x=><option key={x}>{x}</option>)}</select><select value={draft.type} onChange={e=>setDraft({...draft,type:e.target.value})}><option>Treino</option><option>Jogo</option><option>Descanso</option><option>Reunião</option><option>Vídeo</option><option>Recuperação</option></select><input placeholder="Título" value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})}/><input type="time" value={draft.time} onChange={e=>setDraft({...draft,time:e.target.value})}/><button className="primary" onClick={add}><Plus/>{tr.add}</button></div></section>
  <section className="weekGrid">{days.map(day=><div className="dayCard card" key={day}><h3>{day}</h3>{week.filter(x=>x.day===day).map(x=><div className={'planItem '+x.type.toLowerCase()} key={x.id}><b>{x.time||'—'} · {x.type}</b><span>{x.title}</span><button onClick={()=>setWeek(week.filter(y=>y.id!==x.id))}><X/></button></div>)}</div>)}</section>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>)
