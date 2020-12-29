var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	fname: String,
	lname: String,
	username: String,
	password: String,
	created: {type: Date, default:Date.now}
});

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("User", userSchema);

