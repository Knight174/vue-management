<template>
  <!-- 侧边栏最外层 -->
  <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
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
</template>

<script>
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
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
}
</style>
