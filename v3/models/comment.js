const mongoose = require("mongoose");

let commentSchema = mongoose.Schema({
    name: String,
    author: String
});

module.exports = mongoose.model("Comment", commentSchema);