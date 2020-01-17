import request from '@/utils/request'

function getOrdersList(data) {
  return request.post('boss/store/orders', data)
}

export {
  getOrdersList
}
