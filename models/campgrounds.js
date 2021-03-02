var mongoose=require("mongoose");
var campgroundSchema=new mongoose.Schema({
	name:String,
	price:String,
	image:String,
	location:String,
	geometry:{
		type:{
			typee:String,
			enum:['Point'],
			required:true,
		},
		coordinates:{
			type:Number,
			required:true
		}
		
	},
	description:String,

	createdAt:{type:Date,default:Date.now},
	author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
	comment:[
	{
	type:mongoose.Schema.Types.ObjectId,
	ref:"comment"	
	}
	]
});
module.exports=mongoose.model("Campground",campgroundSchema);