/*
Cav Assistant Coach - Google Apps Script
1) Cria uma Google Sheet.
2) Extensões > Apps Script.
3) Cola este código.
4) Publicar > Implementar como Aplicação Web.
5) Acesso: Qualquer pessoa com o link.
6) Cola o URL em VITE_GOOGLE_SCRIPT_URL.
*/

const SHEETS = ['ATLETAS', 'JOGOS', 'EVENTOS', 'ADVERSARIOS', 'RELATORIOS'];

function setup() {
  const ss = SpreadsheetApp.getActive();
  SHEETS.forEach(name => {
    let sh = ss.getSheetByName(name) || ss.insertSheet(name);
    sh.clear();
  });
  ss.getSheetByName('ATLETAS').appendRow(['id','nome','numero','posicao','pe','estado']);
  ss.getSheetByName('JOGOS').appendRow(['id','data','adversario','competicao','resultado']);
  ss.getSheetByName('EVENTOS').appendRow(['id','jogoId','minuto','jogador','evento','zona','obs','createdAt']);
  ss.getSheetByName('ADVERSARIOS').appendRow(['id','nome','sistema','forcas','fraquezas','obs']);
  ss.getSheetByName('RELATORIOS').appendRow(['id','jogoId','tipo','texto','createdAt']);
}

function doGet(e) {
  const action = e.parameter.action || 'all';
  if (action === 'setup') { setup(); return json({ ok:true }); }
  return json(readAll());
}

function doPost(e) {
  const payload = JSON.parse(e.postData.contents || '{}');
  const ss = SpreadsheetApp.getActive();
  const table = String(payload.table || '').toUpperCase();
  if (!SHEETS.includes(table)) return json({ ok:false, error:'Tabela inválida' });
  const sh = ss.getSheetByName(table);
  const obj = payload.data || {};
  const headers = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0];
  const row = headers.map(h => obj[h] ?? '');
  sh.appendRow(row);
  return json({ ok:true });
}

function readAll() {
  const ss = SpreadsheetApp.getActive();
  const out = {};
  SHEETS.forEach(name => {
    const sh = ss.getSheetByName(name);
    if (!sh) { out[name.toLowerCase()] = []; return; }
    const values = sh.getDataRange().getValues();
    const headers = values.shift() || [];
    out[name.toLowerCase()] = values.filter(r => r.some(Boolean)).map(r => Object.fromEntries(headers.map((h,i)=>[h,r[i]])));
  });
  return out;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
