import request from '@/utils/request'

function getWithdrawalList({ pageNum, pageSize }) {
  return request.get('boss/store/withdrawal/' + pageNum + '/' + pageSize)
}

function getMoney({ money }) {
  return request.post('boss/store/withdrawal/' + money)
}

export {
  getWithdrawalList,
  getMoney
}
