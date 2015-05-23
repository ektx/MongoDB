/*
	Mongodb 连接
*/
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var url = 'mongodb://localhost:27017/zios';

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);

	console.log('Connected Correctly to server');

	db.close();
})