var express=require("express");
var router=express.Router({mergeParams:true});//so that comment form can read id property
var Campground=require("../models/campgrounds")
var comment=require("../models/comments");
var middleware=require("../middleware");
router.get("/new",middleware.LoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err)
			console.log(err);
		else
			
	         res.render("comments/form",{campground:campground});
				
			
	});
});
router.post("/",middleware.LoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err)
			{console.log(err);}
			
		else{
			comment.create(req.body.comment,function(err,comment){
				if(err)
                       {
							 req.flash("error", "Something went wrong");
						   console.log(err);
						
					   }					
				else
					{
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
				    comment.save();
					campground.comment.push(comment);
				    campground.save();
				    req.flash("success", "Successfully added comment");
				    res.redirect("/campgrounds/"+campground._id);
					}
				
			});
		}
	});
});

router.get("/:comment_id/edit",middleware.checkCommentsOwnership,function(req,res){
	comment.findById(req.params.comment_id,function(err,foundComment){
		if(err)
			res.redirect("back");
		else
			res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
	});
});

router.put("/:comment_id",middleware.checkCommentsOwnership,function(req,res){
	comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err)
			res.redirect("back");
		else
			res.redirect("/campgrounds/"+req.params.id);
	});
});

router.delete("/:comment_id",middleware.checkCommentsOwnership,function(req,res){
	comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err)
			res.redirect("back");
		else
			{
		    req.flash("success", "Comment deleted");
			res.redirect("/campgrounds/"+req.params.id);
			}
	});
});




module.exports=router;