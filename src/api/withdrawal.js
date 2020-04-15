import request from '@/utils/request'

function getWithdrawalList({ pageNum, pageSize }) {
  return request.get('/boss/v2/property/withdrawal/' + pageNum + '/' + pageSize)
}

function getMoney({ money }) {
  return request.post('/boss/v2/property/withdrawal/' + money)
}

function getHomeDate() {
  return request.get('/boss/v2/property/mainInfo')
}

export {
  getWithdrawalList,
  getMoney,
  getHomeDate
}
