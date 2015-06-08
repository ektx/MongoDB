# Find

1. 空的查询文档{}会匹配集合的全部内容.
db.c.find() 等同于 db.c.find({})

2. 多条件与单个条件查询
db.c.find({'a':'a_val', 'b':'b_val'});
db.c.find({'a':'a_val'});

3. 指定返回的键(内容)
> db.osApp.find()
{ "_id" : ObjectId("5569c2888db2acb244b545ad"), "name" : "allApps", "version" : "0.0.1", "deccription" : "用于加载用户应用数据", "apps" : [ { "name" : "笔记", "app" : "Notes" }, { "name" : "日历", "app" : "Date", "canvas" : "drawDateIco" }, { "name" : "音乐", "app" : "Music" }, { "name" : "时钟", "app" : "Clock", "canvas" : "cclock" }, { "name" : "我的浏览器", "app" : "Browseris" }, { "name" : "聊天", "app" : "Chat" }, { "name" : "二维码", "app" : "QRcode" }, { "name" : "商城", "app" : "Store" }, { "name" : "Google", "url" : "http://173.194.1.239/", "app" : "Google" }, { "name" : "Codrops", "url" : "http://tympanus.net/codrops/", "app" : "Codrops" }, { "name" : "实验室", "app" : "Lab" }, { "name" : "进程", "app" : "Ostask" } ] }

从找到的结果中,只返回 name 和 version 的值:
> db.osApp.find({}, {'name': 1, 'version': 1});
{ "_id" : ObjectId("5569c2888db2acb244b545ad"), "name" : "allApps", "version" : "0.0.1" }

我们再从上面的数据中返回除 apps 的所有数据:
> db.osApp.find({}, {'apps': 0});
{ "_id" : ObjectId("5569c2888db2acb244b545ad"), "name" : "allApps", "version" : "0.0.1", "deccription" : "用于加载用户应用数据" }

* _id 也可以防止输出或只输出 db.osApp.find({}, {'_id': 0})

## 查询条件
* $lt  <  小于
* $lte <= 小于等于
* $gt  >  大于
* $gte >= 大于等于
* $ne  != 不相等		可以是任何类型的数据间比较

例子:
1.查找18~30岁的用户
db.c.find({'age': {'$get': 18, "$lte": 30}});

2.查找在 2007年7月1号注册的用户
start = new Date('01/07/2007');
db.c.find({'registed': {'$lt': start}});

3.查找不是 'zwl' 的用户
db.c.find({'username': {'$ne': 'zwl'}})

## 或者查询
* $in  ||  或
* $nin     非
* $or      或

例子: 
为了检验功能我们先插入数据:
db.nums.insert([
	{'num':[2,5,6]},
	{'num':[123,456]},
	{'num': [123,456,789]},
	{'num': [123,456,789,0]}
]);
> db.nums.find()
{ "_id" : ObjectId("55745cdb9fab0416d14c382a"), "num" : [ 2, 5, 6 ] }
{ "_id" : ObjectId("55745cdb9fab0416d14c382b"), "num" : [ 123, 456 ] }
{ "_id" : ObjectId("55745cdb9fab0416d14c382c"), "num" : [ 123, 456, 789 ] }
{ "_id" : ObjectId("55745cdb9fab0416d14c382d"), "num" : [ 123, 456, 789, 0 ] }

1.查询有 123 或 456 或 789 的数据
> db.nums.find({'num': {'$in': [123, 456, 789]}});
{ "_id" : ObjectId("55745cdb9fab0416d14c382b"), "num" : [ 123, 456 ] }
{ "_id" : ObjectId("55745cdb9fab0416d14c382c"), "num" : [ 123, 456, 789 ] }
{ "_id" : ObjectId("55745cdb9fab0416d14c382d"), "num" : [ 123, 456, 789, 0 ] }

2.查询没有 123 或 456 或 789 的数据
> db.nums.find({'num': {'$nin': [123, 456, 789]}});
{ "_id" : ObjectId("55745cdb9fab0416d14c382a"), "num" : [ 2, 5, 6 ] }

3.查询有 123 或 456 或 789 或是 _id=ObjectId("55745cdb9fab0416d14c382a"
db.nums.find({
'$or':[
	{'num': {'$in': [123, 456, 789]}},
	{'_id': ObjectId("55745cdb9fab0416d14c382a")}
]
});

{ "_id" : ObjectId("55745cdb9fab0416d14c382a"), "num" : [ 2, 5, 6 ] }
{ "_id" : ObjectId("55745cdb9fab0416d14c382b"), "num" : [ 123, 456 ] }
{ "_id" : ObjectId("55745cdb9fab0416d14c382c"), "num" : [ 123, 456, 789 ] }
{ "_id" : ObjectId("55745cdb9fab0416d14c382d"), "num" : [ 123, 456, 789, 0 ] }






注 db.c.find() 中的 c 代指所要用到的集合