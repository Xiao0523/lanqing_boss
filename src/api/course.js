import request from '@/utils/request'

function getStoreList(data) {
  return request.post('boss/store/curriculumList', data)
}

function addStore(data) {
  return request.post('boss/store/curriculum', data)
}

export {
  getStoreList,
  addStore
}
