var express = require('express');
var router = express.Router();
var Blog = require("../models/blog.js")
var middleware = require("../middleware/middleware.js");


router.get("/", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("Something Went Wrong");
		}else{
			res.render("index.ejs", {blogs: blogs});
		}
	});	
});

//CREATE NEW FORM
router.get("/new", middleware.isLoggedIn,  function(req, res){
	res.render("blog/new");
});

router.post("/", function(req, res){
	var author = {
		id:req.user._id,
		username:req.user.username
	}
	var newBlog = { title : req.body.title,
					image: req.body.image,
					body: req.sanitize(req.body.body),
					author: author};
	Blog.create(newBlog, function(err, blog){
		if(err){
			console.log(err);
			res.render("new");
		}else{
			res.redirect("/blogs");
		}
	});
});

//DISPLAYING BLOGS BY ID
router.get("/:id",  function(req, res){
	//FINDING THE CORRECT BLOG
	Blog.findById(req.params.id).populate('comments').exec(function(err, blog){
		if(err){
			res.redirect("/blog");
		}else{
			res.render("blog/show", {blog: blog});
		}
	});
});

//EDITING BLOG BY ID
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){
	Blog.findById(req.params.id, function(err, blog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("blog/edit", {blog: blog});
		}
	});	
});

//UPDATE ROUTE
router.put("/:id", middleware.isLoggedIn, function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs/" + req.params.id);
		}
	})
});

//DELETE ROUTE
router.delete("/:id", middleware.isLoggedIn, function(req, res){
	//DESTROY BLOG
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs/");
		}
	});
});

module.exports = router;