var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var url = 'mongodb://localhost:27017/test';

var removeDocument = function(db, callback) {
	var collection = db.collection('documents');

	collection.remove({a:3}, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log('Remove the documnet with the field a equal to 3');
		callback(result);
	});
}

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log('Connected correctly to server!');

	removeDocument(db, function() {
		db.close();
	})
})