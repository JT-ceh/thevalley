const {greet,help,rHappy,rSad,join,sing,come,dance,wont,didGood,love,gn,morning,miss,marry,els} = require('./da.json');
const moods=[greet,help,rHappy,rSad,join,sing,come,dance,wont,didGood,love,gn,morning,miss,marry,els];

let result=[],f=[], nf=[];
function DA(value){
const one=value,stop=["is","of","are","i","so","my"];let thr=one.split(' ')
function log(x){console.log(x)};log("Ex:"+thr);const d=/[0-9]/g;thr=thr.filter(x=>!stop.includes(x));thr=thr.filter(x=>!d.test(x))
const two=[...new Set(thr)];log("Rm: "+two);let memories=[];
moods.forEach((mood)=>{
  two.forEach((x)=>{
    let tmp=RegExp(mood.keys1)
    if(x.search(tmp)){result=[...result,1];f=[...f,x]}
    else{result=[...result,0];nf=[...nf,x]}
  })
  function logs(){log("\nResult: "+result);decide(mood);result=[];log("Found: "+f);f=[];nf=[]}
  result.some(s=>s===1)&&logs();
})
function decide(m){
  const fsize=result.length;result=result.filter(x=>x);const clen=result.length;
  if(clen>0.5*fsize){log("Success with "+(clen/fsize));log(m.rp[Math.floor(Math.random()*m.rp.length)])}
  else{log("Failed with "+Math.fround(clen/fsize))}
}}
//testing cases
DA("good morning")