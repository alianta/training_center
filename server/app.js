const express = require('express')
const app = express()
const bodyParser = require('body-parser') //для анализа запросов от клиента
const mongoose = require('mongoose'); //для работы с базой mongo
const url = 'mongodb://localhost:27017/blogDb';
const User = require('./model/user');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
 
app.get('/api/user/login', (req, res) => {
    res.send('Hello World!')
    mongoose.connect(url, function(err){
        if(err) throw err;
        console.log('connected successfully, username is: ',req.body.username,' password is: ',req.body.password);
		console.log('req.body is: ',req.body);
		
    });
})
app.post('/api/user/login', (req, res) => {
	
	const user = req.body.username;
	const pass = req.body.password;
	
	console.log("req.username="+user);
	console.log("req.password="+pass);
	console.log("req="+toString(req.body)); 
	if(/*user.length === 1&&*/user==="user"&&pass==="123"){	
		return res.status(200).json({
			status: 'success',
			data: user
		})
	} else {
		return res.status(200).json({
			status: 'fail',
			message: 'Login Failed'
		})
	}
	/*mongoose.connect(url,{ useMongoClient: true }, function(err){
		if(err) throw err;
		User.find({
			username : req.body.username, password : req.body.password
		}, function(err, user){
			if(err) throw err;
			console.log ();
			if(user.length === 1){	
				return res.status(200).json({
					status: 'success',
					data: user
				})
			} else {
				return res.status(200).json({
					status: 'fail',
					message: 'Login Failed'
				})
			}
			
		})
	});*/
})

/*app.post('/api/user/create', (req, res) => {
	mongoose.connect(url, function(err){
		if(err) throw err;
		const user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		})
		user.save((err, res) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: res
			})
		})
	});
})*/
 
app.listen(3000, () => console.log('blog server running on port 3000!'))