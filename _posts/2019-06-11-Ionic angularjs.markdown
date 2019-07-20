---
layout: post
title: ionic v1 和 Angular1
tags: [ionic]
---
## ionic ## 
1. scroll

```
<!-- HTML -->
<ion-scroll>
  <ul class="list">
    <li class="item item-toggle" ng-repeat="item in state.scrollItems track by $index" item='item'>
    </li>
  </ul>
 
  //1.将loading部分放在scroll里面    2.distance越大，越早触发
  <div class="" ng-if="scrollBottom">
    <ion-infinite-scroll  on-infinite="loadMore()" distance="50%" immediate-check="false"></ion-infinite-scroll>
  </div>
</ion-scroll>
<!-- JS -->
通过广播来结束加载，也可以监听stateChangeSuccess事件。
$scope.$broadcast('scroll.infiniteScrollComplete')
```
2. list:collection-repeat比ng-repeat有更好的性能。但前者只能接受数组。
3. 弹出层有：

> Popup：不可改模板，可选类型
Popover：自定义模板
Modal：自定义模板，并在触发和隐藏、销毁时分别广播事件

4. 路由传参：
```
定义: state里
传参：1.ui-sref="to({ argName: argValue })"   2.state.go(to, params, options)
接收：注册$stateParams并接收
```

## AngularJS ##
1.formControl : target.$error.Attribute
2.filter: 不同的对应不同的数据类型，不匹配时报错．
```
filter对应数组，返回的也是数组．
成员可以是字符串或者对象．
comparator控制是否完全匹配．
{{ filter_expression | filter : expression : comparator : anyPropertyKey}}
```

4. 模板语法
- 插值表达式：可以把计算后的字符串插入到 HTML 元素标签内的文本或对标签的属性进行赋值。Angular 对所有双花括号中的表达式求值，把求值的结果转换成字符串，并把它们跟相邻的字符串字面量连接起来。最后，把这个组合出来的插值结果赋给元素或指令的属性。
- 绑定：除了插值，还可以属性绑定
```
<!-- 单向从数据源到视图 -->
{{expression}}: <img src="{{heroImageUrl}}">
[target]="expression": <img [src]="heroImageUrl">

<!-- 从视图到数据源的单向绑定 -->
(target)="statement"

<!-- 双向 -->
[(target)]="expression"
ng-model

```
当数据类型不是字符串时，就必须使用属性绑定；（当指令需要的数据类型不是字符串时，也不能用插值，因为插值返回的是字符串）（[ngif], *ngif）

5. 表单验证：form实际上是一个directive，会创建子scope。
- ng-pattern:"/^(expression)$/" 。不要使用/g。
- 完整示例 ，注意三点：1. ng-model直接使用变量若获取不到（子scope），使用obj ；2. ng-model-option可按需配置；3.加入ng-pattern验证后，不通过的情况下对应的ng-model值为undefined。 
```
<!-- 方案1：blur时检测和提示，则提交按钮不好处理(myForm.$valid的处理) -->
<!-- 方案2：输入即检测。 -->
<!-- 方案3：提交时检测。新增变量控制提示文字的ng-show。 -->
    <form name="myForm">
        <input type="text" name="testInput" ng-pattern="testReg" ng-model="test.mocccck" ng-model-options="{updateOn: 'blur'}" required>
        <span ng-show="myForm.testInput.$invalid">验证不通过</span>
        <button ng-click="submitTest(myForm.$valid)" name="testBtn" style="width: 100px;height:100px;">{{myForm.testInput.$valid}}</button>
    </form>

```

6. 生命周期：onEnter 和 onExit。onViewLoading等事件适用于ng-route，不适用ui-route。
7. cache: 当前状态的缓存，当刷新或初始化等时就丢失。我将其分为$http内和外两种。
```
//普通使用：注入$cacheFactory，有get、put等方法。
(function () {
    angular.module("Demo", [])
    .controller("testCtrl", ["$cacheFactory",testCtrl]);
    function testCtrl($cacheFactory) {
       var myCache = $cacheFactory("my-cache");
       myCache.put("cache", "This is cache-content");
       myCache.put("another-cache", "This is another cache-content");
       var getCache = myCache.get("cache"); //This is cache-content
       var getInfo = myCache.info();//{id: "my-cache", size: 2}
       myCache.remove("another-cache");
       getInfo = myCache.info();//{id: "my-cache", size: 1}
       myCache.removeAll();
       getInfo = myCache.info();//{id: "my-cache", size: 0}
       myCache.destroy();
       getInfo = myCache.info();//{size: 0}
    };
  }());

  //$http使用: 仅GET和JSONP会触发；当配置了cache时，对于相同的URL（拼接参数之后的），不再发出请求，而是使用缓存的值并返回。
  
```
### Directive ###:
```
.directive('test',function ($interval, $filter,$log) {
  return {
    restrict : 'EA',
    scope: true,
    replace : false,
    template : '<div ng-class="{hasTime : time}">{{time}}</div>',
    link: function (scope,ele,attrs) {
      function updateTime() {
        ele.text($filter('date')(new Date(), scope.myFormat));
      }
      updateTime();
      $interval(function() {
        updateTime();
      }, 1000);
    }
  }
})

```
-replace: 是否替换父级
-require: 引入其他指令的controller。
```
? - 不要抛出异常。这使这个依赖变为一个可选项。
^ - 允许查找父元素的controller
``` 
-scope: 作用域
```
true: 创建独立子作用域。父级影响子级，子级不影响父级。
false: 不。影响，影响。
{xx: '=TTT'}： 单独控制。父子互不影响。只有该对象里定义的会传入。
其中，有3种模式。
@：单向引用父域的值，传递的值必须是字符串且在指令里引用时必须加上{{}}；
=：双向绑定子域和父域；
&：单向绑定父域，以便在其中运行函数。
```
-compile : 编译DOM。此时link还没有将scope和DOM连接起来。
-link: 操作DOM。有require时有第四个参数。
```
// require 'meController'
link: function(scope, element, attrs, meController){
   //在这里操作DOM， 可以访问requires指定的控制器
}

attrs.$observe : 只在link的attrs里发挥作用，检测带有插值标记{{}}的属性值。不带标记的就是初始值，不会变。
attrs.$observe('class',function (currentValue) {
                  console.log(currentValue);
              })
```
compile与link的区别
>函数的作用是对指令的模板进行转换；
>link的作用是在模型和视图之间建立关联，包括在元素上注册事件监听；
>compile阶段操作scope会报错
>对于同一个指令的多个实例，compile会执行一次；而link对于指令的每个实例都会执行一次；
一般情况下我们只要编写link函数就够了
>请注意，如果你编写了compile函数，自定义的link函数无效，因为 compile函数应该返回一个link函数供后续处理

-transclude:true, //为true时，允许把节点内原来的dom【原封不动】放入template中
```
 //<span ng-transclude></span> 原来的dom。你也可以改为div等，但写在里面的东西都会被清空，被原dom替代。
template:'<div>Hello <span ng-transclude></span> world!</div>'
```
-priority：优先级。高的先执行，ng-repeat为1000。
-terminal: 终点。为true时，优先级小于本指令的优先级的directive都不再执行
-template, templateUrl

### Components ###
