import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局配置
import '@/assets/scss/reset.scss'
import 'element-ui/lib/theme-chalk/index.css'
import http from '@/api/config'
import './mock'

// 第三方包
import ElementUI from 'element-ui'

Vue.use(ElementUI)
// 将axios挂载到Vue实例上。
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
