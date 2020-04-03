var RongIMLib = window.RongIMLib // 由 window 赋值
var RongIMClient = RongIMLib.RongIMClient
export function init(params, addPromptInfo) {
  var appkey = params.appkey
  var token = params.token
  RongIMClient.init(appkey, null, params)
  RongIMClient.setConnectionStatusListener({
    onChanged: function(status) {
      switch (status) {
        case RongIMLib.ConnectionStatus['CONNECTED']:
        case 0:
          addPromptInfo('连接成功')
          break
        case RongIMLib.ConnectionStatus['CONNECTING']:
        case 1:
          addPromptInfo('连接中')
          break
        case RongIMLib.ConnectionStatus['DISCONNECTED']:
        case 2:
          addPromptInfo('当前用户主动断开链接')
          break
        case RongIMLib.ConnectionStatus['NETWORK_UNAVAILABLE']:
        case 3:
          addPromptInfo('网络不可用')
          break
        case RongIMLib.ConnectionStatus['CONNECTION_CLOSED']:
        case 4:
          addPromptInfo('未知原因，连接关闭')
          break
        case RongIMLib.ConnectionStatus['KICKED_OFFLINE_BY_OTHER_CLIENT']:
        case 6:
          addPromptInfo('用户账户在其他设备登录，本机会被踢掉线')
          break
        case RongIMLib.ConnectionStatus['DOMAIN_INCORRECT']:
        case 12:
          addPromptInfo('当前运行域名错误，请检查安全域名配置')
          break
      }
    }
  })
  RongIMClient.setOnReceiveMessageListener({
    // 接收到的消息
    onReceived: function(message) {
      var messageContent = message.content
      // 判断消息类型
      switch (message.messageType) {
        case RongIMClient.MessageType.TextMessage: // 文字消息
          console.log('文字内容', messageContent.content)
          break
        case RongIMClient.MessageType.ImageMessage: // 图片消息
          console.log('图片缩略图 base64', messageContent.content)
          console.log('原图 url', messageContent.imageUri)
          break
        case RongIMClient.MessageType.HQVoiceMessage: // 音频消息
          console.log('音频 type ', messageContent.type) // 编解码类型，默认为 aac 音频
          console.log('音频 url', messageContent.remoteUrl) // 播放：<audio src={remoteUrl} />
          console.log('音频 时长', messageContent.duration)
          break
        case RongIMClient.MessageType.RichContentMessage: // 富文本(图文)消息
          console.log('文本内容', messageContent.content)
          console.log('图片 base64', messageContent.imageUri)
          console.log('原图 url', messageContent.url)
          break
        case RongIMClient.MessageType.UnknownMessage: // 未知消息
          console.log('未知消息, 请检查消息自定义格式是否正确', message)
          break
        default:
          console.log('收到消息', message)
          break
      }
    }
  })
  RongIMClient.connect(token, {
    onSuccess: function(userId) {
      console.log('连接成功, 用户 id 为', userId)
      // 连接已成功, 此时可通过 getConversationList 获取会话列表并展示
    },
    onTokenIncorrect: function() {
      console.log('连接失败, 失败原因: token 无效')
    },
    onError: function(errorCode) {
      var info = ''
      switch (errorCode) {
        case RongIMLib.ErrorCode.TIMEOUT:
          info = '链接超时'
          break
        case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
          info = '不可接受的协议版本'
          break
        case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
          info = 'appkey 不正确'
          break
        case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
          info = '服务器不可用'
          break
        default:
          info = errorCode
          break
      }
      console.log('连接失败, 失败原因: ', info)
    }
  })
}
