import request from '@/utils/request'

function getstudentList(data) {
  return request.post('boss/store/studentList', data)
}

function getDetail({ id }) {
  return request.get('boss/store/student/' + id)
}

function getStudentClassList({ id }) {
  return request.get('boss/store/curriculum4SingleStudentView/' + id)
}

function getStudentClass({ id }) {
  return request.get('boss/store/studentOrder/' + id)
}

export {
  getstudentList,
  getDetail,
  getStudentClassList,
  getStudentClass
}
