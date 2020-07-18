export default {
  state: {
    menu: [],
    currentMenu: {}
  },
  mutations: {
    selectMenu(state, val) {
      state.currentMenu = val.name !== 'home' ? val : {}
    }
  },
  actions: {}
}
