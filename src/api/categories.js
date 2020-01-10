import request from '@/utils/request'

function getList() {
  return request.get('boss/business/category')
}

function getLevelOneList() {
  return request.get('boss/business/boss/levelOne')
}

function getLevelTwoList({ id }) {
  return request.get('boss/business/boss/levelTwo/' + id)
}

function addCategoriesList({ id }) {
  return request.post('boss/business/category/' + id)
}

function delCategoriesList({ id }) {
  return request.delete('boss/business/category/' + id)
}

function getCategoriesList() {
  return request.get('boss/business/boss/category4Business')
}

export {
  getList,
  getCategoriesList,
  getLevelOneList,
  getLevelTwoList,
  addCategoriesList,
  delCategoriesList
}
