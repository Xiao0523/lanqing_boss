import request from '@/utils/request'

function getStudentList(data) {
  return request.post('/boss/v2/student', data)
}

function getStudentDetail({ id }) {
  return request.get('/boss/v2/student/' + id)
}

function getStudentLocked(data) {
  return request.post('/boss/v2/studentLocked', data)
}

function getStudentUnlock(data) {
  return request.post('/boss/v2/studentUnlock', data)
}

function editLock({ entrustId, studentId }) {
  return request.post('/boss/v2/student/unlock/' + entrustId + '/' + studentId)
}

function getCommentList({ id }) {
  return request.get('/boss/v2/comment4StudentView/' + id)
}

function evaluation({ id, type }) {
  return request.get('/boss/v2/evaluation/' + id + '/' + type)
}

function getStudentCursor({ studentId, type }) {
  return request.get('/boss/v2/studentOrder/' + studentId + '/' + type)
}

function getMainInfo() {
  return request.get('/boss/v2/student/mainInfo')
}

export {
  getStudentList,
  getStudentDetail,
  getStudentLocked,
  getStudentUnlock,
  editLock,
  getCommentList,
  evaluation,
  getStudentCursor,
  getMainInfo
}
