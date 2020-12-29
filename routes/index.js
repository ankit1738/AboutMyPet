var express = require('express');
var router = express.Router();
var middleware = require("../middleware/middleware.js");
var passport = require("passport");
var User = require("../models/user.js");

router.get("/", function(req, res){
	res.redirect("/blogs");
});
//REGISTER ROUTE
router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	var newUser = new User({
							username: req.body.username,
							fname: req.body.fname,
							lname: req.body.lname,
							username: req.body.username
						   });
	User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.redirect("/register");
        }
        else{
	        passport.authenticate("local")(req, res, function(){
	            req.flash("success", "Registerd Sucessfully\nWelcome to Blog_router " + user.fname);
	            res.redirect("/blogs");           
	        });
        }
    });
});

//LOGIN ROUTE
router.get("/login", function(req, res){
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/blogs",
	failureRedirect: "/login",
	successFlash: 'Welcome to my Blogrouter',
	failureFlash: 'Username/Password incorrect'	
}),function(req, res){
});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out succesfully!");
	res.redirect("/blogs");
});

module.exports = router;