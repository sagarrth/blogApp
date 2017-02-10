const mongoose = require('mongoose');

const authorSchema = mongoose.Schema;

var authorModel = new authorSchema({
	authorID 	: 	{type:String},
	firstName	: 	{type:String},
	lastName	: 	{type:String},
	intro		: 	{type: String},
	contact		: 	{ email:{type:String}, phone:{type:Number} }
});

mongoose.model('author', authorModel);