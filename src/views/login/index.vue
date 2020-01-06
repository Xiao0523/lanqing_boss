<template>
  <div class="login-container">
    <img class="bg-img" src="@/assets/Background.png" alt="">
    <div class="top-tip">电话：1111111111    微信号：XXXX  工作时间：周一至周五 08:30-17:30</div>
    <div class="login-content">

      <div v-if="!isBusinessUnpass">
        <el-form
          v-if="isRegist"
          ref="loginForm"
          :model="loginForm"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">登录</h3>
          </div>

          <el-form-item>
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              type="password"
              tabindex="2"
              auto-complete="on"
            />
          </el-form-item>
          <el-alert v-show="isError" type="error" show-icon :closable="false" :title="errorText" />
          <el-button :loading="loading" type="primary" class="btn" @click.native.prevent="onLogin">登录</el-button>

          <div class="tips">
            <p class>
              没有账号
              <span @click="switchForm">立即注册</span>
            </p>
          </div>
        </el-form>

        <el-form
          v-if="!isRegist"
          ref="registForm"
          class="login-form"
          :model="registForm"
        >
          <div class="title-container">
            <h3 class="title">注册</h3>
          </div>
          <el-form-item>
            <el-input v-model="registForm.userName" placeholder="输入用户名" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="registForm.password" placeholder="输入密码" type="password" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="registForm.password2" placeholder="重复密码" type="password" />
          </el-form-item>

          <el-alert v-show="isError" type="error" show-icon :closable="false" :title="errorText" />

          <el-button :loading="loading" type="primary" class="btn" @click.native.prevent="onRegist">立即注册</el-button>

          <div class="tips">
            <p class>
              已有账号
              <span @click="switchForm">立即登录</span>
            </p>
          </div>
        </el-form>
      </div>

      <div v-if="isBusinessUnpass">
        <el-form
          v-if="!examineResult"
          ref="certificateForm"
          :model="certificateForm"
          auto-complete="on"
          class="organize-form"
        >
          <div class="title-container">
            <h3 class="title">蓝青教育----机构认证</h3>
          </div>

          <div class="cell">
            <div class="label">企业名称</div>
            <el-form-item>
              <el-input v-model.trim="certificateForm.enterpriseName" placeholder="请输入企业名称" />
            </el-form-item>
          </div>
          <div class="cell">
            <div class="label">银行开户名</div>
            <el-form-item>
              <el-input v-model.trim="certificateForm.bankName" placeholder="请输入银行开户名" />
            </el-form-item>
          </div>
          <div class="cell">
            <div class="label">开户银行</div>
            <el-form-item>
              <el-input v-model.trim="certificateForm.bankNo" placeholder="请输入开户银行" />
            </el-form-item>
          </div>
          <div class="cell">
            <div class="label">联系人</div>
            <el-form-item>
              <el-input v-model.trim="certificateForm.contacts" placeholder="请输入联系人" />
            </el-form-item>
          </div>
          <div class="cell">
            <div class="label">联系方式</div>
            <el-form-item>
              <el-input v-model.trim="certificateForm.contactInformation" placeholder="请输入联系方式" />
            </el-form-item>
          </div>
          <div class="cell ">
            <div class="label upload-label">办学许可证</div>
            <el-upload
              ref="schoolLicense"
              :action="uploadUrl"
              name="multipartFile"
              list-type="fileList"
              :on-remove="schoolLicenseRemove"
              :on-success="schoolLicenseuploadSuccess"
              :before-upload="beforeUpload"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
          <div class="cell ">
            <div class="label upload-label">民办非企业单位登记证</div>
            <el-upload
              :action="uploadUrl"
              name="multipartFile"
              list-type="fileList"
              :on-remove="registLicenceRemove"
              :on-success="registLicenceuploadSuccess"
              :before-upload="beforeUpload"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>

          <div class="cell">
            <div class="label upload-label">上传工商执照</div>
            <el-upload
              :action="uploadUrl"
              name="multipartFile"
              list-type="fileList"
              :on-remove="companeylLicenceRemove"
              :on-success="companeylLicenceuploadSuccess"
              :before-upload="beforeUpload"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>

          <div class="cell">
            <div class="label upload-label">上传Logo</div>
            <el-upload
              :action="uploadUrl"
              name="multipartFile"
              list-type="fileList"
              :on-remove="logoRemove"
              :on-success="logouploadSuccess"
              :before-upload="beforeUpload"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>

          <div>
            <el-checkbox v-model="certificateForm.joinTheFlowSupportPlan" true-label="1" false-label="0">是否加入流量扶持计划</el-checkbox>
          </div>

          <el-alert v-show="isError" type="error" show-icon :closable="false" :title="errorText" />

          <div>
            <el-button
              type="primary"
              class="btn btn-prove"
              @click="onProve('certificateForm')"
            >立即认证</el-button>
          </div>
        </el-form>

        <div v-if="examineResult" class="result-tip">
          <div v-if="examineResult=== -1">
            <div class="result-img-wraper">
              <img class="result-img" src="" alt="">
            </div>
            <p class="result-text">您的机构正在审核中请耐心等待…</p>
            <p class="result-text">请耐心等待…</p>
          </div>

          <div v-if="examineResult===0">
            <div class="result-img-wraper">
              <img class="result-img" src="" alt="">
            </div>
            <p class="result-text">恭喜你加入蓝青培训平台！</p>
            <router-link to="/">
              <el-button class="result-btn" type="primary">点击进入</el-button>
            </router-link>
          </div>

          <div v-if="examineResult===1">
            <div class="result-img-wraper" style="margin-top: 50px">
              <img class="result-img" src="" alt="">
            </div>
            <p class="result-text">审核失败</p>
            <p class="result-text">失败原因是：XXXXXX</p>
            <el-button class="result-btn" type="primary">重新提交审核</el-button>
          </div>
        </div>
      </div>

    </div>
    <div class="logo-wraper">
      <div class="logo"><img class="logo-img" src="" alt=""></div>
      <div class="logo-text">蓝青教育商户端</div>
    </div>

    <el-dialog
      :visible.sync="isShowDialog"
      width="392px"
      top="334px"
      custom-class="validcode-custom"
      class="validcode-dialog"
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
        <el-button type="primary" class="btn" @click="isShowDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Upload_Pic } from '@/api/URL.js'
