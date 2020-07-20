import Mock from 'mockjs'
import homeApi from './home'

// 设置200-2000ms延时
Mock.setup({
  timeout: '200-2000'
})

// 首页相关的mock数据
// Mock.mock( rurl, rtype, function( options ) )
Mock.mock(/\/home\/getData/, 'get', homeApi.getHomeData)
