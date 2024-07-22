const user=require("../model/User");
const jwt=require("jsonwebtoken");
const mg=require("mongoose");
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



const addskills = async (req, res) => {
  try {
    console.log(req.body);
    const userId=req.body.userId;
    const skills=req.body.skills;
    console.log(userId,skills);

    // Validate if userId is a valid ObjectId
    // Find the user by ID
    let existingUser = await user.findById(userId);
    console.log(existingUser,userId)
    if (!existingUser) {
      return res.status(404).send("User not found");
    }

    // Combine existing skills with the new skills
    const existingSkills = existingUser.skills ? existingUser.skills.split(',').map(skill => skill.trim()) : [];
    const newSkills = skills.split(',').map(skill => skill.trim());
    const allSkills = Array.from(new Set([...existingSkills, ...newSkills])).join(',');

    // Update user's skills
    existingUser.skills = allSkills;
    await existingUser.save();

    return res.status(200).json({
      message: "Skills updated successfully",
      skills: allSkills
    });
  } catch (error) {
    console.log("Error updating skills:", error);
    return res.status(500).send("Server error");
  }
};

module.exports={uregister,ulogin,uall,me,addskills}
