1.`./mongo`
2.> use admin
3.> db.upgradeCheckAllDBs()
// => Everything is ready for the upgrade!!
4.关闭 `./mongod`服务,或是使用`db.shutdownServer()`来关闭
5.退出 `./mongo`
> exit

