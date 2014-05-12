var express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	http = require('http'),
	MongoClient = require('mongoDB').MongoClient;

var COLLECTION;
MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
	if(err){
		throw err;
	} else {
		console.log('MongoDB-Connection up and running!');
		COLLECTION = db.collection('objectStorage');
	}

});

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.post('/save', function (req, res, next) {
	console.log(req.body);
	if(!req.body || Object.keys(req.body).length === 0){
		next(new Error('Missing Arguments!'));
	} else {
		COLLECTION.insert(req.body, function (err, result) {
			if(err){
				next(err);
			} else {
				res.send(200);
			}
		});
	}
});

app.get('/all', function (req, res, next) {
	COLLECTION.find().toArray(function (err, result) {
		if(err){
			next(err);
		} else {
			res.json(result);
		}
	})
});
// Little Error Handler
app.use(function(err, req, res, next) {
	console.error(err);
    res.send(err.status || 500);
});
// Put up Server
http.createServer(app).listen(3000, function () {
	console.log('Express server listening on port 3000');
});

