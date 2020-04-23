import request from '@/utils/request'

function getOrdersList(data) {
  return request.post('/boss/v2/order', data)
}

function postRefund(data) {
  return request.post('/boss/v2/refund', data)
}

function getRefundList({ pageNum, pageSize }) {
  return request.get('/boss/v2/refund/' + pageNum + '/' + pageSize)
}

export {
  getOrdersList,
  postRefund,
  getRefundList
}
