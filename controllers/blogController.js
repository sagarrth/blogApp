const express 			= 		require('express');
const mongoose 			= 		require('mongoose');
const blogModel 		= 		mongoose.model('blog');
const responseGenerator = 		require('./../libraries/responseGenerator');
const blogRouter 		= 		express.Router();

function blogController(app){
	const validator = require('./../middlewares/validator');

	//route to create a blog
	blogRouter.post('/create', validator, (req,res)=>{
		//create a new blog model
		var newBlog = new blogModel({
			title		: 	req.body.title,
			contents	: 	req.body.contents,
			authorID 	: 	req.body.authorID
		});
		//save the model in db
		newBlog.save((err, data) => {
			if(err){
				res.send(responseGenerator.generate(err, 'Internal Server Error', 500, null));
			} else {
				res.send(responseGenerator.generate(null, 'Created', 200, data));		
			}
		});
		
	});

	//route to GET all blogs
	blogRouter.get('/all', validator, (req, res)=>{
		blogModel.find({}, {_v:0}, (err, data) => {
			if(err){
				res.send(responseGenerator.generate(err, 'Internal Server Error', 500, null));
			} else {
				res.send(responseGenerator.generate(null, 'Found All', 200, data));
			}
		});
	});

	//route to view a particular blog
	blogRouter.get('/view/:id', validator, (req, res)=>{
		blogModel.findById(req.params.id, {_v:0}, (err, data) => {
			if(err){
				res.send(responseGenerator.generate(err, 'Invalid ID', 404, null));
			} else {
				res.send(responseGenerator.generate(null, 'Found A Single Blog', 200, data));
			}
		});
	});

	//route to edit a blog : Assumptions edit means editing the blog or adding comments to the blog
	blogRouter.put('/edit/:id', validator, (req,res)=>{
		let update = {}
		for(let key in req.body){
			if(key==='comments'){
				update.$push = {
					comments : {
						title 	 : req.body.comments.title,
						contents : req.body.comments.contents,
						authorID : req.body.comments.authorID
					}
				};
			} else {
				update[key] = req.body[key];
			}
		}
		
		blogModel.findOneAndUpdate({_id: req.params.id}, update, {new: true}, (err, data) => {
			if(err){
				res.send(responseGenerator.generate(err, 'Invalid ID', 404, null));
			} else {
				res.send(responseGenerator.generate(null, 'Updated', 200, data));
			}
		});
	});

	//route to delete a blog
	blogRouter.delete('/delete/:id', validator, (req, res)=>{
		blogModel.findByIdAndRemove(req.params.id, (err, data) => {
			if(err){
				res.send(responseGenerator.generate(err, 'Internal Server Error', 500, null));
			} else {
				res.send(responseGenerator.generate(null, 'Deleted Blog', 200, data));
			}
		});
	});

	app.use('/api/blog', blogRouter);
}

exports = module.exports.controller = blogController 

