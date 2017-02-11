function validator(req, res, next) {
	if(Object.keys(req.body).length>0 && req.method!=='GET'){
		if(req.method === 'POST' && req.body.title && req.body.contents && req.body.authorID){
			//for POST method it is mandatory to have the above three fields
			next();
		} else if(req.method === 'PUT') {
			//for PUT method any combination of properties for blog Model can be sent
			//to keep things simple - lets assume at any time the blog can be edit in two ways- 
			//1. its body i.e. (title, contents, likes), authorID and created can't be modified thus even if present in request by mistake will be deleted
			//2. adding comments to a blog
			delete req.body.created;
			delete req.body.authorID;
			next();
		} else {
			let err = new Error('Incomplete Data');
			next(err);
		}
	} else {
		//for GET method, the value will be sent as params or query
		next();
	}
}

exports = module.exports = validator;