import { getValidCode, register, postExamine } from '@/api/user.js'

export default {
  name: 'Login',
  data() {
    return {
      // 登录表单
      loginForm: {
        username: '',
        password: ''
      },
      loading: false,
      redirect: undefined,
      isRegist: true, // 是否注册  false 未注册

      // 注册表单
      registForm: {
        userName: '',
        password: '',
        password2: ''
      },

      // 验证码
      validCodeForm: {
        code: '',
        img: ''
      },

      // 机构认证表单
      certificateForm: {
        enterpriseName: '',
        bankName: '',
        bankNo: '',
        contacts: '',
        contactInformation: '',
        businessLicense: '',
        schoolLicense: '',
        registrationCertificateOfPrivateNonEnterpriseUnit: '',
        logo: '',
        joinTheFlowSupportPlan: '0'
      },
      isBusinessUnpass: false, // 机构 是否认证
      examineResult: '', // 认证结果 0:首次提交审核；1：被驳回再次提交审核；-1：已提交审核勿重复提交！
      uploadUrl: Upload_Pic, // 上传地址
      isShowDialog: false, // 验证码弹窗
      isSending: false,

      isError: false,
      errorText: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {

    // 注册 <--> 登录 表单切换
    switchForm() {
      this.isRegist = !this.isRegist
    },

    // 注册
    onRegist() {
      // 简易校验 表单提示
      const registForm = this.registForm
      if (!registForm.userName) {
        return this.showError('请输入用户名')
      }

      if (registForm.password <= 6) {
        return this.showError('密码长度不小于6位')
      }

      if (registForm.password !== registForm.password2) {
        return this.showError('两遍密码不一致')
      }

      // 缺少验证码
      if (!this.validCodeForm.code) {
        return this.getValidCodeImg().then(() => {
          this.isShowDialog = true
        })
      }

      register({
        code: this.validCodeForm.code,
        password: registForm.password,
        userName: registForm.userName
      }).then(res => {
        this.validCodeForm.code = ''
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.isRegist = true
        this.$success('注册成功，请再次登录')
      })
    },

    // 获取验证码图片
    getValidCodeImg() {
      let userName
      // 注册所需验证码
      if (!this.isRegist) {
        userName = this.registForm.userName
      } else {
      // 登录所需验证码
        userName = this.loginForm.username
      }

      if (!userName) return Promise.reject('缺少用户名')

      return getValidCode(userName).then(res => {
        if (res.code) {
          this.validCodeForm.code = ''
          return res.message && this.$warn(res.message)
        }
        this.validCodeForm.img = res.data
      })
    },

    // 登录
    onLogin() {
      // 简易校验 表单提示
      const loginForm = this.loginForm
      if (!loginForm.username) {
        return this.showError('请输入用户名')
      }

      if (loginForm.password <= 6) {
        return this.showError('密码长度不小于6位')
      }

      // 缺少验证码
      if (!this.validCodeForm.code) {
        return this.getValidCodeImg().then(() => {
          this.isShowDialog = true
        })
      }

      this.loading = true
      this.$store
        .dispatch('user/login', {
          code: this.validCodeForm.code,
          password: loginForm.password,
          username: loginForm.username
        })
        .then((res) => {
          this.loading = false
          this.validCodeForm.code = ''
          if (res.data === 'businessUnPassed') {
            this.isBusinessUnpass = true
          }

          // 通过验证 直接登录
          if (res.data === 'businessPassed') {
            this.isBusinessUnpass = false
            return this.$router.push({ path: this.redirect || '/' })
          }
        })
        .catch(() => {
          this.loading = false
          this.validCodeForm.code = ''
        })
    },

    // 认证
    onProve(form) {
      const certificateForm = this.certificateForm

      if (!certificateForm.enterpriseName) {
        return this.showError('请输入企业名称')
      }
      if (!certificateForm.bankName) {
        return this.showError('请输入银行开户名')
      }
      if (!certificateForm.bankNo) {
        return this.showError('请输入开户银行')
      }
      if (!certificateForm.contacts) {
        return this.showError('请输入联系人')
      }
      if (!certificateForm.contactInformation) {
        return this.showError('请输入联系方式')
      }
      if (!certificateForm.schoolLicense) {
        return this.showError('请上传办学许可')
      }
      if (!certificateForm.businessLicense) {
        return this.showError('请上传营业许可')
      }
      if (!certificateForm.registrationCertificateOfPrivateNonEnterpriseUnit) {
        return this.showError('请上传民办非企业单位登记证')
      }
      if (!certificateForm.logo) {
        return this.showError('请上传Logo')
      }

      postExamine(certificateForm).then(res => {
        res.message && this.$warn(res.message)
        this.examineResult = res.code
      })
    },

    // 上传图片大小限制
    beforeUpload(file) {
      const sizeBase = 1024
      const isCheck = file.size / sizeBase < 300
      if (!isCheck) {
        this.$warn('文件大于 300kb')
      }
      return isCheck
    },

    // 办学许可 上传成功
    schoolLicenseuploadSuccess(res, file) {
      this.certificateForm.schoolLicense = res.data
    },

    // 办学许可 删除
    schoolLicenseRemove(file, fileList) {
      this.certificateForm.schoolLicense = ''
    },

    // 登记证 上传成功
    registLicenceuploadSuccess(res, file) {
      this.certificateForm.registrationCertificateOfPrivateNonEnterpriseUnit = res.data
    },

    // 登记证 删除
    registLicenceRemove(file, fileList) {
      this.certificateForm.registrationCertificateOfPrivateNonEnterpriseUnit = ''
    },

    // logo 上传
    logouploadSuccess(res, file) {
      this.certificateForm.logo = res.data
    },

    // logo 删除
    logoRemove(file, fileList) {
      this.certificateForm.logo = ''
    },

    // 公司执照 上传成功
    companeylLicenceuploadSuccess(res, file) {
      this.certificateForm.businessLicense = res.data
    },
    // 公司执照删除
    companeylLicenceRemove(file, fileList) {
      this.certificateForm.businessLicense = ''
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

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #92929d;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 42px;
    width: 100%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #92929d;
      height: 42px;
      border-radius: 5px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }

       &:focus{
        border:1px solid rgba(0,210,165,1);
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(241, 241, 245, 1);
    background: rgba(250, 250, 251, 1);
    border-radius: 5px;
    color: #92929d;
    margin-bottom: 10px;
  }
}

.el-alert{
  &--error{
    background-color: transparent;
    color: #FC5A5A;
    margin: -8px 0 2px;
    padding-left: 5px
  }
}
</style>

<style lang="scss" scoped>
$bg: linear-gradient(to right, rgba(0, 214, 211, 1), rgba(0, 206, 124, 1));
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: $bg;
  overflow: hidden;
  position: relative;
  .bg-img{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    object-fit: cover;
  }
  .top-tip{
    font-size:13px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:13px;
    text-align: right;
    margin-right: 20px;
    margin-top: 20px;
  }
  .login-content{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .login-form {
    position: relative;
    box-sizing: border-box;
    width: 410px;
    background: #fff;
    max-width: 100%;
    padding: 30px 50px;
    margin: 274px auto 0;
    border-radius: 8px;
    overflow: hidden;
  }

  .tips {
    margin-top: 30px;
    font-size: 13px;
    color: #a8a8a8;
    text-align: right;
    cursor: pointer;
    span {
      color: #00d2a5;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .title-container {
    position: relative;
    .title {
      font-size: 22px;
      color: #171725;
      margin: 8px auto 22px;
      text-align: center;
      font-weight: bold;
    }
  }

  .validcode{
    display: flex;
    &-input{
      flex: 1;
      & > .el-form-item{
        margin-bottom: 0;
      }
    }
    &-img{
      display: inline-block;
      width: 98px;
      height: 42px;
      background: rgba(216, 216, 216, 1);
      border-radius: 4px;
      margin-left: 20px;
    }
    &-title{
      text-align: center;
      font-size: 14px;
      margin: 10px 0 0;
    }
    &-dialog{
      & /deep/ {
        & .el-dialog__body {
          padding: 10px 30px
        }
        & .el-dialog__footer{
          padding: 10px 30px 30px
        }
      }
    }
  }

  .user-contrast {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  .organize-form {
    width: 510px;
    margin: 80px auto;
    background: #fff;
    padding: 30px 50px;
    border-radius: 8px;
    overflow: hidden;
    & /deep/ .el-form-item__label {
      color: #fff;
    }

    .cell{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    .mb-18{
      margin-bottom: 18px;
    }
    .label {
      width: 79px;
      font-size: 13px;
      font-weight: 400;
      color: rgba(23, 23, 37, 1);
      font-weight: bold;
      text-align: right;
      margin-right: 20px;
    }
    .upload-label{
      line-height: 22px;
    }

    .el-form-item{
      flex: 1;
      margin-bottom: 0;
    }
    .el-upload__tip{
      font-size:11px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(157,157,167,1);
      line-height:11px;
    }
  }
  .result {
    &-tip{
      width:509px;
      height:330px;
      background:rgba(255,255,255,1);
      box-shadow:0px 1px 4px 0px rgba(44,90,74,0.21),0px -1px 0px 0px rgba(126,167,146,1);
      border-radius:8px;
      margin: 225px auto;
      text-align: center;
      overflow: hidden;
    }
    &-img-wraper{
      width:79px;
      height:79px;
      background-image:linear-gradient(90deg, rgba(0,214,211,1), rgba(0,206,124,1));
      border-radius: 50%;
      position: relative;
      margin: 0 auto;
      margin-bottom: 22px;
      object-fit: cover;
      margin-top: 80px;
    }
    &-img{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background: #fff;
      display: block;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
    }
    &-text{
      font-size:18px;
      font-weight:400;
      color:rgba(146,146,157,1);
      line-height:30px;
      margin: 0;
    }
    &-btn{
      margin-top: 27px;
    }
  }

  .btn {
    width: 100%;
  }
  .btn-prove{
    margin:10px 0;
  }
}

.logo-wraper{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
  left: 50%;
  width: 92px;
  transform: translateX(-50%);
  text-align: center;
}
.logo{
  width:64px;
  height:64px;
  background:rgba(255,255,255,1);
  border-radius:11px;
  margin: 0 auto;
  &-text{
    font-size:13px;
    font-weight:500;
    color:rgba(255,255,255,1);
    margin-top: 10px;
  }
}

</style>
