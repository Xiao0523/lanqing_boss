import request from '@/utils/request'

function getCursorList(data) {
  return request.post('/boss/v2/curriculumList', data)
}

function addCourse(data) {
  return request.post('/boss/v2/curriculum', data)
}

function getDetail({ id }) {
  return request.get('/boss/v2/curriculum/' + id)
}

function curosrOff({ id }) {
  return request.get('/boss/v2/curriculum/off/' + id)
}

function curosrOn({ id }) {
  return request.get('/boss/v2/curriculum/on/' + id)
}

function editCourse(data) {
  return request.patch('/boss/v2/curriculum', data)
}

function getClassStudent(data) {
  return request.post('/boss/v2/curriculum4teacher', data)
}

function editStudentTeacher(data) {
  return request.post('/boss/v2/curriculum/distributionTeacher4Student', data)
}

export {
  getCursorList,
  addCourse,
  getDetail,
  editCourse,
  curosrOn,
  curosrOff,
  getClassStudent,
  editStudentTeacher
}
