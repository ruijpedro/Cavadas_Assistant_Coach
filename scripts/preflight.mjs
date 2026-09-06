import fs from 'node:fs';

const file='src/main.jsx';
const s=fs.readFileSync(file,'utf8');

const forbidden=[
  "active={page==='model'&&<GameModel",
  "active={page==='setpieces'&&<SetPieces",
  "active={page==='opponents'&&<Opponents",
  "active={page==='postmatch'&&<PostMatch",
  "active={page==='board'&&<"
];

for (const token of forbidden) {
  if (s.includes(token)) {
    console.error('PRECHECK FAIL: padrão JSX realmente corrompido encontrado:', token);
    process.exit(1);
  }
}


const malformedSetterPatterns=[
  /setDraft\(\{\.\.\.draft,[^;\n]*\.value\)\s*\/>/g,
  /setEvent\(\{\.\.\.event,[^;\n]*\.value\)\s*\/>/g
];

for (const rx of malformedSetterPatterns) {
  const m=s.match(rx);
  if(m){
    console.error('PRECHECK FAIL: setter JSX mal fechado encontrado:', m[0]);
    process.exit(1);
  }
}






if(s.includes("setPaths((x.paths||[]).map(p=>({...p}));")){
  console.error("PRECHECK FAIL V16.1: loadStep setPaths syntax regression");
  process.exit(1);
}




const v22LibraryRequired=['TACTICAL_LIBRARY','v22-corner-5','v22-free-5','v22-press-5','v22-kickin-5','gw_library_clean_v22_2','🧤 Específico GR · 5'];
for(const token of v22LibraryRequired){if(!s.includes(token)){console.error('PRECHECK FAIL V22.2 LIBRARY:',token);process.exit(1);}}

const required=[
  "<Nav label={tr.board}",
  "active={page==='board'}",
  "onClick={()=>go('board')}",
  "{page==='model'&&<GameModel",
  "{page==='setpieces'&&<SetPieces",
  "{page==='opponents'&&<Opponents",
  "{page==='postmatch'&&<PostMatch",
  "function Board({tr,exercises,setExercises})",
  "gw_periodization_v14"
];

for (const token of required) {
  if (!s.includes(token)) {
    console.error('PRECHECK FAIL: elemento esperado ausente:', token);
    process.exit(1);
  }
}

const mainPos=s.indexOf('<main>');
if(mainPos<0){
  console.error('PRECHECK FAIL: <main> não encontrado.');
  process.exit(1);
}

for (const token of [
  "{page==='model'&&<GameModel",
  "{page==='setpieces'&&<SetPieces",
  "{page==='opponents'&&<Opponents",
  "{page==='postmatch'&&<PostMatch"
]) {
  const pos=s.indexOf(token);
  if (pos < mainPos) {
    console.error('PRECHECK FAIL: módulo encontrado fora de <main>:', token);
    process.exit(1);
  }
}

for (const token of ['TacticalImporter','analysePdf','analysePptx','analyseVideo','Importar Tática']) if(!s.includes(token)){console.error('PRECHECK FAIL V18:',token);process.exit(1)}

const engineV2=fs.readFileSync('src/importEngineV2.js','utf8');
for(const token of ['analyseDocumentV2','PPTX Motion V2','PDF Vision V2','Imagem/Manuscrito V2','Video Tracking V2','p:animMotion']){
 if(!engineV2.includes(token)){console.error('V19 preflight fail:',token);process.exit(1);}
}
if(!s.includes('FOTO / MANUSCRITO')||!s.includes('supportedImportKind')){console.error('V19 importer UI missing');process.exit(1);}


// V22.2.2 — validate goalkeeper support without depending on one fragile label string.
const gkChecks=[
  /addPlayer\(\s*['"]a['"]\s*,\s*['"]gk['"]\s*\)/,
  /addPlayer\(\s*['"]d['"]\s*,\s*['"]gk['"]\s*\)/,
  /role\s*===\s*['"]gk['"]/,
  /label\s*:\s*['"]GR['"]/
];
for(const rx of gkChecks){
  if(!rx.test(s)){console.error('PRECHECK FAIL V22.2.2 GK:',String(rx));process.exit(1);}
}

// V22.3 — tactical voice/text commands
for(const token of ['Comando de voz','Comando escrito','parseVoiceCommand','applyVoicePlan','SpeechRecognition','Interpretei assim:']){
 if(!s.includes(token)){console.error('PRECHECK FAIL V22.3 VOICE:',token);process.exit(1);}
}

for(const token of ['bola aerea','afundar',"kind:'cutback'","goalTarget('cutback')",'segundo poste']){
 if(!s.includes(token)){console.error('PRECHECK FAIL V22.3.1:',token);process.exit(1);}
}

// V22.4 — tactical futsal lexicon
for(const token of ['FUTSAL_LEXICON','Léxico Futsal','lexiconMatches']){if(!s.includes(token)){console.error('PRECHECK FAIL V22.4 LEXICON:',token);process.exit(1);}}
console.log('Preflight V22.4 OK — biblioteca animada, GR, navegação, importador e módulos principais validados.');
