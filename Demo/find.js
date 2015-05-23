var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var url = 'mongodb://localhost:27017/test';

var findDocuments = function(db, callback) {
	var collection = db.collection('documents');

	collection.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		assert.equal(2, docs.length);
		console.log('Found the following records');
		console.dir(docs);
		callback(docs);
	});

};


MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected correctly to server");


	findDocuments(db, function() {
		db.close();
	})
})