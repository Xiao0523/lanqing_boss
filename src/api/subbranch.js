import request from '@/utils/request'

function getBusinessHome(data) {
  return request.get('boss/business/home', data)
}

function addBusiness(data) {
  return request.post('boss/business/store', data)
}

export {
  getBusinessHome,
  addBusiness
}
