---
layout: post
title: 前段环境搭建，不断学习
tags: [package.json,babel,webpack]
---

- # **package.json:** #
定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。
安装模块步骤：

		npm install <module>--将模块信息（连同版本号）手动添加到package.json中的依赖里（dependencies/devdependencies）。
		在第一步install时：
		npm install  -save <module> 自动把模块和版本号添加到 dependencies 部分；
		npm install --save-dve <module> 自动把模块和版本号添加到 devdependencies 部分。即，自动完成第二步。
		只执行npm install命令，就会依据package.json中dependencies/devdependencies的内容，自动下载所需的模块。


- # **babel** ：
1. 项目根目录下`npm install --save-dev babel-cli`;
1. package.json中添加`scripts`：
```
{
  // ...
  "devDependencies": {
    "babel-cli": "^6.0.0"
  },
  "scripts": {
    "build": "babel src -d lib"  //1.执行babel时，package.json中的script会按照一定顺序寻找命令对应位置，本地的node_modules/.bin路径就在这个寻找清单中；2.后面的意思是将src的内容babel转译至lib文件夹内。所以上一步要在跟目录下install，这样写路径比较方便。
  },
}
```
然后执行的不是babel，而是刚定义的build：`npm run build`



　使用babel：安装各种插件如es2015，然后在与上面一致的根目录下创建`.babelrc`文件，文件内容如下：

```
{
  "presets": [],
  "plugins": []
}
```

　这是babel的配置文件，里面的内容决定了Babel转译时的规则。


- # **Webpack** ：
　Webpack和Webpack-cli现在都需要全局+本地都安装才能用。

　用7.X以上版本时，最好保持版本一致，不然各种奇怪的bug。

  一个可用的配置在<a href='https://github.com/greatbear412/Lottery-ES6'>这里</a>。