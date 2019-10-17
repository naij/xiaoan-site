var Service = require('app/models/service')

Service.add([
  // 获取联网单位基本信息列表
  {
    name: 'getLwdwxxListForTp',
    url: '/tp/getLwdwxxListForTp',
    method: 'POST'
  },
  // 真实火警
  {
    name: 'get12MonthZshjForTp',
    url: '/tp/get12MonthZshjForTp',
    method: 'POST'
  },
  // 误报率
  {
    name: 'get12MonthWblForTp',
    url: '/tp/get12MonthWblForTp',
    method: 'POST'
  },
  // 故障率
  {
    name: 'get12MonthGzlForTp',
    url: '/tp/get12MonthGzlForTp',
    method: 'POST'
  },
  // 联网单位总数
  {
    name: 'getLwdwAndJcdCountForTp',
    url: '/tp/getLwdwAndJcdCountForTp',
    method: 'POST'
  },
  // 根据源地址、主机号、部件地址码获取消防设施部件信息
  {
    name: 'getXfssbjXxForTp',
    url: '/tp/getXfssbjXxForTp',
    method: 'POST'
  }
])

module.exports = Service
