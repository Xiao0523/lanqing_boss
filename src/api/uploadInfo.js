
import request from '@/utils/request'

function getUploadInfo({ uuid }) {
  return request.get('/VodStsForApp/' + uuid)
}

export {
  getUploadInfo
}
