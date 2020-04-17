import request from '@/utils/request'

function getPayCode({ amount }) {
  return request.get('/wx/pay/' + amount)
}

function getConfigList(data) {
  return request.get('/wx/pay/sign', data)
}

export {
  getPayCode,
  getConfigList
}
