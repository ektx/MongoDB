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