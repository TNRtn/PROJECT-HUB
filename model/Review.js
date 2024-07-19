const mg=require("mongoose");
const review=new mg.Schema({
	taskprovider:{
		type:String,
		required:true
	},
	taskworker:{
		type:String,
		required:true
	},
	work:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	rating:{
		type:String,
		required:true
	}
})
module.exports=mg.model("review",review)