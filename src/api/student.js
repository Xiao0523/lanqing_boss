import request from '@/utils/request'

function getCategoryList(data) {
  return request.get('boss/store/category', data)
}

export {
  getCategoryList,
}
