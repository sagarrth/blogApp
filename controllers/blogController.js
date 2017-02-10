const express = require('express');
const mongoose = require('mongoose');

var blogRouter = express.Router();

function blogController(app){

	//route to create a blog
	blogRouter.post('/create', (req,res)=>{

	});

	//route to GET all blogs
	blogRouter.get('/all', (req, res)=>{

	});

	//route to view a particular blog
	blogRouter.get('/view/:id', (req, res)=>{

	});

	//route to edit a blog
	blogRouter.put('/edit/:id', (req,res)=>{

	});

	//route to delete a blog
	blogRouter.delete('/delete/:id', (req, res)=>{

	});

	app.use('/api/blog', blogRouter);
}

exports = module.exports.controller = blogController 

