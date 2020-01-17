import request from '@/utils/request'

function getRechargeList({ pageNum, pageSize }) {
  return request.get('boss/store/recharge/' + pageNum + '/' + pageSize)
}

function getConsumeList({ pageNum, pageSize }) {
  return request.get('boss/store/consume/' + pageNum + '/' + pageSize)
}

export {
  getRechargeList,
  getConsumeList
}
