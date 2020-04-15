import request from '@/utils/request'

function getCategoryList() {
  return request.get('/boss/v2/category')
}

function getLevelOneList() {
  return request.get('/boss/v2/category/one')
}

function getLevelTwoList({ id }) {
  return request.get('/boss/v2/category/two/' + id)
}

function addCategoriesList({ id }) {
  return request.post('/boss/v2/category/' + id)
}

function delCategoriesList({ id }) {
  return request.delete('/boss/v2/category/' + id)
}

export {
  getCategoryList,
  getLevelOneList,
  getLevelTwoList,
  addCategoriesList,
  delCategoriesList
}
