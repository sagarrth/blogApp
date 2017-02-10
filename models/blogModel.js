const mongoose = require('mongoose');

var blogSchema = mongoose.Schema;
//Assuming a blog can be written by an author multiple times, so I have kept author details in its own schema, otherwise there would
//be duplicacy in our blog model as to every document whose author is a particular user would be present, leading to updation anomaly
var blogModel = new blogSchema({
	title		: 	{type:String},
	created		: 	{type:Date},
	contents	: 	{type:String},
	images		: 	[{type:String}],
	likes		: 	{type: Number},
	comments	: 	[{text:{type: String}, likes:{type:Number, default:0}}, author:{type:String}],
	authorID	: 	{type:String} 
});

mongoose.model('blog', blogModel);