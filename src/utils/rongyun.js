var RongIMLib = window.RongIMLib // 由 window 赋值
var RongIMClient = RongIMLib.RongIMClient

export function init(params, callbacks, _this, addPromptInfo) {
  if (!params.appkey || !params.token) {
    return false
  }
  // 公有云初始化
  RongIMLib.RongIMClient.init(params.appkey)
  var instance = RongIMClient.getInstance()

  RongIMClient.setConnectionStatusListener({
    onChanged: function(status) {
      switch (status) {
        case RongIMLib.ConnectionStatus['CONNECTED']:
        case 0:
          console.log('连接成功')
          _this && _this.$store.commit('user/SET_messageInit')
          callbacks && callbacks.CONNECTED && callbacks.CONNECTED(instance)
          break
        case RongIMLib.ConnectionStatus['CONNECTING']:
        case 1:
          console.log('连接中')
          break
        case RongIMLib.ConnectionStatus['DISCONNECTED']:
        case 2:
          console.log('当前用户主动断开链接')
          break
        case RongIMLib.ConnectionStatus['NETWORK_UNAVAILABLE']:
        case 3:
          console.log('网络不可用')
          break
        case RongIMLib.ConnectionStatus['CONNECTION_CLOSED']:
        case 4:
          console.log('未知原因，连接关闭')
          break
        case RongIMLib.ConnectionStatus['KICKED_OFFLINE_BY_OTHER_CLIENT']:
        case 6:
          console.log('用户账户在其他设备登录，本机会被踢掉线')
          break
        case RongIMLib.ConnectionStatus['DOMAIN_INCORRECT']:
        case 12:
          console.log('当前运行域名错误，请检查安全域名配置')
          break
      }
    }
  })
  RongIMClient.setOnReceiveMessageListener({
    // 接收到的消息
    onReceived: function(message) {
      addPromptInfo && addPromptInfo(message)
    }
  })
  RongIMClient.connect(params.token, {
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
