## pretty 输出优化

- 查寻结果格式化输出

```javascript
db.c.find().pretty()
```



## 索引

- ensureIndex() 创建索引

```javascript
// 主文档创建
db.c.ensureIndex({key:1})

// 子文档创建
db.c.ensureIndex({'parent.key': 1})
```

- dropIndex() 删除索引

```javascript
db.c.dropIndex({key: 1})
```



## count 统计

- 返回文档数量  

返回文档总数  
> db.c.count()

返回 usr 中 age = 8 的总数
>db.c.count({age: 8}) 


#### distinct
返回指定键所有的值形成的数组

```javascript
{"name" : "iphone", "type": 5}
{"name": "Mac", "type": 2013}

db.runCommand({"distinct":"people","key":"type"})

// => {"value":[5, 2013] ...}
 // or use
db.people.distinct('type')
// => [5, 2013]
```


## 数据库重命名

##### 方法一:

```javascript
# 复制数据库并给出新的名字
db.copyDatabase('old_database', 'new_database')
# 使用旧的数据库
use old_database
# 删除旧的数据库
db.dropDatabase()
```

##### 方法二:

```javascript
mongodump old_database
mongorestore -db new_database ./dump/old_database
# 使用旧的数据库
use old_database
# 删除旧的数据库
db.dropDatabase()
```

##### 参考:

[Rename Mongodb Database](https://devops.profitbricks.com/tutorials/rename-mongodb-database/)

