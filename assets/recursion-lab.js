(function(){
function setup(){const host=document.getElementById('recursion-lab');if(!host)return;
const input=host.querySelector('.rec-input'),stack=host.querySelector('.rec-stack'),status=host.querySelector('.rec-status');
let frames=[],step=0;
function prepare(){const n=Number(input.value);if(!Number.isInteger(n)||n<0||n>8){status.textContent='Choose an integer from 0 to 8.';return;}
frames=[{stack:[],detail:'Before factorial('+n+')'}];
for(let k=n;k>=0;k--)frames.push({stack:Array.from({length:n-k+1},(_,i)=>n-i),detail:'Call factorial('+k+'); push a new frame'});
for(let k=0;k<=n;k++)frames.push({stack:Array.from({length:n-k},(_,i)=>n-i),detail:'Return from factorial('+k+'); pop its frame'});
step=0;draw()}
function draw(){const f=frames[step];if(!f)return;stack.innerHTML=f.stack.length?f.stack.map(k=>'<div class="rec-frame">factorial('+k+')</div>').reverse().join(''):'<em>Empty call stack</em>';status.textContent='Step '+step+'/'+(frames.length-1)+' — '+f.detail+(step===frames.length-1?' · Result: '+Array.from({length:Number(input.value)},(_,i)=>i+1).reduce((a,b)=>a*b,1):'');host.querySelector('.rec-prev').disabled=step===0;host.querySelector('.rec-next').disabled=step===frames.length-1}
input.onchange=prepare;host.querySelector('.rec-prev').onclick=()=>{step--;draw()};host.querySelector('.rec-next').onclick=()=>{step++;draw()};host.querySelector('.rec-reset').onclick=prepare;prepare()}
window.setupRecursionLab=setup;
})();
