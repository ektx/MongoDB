# Mongoose?

mongoose是node中对象建模工具,跟其它语言中的ORM类似.主要是方便我们对mongodb的数据操作.

**[官网](http://mongoosejs.com/)**

## 安装

```shell
npm i mongoose --save
# or
yarn add mongoose
```



## 数据库连接

#### 单个数据库使用

```javascript
// 1.在 node 中引用 
const mongoose = require('mongoose'); 

// 2.连接数据库
// 2.1 定义 mongoose 的 Promise,这里引用 js 原生 Promise
mongoose.Promise = global.Promise;
// 2.2 连接
mongoose.connect('mongodb://localhost/graphQLLogin', {
	useMongoClient: true
}).then(
	() => {
		console.log('OK')
	},
	err => {
		console.log(err)
	}
);
// 3.开启 mongoose debug 模式
mongoose.set('debug', true);
```

#### 多数据库使用

```javascript
// 引用 mongoose
const mongoose = require('mongoose')

// 1.连接
let usercenterServer = mongoose.createConnection('mongodb://localhost/iserver');
let iserverApp = mongoose.createConnection('mongodb://localhost/workman');

// 输出状态方法
function getDBStatus (dbs) {
	for (let i = 0,l=dbs.length; i < l; i++) {

		dbs[i].on('error', console.error.bind(console, `${dbs[i]}connection error:`));

		dbs[i].once('open', ()=>{
			console.log(`${dbs[i].name} Mongodb OK!`)
		})
	}
}

// 调用
getDBStatus([usercenterServer, iserverApp]);

```





## Update()

- 使用 `upsert`  
```js
Schemas.model.update(
	{"name": "zwl"}, 
	{"name": "king" },
	{upsert : true},
	callback()
)
```


## 参考

[Mongoose 官网](http://mongoosejs.com/)

[用 Mongoose 轻松开发 Node.js + MongoDB 应用](http://sstruct.github.io/2016/05/15/%E8%AF%91-%E7%94%A8-Mongoose-%E8%BD%BB%E6%9D%BE%E5%BC%80%E5%8F%91-Node-js-MongoDB-%E5%BA%94%E7%94%A8/)

[promises](http://mongoosejs.com/docs/promises.html)



