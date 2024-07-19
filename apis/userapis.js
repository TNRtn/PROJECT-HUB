const user=require("../model/User");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcrypt');
const uregister=async(req,res)=>{
	try{
		console.log(req.body);
		const {fullname,email,contact,skills,password,confirmpassword}=req.body;
		const exists=await user.find({email});
		if(exists.length>0){
			return res.status(400).send("email exists")
		}
		if(password!=confirmpassword){
			return res.status(400).send("password not matched");
		}
		let newuser=new user({
			fullname,email,contact,skills,password,confirmpassword
		}
		);
		newuser.save();
		return res.status(200).send("new user added");
	}
	catch(error){
		console.log("error found",error)
		return res.status(400).send("server error ....")
	}
}

const ulogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const exists = await user.findOne({ email });
        console.log(exists);
        
        if (!exists) {
            return res.status(400).send("email not found");
        }

        if(exists.password!=password){
        	return res.status(400).send("pasword invalid");
        }

        let payload = {
            user: {
                id: exists.id
            }
        };

        jwt.sign(payload, 'jwtpassword', { expiresIn: 5000 }, (error, token) => {
            if (error) {
                throw error;
            }
            return res.json({ token });
        });

    } catch (error) {
        console.log("error found", error);
        return res.status(400).send("server error ....");
    }
}

const uall=async(req,res)=>{
	try{
		let all=await user.find();
		return res.status(200).json(all);

	}
	catch(error){
		console.log("error found...",error);
		return res.status(400).send("server error ...");
	}
}

const me=async(req,res)=>{
	try{
		console.log(req.user);
		let myprofile=await user.findById(req.user.id);
		return res.status(200).json(myprofile);
	}
	catch(error){
		console.log("error found",error);
		return res.status(400).send("server error ...");
	}
}
module.exports={uregister,ulogin,uall,me}