const express = require('express')
const app = express()
const bodyParser = require('body-parser') //для анализа запросов от клиента
const mongoose = require('mongoose'); //для работы с базой mongo
const url = 'mongodb://@ds259742.mlab.com:59742/statusdb';
const dbAuthUser = 'user2';
const dbAuthPass = 'user2123';
const User = require('./model/user');
const Post = require('./model/post');
const Category = require('./model/category');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/api/user/login', (req, res) => {
	res.send('Hello World!')

	mongoose.connect(url, {
		useNewUrlParser: true,
		auth: {
			user: 'user2',
			password: 'user2123'
		}
	})
	var conn = mongoose.connection;
	conn.on('error', console.error.bind(console, 'connection error:'));

	conn.once('open', () => {
		console.log('sucsessful connected to database')
	});		
    
})
app.post('/api/user/login', (req, res) => {

	const user = req.body.username;
	const pass = req.body.password;

	mongoose.connect(url, {
		useNewUrlParser: true,
		auth: {
			user: dbAuthUser,
			password: dbAuthPass
		}
	},
	 function(err){
		if(err) throw err;
        User.find({
			/* ищем пользоателя в таблице user базы */
			username : req.body.username, 
			password : req.body.password
			/*username : 'user3', 
			password : 'user3123'*/
        }, function(err, user){
			if(err) throw err;
            if(user.length === 1){  
                return res.status(200).json({
                    status: 'success',
                    data: user
                })
            } else {
                return res.status(200).json({
                    status: 'fail',
                    message: 'Login Failed.'
                })
            }
             
        })
    });
})

app.post('/api/post/getAllPost', (req, res) => {
    mongoose.connect(url, {
		useNewUrlParser: true,
		auth: {
			user: dbAuthUser,
			password: dbAuthPass
		}
	}, function(err){
        if(err) throw err;
        Post.find({},[],{ sort: { _id: -1 } },(err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})

app.post('/api/post/createPost', (req, res) => {
    mongoose.connect(url, {
		useNewUrlParser: true,
		auth: {
			user: dbAuthUser,
			password: dbAuthPass
		}
	}, function(err){
        if(err) throw err;
        const post = new Post({
			date: req.body.date,
            title: req.body.title,
			description: req.body.description,
			category: req.body.category,
			image: req.body.image
        })
        post.save((err, doc) => {
			if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });

})




app.post('/api/post/updatePost', (req, res) => {
    mongoose.connect(url, {
		useNewUrlParser: true,
		auth: {
			user: dbAuthUser,
			password: dbAuthPass
		}
	}, function(err){
        if(err) throw err;
        Post.update(
            {_id: req.body.id },
            { 
				date: req.body.date,
				title: req.body.title,
				description: req.body.description,
				category: req.body.category,
				image: req.body.image
			 },
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})

app.post('/api/post/deletePost', (req, res) => {
    mongoose.connect(url, {
		useNewUrlParser: true,
		auth: {
			user: dbAuthUser,
			password: dbAuthPass
		}
	}, function(err){
		if(err) throw err;
        Post.findByIdAndRemove(req.body.id,
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})

app.post('/api/post/getPostCategoryList', (req, res) => {
    mongoose.connect(url, {
		useNewUrlParser: true,
		auth: {
			user: dbAuthUser,
			password: dbAuthPass
		}
	}, function(err){
        if(err) throw err;
        Category.find({},[],{ sort: { _id: -1 } },(err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})


app.post('/api/post/addCategory', (req, res) => {
    mongoose.connect(url, {
		useNewUrlParser: true,
		auth: {
			user: dbAuthUser,
			password: dbAuthPass
		}
	}, function(err){
		if(err) throw err;
		const newCat = new Category({name: req.body.newCat})
        newCat.save((err, doc) => {
			if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });

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