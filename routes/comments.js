var express = require('express');
var router = express.Router({mergeParams: true});
var Blog = require("../models/blog.js");
var Comment = require("../models/comments.js");
var middleware = require("../middleware/middleware.js");


//NEW COMMENT
router.post("/new",  function(req, res){ //middleware.isLoggedIn
	console.log(req.body);
	/*Blog.findById(req.params.id, function(err, blog){
		if(err){
			//console.log(err);
			console.log("First Error");
			res.redirect("/blogs");
		}else{
			Comment.create({text:req.body.comment}, function(err, comment){
				if(err){
					console.log("Second ERROR: ");
					res.redirect("/blogs");
				}else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					blog.comments.push(comment);
					blog.save();
					req.flash("success", "Successfully added comment");
					res.render("/ajax_views/comments", {blog: blog});
					res.end();
				}
			});
			//console.log(blog);
		}
	}); */
});

//EDIT COMMENT
router.get("/:comment_id/edit", middleware.isLoggedIn, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err) console.log(err);
		else{
			res.render("comments/edit", { blog_id: req.params.id, comment: foundComment});
		}
	});
});

//UPDATE

router.put("/:comment_id", function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success", "Comment updated");
			res.redirect("/blogs/" + req.params.id);
		}
		
	});
});

//DELETE COMMENT

router.delete("/:comment_id",   function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success", "Successfully deleted comment");
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

module.exports = router;