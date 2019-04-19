---
layout: post
title: Vue大型项目学习记录
tags: [Vue,插件按需,模拟接口]
---
## 学习-Vue ##
1. 组件的引入：```babel-plugin-import```。按需引入，不必引入组件的全部，节约打包大小和时间。配置babelrc:
```  
    "plugins": [
    "transform-vue-jsx",
    "transform-runtime",
    ["import",{"libraryName":"vant","style":true}]
  ]
```
   全局引入：```Vue.use()```; 单页引入：```component:{}```。
2. js引入图片要用require。
3. 父子组件传值：```Props```
4. ```wathch```:直接监视;第一次传默认值时也相应(immediate);深度监视对象(deep)。
5. 类似Toast等不需要在注册，不会在html里出现的，在需要使用的页面上引用即可，不需要在Main.js里引入注册
6. **await就要接catch**
7. 存储：```localStorage```存储时只接收字符串，所以保存前先转化为字符串，取数据后再转换回来
```        
//存储
localStorage.userInfo=JSON.stringify({userName:this.userName})
//取数据
if (localStorage.userInfo) {
  let storage = window.localStorage;
  let userInfo = JSON.parse(storage.getItem('userInfo'));
  console.log(userInfo.userName);
}
//删除全部
storage.clear()
//删除特定
storage.removeItem("userInfo");
```
8. 路由传参：
```
//1.传--router 2.path-query或者name-params
this.$router.push({path:'地址',query:{goodsId:this.goodsId}})
this.$router.push({name:'地址',params:{goodsId:this.goodsId}})
//接--route,没有r
this.$route.query.goodsId
this.$route.params.goodsId
```
9. 动态绑定class:
```
//当index（该条的index） == chooseLeftItemIndex （变量）时，为这个li添加chosenLeftItem的class
<li v-for="(item,index) in category" :key="index" @click='chooseLeftItem(index)' :class='{chosenLeftItem:chooseLeftItemIndex==index}'>
//点击哪个就将该条的index赋给this.chooseLeftItemIndex
methods: {
  chooseLeftItem(index){
    this.chooseLeftItemIndex = index
  }
}
```
10. 替补图片：
```
//定义
data(){
  return {
    errorImg:'this.src="' + require('@/assets/images/errorimg.png') + '"'
  }
}
//使用
<img :src="item.IMAGE1" width="100%" :onerror="errorImg"/>
```
11. 下拉刷新和上拉加载key code：
```
target.style.transform = 'translateY(50px)'
target.style.transition = "all ease 0.5s";
```
12. 组件缓存：
1. 直接缓存
```
<keep-alive>
  <component>
    <!-- 该组件将被缓存！ -->
  </component>
</keep-alive>
```
2. A页面不缓存，B缓存，或者C跳A缓存，B跳A不缓存等等等等: 1.利用meta; 2.做两个<router-view>
```
//meta中属性不同，显示的router-view不同
<keep-alive>
  <router-view v-if="$route.meta.keepAlive"/>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"/>

//定义需要的router-view
{
  path: '/',
  name: 'index',
  component: index,
  meta: {
    keepAlive: true // 需要被缓存
  }
},
{
  path: '/member',
  name: 'member',
  component: member,
  meta: {
    keepAlive: false // 不需要被缓存
  }
}

//定义不同页面跳转时，目标页的router-view
beforeRouteLeave(to, from, next) {
     // 设置下一个路由的 meta
    to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
    next();
}
```
13. 操作DOM：用的多的话，就自定义指定，里面钩子函数的东西极为丰富；用的不多的话，用ref或者原生js
## 学习-VueX ##
1. 基础用法：
```
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 const state={   //要设置的全局访问的state对象
     showFooter: true,
     changableNum:0   //要设置的初始属性值
   };
const getters = {   //实时监听state值的变化(最新状态)        ---获取：this.$store.getters.isShow
    isShow(state) {  //承载变化的showFooter的值
       return state.showFooter
    }
};
const mutations = {
    show(state) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);    ---调用，同步：this.$store.commit('show')
        state.showFooter = true;
    }
};
 const actions = {
    showFooter(context) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性   ---调用，异步：this.$store.dispatch('hideFooter')
        context.commit('show');
    },
};
  const store = new Vuex.Store({
       state,
       getters,
       mutations,
       actions
});
export default store;
```

