var Campground=require("../models/campgrounds");
var comment=require("../models/comments");
middelewareObj={};
middelewareObj.checkCampgroundOwnership=function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err)
				{
				req.flash("error","Campground Not Found");	
				res.redirect("back");
				}
			else{
				if(foundCampground.author.id.equals(req.user._id))
					{
 						next();
					}
				else
					{
			       req.flash("error","Permission Denied");
					res.redirect("back");
					}
			}
				
			
			
			
		});
	}
		else
            {  req.flash("error","Please Log In First");
			   res.redirect("back");						
			}
	
}
middelewareObj.checkCommentsOwnership=function(req,res,next){
	if(req.isAuthenticated()){
		comment.findById(req.params.comment_id,function(err,foundComment){
			if(err)
				res.redirect("back");
			else{
				if(foundComment.author.id.equals(req.user._id))
					{
 						next();
					}
				else
					{
					req.flash("error","Permission Denied");
					res.redirect("back");
					}
			}
				
			
			
			
		});
	}
		else
         {
			 req.flash("error","Please Log In First");
			res.redirect("back");
			 
		 }	
}
middelewareObj.LoggedIn=function(req,res,next)
{
   if(req.isAuthenticated())
	   return next();
	req.flash("error","Please Login First!!");
		res.redirect("/login");
	   
}
module.exports=middelewareObj