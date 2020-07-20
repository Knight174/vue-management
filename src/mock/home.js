import Mock from 'mockjs'

export default {
  // 回调函数，获取home数据
  getHomeData: () => {
    return {
      code: 200,
      data: {
        videoData: [
          {
            name: 'SpringBoot',
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: 'Vue',
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: '小程序',
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: 'Es6',
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: 'Java',
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: 'Js',
            value: Mock.Random.float(1000, 10000, 0, 2)
          }
        ]
      }
    }
  }
}
