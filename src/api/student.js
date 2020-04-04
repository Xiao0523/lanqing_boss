import request from '@/utils/request'

function getMysteryStudent(data) {
  return request.post('/boss/v2/studentUnlock', data)
}

function getDetails({ id }) {
  return request.get('boss/store/student/' + id)
}

function getStudentClassList({ id }) {
  return request.get('boss/store/curriculum4SingleStudentView/' + id)
}

function getStudentClass({ id }) {
  return request.get('boss/store/studentOrder/' + id)
}

function getStudentOrder({ id }) {
  return request.get('boss/store/studentOrder/' + id)
}

function getCommentList({ id }) {
  return request.get('boss/store/comment4StudentView/' + id)
}

function submitRefund(data) {
  return request.post('boss/store/refund', data)
}

function submitCourse(data) {
  return request.post('boss/store/courseCompletion', data)
}

export {
  getMysteryStudent,
  getDetails,
  getStudentClassList,
  getStudentClass,
  getStudentOrder,
  getCommentList,
  submitRefund,
  submitCourse
}
