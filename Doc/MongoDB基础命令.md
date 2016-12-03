# MongoDB 基础命令

## db

**查看当前使用的数据库**

```shell
> db
test
```



## find() & findOne()

**find:** 返回集合里面所有的文档,默认显示20个文档

**findOne:** 返回集合中的一个文档





## 插入(新建)  insert()

如在数据库里插入 `name = "zwl"`;

```shell
# 插入单条数据
db.c.insert({"name": "zwl"})

# 插入多条数据
db.c.insert([{name:'zwl'},{name:'ektx'}])

# c 表示你的文档
```

测试是否成功: 

> db.foo.find()

{ "_id" : ObjectId("5544227b4bf869a207e1398a"), "name" : "zwl" }

*插入的数据最大16MB



## 删除

#### 文档 remove()

如,删除之前建的 foo 文档中name=‘zwl’

```shell
db.foo.remove({'name':'zwl'})
```

#### 删除文档中的单个内容 delete

```sh
{  
    "bar" : "baz", 
    "web" : "http://myos.me" 
}
```

删除如上的 web

```sh
var web = db.blog.findOne({'bar':'baz'});
delete web.web
```

#### 删除整个文档 drop()

```sh
db.c.drop()
```



## 更新  update()

### 使用`$set`修改器

##### 示例 1 新加修改内容:如果存在则是更新内容,没有则是新增

```javascript
{"name" : "kings" }

// 添加一个 web
db.c.update({name: 'kings'}, { $set: {"web":"http://myos.me"} })
// 或
db.c.update({name: 'kings'}, {'name': 'kings', 'web': 'http://myos.me'})
```



##### 示例 2 给数组添加或更新内容

```javascript
// 目录内容
{
	'usr': 'kings',
	project: [
		{'name':'workman', 'private': false},
		{'name':'iservers', 'private': true}
	]
}

// 给 `project` 中 `name: workman` 添加一个 `value: 100
db.c.update({'project.name': 'workman'}, {$set: {'project.$.value': 100} })

// 查看结果
{
	'usr': 'kings',
	project: [
		{'name':'workman', 'private': false, 'value': 100},
		{'name':'iservers', 'private': true}
	]
}
```



###  使用”$unset”删除内容

删除之前添加的web

> db.blog.update({'bar':'baz'}, {"$unset":{"web":1}})

```javascript
// 删除 示例2 中添加的 value
db.c.update({'project.name':'workman'}, {$unset:{'project.$.value': 1} });

// 查看
{
	'usr': 'kings',
	project: [
		{'name':'workman', 'private': false},
		{'name':'iservers', 'private': true}
	]
}
```



### 使用 `$inc` 为数字增加或减少

为之前的数据加个数字,并设置默认大小为100

> db.blog.update({"_id" : ObjectId("554242544bf869a207e13989")}, {"$set":{'score’:100}});

然后我们让它增加100

> db.blog.update({"_id" : ObjectId("554242544bf869a207e13989")}, {"$inc":{'score':100}})

- 正数增加, 负数减少

###  `$push` 对数组进行处理

`$push` 会对数组的末尾进行加入一个元素,要是没有就会创建一人新的数组.

我们先加个文章:

db.blog.insert({'title':'Mac Air','content':'my love ...'});

然后,我们用$push来为它追加个评论

db.blog.update({'title':'Mac Air'}, {$push: {'comments':

... {'name':'zwl', 'email':'myos@zios.com', 'content':'i love you'}}});

#### 3.6 `$ne` 判断如果有相应的数组则不在添加

如:如果文档中已经有了作者且是zwl,那么就不添加新的作者了

```javascript
db.blog.update({'authors':{'$ne’:’zwl’}}, {$push: {'authors': 'zwl'}})
—— ———— ——————             —————  ————             —————————————————
    	更新                判断    值               添加内容
```

如子文档进行数组更新:

```javascript
// 对示例2 中的`project` 再添加一个数据
db.c.update(
    // 如果没有 zlog 则添加
    {usr:'kings', 'project.name': {$ne: 'zlog'}},
    {$push: {
        'project': {
             'name': 'zlog',
             'private': true
        }
    }}
)
```



#### 3.7  $addToSet 

__判断如果有相应的数组则不在添加,比$ne实用,且可以避免重复;同时可以和$each组合起来,实现多个数据的添加工作__



#### 3.8 `$pull` 删除

删除匹配的元素

```javascript
// 删除之前我们使用 $ne 添加的 zlog
db.c.update(
    {usr:'kings'},
    {$pull: {
        'project': {
             'name': 'zlog',
             'private': true
        }
    }}
)
```



#### 3.9 更新所有数据

为所有用户表中的数据添加一个ico属性 最后一个true 为查找到的所有数据,false 则表示只更新找到的第一条

```javascript
db.usrs.update({},{'$set':{'ico':'kings.png'}},false, true);
```



## version()

**查看当前数据库版本信息**