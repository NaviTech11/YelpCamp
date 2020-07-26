const Campground = require("../models/campground");
const Comment = require("../models/comment");

//ALL MIDDLEWARE GOES HERE
let middlewareObj = {};

//CAMPGROUNDS
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back")
                    } else {
                        //does user own the campground?(comparing the object id with a string id with mongoose method ".equals()")
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();
                    } else {
                        res.redirect("back")
                    }   
                }
            });
    }else {
        res.redirect("back");
    }
};

//COMMENTS
middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
             res.redirect("back")
                 } else {
                     //does user own the comment?(comparing the object id with a string id with mongoose method ".equals()")
                    if(foundComment.author.id.equals(req.user._id)){
                       next();
                    } else {
                        res.redirect("back")
                    }   
                }
            });
    }else {
        res.redirect("back");
    }
};

//USER IS LOGGED IN
//LOGIC FOR MAKING SURE A USER IS LOGGED IN
//IN ORDER TO MAKE COMMENTS
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = middlewareObj;