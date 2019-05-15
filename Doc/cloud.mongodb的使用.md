# cloud.mongodb的使用
[toc]

## 简介
mongoDB Cloud 是为用户提供免费的mongodb数据保存服务的云平台，在使用时有以下几个注意点

## node.js 中连接
在使用前，你需要添加访问地址的IP,只有在白名单的IP才可以访问数据库。
当前，如果你只是自己使用，你可以选择允许所有的IP

## 添加用户
有了IP之后，此时，你需要有用户，[点击这里](https://cloud.mongodb.com/v2/5b162c74c0c6e37074bc35e4#clusters/security/users) 可以创建你的用户，你也可以设置用户的权限.确认并保存。

## 添加到自己的应用
有了以上几个步骤，现在你就可以添加到你的项目中了。
点击你想到的数据库中的 **CONNECT** 按钮。

选择你要使用的连接方式。
如果是你自己的项目，你可以选择 **Connect Your Application** 

进入子选项后，先选择连接的类型，分别是告诉你你在使用的数据库版本。

选择好之后，会有一个地址，此时你要复制下来并按提示，修改下密码或用户就可以了。

如：
> mongodb+srv://zwl:<PASSWORD>@workman-1fuu2.mongodb.net/test?retryWrites=true

> 这里要注意的是，它默认给出的集合是 test ，如果你没有的话，你在连接完成后，本地的服务会自动关闭。<br/><br/>同时，有些情况下，你可能就算改对了集合还是有失败，这时，你可以把它默认给的 **retryWrites=true** 删除了

