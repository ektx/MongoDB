var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var url = 'mongodb://localhost:27017/test';

var updateDocument = function(db, callback) {
	var collection = db.collection('documents');

	// 在{a:2}文档中加个b:1
	collection.update(
		{a: 2}, 
		{$set: {b: 1}}, 
		function(err, result) {
			assert.equal(err, null);
			assert.equal(1, result.result.n);
			console.log('Update the document with the filed a equal to 2');
			callback(result);
		}
	);
}


MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log('Connected correctly to server');

	updateDocument(db, function() {
		db.close();
	});
});