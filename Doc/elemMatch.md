## $elemMatch 
投影操作符,可以对数组内的元素进行查询操作,返回符合条件的内容

注意:
- 数组中的内容也是文档
- 如果有多个条件,只返回第一个

### 示例
现有以下文档:
```json
{ "name" : "book", "arr" : [ { "name" : "1", "key" : "2" }, { "name" : "2" } ] }
{ "url" : "http://myos.me" }
{ "name" : "qiu", "arr" : [ { "name" : "qiting", "key" : "2" }, { "name" : "45" }, {"love":"code"} ] }
```

##### 1.查询`key:2`的内容文档
> db.c.find({},{_id:0,arr:{$elemMatch:{'key':'2'}}})
```json
{ "arr" : [ { "name" : "1", "key" : "2" } ] }
{  }
{ "arr" : [ { "name" : "qiting", "key" : "2" } ] }
```
这里我们返回了3个结果,其中只有1和3有用,2中没有得到数据,所有返回内容都是子文档

##### 2.查询`key:2`且主文档`name:qiu`的内容
> db.c.find({name:'qiu'},{_id:0,arr:{$elemMatch:{'key':'2'}}})
```json
{ "arr" : [ { "name" : "qiting", "key" : "2" } ] }
```
这里也只子文档,但是只有一条了

##### 3.查询`key:2`且主文档`name:qiu`的所有内容
> db.c.find({name:'qiu'},{_id:0,name:1,arr:{$elemMatch:{'key':'2'}}})
```json
{ "name" : "qiu", "arr" : [ { "name" : "qiting", "key" : "2" } ] }
```
这下就返回了整个文档了

##### 4.查询主文档`name:qiu`的,但是子文档没有key的所有内容
> db.c.find({name:'qiu'},{_id:0,name:1,arr:{$elemMatch:{'key':null}}})
```json
{ "name" : "qiu", "arr" : [ { "name" : "45" } ] }
```
使用关键字`null`就可以找到子文档中不存在`key`的内容了
如上,我们并没有同时找出`love`,那要怎么处理呢?
这里要使用到聚合功能了,
```shell
db.c.aggregate([
	// filter possible documents
	{$match: {'name':'qiu'}},
	
	// 松散化对象,就是你要的子文档
	{$unwind: '$arr'},
	
	// 匹配的特殊关键字
	{$match: {'arr.key': null}},

	// 合成后输出
	{$group:{
		_id: '$_id',
		name: {$first: $name},
		'arr': {$push: '$arr'}
		}
	}
])
```
http://stackoverflow.com/questions/29026662/mongodb-elemmatch-multiple-elements-in-array