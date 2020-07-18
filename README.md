后台管理系统

# 一、eslint 设置

## 1. 配置之前

> 首选项 > 设置 > 扩展 > ESLint > 在 settings.json 中编辑

添加以下配置：

```json
// settings.json
{
  // 保存后自动修复格式
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  // 添加vue支持
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue"
  ]
}
```

注意：autoFix 是默认为 true 的，所以不要在 eslint.validate 写对象形式！

https://stackoverflow.com/questions/61316272/auto-fix-is-enabled-by-default-use-the-single-string-form



## 2. 配置新规则

在`.eslintrc`中覆盖 prettier 规则，防止冲突。

```js
// .eslintrc
module.exports = {
  // ...
  rules: {
		// ...
    'prettier/prettier': [ // 这里添加一条规则
      'error',
      {
        semi: false, // 不使用分号
        singleQuote: true, // 全部使用单引号
        printWidth: 120 // 标签太长时换行
      }
    ]
  }
}
```

使用新规则格式化所有文件：`npm run lint`

------

# 二、创建 scss 全局变量

```scss
// src>assets>scss>_variable.scss ( 下划线表示此文件为内部文件 )
$theme-color: #33aef0;
```

```scss
// src>assets>scss>reset.scss （初始化样式）
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
a, a:hover{
  color: inherit;
  text-decoration: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
html, body {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  font-family: 'PingFangSC-Light', 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', 'Arial', 'sans-serif';
}

// 公共样式
.fl{
  float: left;
}
.fr{
  float: right;
	.button-group-item{
		padding-left: 3px;
	}
}
//清除浮动
.clearfix{
  zoom:1;
  &:after{
    display:block;
    clear:both;
    content:"";
    visibility: hidden;
    height:0;
  }
}
```

```js
// vue.config.js
module.exports = {
  devServer: {
    port: 9000,
    open: true
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/_variable.scss";` // 每个样式文件前面都会添加这句话
      }
    }
  }
}

// main.js
import '@/assets/scss/reset.scss'
```

------

# 三、布局

项目中的 Header、Aside、Content 部分是固定的。

![image-20200717171020326](C:\Users\42530\AppData\Roaming\Typora\typora-user-images\image-20200717171020326.png)

```html
<el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
  </el-container>
</el-container>
```



## 1. 撑开全屏幕（***）

如果想要 el-container 撑开全屏，那么就必须要让 div#app 高度100%，body 高度 100%，html 高度 100%。

有一种简单的方法实现：

```html
// App.vue
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
#app {
  height: 100vh; // 撑开高度
}
</style>
```



## 2. 侧边栏高度撑开

```scss
// CommonAside.vue
.el-menu {
  height: 100%;
}
```

------

# 四、侧边栏

![image-20200717185029430](C:\Users\42530\AppData\Roaming\Typora\typora-user-images\image-20200717185029430.png)

## 1. 结构层

```html
<!-- 侧边栏最外层 -->
<el-menu
  default-active="2"
  class="el-menu-vertical-demo"
  background-color="#545c64" 
  text-color="#fff"
  active-text-color="#ffd04b"
>
  <!-- 一级循环 -->
  <el-menu-item :index="item.path" v-for="item of noChildren" :key="item.path">
    <!-- 图标 -->
    <i :class="'el-icon-' + item.icon"></i>
    <!-- 标题 -->
    <span slot="title">{{ item.label }}</span>
  </el-menu-item>
  <!-- 二级循环 -->
  <el-submenu index="" v-for="(item, index) of hasChildren" :key="index">
    <!-- 标题 -->
    <template slot="title">
      <i class="el-icon-location"></i>
      <span>{{ item.label }}</span>
    </template>
    <el-menu-item-group>
      <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) of item.children" :key="subIndex">
        <i :class="'el-icon-' + subItem.icon"></i>
        <span slot="title">{{ subItem.label }}</span>
      </el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</el-menu>
