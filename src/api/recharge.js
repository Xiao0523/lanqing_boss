import request from '@/utils/request'

function getRechargeList({ pageNum, pageSize }) {
  return request.get('/boss/v2/scholarship/recharge/' + pageNum + '/' + pageSize)
}

function getConsumeList({ pageNum, pageSize }) {
  return request.get('/boss/v2/scholarship/consume/' + pageNum + '/' + pageSize)
}

function getHomeDate() {
  return request.get('/boss/v2/scholarship/mainInfo')
}

function getPayCode({ amount }) {
  return request.get('/boss/v2/property/wx/pay/' + amount)
}

function getConfigList(data) {
  return request.get('/boss/v2/property/pay/sign', data)
}

export {
  getRechargeList,
  getConsumeList,
  getHomeDate,
  getPayCode,
  getConfigList
}
