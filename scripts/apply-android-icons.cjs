const fs = require('fs');
const path = require('path');

const src = path.join(process.cwd(), 'android-icons', 'res');
const dst = path.join(process.cwd(), 'android', 'app', 'src', 'main', 'res');

function copyDir(s,d){
  if(!fs.existsSync(s)) throw new Error(`Icon source missing: ${s}`);
  fs.mkdirSync(d,{recursive:true});
  for(const f of fs.readdirSync(s)){
    const sp=path.join(s,f), dp=path.join(d,f);
    if(fs.statSync(sp).isDirectory()) copyDir(sp,dp);
    else fs.copyFileSync(sp,dp);
  }
}

copyDir(src,dst);

const densities=['mipmap-mdpi','mipmap-hdpi','mipmap-xhdpi','mipmap-xxhdpi','mipmap-xxxhdpi'];
for(const d of densities){
  const normal=path.join(dst,d,'ic_launcher.png');
  const round=path.join(dst,d,'ic_launcher_round.png');
  if(!fs.existsSync(normal) || !fs.existsSync(round)){
    throw new Error(`Launcher icons missing in ${d}`);
  }
}

const any = path.join(dst,'mipmap-anydpi-v26');
fs.mkdirSync(any,{recursive:true});
const xml = `<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_adaptive_back"/>
    <foreground android:drawable="@mipmap/ic_launcher_adaptive_fore"/>
</adaptive-icon>
`;
fs.writeFileSync(path.join(any,'ic_launcher.xml'), xml);
fs.writeFileSync(path.join(any,'ic_launcher_round.xml'), xml);

const manifest = path.join(process.cwd(),'android','app','src','main','AndroidManifest.xml');
if(!fs.existsSync(manifest)) throw new Error('AndroidManifest.xml not found');

let t = fs.readFileSync(manifest,'utf8');
if(/android:icon=/.test(t)) {
  t=t.replace(/android:icon="[^"]*"/g,'android:icon="@mipmap/ic_launcher"');
} else {
  t=t.replace('<application', '<application android:icon="@mipmap/ic_launcher"');
}
if(/android:roundIcon=/.test(t)) {
  t=t.replace(/android:roundIcon="[^"]*"/g,'android:roundIcon="@mipmap/ic_launcher_round"');
} else {
  t=t.replace(/android:icon="@mipmap\/ic_launcher"/,
    'android:icon="@mipmap/ic_launcher" android:roundIcon="@mipmap/ic_launcher_round"');
}
fs.writeFileSync(manifest,t);

console.log('Cavadas Manager launcher icons applied: normal + round + adaptive.');
