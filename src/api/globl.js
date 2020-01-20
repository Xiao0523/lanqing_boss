import request from '@/utils/request'

function getChinaCity({ province, city, district }) {
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
  if (province && city && district) {
    defaultNum = 4
    pathStr = defaultNum + '/' + district
  }
  return request.get('web/ChinaCity/' + pathStr)
}

export {
  getChinaCity
}