2.模块化：多个模块同时使用时，3个步骤要注意

 1. 模块的store.js里添加
  ```export default {
        namespaced: true, //用于在全局引用此文里的方法时标识这一个的文件名
        state,
        getters,
        mutations,
        actions
}```
 2. 组件使用时，引入map系列
 ```import {mapState,mapGetters,mapActions} from 'vuex'; ```
 3. 组件使用时，为区分使用的是**哪个模块**的state，有两种方法
 ```
//1.直接注明路径
this.$store.dispatch('footerStatus/showFooter')
//2.Map系列来引用
...mapState({  //这里的...是超引用，ES6的语法，意思是state里有多少属性值我可以在这里放多少属性值
         isShow:state=>state.footerStatus.showFooter //注意这些与上面的区别就是state.footerStatus,
                                                      //里面定义的showFooter是指模块文件footerStatus.js里state的showFooter
      })
      methods:{
      ...mapActions('collection',[ //collection是指modules文件夹下的collection.js
          'invokePushItems'  //collection.js文件中的actions里的方法，在上面的@click中调用invokePushItems执行并传入实参
      ])
  }```
## 学习-后端 ##
1. 理解：
> Schema：模板文件集合--写模板    
init.js:后台方法集合--加载模板的方法   
index.js:Koa启动页，在这里通过Koa，调用init.js的方法，等，链接数据库--调用加载模板的方法，使用这个模板加载数据


2. 对于模板来说
> Schema：写模板    
init.js:加载模板的方法   
index.js:调用加载模板的方法，使用这个模板加载数据
3. **加密与比对**
bcrypt加盐加密处理
```
const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型

const bcrypt = require('bcrypt')    //引入bcrypt
const SALT_WORK_FACTOR = 10    //加盐强度，一般为10

//创建我们的用户Schema
const userSchema = new Schema({
    UserId:ObjectId,
    userName:{unique:true,type:String},
    password:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
},{collection:'xxx'})   //自定义集合名（库-集合-文件的集合），默认不需要后面的collection
//加盐加密处理
//.pre:创建之前处理；next：内置参数。箭头函数会改变this，所以这里用old way
userSchema.pre('save',function(next){
  //先生成盐（强度，回调函数）
  bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
    if (err) {
      return next(err)
    }
    //加密（加密项，盐，回调）
    bcrypt.hash(this.password,salt,(err,hash)=>{
      if (err) {
        return next(err)
      }
      //赋值
      this.password = hash
      next()
    })
  })
})

//用Schema的methods方法， 创建自定义的实例方法：密码比对
userSchema.methods = {
  comparePassword:(_password,password)=>{
    //要返回Promise对象
    return new Promise((resolve,reject) =>{
      //bcrypt的比对方法
      bcrypt.compare(_password,password,(err,isMatch)=>{
          if(!err) resolve(isMatch)
          else reject(err)
      })
    })
  }
}

//(这样的实例方法，使用是要new一个对象才能使用)
//(        
    let newUser = new User()  //因为是实例方法，所以要new出对象，才能调用
    await newUser.comparePassword(password,result.password).then((isMatch) =>{
    })).catch()
//)
//发布模型
mongoose.model('User',userSchema)
```
## 轮子 ##
1. ```Vue Atom Snippet```：Atom插件。
2. ```Vue-awesome-swiper```轮播和滑动; 自定义拼装。
3. ```Easy-Mock```模拟接口;公共js引入:挂载到Vue.prototype.XXX。
4. ```glob```：node的glob模块允许你使用 * 等符号，来写一个glob规则，像在shell里一样，获取匹配对应规则文件。
5. ```resolve```：将一系列路径或路径段解析为绝对路径(包含在```Node-Path```里)。
6. ```bcrypt```:加密加盐处理

## 待学 ##
1. Typescript
2. 单元测试
