---
layout: post
title: 移动端学习记录
tags: [gulp,BrowserSync]
---
## Iconfont ##
 线上：@font-face（里面地址用线上地址）+css里面对.iconfont进行个性化重定制
 
线下：@font-face（线下地址）+css里面对.iconfont进行个性化重定制

## Bugs ##
1. fixed宽度超出父元素100%：因为fixed宽度是按照屏幕宽度计算，所以会出现这种问题，解决方式1：js；2：父元素加上transform的任意属性，如  transform: scale3d(1,1,1);

原因： transform是把fixed降级成absolute处理，无论是IE9+，还是Chrome还是FireFox浏览器，所有绝对定位图片100%宽度，都是相对设置了transform的容器计算了，所以宽度能自适应(对于子元素absolute，父元素没有transform时，子元素相对于第一个非static的父元素进行定位)。此时虽然定宽问题解决了，定位问题又出现了。因为内部的所有fixed都会被降级，变成相对于父元素定位了，所以需要相对于屏幕定位的元素，应该移出此时的父元素了。

