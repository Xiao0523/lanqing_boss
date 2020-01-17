import request from '@/utils/request'

function getStoreList(data) {
  return request.post('boss/store/curriculumList', data)
}

function addCourse(data) {
  return request.post('boss/store/curriculum', data)
}

function getDetail({ id }) {
  return request.get('boss/store/curriculum/' + id)
}

function getStudent(data) {
  return request.post('boss/store/curriculum4teacher/', data)
}

function editTeacher(data) {
  return request.post('boss/store/distributionTeacher4Student', data)
}

function editCourse(data) {
  return request.patch('boss/store/curriculum', data)
}

export {
  getStoreList,
  addCourse,
  getDetail,
  getStudent,
  editTeacher,
  editCourse
}