```

**注意：**如果激活 router ，那么就以参数 index 作为路由跳转的目标。（以上`el-menu`暂未加入 router）

Menu Attribute：https://element.eleme.cn/2.13/#/zh-CN/component/menu#menu-attribute



## 2. 逻辑层

```js
export default {
  name: 'commonAside',
  data() {
    return {
      asideMenu: [
        {
          path: '/',
          label: '首页',
          icon: 's-home'
        },
        {
          path: '/video',
          label: '视频管理',
          icon: 'video-play'
        },
        {
          path: '/user',
          label: '用户管理',
          icon: 'user'
        },
        {
          label: '其他',
          icon: 'user',
          children: [
            {
              path: '/page1',
              label: '页面1',
              icon: 'setting'
            },
            {
              path: '/page2',
              label: '页面2',
              icon: 'setting'
            }
          ]
        }
      ]
    }
  },
  computed: {
    noChildren() {
      return this.asideMenu.filter(item => !item.children)
    },
    hasChildren() {
      return this.asideMenu.filter(item => item.children)
    }
  }
}
```

首页、视频管理、用户管理为单一菜单，其他为多级菜单。

通过数组的 **filter 方法** 来筛选单一菜单（noChildren）和多级菜单（hasChildren）。

然后在视图中遍历数组。

asideMenu 数据下的对象中参数：path 表示路由路径（赋值给 index ）、label 表示当前菜单的名称（标题）、icon 表示当前菜单的图标样式（标题前的小图标）。



## 3. 样式层

```scss
.el-menu {
  height: 100%; // 撑开侧边栏
  border: none; // 去掉右边默认的1像素
}
```

------

# 五、顶部栏与侧边栏联动数据

## 1. 结构层

```html
<!-- common-header -->
<header>
  <!-- 左侧部分 -->
  <div class="left-content">
    <!-- 合并按钮 -->
    <el-button type="primary" icon="el-icon-menu" size="mini"></el-button>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="current.path">
        <router-link :to="current.path">{{ current.label }}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <!-- 右侧部分 -->
  <div class="right-content">
    <el-dropdown trigger="click" szie="mini">
      <!-- 用户头像 -->
      <span class="el-dropdown-link">
        <img :src="avatar" alt="用户头像" class="user" />
      </span>
      <!-- 下拉菜单 -->
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
        <el-dropdown-item icon="el-icon-switch-button">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</header>
```

分为左右两个部分：左边部分包含一个合并按钮，以后点击它可以让侧边栏消失。

在它的旁边是一个面包屑：`el-breadcrumb`

右边部分是一个用户头像，点击这个头像会出现下拉菜单。

```html
<!-- common-aside 添加了一个 @click="clickMenu(item)" 第11行代码 -->
<!-- 侧边栏最外层 -->
<el-menu
	default-active="2"
	class="el-menu-vertical-demo"
	background-color="#545c64"
	text-color="#fff"
	active-text-color="#ffd04b"
>
  <!-- 一级循环 -->
  <el-menu-item :index="item.path" v-for="item of noChildren" :key="item.path" @click="clickMenu(item)">
    <!-- 图标 -->
    <i :class="'el-icon-' + item.icon"></i>
    <!-- 标题 -->
    <span slot="title">{{ item.label }}</span>
  </el-menu-item>
  <!-- 二级循环 -->
  <el-submenu index="" v-for="(item, index) of hasChildren" :key="index">
    <!-- 标题 -->
    <template slot="title">
      <i class="el-icon-location"></i>
      <span>{{ item.label }}</span>
    </template>
    <el-menu-item-group>
      <el-menu-item
      	:index="subItem.path"
      	v-for="(subItem, subIndex) of item.children"
     		:key="subIndex"
      	@click="clickMenu(subItem)"
      >
        <i :class="'el-icon-' + subItem.icon"></i>
        <span slot="title">{{ subItem.label }}</span>
      </el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</el-menu>
```





## 2. 逻辑层

现在要让 aside 侧边栏菜单和 header 中的面包屑联动起来，点击 aside 菜单时，header 面包屑同步发生变化。

考虑到，header 和 aside 是两个不同的组件，所以他们之间的数据就可以用 vuex 来传递。

**原理：**

(1) 更新数据：通过触发`common-aside`组件的点击事件，提交 vuex 中的方法，这个又接收了点击事件传递的数据，因此 state 得到了更新。

(2) 使用数据：另一方面，`common-header`组件可以通过辅助函数 mapState，来使用公有数据，然后将数据展现在视图上。

![image-20200718121920602](C:\Users\42530\AppData\Roaming\Typora\typora-user-images\image-20200718121920602.png)

* 仓库数据

```js
// store>tab.js
export default {
  state: {
    menu: [],
    currentMenu: {},
    tabsList: []
  },
  mutations: {
    selectMenu(state, val) {
      state.currentMenu = val.name !== 'home' ? val : {}
    }
  actions: {}
}
```

* common-aside 组件

```js
// common-aside.js
export default {
  name: 'commonAside',
  data() {
    return {
      asideMenu: [ // 添加了name
        {
          path: '/',
          label: '首页',
          name: 'home',
          icon: 's-home'
        },
        {
          path: '/video',
          label: '视频管理',
          name: 'video',
          icon: 'video-play'
        },
        {
          path: '/user',
          label: '用户管理',
          name: 'user',
          icon: 's-custom'
        },
        {
          label: '其他',
          name: 'others',
          icon: 'user',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting'
            }
          ]
        }
      ]
    }
  },
  computed: {
    noChildren() {
      return this.asideMenu.filter(item => !item.children)
    },
    hasChildren() {
      return this.asideMenu.filter(item => item.children)
    }
  },
  methods: {
    // 当触发点击事件时，触发store中的selectMenu方法，并传递参数
    clickMenu(item) {
      this.$store.commit('selectMenu', item)
    }
  }
}
```

* common-header 组件

```js
// common-header.js
import { mapState } from 'vuex'
export default {
  name: 'commonHeader',
  data() {
    return {
      avatar: require('../assets/images/user-avatar2.jpg')
    }
  },
  computed: {
    ...mapState({ // 接收仓库的公有数据，赋值给current （该数据是个对象）
      current: state => state.tab.currentMenu // 注意这里不同模块的写法！
    })
  }
}
```

借助 vuex 这个**中转站**就可以实现数据在不同组件间的通信。



## 3. 样式层

```js
// common-aside样式
.el-menu {
  height: 100%;
  border: none; // 将默认的 border 消除
}
```

```html
<!-- 
	common-header样式
	justify-content: space-between; 实现两边布局
	header 高度要 100%，不然它的高度由 btn 决定
	想要修改 elment 的默认样式遇到冲突时，重新开一个 <style lang="scss"> 标签
