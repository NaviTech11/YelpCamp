const express = require("../node_modules/express");
const router = express.Router();
const passport = require("../node_modules/passport/lib");
const User = require("../models/user");

//ROOT route

router.get("/", function(req, res){
    res.render("landing");
});


 //SHOW REGISTER FORM
 router.get("/register", function(req, res){
     res.render("register");
 });

 //HANDLE SIGN-UP LOGIC
router.post("/register", function(req, res){
    let newUser = new User({username: req.body.username}); 
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//SHOW LOG-IN FORM
router.get("/login", function(req, res){
    res.render("login");
});

//HANDLING LOGIN LOGIC
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){

});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

//MIDDLEWARE
//LOGIC FOR MAKING SURE A USER IS LOGGED IN
//IN ORDER TO MAKE COMMENTS
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;
