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


const v15Required=[
  "const snapshot=()=>({",
  "const animateTo=(from,to,duration)",
  "Fotogramas / Fases",
  "Guardar fase",
  "▶ Reproduzir"
];
for(const token of v15Required){
  if(!s.includes(token)){
    console.error('PRECHECK FAIL V15:',token);
    process.exit(1);
  }
}

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

console.log('Preflight V15.0 OK — navegação e módulos principais validados.');
