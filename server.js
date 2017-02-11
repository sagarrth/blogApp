const express 	 = 	require('express');
const fs 		 = 	require('fs');
const bodyParser = 	require('body-parser');
const app 		 = 	express();

var port = process.env.PORT || 3000;


//app level middleware
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//load models into app
fs.readdir('./models', (err, models)=>{
	if(err)
		console.log(err);
	else {
		models.forEach(function(model){
			require('./models'+'/'+model);
		});
	}
});

//load controllers into app
fs.readdir('./controllers', (err, controllers)=>{
	if(err)
		console.log(err);
	else {
		controllers.forEach(function(controller){
			var route = require('./controllers'+'/'+controller);
			route.controller(app);
		});
	}
});

app.listen(port, ()=>{
	console.log('server started');
});