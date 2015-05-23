var mongoClient =  require('mongodb').MongoClient,
	assert = require('assert');


var url = 'mongodb://localhost:27017/zios';

mongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log('Connect correctly to server');

	db.close();
});