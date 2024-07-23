const express=require('express');
const app=express();
const mg=require('mongoose');
let url=require('./urls');
const cors=require('cors');
const port=process.env.PORT || 8080 || 5000 || 3000;
mg.connect(url,{dbName:"hub"}).then(()=>{
	console.log("connection success...");
},
(errres)=>{
	console.log("connection failed",errres);
})
const allowedOrigins = ['https://tnrprojecthub.web.app', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());
app.get('/',(req,res)=>{
	return res.send("tnr srm");
})
const routes=require("./router.js")
app.use('/',routes);

app.listen(port,()=>{
	console.log("server running......");
})
