---
layout: post
title: Github Page+Jekyll搭建个人主页和项目主页
tags: [Github Page, Jekyll]
---

###  文件夹释义  ###


**pages**:各分页，如右上角；   
  **includes**:可以给pages、index等重用的页面，就像小模块（head、footer等）；  
**layouts**:页面样式模版；  
**posts和drafts**:完成稿和草稿；   
**site**:Jekyll 完成转换后就会将生成的页面放在这里（默认），修改这里的页面是无用功的，修改上面第1和第2个；   
所以页面加载的顺序：根目录index→layouts→include/page，这里就要关注各页面的加载语句了：
```
layout: default
```
```
% include footer.html %
``` 
(加载include文件夹的footer.html)

---
搭建个人主页时，Devkit貌似最多支持到Ruby的2.3.X版本，否则安装Jekyll时总提示错误:

    
```
Failed to build gem native extension
```
---
搭建项目主页时，就要先回到github.com，在项目repo新建分支gh-pages即可，本地remote到这个分至再上传文件，和个人主页就差不多了，最差得有个index.html吧

之后有空再倒腾。（GFM还需要多多研究下）

  

