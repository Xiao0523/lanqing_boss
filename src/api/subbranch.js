import request from '@/utils/request'

function getBusinessHome(data) {
  return request.get('boss/business/home', data)
}

export {
  getBusinessHome
}
