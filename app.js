var express 		= require('express'),
app 				= express(),
mongoose 			= require('mongoose'),
bodyParser 			= require('body-parser'),
methodOverride 		= require('method-override'),
expressSanitizer 	= require('express-sanitizer'),
Blog 				= require("./models/blog.js"),
passport   		 	= require("passport"),
LocalStrategy 		= require("passport-local"),
session 			= require("express-session"),
User 				= require("./models/user.js"),
flash				= require("connect-flash"),
Comment 			= require("./models/comments.js");


var blogRoute = require("./routes/blog.js");
var commentsRoute = require("./routes/comments.js");
var indexRoute = require("./routes/index.js");



//APP CONFIG
mongoose.connect("mongodb://ankit:Ankit12345@ds059365.mlab.com:59365/blog_app",{ useMongoClient: true });
// mongoose.connect("mongodb://localhost/blog_app",{ useMongoClient: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("database conected!");
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
	secret:"winter is coming",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


app.use("/blogs", blogRoute);
app.use("/blogs/:id/comments", commentsRoute);
app.use(indexRoute);



app.listen(8000, function(){
    console.log("server started at 8000");
});


// app.listen(process.env.PORT, process.env.IP, function(req, res){
// 	console.log("Blog server started at port " + process.env.port);
// });
