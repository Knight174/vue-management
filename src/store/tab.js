export default {
  state: {
    isCollapse: false,
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
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
}
