import { init } from '@/utils/rongyun'
import { getLocal } from '@/utils/local'
export const rongyunMixins = {
  data() {
    return {
      initObj: {
        appkey: this.$store.state.user.appKey,
        token: this.$store.state.user.messageToken || getLocal('messageToken') || ''
      },
      init: true
    }
  },
  watch: {
    '$route': {
      handler: function() {
        if (this.$route.path === '/store/message') {
          this.initCloud(this.addPromptInfo)
        }
        if (!this.$store.state.user.messageInit && this.$route.path !== '/store/message') {
          this.initCloud()
        }
      },
      immediate: true
    }
  },
  // RongIMClient.getInstance().disconnect()
  // RongIMClient.getInstance().logout()
  // this.initCloud()
  methods: {
    initCloud(fn = null) {
      if (this.initObj.appkey && this.initObj.token) {
        init(this.initObj, null, this, fn)
      }
    },
    addPromptInfo(message) {
      if (typeof (message) === 'object') {
        if (message.targetId === this.firstId) {
          this.scrollBottom = true
          if (message.objectName === 'RC:TypSts' || message.objectName === 'RC:ReadNtf') return
          for (const item in this.chatList) {
            if (this.chatList[item].targetId === message.targetId) {
              this.chatList[item] = {
                ...this.chatList[item],
                ...message
              }
              break
            }
          }
          this.messageContent.push(message)
          this.sequence = true
          this.onScroller()
          this.clearUnRead()
        } else {
          this.fetchMessageList()
        }
      }
      // if (this.initHistory) {
      //   this.initHistory = false
      //   this.getHistoryMessages()
      // }
    }
  }
}
