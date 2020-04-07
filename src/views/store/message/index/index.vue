<template>
  <div class="main">
    <section class="left">
      <div class="search">
        <el-input placeholder="搜索学员名称">
          <i
            slot="prefix"
            class="el-icon-search el-input__icon"
          />
        </el-input>
      </div>
      <div class="list-box">
        <div class="inner-warpper">
          <div class="content-warpper">
            <span class="message-tip">53</span>
            <img src="@/assets/no-cash-out.png" alt="">
            <div class="warpper-content">
              <div class="font">
                <span>小王</span>
                <span>05:13</span>
              </div>
              <span class="message-content">我想要咨询一下,我想要咨询一下,我想要咨询一下,我想要咨询一下,我想要咨询一下</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="right">
      <div class="chat-box">
        <div class="chat-box-top">
          <div class="title">小王</div>
          <div class="chat-main">
            <div class="bubble guest">
              <img src="@/assets/no-cash-out.png" class="photo" alt="">
              <div class="bubble-content">请问这个课程报名后，第一次上课是什么时候？？？？在吗在吗？？？很着急哦～希望看到回复</div>
            </div>
            <div class="bubble guest">
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
            </div>
          </div>
        </div>
        <div class="chat-box-bottom">
          <div class="tool">
            <img src="@/assets/message-emoji.png" alt="">
            <img src="@/assets/message-pic.png" alt="">
          </div>
          <el-input v-model="text" type="textarea" class="textarea" resize="none" />
          <div class="btn-box">
            <el-button class="enter-btn">发送</el-button>
            <span class="fonts">按Enter键发送，按Ctrl+Enter键换行</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { init } from '@/utils/rongyun'
import { getLocal } from '@/utils/local'
import { getToken } from '@/api/rongyun'
import UserInfo from '@/layout/components/Sidebar/mixin/UserInfo'
var RongIMLib = window.RongIMLib
export default {
  name: 'Message',
  mixins: [UserInfo],
  data() {
    return {
      text: '好的，我知道了',
      initObj: {
        appkey: this.$store.state.user.appKey,
        token: this.$store.state.user.messageToken || getLocal('messageToken') || ''
      },
      messageList: []
    }
  },
  mounted() {
    if (this.initObj.appkey && this.initObj.token) {
      var _this = this
      var callbacks = {
        CONNECTED: function(instance) {
          // 传入实例参数
          var conversationType = RongIMLib.ConversationType.PRIVATE
          var targetId = '53d6813b4afa48ada9c9b9c790f245cb'
          var timestrap = 0 // 默认传 null, 若从头开始获取历史消息, 请赋值为 0
          var count = 20
          instance.getHistoryMessages(conversationType, targetId, timestrap, count, {
            onSuccess: function(list, hasMsg) {
              /*
                list: 获取的历史消息列表
                hasMsg: 是否还有历史消息可以获取
              */
              console.log('获取历史消息成功', list)
            },
            onError: function(error) {
              // 请排查：单群聊消息云存储是否开通
              console.log('获取历史消息失败', error)
            }
          })
        }
      }
      init(this.initObj, callbacks)
    }
  },
  methods: {
    getTokens() {
      const getTokenObj = {
        userId: this.userId,
        portraitUr: this.avatar,
        name: this.username
      }
      getToken(getTokenObj).then(res => {
        console.log(res)
      })
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
          .message-tip {
            display: block;
            width:26px;
            height:20px;
            text-align: center;
            position: absolute;
            top: 15px;
            left: 42px;
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
            min-width: 0;
            .font {
              display: flex;
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
            background:rgba(0, 98, 255, .05);;
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
              padding: 20px;
              box-sizing: border-box;
              font-size:14px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              line-height:24px;
              margin-bottom: 20px;
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
</style>
