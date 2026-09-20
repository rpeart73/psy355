const fs=require('fs'),path=require('path'),assert=require('assert');
const pages=JSON.parse(fs.readFileSync('retirement-pages.json'));const out='blackboard-transition-site';
assert(!fs.existsSync(out),'Deployment folder already exists');fs.mkdirSync(out);
for(const file of [...pages,'retirement.js']){assert(!path.isAbsolute(file)&&!file.split('/').includes('..'));const target=path.join(out,file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(file,target);}
fs.writeFileSync(path.join(out,'.nojekyll'),'');
console.log('Prepared '+pages.length+' retired entry pages and browser-only notes recovery.');
