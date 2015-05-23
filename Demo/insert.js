/*
	Mongodb insert()
*/
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

var insertDocuments = function(db, callback) {
	// 在test数据库中添加名为document集合
	var collection = db.collection('documents');

	// 在document中添加三个文档
	collection.insert([
			{a:1}, {a:2}, {a:3}
		], function(err, result) {
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);

		console.log('Insert 3 document into the document collection');

		callback(result);
	})
}

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log('Connect correctly to server!');

	insertDocuments(db, function() {
		db.close();
	});
});