-->

<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between; // 两边布局
  .left-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 1.25rem;
    }
  }
  .right-content {
    .user {
      width: 2.5rem;
      border-radius: 50%;
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

<style lang="scss">
.el-breadcrumb__inner,
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  color: #fff;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  font-weight: 400;
  color: #eee;
  cursor: text;
}
</style>
```

------

# 六、Tab 页切换

![image-20200718161817544](C:\Users\42530\AppData\Roaming\Typora\typora-user-images\image-20200718161817544.png)

在 content 区域，加入一排 tag。点击左侧 aside 时， 将数据传递给 vuex 中的 tabsList，在`common-tab`组件中使用这个公共数据。

![image-20200718162606333](C:\Users\42530\AppData\Roaming\Typora\typora-user-images\image-20200718162606333.png)

## 1. 结构层

* Main.vue

```html
<!-- 添加common-tab 组件 -->
<el-container style="height:100%">
  <el-aside width="200px">
    <common-aside></common-aside>
  </el-aside>
  <el-container>
    <el-header>
      <common-header></common-header>
    </el-header>
    <common-tab></common-tab>
    <el-main>Main</el-main>
  </el-container>
</el-container>
```

* common-tab

```html
<div class="tabs">
  <el-tag
  	v-for="(tag, index) in tags"
    :key="index"
    :closable="tag.name !== 'home'"
    :disable-transitions="false"
    @close="close(tag)"
	>
    {{ tag.label }}
  </el-tag>
</div>
```

**注意：@close 是 element-ui 提供的一个事件！**

`:closable="tag.name !== 'home'"`用来判断是否是home数据，如果是那么就不可以删除它。



## 2. 逻辑层

```js
// store>tab.js
export default {
  state: {
    menu: [],
    currentMenu: {},
    tabsList: [
      {
        path: '/',
        label: '首页',
        name: 'home',
        icon: 's-home'
      }
    ]
  },
  mutations: {
    selectMenu(state, val) {
      if (val.name !== 'home') {
        state.currentMenu = val
        // 将数据更新到tabsList
        state.tabsList.push(val)
        state.tabsList = Array.from(new Set(state.tabsList)) // 添加进数组后，进行数组去重
      } else {
        state.currentMenu = {}
      }
      // state.currentMenu = val.name !== 'home' ? val : {}
    },
    closeTab(state, val) {
      // 通过数组的findIndex方法找到出现的第一个需要的数据，
      // 这个需要的数据是：判断tabsList中的数组项的name和传递过来数据的name是否相同，
      // 相同时证明找到了对应数据的index，把它返回给resIndex
      // let resIndex = state.tabsList.findIndex(item => item.name === val.name)
      
      // 简单方法 indexOf()
      let resIndex = state.tabsList.indexOf(val)
      // 删除这个位置的数据
      state.tabsList.splice(resIndex, 1)
    }
  },
  actions: {}
}
```

(1) 首页处理：让 tabsList 列表一开始就有关于首页的数据，这样每次打开网页就能看到首页 tag。

(2) 获取数据：点击 aside 区域传递数据，然后放入 tabsList 中。为了避免多次点击，重复加入数据，要用到**数组去重**。

```js
state.tabsList.push(val)
state.tabsList = Array.from(new Set(state.tabsList)) // 添加进数组后，进行数组去重
```

(3) 删除 tag：找到对应数据的索引，然后用 splice() 方法删除之。

```js
let resIndex = state.tabsList.indexOf(val)
state.tabsList.splice(resIndex, 1)
```

------

# 七、页面互联

点击侧边栏菜单或者 tag 实现路由的跳转，显示页面。

## 1. 路由规则配置

```js
// src
| views
|	|--- Home
|		|--- Home.vue
|	|--- VideoManagement
|		|--- VideoManagement.vue
|	|--- User
|		|--- UserManagement.vue
|	|--- Others
|		|--- PageOne.vue
|		|--- PageTwo.vue
```

```js
// router/index.js
const routes = [
  {
    path: '/',
    component: () => import('@/views/Main'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home/Home')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/VideoManagement/VideoManagement')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/UserManagement/UserManagement')
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('@/views/Others/PageOne')
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('@/views/Others/PageTwo')
      }
    ]
  }
]
```

```html
<!-- Main.vue -->
<el-container style="height:100%">
  <el-aside width="auto">
    <common-aside></common-aside>
  </el-aside>
  <el-container>
    <el-header>
      <common-header></common-header>
    </el-header>
    <common-tab></common-tab>
    <el-main>
      <!-- 一个嵌套路由，负责内容展示 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
