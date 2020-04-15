import request from '@/utils/request'

function getHomeData(data) {
  return request.get('/boss/v2/desktop/mainInfo', data)
}

function getStudentList(data) {
  return request.post('/boss/v2/desktop/mysteryStudent', data)
}

function getCommonDetail(data) {
  return request.post('/boss/v2/desktop/evaluate', data)
}

function getOrderList() {
  return request.get('/boss/v2/desktop/newOrder')
}

function getRefund(data) {
  return request.post('/boss/v2/desktop/refund', data)
}

export {
  getHomeData,
  getStudentList,
  getCommonDetail,
  getOrderList,
  getRefund
}
