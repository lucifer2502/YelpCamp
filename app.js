var express   =require("express");
var app       =express();
var bodyParser=require("body-parser");
var mongoose  =require("mongoose");
var passport  =require("passport");
var LocalStrategy=require("passport-local");
var Campground=require("./models/campgrounds");
var seedDB    =require("./seed.js");
var comment  =require("./models/comments");
var User      =require("./models/user");
var methodOverride=require("method-override")
var campgroundsRoute=require("./routes/campgrounds");
var commentsRoute=require("./routes/comments");
var indexRoute=require("./routes/index");
var flash     =require("connect-flash");




mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
mongoose.connect("mongodb+srv:rahul:rahul2502@yelpcamp-mbnli.mongodb.net/<dbname>?retryWrites=true&w=majority",{
	useNewUrlParser:true,
	useCreateIndex:true
}).then(()=>{
	console.log("Connected to DB");
	
}).catch(err =>{
	console.log("ERROR:",err.message);
});
//mongoose.connect("mongodb://localhost/yelp_camp");//

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.success=req.flash("success")
	res.locals.error=req.flash("error")
	next();
});
// it should be below the above function as the above finction is ruuning in every route so we need to run routes after that
app.use("/campgrounds",campgroundsRoute);
app.use("/campgrounds/:id/comments",commentsRoute);
app.use("/",indexRoute);

// seedDB();



app.listen(process.env.PORT||3000,process.env.IP,function(){
	console.log("Yelp Camp Server Started");
});