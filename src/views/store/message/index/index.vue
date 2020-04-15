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
          <div v-for="(item, index) in sessionList" :key="item.targetId + index" class="content-warpper" @click="changeChat(item.targetId)">
            <span class="clearMessage el-icon-close" @click="clearBox(item.targetId)" />
            <span v-show="item.unreadMessageCount" class="message-tip">{{ item.unreadMessageCount }}</span>
            <img :src="(item.user && item.user.portrait) || ''" alt="">
            <div class="warpper-content">
              <div class="font">
                <span>{{ (item.user && item.user.name) || '神秘用户' }}</span>
                <span>{{ item.latestMessage.sentTime | timeStr }}</span>
              </div>
              <span v-if="item.objectName === 'RC:ImgMsg'" class="message-content">收到一条图片消息</span>
              <span v-else-if="item.objectName === 'RC:FileMsg'" class="message-content">收到一条附件消息</span>
              <span v-else class="message-content">{{ item.latestMessage.content.content }}</span>
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
                  <img :src="item.content.imageUri" alt="" width="100">
                </el-link>
                <span v-if="item.content.messageName === 'TextMessage'">{{ item.content.content }}</span>
                <el-link v-if="item.content.messageName === 'FileMessage'" target="_blank" :href="item.content.fileUrl">
                  <div class="file-box">
                    <img src="@/assets/file.png" alt="" height="40" width="40">
                    <span>{{ item.content.name }}</span>
                  </div>
                </el-link>
              </div>
            </div>

            <!-- <div class="bubble guest">
              <img src="@/assets/no-cash-out.png" class="photo" alt="">
              <div class="bubble-content">请问这个课程报名后，第一次上课是什么时候？？？？在吗在吗？？？很着急哦～希望看到回复</div>
            </div>
            <p>15：26</p>
            <div class="bubble master">
              <img src="@/assets/no-cash-out.png" class="photo" alt="">
              <div class="bubble-content">请问这个课程报名后，第一次上课是什么时候？？？？在吗在吗？？？很着急哦～希望看到回复</div>
            </div>
            <div class="bubble master">
              <img src="@/assets/no-cash-out.png" class="photo" alt="">
              <div class="bubble-content">请问这个课程报名后，第一次上课是什么时候？？？？在吗在吗？？？很着急哦～希望看到回复</div>
            </div> -->
          </div>
        </div>
        <div class="chat-box-bottom">
          <div class="tool">
            <!-- <img src="@/assets/message-emoji.png" alt=""> -->
            <!-- <el-upload
              ref="upload"
              class="upload-demo"
              :action="uploadPic"
              :on-success="pushImgMsg"
              :file-list="fileList"
              :auto-upload="false"
              :show-file-list="false"
            /> -->

            <!-- <el-upload
              ref="upload"
              class="upload-demo"
              :action="uploadPic"
              :on-success="pushImgMsg"
              :show-file-list="false"
            >
              <el-button size="small" type="primary" class="btns" />
            </el-upload> -->

            <el-upload
              class="uploader"
              :action="uploadPic"
              name="multipartFile"
              :show-file-list="false"
              :on-success="pushImgMsg"
            >
              <img src="@/assets/message-pic.png" alt="">
            </el-upload>
          </div>
          <el-input v-model="text" type="textarea" class="textarea" resize="none" @keyup.native="enterInput" />
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
      firstDo: true,
      result: '',
      scrollBottom: true,
      newSessionList: [],
      newId: '',
      users: {}
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
        if (!this.firstDo) return
        this.firstDo = false
        this.firstId = this.newId || this.sessionList[0].targetId
        const idList = []
        this.sessionList.forEach(v => {
          idList.push(v.targetId)
        })
        this.getInfo(idList)
      },
      deep: true
    },
    firstId() {
      this.getMessage()
      this.firstUser = this.users[this.firstId]
    }
  },
  created() {
    const id = this.$route.query.id
    if (id) {
      this.newId = id
    }
    this.getScroll = throttle(this.paperScroll, 300)
  },
  methods: {
    getInfo(idList) {
      const getObj = [...idList]
      getInfoList(getObj).then(res => {
        if (res.code) return res.message && this.$warn(res.message)
        this.users = res.data
        this.sessionList.forEach((val) => {
          this.$set(val, 'user', res.data[val.targetId])
        })
      })
    },
    pushImgMsg(file, fileList) {
      if (file.code) return file.message && this.$warn(file.message)
      const reader = new FileReader()
      reader.readAsDataURL(fileList.raw)
      const _this = this
      reader.onload = function(e) {
        var base64Str = this.result // 压缩后的 base64 略缩图, 用来快速展示图片
        var imageUri = file.data // 上传到服务器的 url. 用来展示高清图片
        var msg = new RongIMLib.ImageMessage({ content: base64Str, imageUri: imageUri })
        var conversationType = RongIMLib.ConversationType.PRIVATE
        var targetId = _this.firstId // 目标 Id
        var callback = {
          onSuccess: function(message) {
            _this.messageContent.push(message)
            _this.scrollBottom = true
            _this.onScroller()
          },
          onError: function(errorCode) {
            console.log('发送图片消息失败', errorCode)
          }
        }
        RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, callback)
      }
      // html5读文件
    },
    changeChat(id) {
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
        this.onSend()
        e.preventDefault()
      }
    },
    onSend() {
      if (this.text) {
        if (this.text.match(/^[ ]*$/)) {
          this.$dialog({
            title: '错误',
            content: '不能为空',
            cancelBtnTxt: '知道了',
            noOkBtn: true
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
            _this.messageContent.push(message)
            _this.scrollBottom = true
            _this.onScroller()
          },
          onError: function(errorCode) {
            console.log('发送文本消息失败', errorCode)
          }
        })
      } else {
        this.$dialog({
          title: '错误',
          content: '不能为空',
          cancelBtnTxt: '知道了',
          noOkBtn: true
        })
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
    getMessage() {
      if (!this.firstId) return
      var conversationType = RongIMLib.ConversationType.PRIVATE
      var targetId = this.firstId
      var timestrap = null // 默认传 null, 若从头开始获取历史消息, 请赋值为 0
      var count = 10
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
          console.log(list)
          /*
            list: 获取的历史消息列表
            hasMsg: 是否还有历史消息可以获取
          */
          // if (_this.firstFetch) {
          //   _this.firstUser = list[0].content && list[0].content.user
          //   _this.firstFetch = false
          // }
          _this.hasMsg = hasMsg
          if (_this.sequence) {
            for (let i = 0; i < list.length; i++) {
              list[i].action = false
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
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  width: 100%;
  height: calc(100vh - 50px);
  .left {
    width: 351px;
    height: 100%;
    background: #fff;
    border-right: 1px solid rgba(241,241,245,1);
    box-sizing: border-box;
    .search {
      width: 100%;
      height: 78px;
      padding: 18px 20px;
      background: #fff;
      border-bottom: 1px solid rgba(241,241,245,1);
      /deep/ {
        .el-input__inner {
          background:rgba(250,250,251,1);
          height: 42px;
          line-height: 42px;
          border: 0;
          padding-left: 50px;
          box-sizing: border-box;
        }
        .el-icon-search:before {
          font-size: 20px;
        }
        .el-input__icon {
          position: relative;
          top: 2px;
          height: 100%;
          width: 50px;
        }
      }
    }
    .list-box {
      width: 100%;
      height: calc(100vh - 121px);
      padding: 10px;
      box-sizing: border-box;
      overflow-y: hidden;
      .inner-warpper {
        width: 100%;
        height: 96px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(241,241,245,1);
        box-sizing: border-box;
        cursor: pointer;
        .content-warpper {
          width: 100%;
          display: flex;
          padding: 20px 15px;
          box-sizing: border-box;
          position: relative;
          .clearMessage {
            display: none;
            font-size: 14px;
            position: absolute;
            right: 5px;
            top: 5px;
          }
          .message-tip {
            display: block;
            width:26px;
            height:20px;
            text-align: center;
            position: absolute;
            top: 15px;
            left: 40px;
            background:rgba(252,90,90,1);
            border-radius:12px;
            font-size:12px;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height:20px;
          }
          img {
            display: block;
            width: 42px;
            height: 42px;
            margin-right: 10px;
          }
          .warpper-content {
            display: flex;
            flex-direction: column;
            flex: 1;
            min-width: 0;
            .font {
              display: flex;
              width: 248px;
              flex-direction: row;
              justify-content: space-between;
              margin-top: 2px;
              span:first-child {
                font-size:14px;
                font-weight:600;
                color:rgba(23,23,37,1);
                line-height:20px;
              }
              span:last-child {
                font-size:12px;
                color:rgba(105,105,116,1);
                font-weight:400;
                line-height:22px;
              }
            }
            .message-content {
              display: block;
              width: 100%;
              height: 24px;
              line-height: 24px;
              margin-top: 2px;
              overflow: hidden;
              font-size:14px;
              font-weight:400;
              color:rgba(146,146,157,1);
              line-height:24px;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          &:hover {
            background:rgba(0, 98, 255, .05);
            .clearMessage {
              display: inline;
            }
          }
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
      &:hover {
        overflow-y: auto;
        overflow-y: overlay;
      }
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: #fff;
      }

      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
        border-radius: 10px;
        background-color: rgba(240, 240, 240, .5);
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
        background-color: rgba(0, 0, 0, .1);
      }
    }
  }
  .right {
    width: calc(100% - 351px);
    height: 100%;
    background: #fff;
    .chat-box {
      width: 100%;
      height: 100%;
      .chat-box-top {
        width: 100%;
        height: calc(100% - 250px);
        .title {
          width: 100%;
          height: 78px;
          line-height: 78px;
          padding: 0 18px;
          font-size:16px;
          font-weight:600;
          color:rgba(23,23,37,1);
          box-sizing: border-box;
          border-bottom: 1px solid rgba(241,241,245,1);
        }
        .chat-main {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: calc(100% - 78px);
          padding: 30px 20px;
          box-sizing: border-box;
          overflow-y: auto;
          &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            background-color: #fff;
          }

          &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
            border-radius: 10px;
            background-color: rgba(240, 240, 240, .5);
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
            background-color: rgba(0, 0, 0, .1);
          }
          .bubble {
            display: flex;
            width: 70%;
            img.photo {
              display: block;
              width: 32px;
              height: 32px;
            }
            .bubble-content {
              max-width: calc(100% - 42px);
              padding: 10px 15px;
              box-sizing: border-box;
              font-size:14px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              line-height:24px;
              margin-bottom: 10px;
            }
            &.guest {
              align-self: flex-start;
              .bubble-content {
                background:rgba(250,250,251,1);
                border-radius:0px 8px 8px 8px;
                color:rgba(23,23,37,1);
              }
              img.photo {
                margin-right: 10px;
              }
            }
            &.master {
              flex-direction: row-reverse;
              align-self: flex-end;
              .bubble-content {
                background:rgba(0,210,165,1);
                border-radius:8px 0px 8px 8px;
                color:rgba(255,255,255,1);
              }
              img.photo {
                margin-left: 10px;
              }
            }
          }
          p {
            display: block;
            width: 100%;
            text-align: center;
            font-size:14px;
            font-weight:400;
            color:rgba(146,146,157,1);
            line-height:14px;
            margin: 10px 0 30px;
          }
        }
      }
      .chat-box-bottom {
        height: 250px;
        .tool {
          display: flex;
          width: 100%;
          height: 60px;
          padding: 0 20px;
          border-color: rgba(241,241,245,1);
          border-style: solid;
          border-width: 1px 0;
          align-items: center;
          box-sizing: border-box;
          img {
            width: 24px;
            height: 24px;
            cursor: pointer;
            margin-right: 15px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
        .textarea {
          width: 100%;
          height: 110px;
          font-size:14px;
          font-weight:400;
          color:rgba(68,68,79,1);
          line-height:24px;
          /deep/ {
            .el-textarea__inner {
              height: 100%;
              border: 0;
              padding: 20px;
              box-sizing: border-box;
            }
          }
        }
        .btn-box {
          display: flex;
          flex-direction: row-reverse;
          width: 100%;
          padding: 20px;
          box-sizing: border-box;
          border-top: 1px solid rgba(241,241,245,1);
          span {
            line-height: 38px;
            font-size:12px;
            font-weight:400;
            color:rgba(157,157,167,1);
          }
          .enter-btn {
            width:78px;
            height:38px;
            background:rgba(0,210,165,1);
            border-radius:19px;
            font-size:12px;
            font-weight:600;
            padding: 0;
            color:rgba(255,255,255,1);
            line-height:17px;
            margin-left: 30px;
          }
        }
      }
    }
  }
}

.dialog-box {
  margin: 20px 0;
  span {
    display: block;
    line-height: 24px;
  }
}
.file-box {
  display: flex;
  align-items: center;
  img {
    margin-right: 10px;
  }
  span {
    display: block;
  }
}
/deep/ {
  .el-dialog__header {
    padding-bottom: 25px;
    margin: 0;
  }
  .el-dialog__footer {
    display: flex;
    padding-top: 0;
    justify-content: center;
  }

  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
  }

  .el-dialog {
    width: 322px;
  }

  .el-link.el-link--default.is-underline {
    &:hover {
      text-decoration: none;
    }
  }
}
.dialog-title {
  margin: 0;
  padding: 0;
}
.scroll-more {
  text-align: center;
  font-size: 14px;
  margin: 10px 0;
  color: #666;
}
.btns {
  background: transparent;
  border: 0;
}
.img-boxs {
  display: block;
  height: 100px;
}
</style>
