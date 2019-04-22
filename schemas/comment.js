var mongoose = require('mongoose');

var Comment = new mongoose.Schema({
	username:String,
	comment:String,
	commentDate:Date
})

module.exports = Comment;