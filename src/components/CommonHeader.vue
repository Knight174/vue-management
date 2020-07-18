<template>
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
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'commonHeader',
  data() {
    return {
      avatar: require('../assets/images/user-avatar2.jpg')
    }
  },
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between; // 两边布局
}
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
