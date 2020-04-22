import request from '@/utils/request'

function getExamine(data) {
  return request.get('/boss/v2/examine', data)
}

function postExamine(data) {
  return request.post('/boss/v2/examine', data)
}

function getStore(data) {
  return request.get('/boss/v2/store', data)
}

function postStore(data) {
  return request.patch('/boss/v2/store', data)
}

function storeOff() {
  return request.put('/boss/v2/store/close')
}

function storeSure() {
  return request.get('/boss/v2/store/off')
}

export {
  getExamine,
  postExamine,
  getStore,
  postStore,
  storeOff,
  storeSure
}
