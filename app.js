const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    Blog = require("./models/blog.js"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    session = require("express-session"),
    User = require("./models/user.js"),
    flash = require("connect-flash"),
    Comment = require("./models/comments.js");

const blogRoute = require("./routes/blog.js");
const commentsRoute = require("./routes/comments.js");
const indexRoute = require("./routes/index.js");
const redis = require("redis");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient();

//APP CONFIG
mongoose.connect(
    `mongodb+srv://ankit1738:${process.env.PASS}@cluster0.qj0wm.mongodb.net/BlogApp?retryWrites=true&w=majority`,
    { useNewUrlParser: true, dbName: "BlogApp", useUnifiedTopology: true }
);
// mongoose.connect("mongodb://localhost/blog_app",{ useMongoClient: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("database conected!");
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(express.static(__dirname + "/public"));

app.use(
    require("express-session")({
        secret: process.env.PASSPORT_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new RedisStore({ client: redisClient }),
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/blogs", blogRoute);
app.use("/blogs/:id/comments", commentsRoute);
app.use(indexRoute);

app.listen(process.env.PORT || 8080, function () {
    console.log("server started at 8000");
});

// app.listen(process.env.PORT, process.env.IP, function(req, res){
// 	console.log("Blog server started at port " + process.env.port);
// });
