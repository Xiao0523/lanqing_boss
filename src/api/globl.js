import request from '@/utils/request'

function getChinaCity({ province, city }) {
  let defaultNum = 1
  let pathStr = defaultNum + '/'
  if (province) {
    defaultNum = 2
    pathStr = defaultNum + '/' + province + '/'
  }
  if (province && city) {
    defaultNum = 3
    pathStr = defaultNum + '/' + city + '/'
  }
  return request.get('web/ChinaCity/' + pathStr)
}

export {
  getChinaCity
}
