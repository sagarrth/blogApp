const mongoose = require('mongoose');

var commentsSchema = new mongoose.Schema({
	title		: 	{type: String},
	contents	: 	{type: String},
	likes		: 	{type: Number},
	authorID 	: 	{type: String},
	created 	: 	{type: Date, default: Date.now()}
});

//Assuming a blog can be written by an author multiple times, so I have kept author details in its own schema, otherwise there would
//be duplicacy in our blog model as to every document whose author is a particular user would be present, leading to updation anomaly

//In this assignment however there is no interaction with the Author model to keep it simple

//to embed comments into blog document the above process is used

var blogSchema = new mongoose.Schema({
	title		: 	{type:String},
	created		: 	{type:Date, default: Date.now()},
	contents	: 	{type:String},
	likes		: 	{type: Number, default: 0},
	comments	: 	[commentsSchema],
	authorID	: 	{type:String} 
});

mongoose.model('blog', blogSchema);