<template>
  <div class="login-container">
    <el-form
      v-if="examineResult === -1 && !loadFlag"
      ref="certificateForm"
      :model="certificateForm"
      auto-complete="on"
      class="organize-form"
    >
      <div class="title-container">
        <h3 class="title">机构认证</h3>
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

    <div v-if="examineResult !== -1 && !loadFlag" class="result-tip">
      <div v-if="examineResult === 0">
        <div class="result-img-wraper">
          <img class="result-img" src="" alt="">
        </div>
        <p class="result-text">您的机构正在审核中请耐心等待…</p>
        <p class="result-text">请耐心等待…</p>
      </div>

      <div v-if="examineResult === 2">
        <div class="result-img-wraper" style="margin-top: 50px">
          <img class="result-img" src="" alt="">
        </div>
        <p class="result-text">审核失败</p>
        <p class="result-text">反馈时间：{{ lastDate }}</p>
        <p class="result-text">失败原因是：{{ logInfo }}</p>
        <el-button class="result-btn" type="primary" @click="resetPost">重新提交审核</el-button>
      </div>
    </div>
    <div v-if="loadFlag" class="result-tip loader-box">
      <div class="loader" />
    </div>
  </div>
</template>

<script>
import { Upload_Pic } from '@/api/URL.js'
import { postExamine, getExamine } from '@/api/user.js'
import { formatTime } from '@/utils/date'

export default {
  name: 'Login',
  data() {
    return {
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
      examineResult: '', // 认证结果 -1/没有提交过/0待审/1审核通过/2被驳回
      uploadUrl: Upload_Pic, // 上传地址
      isError: false,
      errorText: '',
      loadFlag: true,
      tranTime: 2000,
      logInfo: '',
      lastDate: ''
    }
  },
  mounted() {
    getExamine().then(res => {
      if (res.code) {
        return res.message && this.$warn(res.message)
      }
      this.examineResult = !res.data ? -1 : res.data.status
      if (this.examineResult === 1) {
        this.$router.push({ name: 'Home' })
      }
      if (this.examineResult === 2) {
        this.lastDate = formatTime(res.data.latelySubmitDate)
        this.logInfo = res.data.logInfo
      }
      this.$store.commit('user/SET_STATUS', this.examineResult)
      setTimeout(() => {
        this.loadFlag = false
      }, this.tranTime)
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    // 获取商家信息列表
    getBusiness() {
      getExamine().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.examineResult = !res.data ? -1 : res.data.status
        if (this.examineResult === 1) {
          this.$router.push({ name: 'Home' })
        }
        if (this.examineResult === 2) {
          this.lastDate = formatTime(res.data.latelySubmitDate)
          this.logInfo = res.data.logInfo
        }
        this.$store.commit('user/SET_STATUS', this.examineResult)
        setTimeout(() => {
          this.loadFlag = false
        }, this.tranTime)
      }).catch(err => {
        console.log(err)
      })
    },
    // 认证
    onProve() {
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
        if (res.code && res.code !== 1 && res.code !== -1) {
          return res.message && this.$warn(res.message)
        }
        this.$success(res.message)
        this.getBusiness()
      })
    },
    // 重新提交
    resetPost() {
      this.examineResult = -1
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
@import '../../styles/login-global';
@import '../../styles/load';

.loader-box {
  font-size: 40px;
}
</style>
