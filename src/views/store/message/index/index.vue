<template>
  <div class="main">
    <section class="left">
      <!-- <div class="search">
        <el-input placeholder="搜索学员名称">
          <i
            slot="prefix"
            class="el-icon-search el-input__icon"
          />
        </el-input>
      </div> -->
      <div class="list-box">
        <div class="inner-warpper">
          <div v-for="(item, index) in chatList" :key="item.targetId + index" class="content-warpper" :class="{actived: item.targetId === firstId}" @click="changeChat(item.targetId)">
            <!-- <span class="clearMessage el-icon-close" @click="clearBox(item.targetId)" /> -->
            <span v-show="item.unreadMessageCount" class="message-tip">{{ item.unreadMessageCount }}</span>
            <img :src="(item.user && item.user.portrait) || ''" alt="">
            <div class="warpper-content">
              <div class="font">
                <span>{{ (item.user && item.user.name) || '神秘用户' }}</span>
                <span>{{ item.latestMessage && item.latestMessage.sentTime | timeStr }}</span>
              </div>
              <span v-if="item.objectName === 'RC:ImgMsg'" class="message-content">收到一条图片消息</span>
              <span v-else-if="item.objectName === 'RC:FileMsg'" class="message-content">收到一条附件消息</span>
              <span v-else-if="item.objectName === 'RC:VcMsg'" class="message-content">收到一条语音消息</span>
              <span v-else-if="item.objectName === 'RC:TxtMsg' && item.latestMessage" class="message-content">{{ item.latestMessage && item.latestMessage.content.content }}</span>
              <span v-else-if="item.objectName === 'RC:TxtMsg' && !item.latestMessage && item.content" class="message-content">{{ item.content && item.content.content }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="right">
      <div ref="chat" class="chat-box">
        <div class="chat-box-top">
          <div class="title">{{ firstUser && firstUser.name }}</div>
          <div ref="chatContent" class="chat-main" @scroll.passive="getScroll">
            <span v-show="hasMsg" class="scroll-more">上拉加载更多</span>
            <div
              v-for="(item, index) in messageContent"
              :key="item.sentTime + index"
              class="bubble"
              :class="[item && item.messageDirection == 1 ? 'master' : 'guest']"
            >
              <!-- <img  :src="item.content.user && item.content.user.portrait" class="photo" alt=""> -->
              <img v-if="item && item.messageDirection !== 1" :src="item.content.user && item.content.user.portrait" class="photo" alt="">
              <div class="bubble-content">
                <el-link v-if="item.content.messageName === 'ImageMessage'" target="_blank" :href="item.content.imageUri" class="img-boxs">
                  <img :src="item.content.imageUri" alt="">
                </el-link>
                <span v-if="item.content.messageName === 'VoiceMessage'">该消息是语音消息,PC端无法显示</span>
                <span v-if="item.content.messageName === 'TextMessage'">{{ item.content.content }}</span>
                <el-link v-if="item.content.messageName === 'FileMessage'" target="_blank" :href="item.content.fileUrl">
                  <div class="file-box">
                    <img src="@/assets/file.png" alt="" height="40" width="40">
                    <span>{{ item.content.name }}</span>
                  </div>
                </el-link>
              </div>
            </div>
          </div>
        </div>
        <div class="chat-box-bottom">
          <div class="tool">
            <el-upload
              class="uploader"
              :action="uploadPic"
              name="multipartFile"
              :show-file-list="false"
              :on-success="pushImgMsg"
              :on-change="onchange"
            >
              <img src="@/assets/message-pic.png" alt="">
            </el-upload>
          </div>
          <el-input v-model="text" type="textarea" class="textarea" resize="none" @keydown.native="enterInput" />
          <div class="btn-box">
            <el-button class="enter-btn" @click="onSend">发送</el-button>
            <span class="fonts">按Enter键发送，按Ctrl+Enter键换行</span>
          </div>
        </div>
      </div>
    </section>
    <el-dialog :visible="boxFlag" @close="boxFlag=false">
      <h6 slot="title" class="dialog-title">警告</h6>
      <div class="dialog-box">
        <span>删除后将无法和该学员联系是否删除？</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="boxFlag=false">取消</el-button>
        <el-button type="primary" @click="clearMessage">删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UserInfo from '@/layout/components/Sidebar/mixin/UserInfo'
import { formatTime } from '@/utils/date'
import { throttle } from '@/utils/throttle'
import { Upload_Pic } from '@/api/URL.js'
import { getInfoList } from '@/api/rongyun'
import { compress } from '@/utils/base64'
// import { init } from '@/utils/rongyun'
// import { getLocal } from '@/utils/local'
import { rongyunMixins } from '@/views/mixins/rongyun'
const RongIMLib = window.RongIMLib // 由 window 赋值
const RongIMClient = RongIMLib.RongIMClient
export default {
  name: 'Message',
  filters: {
    timeStr(val) {
      return (val && formatTime(val, 'hh:mm')) || '刚刚'
    }
  },
  mixins: [UserInfo, rongyunMixins],
  data() {
    return {
      text: '',
      messageList: [],
      sessionList: [],
      firstId: null,
      uploadPic: Upload_Pic,
      messageContent: [],
      hasMsg: false,
      firstUser: null,
      delId: null,
      boxFlag: false,
      fileList: [],
      scrollTo: 1,
      initHistory: true,
      sequence: true,
      getScroll: null,
      // firstFetch: true,
      result: '',
      scrollBottom: true,
      newSessionList: [],
      newId: '',
      users: {},
      idList: [],
      chatList: null,
      imageUrl: '',
      imgPath: ''
    }
  },
  computed: {
    flag() {
      return this.$store.state.user.messageInit
    }
  },
  watch: {
    flag: {
      handler() {
        if (!this.flag) return
        this.fetchMessageList()
      },
      immediate: true
    },
    sessionList: {
      handler(oldVal, newVal) {
        if (!this.sessionList.length) {
          this.messageContent = ''
          this.firstId = ''
          return
        }
        this.sessionList.forEach(v => {
          this.idList.push(v.targetId)
        })
      },
      deep: true
    },
    idList: {
      handler(newVal) {
        if (!newVal.length) return
        this.getInfo()
      },
      deep: true
    },
    firstId() {
      this.getUserInfo(this.firstId)
      this.getMessage()
    }
  },
  created() {
    const id = this.$route.query.id
    if (id) {
      this.newId = id
      this.$route.query.id = ''
      this.idList = [
        this.newId,
        ...this.idList
      ]
    }
    this.getScroll = throttle(this.paperScroll, 300)
  },
  methods: {
    getUserInfo(id) {
      const getObj = [id]
      getInfoList(getObj).then(res => {
        if (res.code) return res.message && this.$warn(res.message)
        this.firstUser = res.data[this.firstId]
      })
    },
    getInfo() {
      const getObj = this.idList
      getInfoList(getObj).then(res => {
        if (res.code) return res.message && this.$warn(res.message)
        this.users = res.data
        const idList = []
        this.sessionList.forEach(v => {
          idList.push(v.targetId)
        })
        if (this.newId) {
          if (!idList.includes(this.newId)) {
            this.sessionList.unshift({
              targetId: this.newId
            })
          }
        }
        // this.firstUser = this.sessionList[0]
        this.chatList = JSON.parse(JSON.stringify(this.sessionList))
        this.chatList.forEach((val) => {
          this.$set(val, 'user', res.data[val.targetId])
        })
        if (this.firstId) return
        this.firstId = this.newId || this.chatList[0].targetId
      })
    },
    changeChat(id) {
      if (this.firstId === id) return
      this.firstId = id
      this.scrollBottom = true
      this.messageContent = []
      this.sequence = true
      // this.firstFetch = true
    },
    enterInput(e) {
      if (e.keyCode === 13 && e.ctrlKey) {
        this.text += '\n'
      } else if (e.keyCode === 13) {
        e.preventDefault()
        this.onSend()
      }
    },
    clearBox(id) {
      this.boxFlag = true
      this.delId = id
    },
    fetchMessageList() {
      var conversationTypes = [RongIMLib.ConversationType.PRIVATE]
      var count = 150
      const _this = this
      RongIMClient.getInstance().getConversationList({
        onSuccess: function(list) {
          _this.sessionList = list
        },
        onError: function(error) {
          console.log('获取会话列表失败', error)
        }
      }, conversationTypes, count)
    },
    getLockMessage() {
      var conversationType = RongIMLib.ConversationType.PRIVATE
      var targetId = this.firstId
      RongIMClient.getInstance().getConversation(conversationType, targetId, {
        onSuccess: function(conversation) {
          if (conversation) {
            console.log('获取指定会话成功', conversation)
          }
        }
      })
    },
    getMessage() {
      if (!this.firstId) return
      var conversationType = RongIMLib.ConversationType.PRIVATE
      var targetId = this.firstId || this.newId
      var timestrap = null // 默认传 null, 若从头开始获取历史消息, 请赋值为 0
      var count = 20
      if (this.sequence) {
        timestrap = 0 // 第一次获取用当前时间
      } else {
        // 第二次用最后一条记录的时间获取数据
        if (this.messageContent.length > 0) {
          timestrap = this.messageContent[0].sentTime
        }
      }
      this.initHistory = false
      const _this = this
      RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, timestrap, count, {
        onSuccess: function(list, hasMsg) {
          /*
            list: 获取的历史消息列表
            hasMsg: 是否还有历史消息可以获取
          */
          _this.hasMsg = hasMsg
          if (_this.sequence) {
            for (let i = 0; i < list.length; i++) {
              _this.messageContent.push(list[i])
            }
            _this.onScroller()
            _this.sequence = false
          } else {
            const arr = list.reverse()
            for (let i = 0; i < arr.length; i++) {
              _this.messageContent.unshift(list[i])
            }
            _this.onScroller()
          }
          // _this.messageContent = list
          // _this.hasMsg = hasMsg
          _this.clearUnRead()
        },
        onError: function(error) {
          // 请排查：单群聊消息云存储是否开通
          console.log('获取历史消息失败', error)
        }
      })
    },
    clearUnRead() {
      var conversationType = RongIMLib.ConversationType.PRIVATE
      var targetId = this.firstId
      RongIMClient.getInstance().clearUnreadCount(conversationType, targetId, {
        onSuccess: function() {
        },
        onError: function(error) {
          console.log('清除指定会话未读消息数失败', error)
        }
      })
    },
    clearMessage() {
      var conversationType = RongIMLib.ConversationType.PRIVATE
      var targetId = this.delId
      const _this = this
      RongIMClient.getInstance().removeConversation(conversationType, targetId, {
        onSuccess: function(bool) {
          _this.boxFlag = false
          _this.fetchMessageList()
        },
        onError: function(error) {
          console.log('删除指定会话失败', error)
        }
      })
    },
    onScroller() {
      this.$nextTick(() => {
        if (this.scrollBottom) {
          this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight + 100
          this.scrollBottom = false
        } else {
          this.$refs.chatContent.scrollTop = 20
        }
      })
    },
    paperScroll() {
      if (this.$refs.chatContent.scrollTop <= 10 && this.hasMsg) {
        this.getMessage()
      }
    },
    onSend() {
      if (!this.text) {
        this.$confirm('不能为空', '错误', {
          confirmButtonText: '确定'
        }).then(() => {
          return false
        })
        return false
      }
      var textMessageInfo = {
        content: this.text,
        extra: ''
      }
      var msg = new RongIMLib.TextMessage(textMessageInfo)
      var conversationType = RongIMLib.ConversationType.PRIVATE
      var targetId = this.firstId // 目标 ID
      const _this = this
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function(message) {
          // message 为发送的消息对象并且包含服务器返回的消息唯一 id 和发送消息时间戳
          _this.text = ''
          for (const item in _this.chatList) {
            if (_this.chatList[item].targetId === message.targetId) {
              _this.chatList[item] = {
                ..._this.chatList[item],
                ...message
              }
              break
            }
          }
          _this.messageContent.push(message)
          _this.scrollBottom = true
          _this.onScroller()
        },
        onError: function(errorCode) {
          console.log('发送文本消息失败', errorCode)
        }
      })
    },
    onchange(file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    pushImgMessage(baseStr) {
      const _this = this
      var base64Str = baseStr.replace(/^data:image\/\w+;base64,/, '') // 压缩后的 base64 略缩图, 用来快速展示图片
      var imageUri = this.imgPath // 上传到服务器的 url. 用来展示高清图片
      var msg = new RongIMLib.ImageMessage({ content: base64Str, imageUri: imageUri })
      var conversationType = RongIMLib.ConversationType.PRIVATE
      var targetId = _this.firstId // 目标 Id
      var callback = {
        onSuccess: function(message) {
          for (const item in _this.chatList) {
            if (_this.chatList[item].targetId === message.targetId) {
              _this.chatList[item] = {
                ..._this.chatList[item],
                ...message
              }
              break
            }
          }
          _this.imgPath = ''
          _this.imageUrl = ''
          _this.messageContent.push(message)
          _this.scrollBottom = true
          _this.onScroller()
        },
        onError: function(errorCode) {
          console.log('发送图片消息失败', errorCode)
        }
      }
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, callback)
    },
    pushImgMsg(file, fileList) {
      if (file.code) return file.message && this.$warn(file.message)
      // const reader = new FileReader()
      // reader.readAsDataURL(fileList.raw)
      this.imgPath = file.data
      compress(fileList.raw, this.imageUrl, this.pushImgMessage)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../../styles/rongyn.scss';
  .img-boxs {
    img {
      display: block;
      max-width: 100px;
      max-height: 100px;
    }
  }
</style>
