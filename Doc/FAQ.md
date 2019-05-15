[toc]

# MongoError: E11000 duplicate key error index:
```shell
MongoError: E11000 duplicate key error index: workman.workType.$id_1 dup key: { : "zwl2_123" }
    at /Users/ZWL/Sites/WMServer/node_modules/mongodb-core/lib/connection/pool.js:598:61
    at authenticateStragglers (/Users/ZWL/Sites/WMServer/node_modules/mongodb-core/lib/connection/pool.js:516:16)
    at Connection.messageHandler (/Users/ZWL/Sites/WMServer/node_modules/mongodb-core/lib/connection/pool.js:552:5)
    at emitMessageHandler (/Users/ZWL/Sites/WMServer/node_modules/mongodb-core/lib/connection/connection.js:309:10)
    at Socket.<anonymous> (/Users/ZWL/Sites/WMServer/node_modules/mongodb-core/lib/connection/connection.js:452:17)
    at Socket.emit (events.js:182:13)
    at addChunk (_stream_readable.js:279:12)
    at readableAddChunk (_stream_readable.js:264:11)
    at Socket.Readable.push (_stream_readable.js:219:10)
    at TCP.onread (net.js:636:20)
```
出现这个的问题是,在你的 MongoDB 的 Schema 中规定的数据格式,在数据库中出现的错误内容.很可能是你在后期升级时,错误修改了此模块内容.

这个例子中是说 workman 数据库的 workType 文档中 id 出现了错误,我们查看数据发现,我们规定 id 如下
```js
_workType = new Schema({
    id: {
        type: String,
        require: true,
        unique: true // 唯一
    },
    account: String,
    name   : String,
    ctime: Date,
}, {collection: 'workType', versionKey: false})
```
而我们的数据却有很多相同的 id ,修改方法是
1. 如果你不想要这数据,直接删除就可以了
2. 如果数据想保留,去掉 唯一(unique) 的限制