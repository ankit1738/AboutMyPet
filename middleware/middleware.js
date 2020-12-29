
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please Login First");
	res.redirect("/login");
}

middlewareObj.isCommentOwner = function(req, res, next){
	//INCOMPLETE
}

module.exports = middlewareObj;