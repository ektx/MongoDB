选项说明:
```sh
mongod --option

--dbpath 指定数据文件目录
--port 指定端口号默认为27017
--fork 以守护进程的方式运行Mongodb,创建服务器进程
--logpath 日志输出路径
--config 指定配置文件
--help 或 help 查看其它配置说明
```

以下为例子:
```sh
# Start Mongodb as a daemon on port 28000
# use : mongod --config C:\data\mongodb.conf

# 端口 28000 连接时: mongo --port 28000
port = 28000

logpath = C:\data\log\mongodb.log
```