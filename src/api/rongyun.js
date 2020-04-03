import request from '@/utils/request'

function getToken(data) {
  return request.post('/rongyun/user/getToken', data)
}

function postExamine(data) {
  return request.post('/boss/v2/store/examine', data)
}

/* function logout() {
  return request.post('/user/logout')
} */

export {
  getToken,
  postExamine
  // logout
}
