import request from '@/utils/request'

function getCommonList(data) {
  return request.post('/boss/v2/evaluate/comment', data)
}

function getReply(data) {
  return request.post('/boss/v2/evaluate/comment/reply', data)
}

function getCommonDetail({ id }) {
  return request.get('/boss/v2/evaluate/comment/' + id)
}

export {
  getCommonList,
  getReply,
  getCommonDetail
}
