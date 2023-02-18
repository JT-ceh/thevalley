const express=require('express');
var {MongoClient} = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const app=express();
let db

app.use(cors());
app.use(bodyParser.json());

async function start(){
  const client = new MongoClient("mongodb+srv://myself:self@cluster0.dbh8pow.mongodb.net/?retryWrites=true&w=majority");
  await client.connect();
  db=client.db("cailo");
  app.listen(3001,()=>console.log("Listening on 3001"));
}
start()

//testing pinging server
app.get('/',(req,res)=>{res.send("<b>Hello there, i'm up and running.</b>")})

//tesing 
app.get('/tt',(req,res)=>{res.send("<b>Hello there, testing.</b>")})

//post attendance user
app.post('/preg',function (req,res){
  const tcin=req.body.cin;
  if(!tcin){db.collection('attendance').updateOne({name:req.body.name},{$set:{dtime:req.body.utime,cout:req.body.cout}},function(err,res){if(err)throw err;console.log("1 updated well")})}
  else{
    const myReg = {name:req.body.name,dept:req.body.dep,utime:req.body.utime,dtime:null,cin:req.body.cin,cout:req.body.cout};
    db.collection('attendance').insertOne(myReg, function(err, res) {if(err)throw err;console.log("1 document inserted in attandance");});}
})

//post concern from whisleblower
app.post('/pcons',function (req,res){
  const myOb = {description: req.body.description, summary:req.body.summary,sconc:req.body.conc, eemail:req.body.emaill};
  db.collection("concerns").insertOne(myOb, function(err, res) {if(err)throw err;console.log("1 document inserted Cons");});
})

//post concern from whisleblower
app.post('/psug',function (req,res){
  const myOb = {name:req.body.name,dep:req.body.dep};
  console.log("Testing "+myOb.name+"and you are"+myOb.dep);
  db.collection("suggestions").insertOne(myOb, function(err, res) {if(err)throw err;console.log("1 document inserted in Sug");});
})

//post concern from whisleblower
app.post('/ptruck',function (req,res){
  const myTruck={name:req.body.name,addr:req.body.dep,size:req.body.utime,cin:req.body.cin,cout:req.body.cout};
  db.collection("trucks").insertOne(myTruck, function(err, res) {if(err)throw err;console.log("1 document inserted in trucks");});
})

//user querries
//get user
app.post('/ulogin',function(req,res){
  //db.collection("concerns").insertOne({name:"talent",lpas:"myself"}, function(err, res){if(err)throw err;console.log("1 document inserted");});
  const user={name: req.body.name, lpas:req.body.lpas};
  db.collection('cailousers').find({name:user.name,lpas:user.lpas}).toArray(function(err,result){if(err)throw err;res.send({data:result?true:false});})
})

//get concerns from whisleblower
app.get('/gcons',function(req,res){
  db.collection("concerns").find({}).toArray(function(err, result){if(err)throw err;res.send(result);});
})
//get concerns from whisleblower
app.get('/guser',function(req,res){
  db.collection("cailousers").find({}).toArray(function(err, result){if(err)throw err;res.send(result);});
})

//get attendance register users
app.get('/greg', function (req, res) {
  db.collection('attendance').find({}).toArray(function (err, result) { if (err) throw err; res.send(result); })
})

//get attendance register users
app.get('/gsug', function (req, res) {
  db.collection('suggestions').find({}).toArray(function (err, result) { if (err) throw err; res.send(result); })
})

//get trucks
app.get('/gtruck',function(req,res){
  db.collection('trucks').find({}).toArray(function(err,result){if(err)throw err;res.send(result);})
})

app.post('/veela',function(req,res){
  const {greet,els,good}=require('./mind/da.json');
  const moods=[greet];
  const stop=["is","of","are","i","so","and","the","them"];const d=/\d/g;const char=/\W/g;let result=[];let found=[];let notfound=[];let values=req.body.value.split(' ');
    function log(x){console.log(x)}; // for console debugging
    values=values.filter(x=>!stop.includes(x));values=values.filter(xz=>!d.test(xz));values=values.filter(xy=>!char.test(xy));// remove stop words and numbers and characters
    values=[...new Set(values)];// remove dublicates
    values.map(x=>log(x));
    moods.forEach((mood)=>{
      values.forEach((x)=>{
       // let x1=x.split('');x1=x1.filter(xa=>!char.test(xa));x1=x1.filter(xb=>!d.test(xb));x1=x1.join('')//remove numbers and special characters from value
       const re=RegExp(mood.keys1);
       if(x.search(re)!=-1 && re.test(x)){result=[...result,1];found=[...found,x]}// if found
        else{result=[...result,0];notfound=[...notfound,x]}// if not found
      });// loop through user input values
      decide(mood,req.body.value);log(found);result=[];found=[];notfound=[];
    });// loop through moods 
  
    function decide(m,value){ // fx to determine and predict the closest response
      const fsize=result.length;result=result.filter(x=>x);const clen=result.length;// get full size=>remove 0(not found)=>get remaining length
      if(clen>=0.5*fsize){log("Req: "+value+"\nSuccess rate: "+clen/fsize);res.send({rp:m.rp[Math.floor(Math.random()*m.rp.length)],sug:m.sug})}// if current size is more than fullsize/2 then correct
      else{
          if(clen>0.1*fsize){log("Req: "+value+"\nSuccess rate: "+clen/fsize);res.send({rp:m.rp[Math.floor(Math.random()*m.rp.length)],sug:m.sug})}//if at least one size is more than fullsize/2 then correct
          else{log("Req: "+value+"Failed with: "+clen/fsize);res.send({rp:els.rp[Math.floor(Math.random()*els.rp.length)],sug:els.sug})}
        }
    }
})