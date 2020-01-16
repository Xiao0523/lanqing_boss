import request from '@/utils/request'

function getCategoryList(data) {
  return request.get('boss/store/category', data)
}

function getTeacherList(data) {
  return request.post('boss/store/teacherList', data)
}

function addTeacher(data) {
  return request.post('boss/store/teacher', data)
}

function editTeacher(data) {
  return request.patch('boss/store/teacher', data)
}

function getDetail({ id }) {
  return request.get('boss/store/teacher/' + id)
}

function getCateTeacher({ id }) {
  return request.get('boss/store/teachers/' + id)
}

export {
  getCategoryList,
  getTeacherList,
  addTeacher,
  getDetail,
  editTeacher,
  getCateTeacher
}
