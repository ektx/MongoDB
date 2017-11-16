## Mongodb 多数据库链接

```javascript
// 1.连接数据库
// 1.1 数据库 1
global.db_one = mongoose.createConnection('mongodb://localhost/db_one');
// 1.2 数据库 2
global.db_two = mongoose.createConnection('mongodb://localhost/db_two');

// 开启 debugger 模式
mongoose.set('debug', true);

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
getDBStatus([db_one, db_two]);
```

调用

```javascript
// 这里示范一下 db_one 的使用
const mongoose = require('mongoose')
mongoose.Promise = Promise;

const Schema = mongoose.Schema;

/*
	用户信息
	======================================
	@account: 帐号(不可修改)
	@name: 用户名
	@pwd: 密码
	@email: 邮箱
	@ico: 头像
	@power: 用户权限
	@reset: 找回密码Code

	文档: usrs
*/
const _usrs = new Schema({
	account: {
		type: String,
		require: true,
		unique: true
	},
	name   : String,
	pwd	   : String,
	email  : String,
	ico	   : String,
	power  : String,
	reset  : String
}, {collection: 'usrs', versionKey: false});

exports.usrs_m = db_one.model('usrs', _usrs);
```

