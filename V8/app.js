const express    = require("./node_modules/express"),
      app        = express(),
      port       = 3000,
      bodyParser = require("./node_modules/body-parser"),
      mongoose   = require("mongoose"),
      passport   = require("./node_modules/passport/lib"),
      LocalStrategy = require("./node_modules/passport-local/lib"),
      Campground = require("./models/campground"),
      Comment    = require("./models/comment"),
      User       = require("./models/user"),
      seedDB     = require("./seeds");

//REQUIRING ROUTES
const commentRoutes    = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes      = require("./routes/index");


mongoose.connect("mongodb://localhost/yelp_camp_8", {useUnifiedTopology: true, useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// seedDB(); //seed the database

//PASSPORT CONFIG
app.use(require("./node_modules/express-session")({
    secret: "I love you, have a great day!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//USE ROUTES
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//
app.listen(port, () => console.log("YelpCamp Server has started!"));