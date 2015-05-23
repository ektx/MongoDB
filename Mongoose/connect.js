/*
	Mongoose connect 示例                v-0.0.1
	-----------------------------------------
	zwl <myos.me>                   2015-5-17
*/
var 
var Mongoose = require('mongoose');

// connect db
Mongoose.connect('mongodb://localhost/zios');

var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
	console.log('OK');
})