MongoDB 目前已经到了 4.0 的稳定版本,我们可以尝试如下对项目进行升级.

在升级前,我们先到了解下自己的版本,MongoDB是无法跨级升级的.比如我自己本地一开始用的是 3.2.9 

# 查看版本
在你启动你的服务时,会显示本地的版本
```shell
z-ios:bin ZWL$ ./mongod
2018-07-08T12:23:32.574+0800 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
2018-07-08T12:23:32.653+0800 I CONTROL  [initandlisten] MongoDB starting : pid=2202 port=27017 dbpath=/data/db 64-bit host=z-ios.com
2018-07-08T12:23:32.653+0800 I CONTROL  [initandlisten] db version v4.0.0
```

# 升级
升级要先升级到自己本地的下一个版本.

目前版本主要分支有:
- 3.0
- 3.2
- 3.4
- 3.6
- 4.0

因此,我们要升级到 4.0 要通过 3.4 3.6
## 下载 3.4 版本
先下载我们从 3.2 升级到的最近版本 3.4

```shell
# 然后进入到 mongodb-3.4/bin 目录下
cd ~/mongodb-3.4/bin

# 运行服务器
./mongod
```

## 升级
```sh
# 终端连接数据库
./mongo

# 查看当前的 mongodb 特性
> db.adminCommand( { getParameter: 1, featureCompatibilityVersion: 1 } )
{ "featureCompatibilityVersion" : "3.2", "ok" : 1 }

# 升级到 3.4
db.adminCommand( { setFeatureCompatibilityVersion: "3.4" } )

# 如果你直接设置 4.0 或 3.6,会报以下错误
> db.adminCommand( { setFeatureCompatibilityVersion: "4.0" } )
{
	"ok" : 0,
	"errmsg" : "Invalid command argument. Expected '3.4' or '3.2', found 4.0 in: { setFeatureCompatibilityVersion: \"4.0\" }. See http://dochub.mongodb.org/core/3.4-feature-compatibility.",
	"code" : 2,
	"codeName" : "BadValue"
}
```
其它的都是相同的方法,比较多,要有点耐心.

## 参考
https://docs.mongodb.com/manual/release-notes/4.0-upgrade-replica-set/