# Find

1. 空的查询文档{}会匹配集合的全部内容.
   
   > db.c.find() 等同于 db.c.find({})
   
2. 多条件与单个条件查询
   
   > db.c.find({'a':'a_val', 'b':'b_val'});
   > 
   > db.c.find({'a':'a_val'});`
   
3. 指定返回的键(内容)
   
   > db.osApp.find()
   > 
   > { "_id" : ObjectId("5569c2888db2acb244b545ad"), "name" : "allApps", "version" : "0.0.1", "deccription" : "用于加载用户应用数据", "apps" : [ { "name" : "笔记", "app" : "Notes" }, { "name" : "日历", "app" : "Date", "canvas" : "drawDateIco" }, { "name" : "音乐", "app" : "Music" }, { "name" : "时钟", "app" : "Clock", "canvas" : "cclock" }, { "name" : "我的浏览器", "app" : "Browseris" }, { "name" : "聊天", "app" : "Chat" }, { "name" : "二维码", "app" : "QRcode" }, { "name" : "商城", "app" : "Store" }, { "name" : "Google", "url" : "http://173.194.1.239/", "app" : "Google" }, { "name" : "Codrops", "url" : "http://tympanus.net/codrops/", "app" : "Codrops" }, { "name" : "实验室", "app" : "Lab" }, { "name" : "进程", "app" : "Ostask" } ] }

从找到的结果中,只返回 name 和 version 的值:

> db.osApp.find({}, {'name': 1, 'version': 1});

mongoose使用方法:
> osAppSchemas.find({}, '-_id name version');  
或  
> osAppSchemas.find({}, {'_id':0, name':1, 'version':1}) 
*_id默认都会输出,所以加在说明


> { "_id" : ObjectId("5569c2888db2acb244b545ad"), "name" : "allApps", "version" : "0.0.1" }

我们再从上面的数据中返回除 `apps` 的所有数据:

> db.osApp.find({}, {'apps': 0});



> { "_id" : ObjectId("5569c2888db2acb244b545ad"), "name" : "allApps", "version" : "0.0.1", "deccription" : "用于加载用户应用数据" }

- `_id` 也可以防止输出或只输出 `db.osApp.find({}, {'_id': 0})`



查找到子文档中的指定数据输出,如下文档
```js
{ 'name' : {'zh':'中文','us':'English'}}

db.c.find({}, {'name.zh':1})

{ 'name' : {'zh':'中文'}}
```
这样 us 就不会出现了

## 查询条件

|| $lt  || <  || 小于
|| $lte || <= || 小于等于
|| $gt  || >  || 大于
|| $gte || >= || 大于等于
|| $ne  || != || 不相等		可以是任何类型的数据间比较

例子:

1.查找18~30岁的用户

> db.c.find({'age': {'$get': 18, "$lte": 30}});

2.查找在 2007年7月1号注册的用户

> start = new Date('01/07/2007');



> db.c.find({'registed': {'$lt': start}});

3.查找不是 'zwl' 的用户

> db.c.find({'username': {'$ne': 'zwl'}})

## 或者查询

- $in  ||  或
- $nin     非
- $or      或

例子: 

为了检验功能我们先插入数据:

``` json
db.nums.insert([
	{"num": [2,5,6] },
	{"num": [123,456] },
	{"num": [123,456,789] },
	{"num": [123,456,789,0] }
]);
```

``` js
db.nums.find()
{ "_id" : ObjectId("55745cdb9fab0416d14c382a"), "num" : [ 2, 5, 6 ] }
{ "_id" : ObjectId("55745cdb9fab0416d14c382b"), "num" : [ 123, 456 ] }
{ "_id" : ObjectId("55745cdb9fab0416d14c382c"), "num" : [ 123, 456, 789 ] }
{ "_id" : ObjectId("55745cdb9fab0416d14c382d"), "num" : [ 123, 456, 789, 0 ] }
```

1.查询有 123 或 456 或 789 的数据

> db.nums.find({'num': {'$in': [123, 456, 789]}});

{ "_id" : ObjectId("55745cdb9fab0416d14c382b"), "num" : [ 123, 456 ] }

{ "_id" : ObjectId("55745cdb9fab0416d14c382c"), "num" : [ 123, 456, 789 ] }

{ "_id" : ObjectId("55745cdb9fab0416d14c382d"), "num" : [ 123, 456, 789, 0 ] }

2.查询没有 123 或 456 或 789 的数据

> db.nums.find({'num': {'$nin': [123, 456, 789]}});

{ "_id" : ObjectId("55745cdb9fab0416d14c382a"), "num" : [ 2, 5, 6 ] }

3.查询有 123 或 456 或 789 或是 _id=ObjectId("55745cdb9fab0416d14c382a"

``` js
db.nums.find({

'$or':[
	{'num': {'$in': [123, 456, 789]}},
	{'_id': ObjectId("55745cdb9fab0416d14c382a")}
]
});
```

> { "_id" : ObjectId("55745cdb9fab0416d14c382a"), "num" : [ 2, 5, 6 ] }
> 
> { "_id" : ObjectId("55745cdb9fab0416d14c382b"), "num" : [ 123, 456 ] }
> 
> { "_id" : ObjectId("55745cdb9fab0416d14c382c"), "num" : [ 123, 456, 789 ] }
> 
> { "_id" : ObjectId("55745cdb9fab0416d14c382d"), "num" : [ 123, 456, 789, 0 ] }

## $mod 取模

> db.c.find({'nums': {'$mod': [5, 1]}});

它的用法是查询数字,对查询的数字除以自己的第一个参数(这里是5)得到的余数如果和第二个参数相等(这里是1),则返回

上例可以从 `123456789` 中找到 `1 6`

## $not 不是,可以用于任何的条件,比如我们要找到上例中除了 1 6 之外的数就可以:

> db.c.find({'nums': {'$not': {'$mod': [5, 1]}}});

`2345789`



## 特定类型的查询

1. null 不公可以匹配 null,还可以匹配到不存在的内容.
2. $exists 用于判断是否存在
3. $all 所有,同时都有  {'$all': [a, b]}



## limit skip & sort

- limit
  
  查询3个指定内容  
  
  > db.c.find({}).limit(3)  
  
- 最多3个,少了则全部
  
- skip
  
  跳过前3个内容,返回余下的所有内容  
  
  > db.c.find({}).skip(3)  
  
- sort() 顺序

倒序查询出来的数据,1表示升序 -1表示降序

> db.c.find().sort({'_id':-1})

Mongoose中方法:
> Module.find({}, {}, {sort: {'_id':-1}}, callback)
> Module.find().sort({'_id': -1}).exec(callback)

按照'usrname'升序,'age'降序

> db.c.find().sort({usrname:1, age: -1})

查询50条内容之后的50条数据,并按`usrname`升序和`age`降序

> db.find().limit(50).skip(50).sort({usrname:1, age: -1})  



注 db.c.find() 中的 c 代指所要用到的集合