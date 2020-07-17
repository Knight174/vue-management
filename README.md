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
        printWidth: 160 // 标签太长时换行
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
}
```

------



# 五、