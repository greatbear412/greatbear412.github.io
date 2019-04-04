---
layout: post
title: 学习前段自动化
tags: [gulp,BrowserSync]
---
# **CSS** #
## BrowserSync ##
### 安装 BrowserSync ###
您可以选择从Node.js的包管理（NPM）库中 安装BrowserSync。打开一个终端窗口，运行以下命令：
```
npm install -g browser-sync
npm install –save-dev browser-sync
```
### 启动 BrowserSync ###
#### 静态网站 ####
如果您想要监听.css文件, 您需要使用服务器模式。 BrowserSync 将启动一个小型服务器，并提供一个URL来查看您的网站。

> // –files 路径是相对于运行该命令的项目（目录）

```
browser-sync start -–server –-files “css/*.css”
```
如果您需要监听多个类型的文件，您只需要用逗号隔开。例如我们再加入一个.html文件
```
browser-sync start --server --files "css/*.css, *.html"
```
如果你的文件层级比较深，您可以考虑使用 ""（表示任意目录）匹配，任意目录下任意.css 或 .html文件。
```
browser-sync start --server --files "**/*.css, **/*.html
```
注：在该文件下运行命令，默认需要启动网站文件：**index.html**。
#### 动态网站 ####
如果您已经有其他本地服务器环境PHP或类似的，您需要使用代理模式。 BrowserSync将通过代理URL(localhost:3000)来查看您的网站。
> // 主机名可以是ip或域名

```
browser-sync start --proxy "主机名" "css/*.css"
```
在本地创建了一个PHP服务器环境，并通过绑定Browsersync.cn来访问本地服务器，使用以下命令方式，Browsersync将提供一个新的地址localhost:3000来访问Browsersync.cn，并监听其css目录下的所有css文件。
```
browser-sync start --proxy "Browsersync.cn" "css/*.css"
```
参考博文：<a href="https://jeffjade.com/2015/11/25/2015-11-25-toss-gulp/">BrowserSync，迅捷从免F5开始。</a>

