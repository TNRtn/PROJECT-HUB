const mg=require("mongoose");
const userSchema=new mg.Schema({
	fullname:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	contact:{
		type:String,
		required:true
	},
	skills:{
		type:String,
		requied:true
	},
	password:{
		type:String,
		required:true
	},
	confirmpassword:{
		type:String,
		required:true
	}
})
module.exports=mg.model('user',userSchema)