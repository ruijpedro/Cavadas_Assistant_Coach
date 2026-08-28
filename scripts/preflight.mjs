import fs from 'node:fs';

const file='src/main.jsx';
const s=fs.readFileSync(file,'utf8');

const forbidden=[
  "active={page==='model'&&<GameModel",
  "{page==='setpieces'&&<SetPieces exercises={exercises} setExercises={setExercises} setPage={setPage}/>} onClick",
  "{page==='opponents'&&<Opponents/>} onClick",
  "{page==='postmatch'&&<PostMatch"
];

for (const token of forbidden) {
  if (s.includes(token)) {
    console.error('PRECHECK FAIL: JSX de navegação corrompido encontrado:', token);
    process.exit(1);
  }
}

const required=[
  "<Nav label={tr.board}",
  "active={page==='board'}",
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

console.log('Preflight V14.1 OK — navegação e módulos principais presentes.');
