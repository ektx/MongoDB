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
	apps: [{name:String, app:String, canvas:String, url:String}],
	name: String
},{collection:'osApp'});

// 关联 tasks 集
mongoose.model('osApp', Tasks);

// Task.find(function(err, tasks) {
// 	if (err) return console.error(err);
// 	console.log(tasks)
// })

var Task = mongoose.model('test');
var task = new Task();
task.project = 'zwl';
task.description = 'I love You!';
task.save(function(err) {
	if (err) throw err;
	console.log("Task Saved!");
});


// var Task = mongoose.model('osApp');
// Task.find(function(err, tasks) {
// 	for (var i = 0; i < tasks.length; i++) {
// 		console.log('ID: '+tasks[i].name);
// 		console.log('Description: '+ tasks[i].apps);
// 	}
// 	// console.log(tasks)
// })