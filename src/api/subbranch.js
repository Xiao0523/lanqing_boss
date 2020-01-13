import request from '@/utils/request'

function getBusinessHome(data) {
  return request.get('boss/business/home', data)
}

function addBusiness(data) {
  return request.post('boss/business/store', data)
}

function getBusinessView({ id }) {
  return request.get('boss/business/store/' + id)
}

function editBusiness(data) {
  return request.patch('boss/business/store', data)
}

function getStoreList({ page = 1, limit = 9, status = 0 }) {
  return request.get('boss/business/store/' + page + '/' + limit + '/' + status)
}

function addStore(data) {
  return request.post('boss/business/storeAdmin', data)
}

function editStoreStatus({ id, status }) {
  return request.patch('boss/business/store/' + id + '/' + status)
}

export {
  getBusinessHome,
  addBusiness,
  getStoreList,
  getBusinessView,
  editBusiness,
  addStore,
  editStoreStatus
}
