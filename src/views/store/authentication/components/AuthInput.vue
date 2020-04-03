<template>
  <el-form
    ref="authList"
    :model="authList"
    class="content"
    label-width="7em"
  >
    <el-row>
      <el-col :span="24">
        <span class="line-tip">店铺基本信息</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="店铺名称">
          <el-input v-model.number="authList.name" placeholder="请输入店铺名称" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="统一信用代码">
          <el-input v-model.number="authList.unifiedCreditCode" placeholder="请输入统一信用代码" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="法人姓名">
          <el-input v-model.number="authList.legalPersonName" placeholder="请输入法人姓名" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="法人身份证号">
          <el-input v-model.number="authList.legalPersonCardId" placeholder="请输入法人身份证号" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="银行卡号">
          <el-input v-model.number="authList.bankNo" placeholder="请输入银行卡号" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="银行名称">
          <el-input v-model.number="authList.bankName" placeholder="请输入银行名称" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <span class="line-tip">店铺证件信息</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="工商营业执照">
          <el-upload
            class="uploader"
            :action="uploadUrl"
            name="multipartFile"
            :show-file-list="false"
            :on-success="handleBusinessSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="authList.businessLicense" :src="authList.businessLicense" class="avatar">
            <i v-else class="el-icon-picture uploader-icon" />
          </el-upload>
          <p class="upload-tips">5M以内，JPG/PNG格式的图片，请勿提供虚假证件</p>
          <input type="hidden">
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="办学许可证">
          <el-upload
            class="uploader"
            :action="uploadUrl"
            name="multipartFile"
            :show-file-list="false"
            :on-success="handleSchoolSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="authList.schoolLicense" :src="authList.schoolLicense" class="avatar">
            <i v-else class="el-icon-picture uploader-icon" />
          </el-upload>
          <p class="upload-tips">5M以内，JPG/PNG格式的图片，请勿提供虚假证件</p>
          <input type="hidden">
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <span class="line-tip">协议文档</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="doc">
        <el-checkbox v-model="readed" class="checked" />我已阅读<router-link to="#" class="doc-link">《蓝青合作协议》</router-link>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button class="submit" @click="getStoreAdd">提交认证</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { postExamine } from '@/api/business'
import { Upload_Pic } from '@/api/URL.js'
export default {
  name: 'AuthInput',
  props: {
    list: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      authList: {
        name: '',
        bankName: '',
        bankNo: '',
        businessLicense: '',
        legalPersonCardId: '',
        legalPersonName: '',
        schoolLicense: '',
        storeId: '',
        unifiedCreditCode: ''
      },
      readed: true,
      uploadUrl: Upload_Pic // 图片上传地址
    }
  },
  watch: {
    list: {
      handler(val) {
        this.authList = this.list
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    if (!this.list.length) return
    this.authList = this.list
  },
  methods: {
    getStoreAdd() {
      if (!this.readed) {
        return this.$warn('请先勾选合作协议')
      }
      const getObj = this.authList
      postExamine(getObj).then(res => {
        if (res.code) return this.$warn(res.message)
        this.$success(res.message)
        this.$emit('authOK')
      })
    },
    handleBusinessSuccess(res, file) {
      if (res.code) {
        return res.message & this.$warn(res.message)
      }
      if (!res.data) return
      this.authList.businessLicense = res.data
    },
    handleSchoolSuccess(res, file) {
      if (res.code) {
        return res.message & this.$warn(res.message)
      }
      if (!res.data) return
      this.authList.schoolLicense = res.data
    },
    beforeAvatarUpload(file) {
      const isImg = (file.type === 'image/jpeg' || file.type === 'image/png')

      if (!isImg) {
        this.$message.error('请上传JPG/PNG格式的图片')
      }
      return isImg
    },
    handleRemove(file, fileList) {
      if (file.status !== 'success') {
        return this.$warn('删除失败')
      }
      if (!file.url) return
      const index = this.content.achievements.indexOf(file.url)
      this.content.achievements.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../styles/store';
</style>
