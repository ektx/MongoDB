## Mongodb 导入导出JSON

### mongoimport 导入

mongodb内置了导入功能,我们可以轻松的导入`json`到文档中

以下示例导入一份`json`到`test`数据库的`navtest`文档中:

> `./mongoimport -d test -c navtest /usr…/nav2.json`

  ![import](img/import.png)

### mongoexport 导出

导出

> `./mongoexport -d zios -c osapps -o /Users/../data.json`

-d: 导出的数据库

-c: 导出的集合

-o: 导出的文件名



## mongo 导出查询结果

```shell
# 127.0.0.1 是你的mongod服务器地址,这里还可以用localhost替换127
# db 是你要使用的数据库
mongo 127.0.0.1/db --eval "var c = db.collection.find(); while(c.hasNext()) {printjson(c.next())}" >> test.txt

# 或
# 新建一个文件,比如 find.js,添加以下内容
var c = db.collection.find(); 
while(c.hasNext()) {
	printjson(c.next())
}
# 然后运行
mongo 127.0.0.1/db find.js >> test.txt

```

