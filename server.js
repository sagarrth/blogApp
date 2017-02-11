const express 	 = 	require('express');
const fs 		 = 	require('fs');
const bodyParser = 	require('body-parser');
const path 		 =	require('path');
const mongoose 	 = 	require('mongoose');
const app 		 = 	express();


let port 		 = process.env.PORT || 3000;
const dbPath 	 = 'mongodb://localhost:27017/blogApp';

mongoose.connect(dbPath);
mongoose.connection.once('open', ()=>{
	console.log("database connection opened");
});

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
		let route = require(path.join(__dirname, 'controllers', controller));
		route.controller(app);
	}
});


//error - handler
app.use((err, req, res, next) => {
	res.status('500').send('Internal Server Error'); 
});
	

app.listen(port, ()=>{
	console.log('server started');
});