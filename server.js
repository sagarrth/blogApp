const express 	 = 	require('express');
const fs 		 = 	require('fs');
const bodyParser = 	require('body-parser');
const path 		 =	require('path');
const app 		 = 	express();


var port = process.env.PORT || 3000;


//app level middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//load models into app
fs.readdirSync('./models').forEach((model) => {
	if(path.extname(model)==='.js')
		require(path.join(__dirname, 'models', model));
});


//load controllers into app
fs.readdirSync('./controllers').forEach((controller)=>{
	if(path.extname(controller)==='.js'){
		var route = require(path.join(__dirname, 'controllers', controller));
		route.controller(app);
	}
});
	

app.listen(port, ()=>{
	console.log('server started');
});