```



## 2. 页面跳转

使用编程式导航：`this.$router.push({...})`

```js
// common-aside.vue 侧边栏的跳转
methods: {
  clickMenu(item) {
    this.$router.push({
      name: item.name
    })
    this.$store.commit('selectMenu', item)
  }
}

// common-tab.vue tag栏的跳转
 methods: {
   // ...
   changeMenu(item) {
     this.$store.commit('selectMenu', item)
     this.$router.push({
       name: item.name
     })
   }
 }
```



## 3. 样式优化

(1) 当前页面的 tag 显示深色样式

![image-20200718191105646](C:\Users\42530\AppData\Roaming\Typora\typora-user-images\image-20200718191105646.png)

给`el-tag` 添加属性：

```js
:effect="$route.name === tag.name ? 'dark' : 'plain'"
```

**$route.name**表示当前路由的 name 选项。



(2) 点击 header 部分的合并按钮实现折叠

![image-20200718191151995](C:\Users\42530\AppData\Roaming\Typora\typora-user-images\image-20200718191151995.png)

![image-20200718191218210](C:\Users\42530\AppData\Roaming\Typora\typora-user-images\image-20200718191218210.png)



给`el-menu`添加 collapse 属性，通过布尔值控制是否折叠。

https://element.eleme.cn/2.13/#/zh-CN/component/menu#menu-attribute

```js
// store/index.js
export default {
  state: {
    isCollapse: false, // 控制折叠
    menu: [],
    currentMenu: {},
    tabsList: [
      {
        path: '/',
        label: '首页',
        name: 'home',
        icon: 's-home'
      }
    ]
  },
  mutations: {
    selectMenu(state, val) {
      if (val.name !== 'home') {
        state.currentMenu = val
        // 将数据更新到tabsList
        state.tabsList.push(val)
        state.tabsList = Array.from(new Set(state.tabsList)) // 添加进数组后，进行数组去重
      } else {
        state.currentMenu = {}
      }
      // state.currentMenu = val.name !== 'home' ? val : {}
    },
    closeTab(state, val) {
      // 通过数组的findIndex方法找到出现的第一个需要的数据，
      // 这个需要的数据是：判断tabsList中的数组项的name和传递过来数据的name是否相同，
      // 相同时证明找到了对应数据的index，把它返回给resIndex
      // let resIndex = state.tabsList.findIndex(item => item.name === val.name)
      // 简单方法 indexOf()
      let resIndex = state.tabsList.indexOf(val)
      // 删除这个位置的数据
      state.tabsList.splice(resIndex, 1)
    },
    // 控制折叠的布尔值
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
}
```

将数据传到 header 组件，点击该组件上的**合并按钮**改变公有数据中的 isCollapse 值，然后绑定到 aside 组件的 `el-menu` 上，响应它的变化。

* common-header

```html
<!-- common-header 第6行 -->
<el-button type="primary" icon="el-icon-menu" size="mini" @click="collapseMenu"></el-button>
```

```js
methods: {
  collapseMenu() {
    this.$store.commit('collapseMenu')
  }
}
```

* common-aside

```html
<!-- 第二行绑定属性collapse -->
<el-menu
  :collapse="isCollapse"
  class="el-menu-vertical-demo"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b"
>
```

```js
computed: {
  noChildren() {
    return this.asideMenu.filter(item => !item.children)
  },
  hasChildren() {
    return this.asideMenu.filter(item => item.children)
  },
  isCollapse() { // 计算公有数据isCollapse
    return this.$store.state.tab.isCollapse
  }
}
```

------

