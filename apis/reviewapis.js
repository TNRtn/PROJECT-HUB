const review=require("../model/Review");
const user=require("../model/User");

const addreview=async(req,res)=>{
	try{
		const {taskworker,rating,work,description}=req.body;
		const exist=await user.findById(req.user.id);
		const newreview=new review({
			taskprovider:exist.fullname,
			taskworker,rating,work,description
		})
		newreview.save();
		return res.status(200).send("review added successfully");
	}
	catch(error){
		console.log("error found",error);
		return res.status(400).send("server error");
	}
}

const myreview=async(req,res)=>{
	try{
      let all=await review.find();
      let my=all.filter(review =>  review.taskworker.toString() === req.user.id.toString())
      return res.status(200).json(my);
	}
	catch(error){
		console.log("error found",error);
		return res.status(400).send("server error ...")
	}
}

module.exports={addreview,myreview}