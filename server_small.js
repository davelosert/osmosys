var express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	http = require('http'),
	MongoClient = require('mongoDB').MongoClient;

var COLLECTION;
MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
		COLLECTION = db.collection('objectStorage');});
var app = express();
app.use(bodyParser.json());
app.post('/object', function (req, res, next) {
		COLLECTION.insert(req.body, function (err, result) {
				res.send(200);});});
app.get('/objects', function (req, res, next) {
	COLLECTION.find().toArray(function (err, result) {
			res.json(result);});});
http.createServer(app).listen(3000, function () {console.log('Express server listening on port 3000');});
