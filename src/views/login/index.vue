<template>
  <div class="login-container">
    <el-form
      v-if="!isRegist"
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
          type="text"
          tabindex="1"
          auto-complete="on"
          @input="hideError"
          @keyup.enter.native="onCode"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          type="password"
          tabindex="2"
          auto-complete="on"
          @input="hideError"
          @keyup.enter.native="onCode"
        />
      </el-form-item>
      <el-alert v-show="isError" type="error" show-icon :closable="false" :title="errorText" />
      <el-button :loading="loading" type="primary" class="btn" @click.native.prevent="onCode">登录</el-button>

      <div class="tips">
        <p class>
          没有账号
          <span @click="switchForm">立即注册</span>
        </p>
      </div>
    </el-form>

    <el-form
      v-if="isRegist"
      ref="registForm"
      class="login-form"
      :model="registForm"
    >
      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>
      <el-form-item>
        <el-input
          v-model="registForm.username"
          placeholder="输入用户名"
          @input="hideError"
          @keyup.enter.native="onCode"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="registForm.password"
          placeholder="输入密码"
          type="password"
          @input="hideError"
          @keyup.enter.native="onCode"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="registForm.password2"
          placeholder="重复密码"
          type="password"
          @input="hideError"
          @keyup.enter.native="onCode"
        />
      </el-form-item>

      <el-alert v-show="isError" type="error" show-icon :closable="false" :title="errorText" />

      <el-button :loading="loading" type="primary" class="btn" @click.native.prevent="onCode">立即注册</el-button>

      <div class="tips">
        <p class>
          已有账号
          <span @click="switchForm">立即登录</span>
        </p>
      </div>
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
import { getValidCode, register } from '@/api/user.js'

export default {
  name: 'Login',
  data() {
    return {
      // 登录表单
      loginForm: {
        code: '',
        username: '',
        password: ''
      },
      logo: require('@/assets/logo-white.png'),
      loading: false,
      isRegist: false, // 是否是注册页面  false 不是注册页面 true 注册页面
      // 注册表单
      registForm: {
        code: '',
        username: '',
        password: '',
        password2: ''
      },

      // 验证码
      validCodeForm: {
        code: '',
        img: ''
      },

      isShowDialog: false, // 验证码弹窗
      isError: false,
      errorText: ''
    }
  },
  mounted() {
    this.$store.commit('SET_TOKEN', '')
    this.$store.commit('SET_ROLES', [])
    this.$store.commit('SET_NAME', '')
    this.$store.commit('SET_AVATAR', '')
    this.$store.commit('SET_STATUS', '')
    this.$store.commit('SET_TEMP_ROLES', [])
  },
  methods: {
    switchForm() {
      this.isRegist = !this.isRegist
    },

    onCode() {
      // 简易校验 表单提示
      const postForm = this.isRegist ? this.registForm : this.loginForm
      if (!postForm.username) {
        return this.showError('请输入用户名')
      }

      if (postForm.password2 && postForm.password !== postForm.password2) {
        return this.showError('两遍密码不一致')
      }

      this.isShowDialog = true
      this.getValidCodeImg()
    },
    // 验证码确定
    codeClick() {
      if (!this.validCodeForm.code) {
        this.$warn('请输入验证码！！！')
        return
      }

      if (this.isRegist) {
        this.registForm.code = this.validCodeForm.code
      } else {
        this.loginForm.code = this.validCodeForm.code
      }

      this.isShowDialog = false
      if (this.isRegist) {
        this.registerPost()
        return
      }
      this.onLogin()
    },
    // 关闭验证码对话框
    closedCode() {
      this.validCodeForm.code = ''
    },
    // 注册
    registerPost() {
      const registForm = this.registForm
      const regigstData = {
        code: registForm.code,
        password: registForm.password,
        userName: registForm.username
      }
      register(regigstData).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.$success(res.message)
        const roleArr = []
        roleArr.push(res.data.role)
        this.$store.commit('user/SET_TEMP_ROLES', roleArr)
        this.$store.commit('user/SET_TOKEN', res.data.role)
        if (res.data.role && res.data.role !== 'store') {
          console.log(1111)
          this.$router.replace({ path: '/business' })
          return
        }
      })
    },

    // 验证码获取
    getValidCodeImg() {
      const postForm = this.isRegist ? this.registForm : this.loginForm
      const username = postForm.username

      if (!username) return
      getValidCode(username).then(res => {
        if (res.code) {
          this.validCodeForm.code = ''
          return res.message && this.$warn(res.message)
        }
        this.validCodeForm.img = res.data
      })
    },

    // 登录
    onLogin() {
      const loginForm = this.loginForm
      if (!this.validCodeForm.code) {
        this.isShowDialog = true
        return this.getValidCodeImg()
      }
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
          if (res.data.role && res.data.role !== 'store') {
            this.$router.replace({ path: '/business' })
            return false
          }
          this.$router.replace({ path: '/shop' })
        })
        .catch(() => {
          this.loading = false
        })
    },

    // 显示错误提示
    showError(errorText) {
      this.errorText = errorText
      this.isError = true
    },

    // 关闭错误提示
    hideError() {
      this.errorText = ''
      this.isError = false
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
</style>
