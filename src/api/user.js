import request from '@/utils/request'

function login(data) {
  return request.post('/boss/validUser', data)
}

function register(data) {
  return request.post('/business/register', data)
}

function getValidCode(loginName) {
  return request.get(`/code/${loginName}`)
}

function postExamine(data) {
  return request.post('/boss/business/examine', data)
}

/* function logout() {
  return request.post('/user/logout')
} */

export {
  login,
  register,
  getValidCode,
  postExamine
  // logout
}
