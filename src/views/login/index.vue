<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="phone">
        <el-input
          v-model="loginForm.phone"
          placeholder="请输入手机号"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-row>
        <el-col :span="14">
          <el-form-item>
            <el-input
              v-model.trim="loginForm.code"
              placeholder="短信验证码"
              type="text"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="onLogin"
            />
          </el-form-item>
        </el-col>
        <el-col class="back" :span="1" />
        <el-col :span="8">
          <el-button class="code-btn" :disabled="!isMsg" @click="onCode"><span>{{ content }}</span></el-button>
        </el-col>
      </el-row>
      <div class="doc">
        <el-checkbox v-model="docWrite" class="checked" />我已阅读<router-link to="#" class="doc-link">《蓝青合作协议》</router-link>
      </div>
      <el-button :loading="loading" type="primary" class="btn" @click.native.prevent="onLogin">登录</el-button>
    </el-form>

    <div class="logo-wraper">
      <div class="logo"><img class="logo-img" :src="logo" alt=""></div>
      <div class="logo-text">蓝青教育商户端</div>
    </div>
    <el-dialog
      :visible.sync="isShowDialog"
      width="392px"
      top="334px"
      custom-class="validcode-custom"
      class="validcode-dialog"
      @closed="closedCode"
      @keyup.enter.native="codeClick"
    >
      <div slot="title">
        <h5 class="validcode-title">请在下方输入图片验证码</h5>
      </div>
      <div class="validcode">
        <el-form class="validcode-input">
          <el-form-item>
            <el-input v-model="validCodeForm.code" />
          </el-form-item>
        </el-form>
        <img class="validcode-img" :src="validCodeForm.img" alt="" @click="getValidCodeImg">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="btn" @click="codeClick">确 定</el-button>
      </span>
    </el-dialog>
    <div class="bg-img">
      <img src="../../assets/Background.png" alt="">
    </div>
  </div>
</template>

<script>
import { getValidCode, getMessage } from '@/api/user.js'
import { rongyunMixins } from '@/views/mixins/rongyun'
import { getExamine, getStore } from '@/api/business.js'
import { setLocal } from '@/utils/local'

export default {
  name: 'Login',
  mixins: [rongyunMixins],
  data() {
    return {
      content: '获取验证码',
      // 登录表单
      loginForm: {
        code: '',
        phone: ''
      },
      logo: require('@/assets/logo-white.png'),
      loading: false,
      // 验证码
      validCodeForm: {
        code: '',
        img: ''
      },
      clock: 60,
      isShowDialog: false, // 验证码弹窗
      isError: false,
      errorText: '',
      isMsg: true,
      docWrite: true,
      clocks: null
    }
  },
  beforeDestroy() {
    if (this.clocks) {
      window.clearInterval(this.clocks)
    }
  },
  methods: {
    switchForm() {
      this.isRegist = !this.isRegist
    },
    countDown() {
      if (!this.isMsg) return
      this.isMsg = false
      this.content = this.clock + 's后重新发送'
      this.clocks = window.setInterval(() => {
        this.clock--
        this.content = this.clock + 's后重新发送'
        if (this.clock < 0) {
          window.clearInterval(this.clocks)
          this.content = '重新发送验证码'
          this.clock = 60
          this.isMsg = true // 这里重新开启
        }
      }, 1000)
    },
    onCode() {
      // 简易校验 表单提示
      if (!this.loginForm.phone) return this.$warn('请输入用户名')
      this.isShowDialog = true
      this.getValidCodeImg()
    },
    // 验证码确定
    codeClick() {
      if (!this.validCodeForm.code) {
        this.$warn('请输入验证码！！！')
        return
      }
      if (!this.docWrite) return this.$warn('请勾选合作协议')
      const fetchObj = {
        phone: this.loginForm.phone,
        code: this.validCodeForm.code
      }
      getMessage(fetchObj).then(res => {
        this.isShowDialog = false
        if (res.code) return this.$warn(res.message)
        this.isMsg = true
        this.countDown()
      })
    },
    // 关闭验证码对话框
    closedCode() {
      this.validCodeForm.code = ''
    },
    // 验证码获取
    getValidCodeImg() {
      if (!this.loginForm.phone) return
      getValidCode(this.loginForm.phone).then(res => {
        if (res.code) {
          this.validCodeForm.code = ''
          return res.message && this.$warn(res.message)
        }
        this.validCodeForm.img = res.data
      })
    },

    // 登录
    onLogin() {
      if (!this.docWrite) return this.$warn('请勾选阅读协议')
      const loginForm = this.loginForm
      this.loading = true
      this.$store
        .dispatch('user/login', loginForm)
        .then(res => {
          this.loading = false
          // if (this.isCertificate) {
          //   return this.$router.push({ path: this.redirect || '/' })
          // }
          if (res.code) {
            return res.message && this.$warn(res.message)
          }
          this.$success(res.message)
          this.initObj.token = res.data.token
          this.$store.commit('user/SET_USERID', res.data.token)
          this.initCloud(null)

          getExamine().then(res => {
            if (res.code) return this.$warn(res.message)
            setLocal('examineStatus', res.data.status)
            if (Number(res.data.status) === 1) {
              getStore().then(res => {
                if (res.code) return this.$warn(res.message)
                setLocal('storeStatus', res.data.status)
                this.$router.replace({ path: '/home' })
              })
            } else {
              this.$router.replace({ path: '/home' })
            }
          })
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/login-global';
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .code-box {
    display: flex;
  }
  .code-btn {
    display: block;
    width:115px;
    height:42px;
    background:rgba(0,210,165,1);
    box-shadow:0px 1px 4px 0px rgba(44,90,74,0.21),0px -1px 0px 0px rgba(126,167,146,1);
    font-size:13px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:42px;
    padding: 0;
    margin: 0;
  }
  .back {
    height: 10px;
  }
  .checked {
    margin-right: 10px;
  }
  .doc {
    color: #BDBDBD;
    font-size: 13px;
    line-height: 13px;
    margin: 6px 0 15px;
    &-link {
      font-size:13px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color: #00D2A5;
      line-height:13px;
    }
  }
  /deep/ {
    .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
      background:rgba(238,238,238,1);
      border-radius:4px;
      box-shadow: none;
      & > span {
        font-size:13px;
        font-weight:400;
        color:rgba(187,187,187,1);
        line-height:18px;
      }
    }
  }
</style>
