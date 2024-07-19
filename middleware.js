const jwt=require("jsonwebtoken");
module.exports=function(req,res,next){
	try{
		let token=req.header("xtoken");
		if(!token){
			return res.status(400).send("token not found");
		}
		let decode=jwt.verify(token,"jwtpassword");
		console.log(decode);
		req.user=decode.user;
		next();
	}
	catch(error){
		console.log("error found",error);
		return res.status(400).send("server error ...");
	}
}