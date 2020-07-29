const Campground = require("../models/campground");
const Comment = require("../models/comment");
const { request } = require("express");

//ALL MIDDLEWARE GOES HERE
let middlewareObj = {};

//CAMPGROUNDS
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back")
                    } else {
                        //does user own the campground?(comparing the object id with a string id with mongoose method ".equals()")
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that");
                        res.redirect("back")
                    }   
                }
            });
    }else {
        req.flash("error", "You need to be looged in to that")
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
                        req.flash("error", "You don't have permission to do that");
                        res.redirect("back")
                    }   
                }
            });
    }else {
        req.flash("error", "Please login to edit comment");
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
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

module.exports = middlewareObj;