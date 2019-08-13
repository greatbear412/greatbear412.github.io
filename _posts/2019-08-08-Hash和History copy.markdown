---
layout: post
title: Hash和History：单页路由的两种模式
tags: [Hash, History]
---
### Window.Location ###

 - .href: 可修改url（刷新页面），可添加hash。历史记录增加1条新纪录
 - .hash: 为页面添加hash，历史记录增加1条新纪录

### Window.history ###

 - .pushState(): 修改url，增加1条历史记录。
 - .replaceState(): 修改url，替换1条历史记录。
 - .go()

### 监听 ###

 - hashchange 事件能监听除 history.pushState() 和 history.replaceState() 外 hash 的改变。
 - popstate 事件能监听除 history.pushState() 和 history.replaceState() 外 url 的变化。



