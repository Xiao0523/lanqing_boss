import request from '@/utils/request'

function getPayCode({ amount }) {
  return request.get('/wx/pay/' + amount)
}

function getConfigList(data) {
  return request.get('/wx/pay/sign', data)
}

function getOpenId({ code }) {
  return request.get('/wx/pay/userInfo/' + code)
}

export {
  getPayCode,
  getConfigList,
  getOpenId
}
