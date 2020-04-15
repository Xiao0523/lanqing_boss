import request from '@/utils/request'

function getInfoList(data) {
  return request.post('/boss/v2/rongCloud/userInfo', data)
}

export {
  getInfoList
}
