import request from '@/utils/request'

function login(data) {
  return request.post('/validUser', data)
}

function getValidCode(phone) {
  return request.get(`/code/${phone}`)
}

function getMessage({ phone, code }) {
  return request.get(`/check/${phone}/${code}`)
}

/* function logout() {
  return request.post('/user/logout')
} */

export {
  login,
  getMessage,
  getValidCode
  // logout
}
