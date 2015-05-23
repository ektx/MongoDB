var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1', 27017, {});

var client = new mongodb.Db('zios', server, {w:1});

client.open(function(err) {
	if (err) throw err;

	client.collection('blog', function(err, collection) {
		if (err) throw err;

		collection.find({}).toArray(function(err, results) {
			if (err) throw err;
			console.log(results);
		})
	})
})