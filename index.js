const express=require('express');
var {MongoClient} = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const app=express();
let db

app.use(cors());
app.use(bodyParser.json());

async function start(){
  const client = new MongoClient("mongodb+srv://vee:veelah@veela.ws8emjn.mongodb.net/?retryWrites=true&w=majority");
  await client.connect();
  db=client.db("thevalley");
  app.listen(3001,()=>console.log("Listening on 3001"));
}
start()

//testing pinging server
app.get('/',(req,res)=>{res.send("<b>Hello there minds, i'm up and running.</b>")})

//post attendance user
app.post('/preg',function (req,res){
  const tcin=req.body.cin;
  if(!tcin){db.collection('users').updateOne({name:req.body.name},{$set:{dtime:req.body.utime,cout:req.body.cout}},function(err,res){if(err)throw err;console.log("1 updated well")})}
  else{
    const myReg = {name:req.body.name,dept:req.body.dep,utime:req.body.utime,dtime:null,cin:req.body.cin,cout:req.body.cout};
    db.collection('users').insertOne(myReg, function(err, res) {if(err)throw err;console.log("1 document inserted in attandance");});}
})

//post concern from whisleblower
app.post('/pmobile',function (req,res){
  const myOb = {description: req.body.description, summary:req.body.summary,sconc:req.body.conc, eemail:req.body.emaill};
  db.collection("mobile").insertOne(myOb, function(err, res) {if(err)throw err;console.log("1 document inserted Cons");});
})

//post join user
app.post('/pjoin',function (req,res){
  const myOb = {description: req.body.description, summary:req.body.summary,sconc:req.body.conc, eemail:req.body.emaill};
  db.collection("minds").insertOne(myOb, function(err, res) {if(err)throw err;console.log("1 document inserted Cons");});
})

//post concern from whisleblower
app.post('/pai',function (req,res){
  const myOb = {name:req.body.name,dep:req.body.dep};
  console.log("Testing "+myOb.name+"and you are"+myOb.dep);
  db.collection("ai").insertOne(myOb, function(err, res) {if(err)throw err;console.log("1 document inserted in Sug");});
})

//post concern from whisleblower
app.post('/pweb',function (req,res){
  const web={name:req.body.name,addr:req.body.dep,minds:req.body.minds,minds1:req.body.minds1,minds2:req.body.minds2};
  db.collection("web").insertOne(web, function(err, res) {if(err)throw err;console.log("1 document inserted in trucks");});
})

//post concern from whisleblower
app.post('/pdesktop',function (req,res){
  const myTruck={name:req.body.name,addr:req.body.dep,size:req.body.utime,cin:req.body.cin,cout:req.body.cout};
  db.collection("desktop").insertOne(myTruck, function(err, res) {if(err)throw err;console.log("1 document inserted in trucks");});
})

//user querries
//get user
app.post('/ulogin',function(req,res){
  //db.collection("concerns").insertOne({name:"talent",lpas:"myself"}, function(err, res){if(err)throw err;console.log("1 document inserted");});
  const user={name: req.body.name, lpas:req.body.lpas};
  db.collection('users').find({name:user.name,lpas:user.lpas}).toArray(function(err,result){if(err)throw err;res.send({data:result?true:false});})
})

//get concerns from whisleblower
app.get('/gweb',function(req,res){
  db.collection("web").find({}).toArray(function(err, result){if(err)throw err;res.send(result);});
})
//get concerns from whisleblower
app.get('/gmobile',function(req,res){
  db.collection("mobile").find({}).toArray(function(err, result){if(err)throw err;res.send(result);});
})

//get attendance register users
app.get('/gai', function (req, res) {
  db.collection('ai').find({}).toArray(function (err, result) { if (err) throw err; res.send(result); })
})

//get attendance register users
app.get('/gdesktop', function (req, res) {
  db.collection('desktop').find({}).toArray(function (err, result) { if (err) throw err; res.send(result); })
})

//get joins
app.get('/gjoin', function (req, res) {
  db.collection('desktop').find({}).toArray(function (err, result) { if (err) throw err; res.send(result); })
})
