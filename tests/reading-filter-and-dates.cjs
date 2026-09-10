const fs=require('fs'),vm=require('vm'),assert=require('assert');
const app=fs.readFileSync('app.js','utf8'),data={window:{}};
vm.runInNewContext(fs.readFileSync('data/assignment-overview.js','utf8'),data);
const items=data.window.PSY355_ASSIGNMENT_OVERVIEW;
assert.equal(items.length,12);assert.equal(items.reduce((n,a)=>n+a.points,0),100);
for(const a of items){
 const dateParts=iso=>Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'America/Toronto',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(iso)).map(x=>[x.type,x.value]));
 const due=dateParts(a.due),release=dateParts(a.release);
 assert.equal(due.hour+':'+due.minute,'23:59');assert.equal(release.hour+':'+release.minute,'00:01');
 assert.equal([due.year,due.month,due.day].join('-'),a.dueDate);assert.equal([release.year,release.month,release.day].join('-'),a.releaseDate);
 assert(a.summary.split(/\s+/).length>=30);assert(!/[\u2013\u2014]/.test(a.summary));assert(new Date(a.release)<new Date(a.due));
 if(a.number===12)assert.equal(a.windowEndDate,null);
 else assert.equal(new Date(a.windowClosesAt)-new Date(a.due),48*60*60*1000);
}
const line=app.split('\n').find(x=>x.includes('galWeek: function (w)'));
const fn=line.slice(line.indexOf('function'),line.lastIndexOf('},')+1);
const state={galWeek:2},context={state,document:{getElementById:()=>null},render(){},cleanWeek:w=>Number.isInteger(Number(w))&&Number(w)>0&&Number(w)<15?Number(w):null};
const select=vm.runInNewContext('('+fn+')',context);
select(null);assert.equal(state.galWeek,null,'All weeks must clear a selected week');
select(3);assert.equal(state.galWeek,3);select(3);assert.equal(state.galWeek,null,'Selected week must toggle off');
select(2);select('invalid');assert.equal(state.galWeek,2,'Invalid values must preserve the selection');
assert(app.includes('Available from'));assert(app.includes('Due by 11:59 pm'));
console.log('Reading filter and assignment date checks passed.');
