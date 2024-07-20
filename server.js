const express=require('express');
const app=express();
const mg=require('mongoose');
let url=require('./urls');
let port=process.env.PORT || 8080 || 5000 || 3000;
mg.connect(url,{dbName:"hub"}).then(()=>{
	console.log("connection success...");
},
(errres)=>{
	console.log("connection failed",errres);
})
app.use(express.json());
app.get('/',(req,res)=>{
	return res.send("tnr srm");
})
const routes=require("./router.js")
app.use('/',routes);

app.listen(5000,()=>{
	console.log("server running......");
})