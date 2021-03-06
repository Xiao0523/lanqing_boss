export function compress(fileObj, file, callback) {
  if (fileObj.size < 8000 && fileObj.type === 'image/jpeg') {
    directTurnIntoBase64(fileObj, callback)
  } else {
    var img = new Image()
    img.setAttribute('crossOrigin', 'anonymous')
    img.src = file
    // 选择的文件对象
    // 缩放图片需要的canvas
    var canvas = document.createElement('canvas')
    var context = canvas.getContext('2d')
    // base64地址图片加载完毕后
    // console.log(img)
    img.onload = function() {
      // 图片原始尺寸
      var originWidth = this.width
      var originHeight = this.height
      // 最大尺寸限制，可通过国设置宽高来实现图片压缩程度
      var maxWidth = 200
      var maxHeight = 200
      // 目标尺寸
      var targetWidth = originWidth
      var targetHeight = originHeight
      // 图片尺寸超过100x100的限制
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          // 更宽，按照宽度限定尺寸
          targetWidth = maxWidth
          targetHeight = Math.round(maxWidth * (originHeight / originWidth))
        } else {
          targetHeight = maxHeight
          targetWidth = Math.round(maxHeight * (originWidth / originHeight))
        }
      }
      // canvas对图片进行缩放
      canvas.width = targetWidth
      canvas.height = targetHeight
      // 清除画布
      context.clearRect(0, 0, targetWidth, targetHeight)
      // 图片压缩
      context.drawImage(img, 0, 0, targetWidth, targetHeight)
      /* 第一个参数是创建的img对象；第二个参数是左上角坐标，后面两个是画布区域宽高*/
      // 压缩后的图片base64 url
      /* canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/jpeg';
                 * qualityArgument表示导出的图片质量，只要导出为jpg和webp格式的时候此参数才有效果，默认值是0.92*/
      var newUrl = canvas.toDataURL('image/jpeg', 0.92) // base64 格式
      callback(newUrl)
    }
  }
}

function directTurnIntoBase64(fileObj, callback) {
  const reader = new FileReader()
  reader.readAsDataURL(fileObj)
  reader.onload = function(e) {
    const base64Str = this.result
    callback(base64Str)
  }
}
