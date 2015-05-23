/*
	Mongoose Find 示例                v-0.0.1
	-----------------------------------------
	zwl <myos.me>                   2015-5-17
*/
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/zios');

var Schema = mongoose.Schema;
// 为tasks表调用数据指定结构
var Tasks  = new Schema({
	description: String,
	name: String
});

// 关联 tasks 集
mongoose.model('test2', Tasks);

var Task = mongoose.model('test2');
var task = new Task();
task.name = 'zwl';
task.description = 'I love You!';
task.save(function(err) {
	if (err) throw err;
	console.log("Task Saved!");
});
