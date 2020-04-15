import request from '@/utils/request'

function getTeacherList(data) {
  return request.post('/boss/v2/teacherList', data)
}

function addTeacher(data) {
  return request.post('/boss/v2/teacher', data)
}

function editTeacher(data) {
  return request.patch('/boss/v2/teacher', data)
}

function getDetail({ id }) {
  return request.get('/boss/v2/teacher/' + id)
}

function getStudentList(data) {
  return request.post('/boss/v2/teacher/student', data)
}

function editTeacherStatus({ id, status }) {
  return request.post('/boss/v2/teacher/' + id + '/' + status)
}

export {
  getTeacherList,
  addTeacher,
  getDetail,
  editTeacher,
  getStudentList,
  editTeacherStatus
}
