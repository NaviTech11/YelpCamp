const mongoose = require("mongoose");

let commentSchema = mongoose.Schema({
    author: String,
    text: String
});

module.exports = mongoose.model("Comment", commentSchema);