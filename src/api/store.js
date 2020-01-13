import request from '@/utils/request'

function getStoreHome() {
  return request.get('boss/store/home')
}

export {
  getStoreHome
}
