var express=require("express");
var router=express.Router();
var Campground=require("../models/campgrounds");
var comment=require("../models/comments");
var middleware=require("../middleware");

router.get("/",function(req,res){
	Campground.find({},function(err,allCampgrounds){
		if(err)
			{
			console.log("Error");
			}
		else{
			res.render("campgrounds/index",{campgrounds:allCampgrounds,page:'campgrounds'});
	    	}
	});
	
	
});

router.post("/",middleware.LoggedIn,function(req,res){
	  var name=req.body.name;
	  var image=req.body.image;
	  var price=req.body.price;
	  var description=req.body.description;
	  var author = {
        id: req.user._id,
        username: req.user.username
    }
	  var newCampground={name:name,price:price,image:image,description:description,author:author};
	
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		       }
		else{
			res.redirect("/campgrounds");
		    }
	});
});
router.get("/new",middleware.LoggedIn,function(req,res){
	res.render("campgrounds/form");
});

router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err)
			res.redirect("/campgrounds");
		else{
			res.render("campgrounds/edit",{Campground:foundCampground});
		}
	});
});

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err)
			res.redirect("/campgrounds");
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

router.delete("/:id", middleware.checkCampgroundOwnership,(req, res) => {
        Campground.findByIdAndRemove(req.params.id, (err, campgroundRemoved) => {
            if (err) {
                console.log(err);
            }
            comment.deleteMany( {_id: { $in: campgroundRemoved.comments } }, (err) => {
                if (err) {
                    console.log(err);
                }
                res.redirect("/campgrounds");
            });
        })
    });
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comment").exec(function(err,foundCampgrpund){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/show",{campground:foundCampgrpund})
		}
	});
});




module.exports=router;