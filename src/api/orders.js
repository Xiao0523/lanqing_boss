import request from '@/utils/request'

function getOrdersList(data) {
  return request.post('/boss/v2/order', data)
}

function postRefund(data) {
  return request.post('/boss/v2/refund', data)
}

export {
  getOrdersList,
  postRefund
}
