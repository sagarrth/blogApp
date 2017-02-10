const express = require('express');
const fs = require('fs');
const app = express();


//load models into app
fs.readdir('./models', (err, models)=>{
	if(err)
		console.log(err);
	else {
		models.forEach(function(model){
			fs.readFileSync('./models'+model);
		});
	}
});

//load controllers into app
fs.readdir('./models', (err, controllers)=>{
	if(err)
		console.log(err);
	else {
		models.forEach(function(controller){
			var route = fs.readFileSync('./models'+model);
			route.controller(app);
		});
	}
});

app.listen(3000, ()=>{
	console.log('server started');
});