<template>
  <el-form
    ref="form"
    :model="form"
    class="content"
    label-width="7em"
  >
    <el-row>
      <el-col :span="24">
        <span class="line-tip">店铺信息</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="店铺logo">
          <el-upload
            class="uploader logo"
            :action="uploadUrl"
            name="multipartFile"
            :show-file-list="false"
            :on-success="handleLogoSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.logo" :src="form.logo" class="logo">
            <i v-else class="el-icon-picture uploader-icon" />
          </el-upload>
          <p class="upload-tips">只能上传jpg/png文件，建议尺寸为500x500px。</p>
          <input type="hidden">
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="店铺封面">
          <el-upload
            :action="uploadUrl"
            name="multipartFile"
            list-type="picture-card"
            :file-list="CoverImgList"
            :limit="9"
            :on-preview="handlePicturePreview"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleCoversRemove"
            :on-success="handlePicctureCoversSuccess"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <p class="upload-tips">只能上传jpg/png文件，且最多上传9张，建议尺寸为750x560px。</p>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="视频封面">
          <el-upload
            class="uploader logo"
            :action="uploadUrl"
            name="multipartFile"
            :show-file-list="false"
            :on-success="handleVideoSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.videoInfo.videoCoverUrl" :src="form.videoInfo.videoCoverUrl" class="logo">
            <i v-else class="el-icon-picture uploader-icon" />
          </el-upload>
          <p class="upload-tips">只能上传jpg/png文件，建议尺寸为500x500px。</p>
          <input type="hidden">
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="背景视频">
          <!-- <el-upload
            class="uploader"
            :action="videoUrl"
            name="multipartFile"
            :show-file-list="false"
            :before-upload="showMock"
            :on-success="handleVideoSuccess"
            :on-remove="handleVideoRemove"
          >
            <img v-if="form.videoInfo && form.videoInfo.videoCoverUrl" :src="form.videoInfo.videoCoverUrl" class="logo">
            <i v-else class="el-icon-picture uploader-icon" />
          </el-upload> -->

          <div class="upload-box">
            <input v-show="false" ref="input" type="file" accept="video/*" @change="fileChange">
            <el-button :disabled="disableUpload" size="small" type="primary" @click="$refs.input.click()">
              上传视频
            </el-button>
            <el-progress v-show="percentage" :percentage="percentage" :stroke-width="26" :text-inside="true" :color="customColors" class="progress" />
          </div>
          <p class="upload-tips">视频只能上传一个。</p>
          <input type="hidden">
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="营业时间">
          <el-input v-model="form.businessHours" placeholder="请输入营业时间" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="成立时间">
          <el-date-picker
            v-model="form.establishmentDate"
            type="date"
            placeholder="选择日期"
            :clearable="false"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="联系人">
          <el-input v-model="form.contactName" placeholder="请输入联系人" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系电话">
          <el-input v-model="form.contactPhone" placeholder="请输入联系电话" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="讲师数">
          <el-input v-model="form.teacherAmount" placeholder="请输入讲师数" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="累计学员">
          <el-input v-model="form.studentAmount" placeholder="请输入累计学员区间，如200-300" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="课程数">
          <el-input v-model="form.curriculumAmount" placeholder="请输入课程数" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="店铺标语">
          <el-input v-model="form.selfDescription" placeholder="请以简洁的语言突出店铺优势" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="店铺地址">
          <div class="address">
            <el-row>
              <el-select v-model="form.provinceName" class="select" placeholder="请选择" @change="getSonList('province')">
                <el-option
                  v-for="item in cityList.province"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
              <el-select v-model="form.cityName" class="select" placeholder="请选择" @change="getSonList('city')">
                <el-option
                  v-for="item in cityList.city"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
              <el-select v-model="form.districtName" class="select" placeholder="请选择" @change="getSonList('district')">
                <el-option
                  v-for="item in cityList.district"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
              <el-select v-model="form.streetName" class="select" placeholder="请选择" @change="getSonList('street')">
                <el-option
                  v-for="item in cityList.street"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-row>
            <el-input v-model="form.businessAddress" class="input" type="textarea" placeholder="输入详细地址" />
          </div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="店铺介绍">
          <Tinymce v-model="form.introduce" />
        </el-form-item>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="24">
        <span class="line-tip">绑定手机号（用以接收新增订单时的短信推送）</span>
      </el-col>
    </el-row> -->
    <el-row>
      <el-col :span="24">
        <el-button class="submit" @click="getStoreAdd">提交上架</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { postStore } from '@/api/business'
import { Upload_Pic, Upload_Video } from '@/api/URL.js'
import { getChinaCity } from '@/api/globl'
import Tinymce from '@/components/Tinymce/index'
import { getUploadInfo } from '@/api/uploadInfo'

export default {
  name: 'AuthInput',
  components: {
    Tinymce
  },
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
      form: {
        logo: '',
        covers: [],
        videoInfo: {
          videoCoverUrl: '',
          videoUrl: ''
        },
        businessHours: '',
        establishmentDate: '',
        contactName: '',
        contactPhone: '',
        teacherAmount: '',
        studentAmount: '',
        curriculumAmount: '',
        selfDescription: '',
        introduce: '',
        provinceCode: '',
        provinceName: '',
        cityCode: '',
        cityName: '',
        districtCode: '',
        districtName: '',
        streetCode: '',
        streetName: ''
      },
      chinaCity: {
        province: '',
        city: '',
        district: ''
      },
      securityToken: '',
      accessKeyId: '',
      accessKeySecret: '',
      disableUpload: false,
      disableSubmit: true,
      uploadFile: null,
      uploader: null,
      callback: null,
      percentage: 0,
      // 接口返回列表
      cityList: {
        province: [],
        city: [],
        district: [],
        street: []
      },
      videoUrl: Upload_Video, // 视频上传地址
      uploadUrl: Upload_Pic, // 图片上传地址
      videoLoading: false,

      customColors: [
        { color: '#409eff', percentage: 20 },
        { color: '#409eff', percentage: 40 },
        { color: '#409eff', percentage: 60 },
        { color: '#409eff', percentage: 80 },
        { color: '#409eff', percentage: 100 }
      ],
      CoverImgList: []
    }
  },
  watch: {
    list: {
      handler(val, newVal) {
        console.log(val, newVal)
        this.form = newVal || val
        if (!newVal || (newVal && !(JSON.stringify(newVal.covers) === JSON.stringify(val.covers)))) {
          this.covers = []
          for (const item of this.form.covers) {
            this.CoverImgList.push({
              url: item
            })
          }
        }
        this.form.districtCode = this.form.areaCode
        if (!this.form.districtCode || (newVal && (newVal.areaCode === val.areaCode))) return
        this.getCityList()
        for (const item in this.chinaCity) {
          this.chinaCity[item] = this.form[item + 'Code']
          this.getCityList()
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.getCityList()
  },
  methods: {
    fileChange() {
      if (!event.target.files[0]) {
        return false
      }
      if (!event.target.files[0].type.match('video.*')) {
        this.$message.error('请选择视频文件')
        return false
      }
      this.uploadFile = event.target.files[0]
      this.percentage = 0
      // 上传文件的size的单位为 字节(B)
      // 150兆字节(mb) = 157286400字节(B)
      if (this.uploadFile.size <= 10485760) {
        this.getAuth(() => {
          // 给uploader大佬addFile
          this.getUploder()
          // 以下三个参数默认为空
          // var endpoint = ''
          // var bucket = ''
          // var objectPre = ''
          // if(objectPre)
          // {
          //     object = objectPre +"/"+ event.target.files[i].name
          // }
          // STS的上传方式，需要在userData里指定Title
          var userData = '{"Vod":{"StorageLocation":"","Title":"' + this.uploadFile.name + '","Description":"默认描述信息暂无","CateId":"19","Tags":"测试视频"}}'
          this.uploader.addFile(this.uploadFile, '', '', '', userData)
          this.uploader.startUpload()
          this.disableSubmit = false
        })
      } else {
        this.disableSubmit = true
        this.$message.error('上传的文件大小超过10M，请重新上传')
      }
    },
    getAuth(callback) {
      // 获取上传凭证
      const getObj = {
        uuid: JSON.parse(localStorage.getItem('storeId'))
      }
      getUploadInfo(getObj).then(res => {
        this.securityToken = res.credentials.securityToken
        this.accessKeyId = res.credentials.accessKeyId
        this.accessKeySecret = res.credentials.accessKeySecret
        callback()
      })
    },
    getUploder() {
      const _this = this
      /* eslint-disable no-undef */
      _this.uploader = new AliyunUpload.Vod({ // 分片大小默认1M，不能小于100K
        userId: '1402947514567452',
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 是否上报上传日志到点播，默认为true
        enableUploadProgress: true,
        // 文件上传失败
        'onUploadFailed': function(uploadInfo, code, message) {
          _this.$message.error(`文件上传失败：${message}`)
          // log(`onUploadFailed: file:${uploadInfo.file.name},code:${code}, message:${message}`)
          _this.disableSubmit = true
          _this.disableUpload = false
        },
        // 文件上传完成
        'onUploadSucceed': function(uploadInfo) {
          console.log(uploadInfo)
          // log(uploadInfo)
          // console.log(`onUploadSucceed: ${uploadInfo.file.name}, endpoint:${uploadInfo.endpoint}, bucket:${uploadInfo.bucket}, object:${uploadInfo.object}`)
          _this.form.videoInfo.videoUrl = `https://video.my51share.com/${uploadInfo.object}`
          console.log(_this.form.videoInfo)
          _this.$message.success('文件上传成功')
          _this.disableSubmit = true
          _this.disableUpload = false
        },
        // 文件上传进度
        'onUploadProgress': function(uploadInfo, totalSize, loadedPercent) {
          _this.percentage = +(loadedPercent * 100).toFixed(0)
          // log(`onUploadProgress:file:${uploadInfo.file.name}, fileSize:${totalSize}, percent:${(loadedPercent * 100.00).toFixed(2)}%`)
        },
        // STS临时账号会过期，过期时触发函数
        'onUploadTokenExpired': function(uploadInfo) {
          console.log('onUploadTokenExpired STS临时账号过期了')
          // 实现时，从新获取STS临时账号用于恢复上传
          // uploader.resumeUploadWithSTSToken(accessKeyId, accessKeySecret, securityToken, expireTime)
        },
        'onUploadCanceled': function(uploadInfo) {
          console.log(`onUploadCanceled:file:${uploadInfo.file.name}`)
        },
        // 开始上传
        'onUploadstarted': function(uploadInfo) {
          var accessKeyId = _this.accessKeyId
          var accessKeySecret = _this.accessKeySecret
          var securityToken = _this.securityToken
          _this.uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, securityToken)
        },
        'onUploadEnd': function(uploadInfo) {
          console.log('onUploadEnd: uploaded all the files')
        }
      })
    },
    // 获取城市列表
    getCityList() {
      getChinaCity(this.chinaCity).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        const data = res.data
        const keys = data[0].level
        this.cityList[keys] = data
        if (this.form[keys + 'Code']) {
          for (const item of data) {
            if (this.form[keys + 'Code'] === item.adcode) {
              if (keys === 'street') return
              this.form[keys + 'Name'] = item.name
              return
            }
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getSonList(key) {
      switch (key) {
        case 'province':
          this.form.cityCode = ''
          this.form.cityName = ''
          this.chinaCity.province = ''
          this.chinaCity.city = ''
          this.cityList.city = []
        case 'city':
          this.form.districtCode = ''
          this.form.districtName = ''
          this.chinaCity.district = ''
          this.cityList.district = []
        case 'district':
          this.form.streetCode = ''
          this.form.streetName = ''
          this.cityList.street = []
          break
        default:
          break
      }
      const keyStr = this.form[key + 'Name']
      for (const item of this.cityList[key]) {
        if (item.name === keyStr) {
          this.form[key + 'Code'] = item.adcode
          this.chinaCity[key] = item.adcode
          break
        }
      }
      if (key === 'street') return
      this.getCityList()
    },
    getStoreAdd() {
      if (!this.form.covers.length && !this.form.videoInfo.videoUrl) {
        return this.$warn('店铺视频或店铺封面必须上传其中之一！！！')
      }
      const getObj = this.form
      getObj.businessAddressSystem = getObj.provinceName + getObj.cityName + getObj.districtName + getObj.streetName + getObj.businessAddress
      getObj.areaCode = getObj.districtCode
      postStore(getObj).then(res => {
        if (res.code) return this.$warn(res.message)
        this.$success(res.message)
        this.$emit('listOk')
      })
    },
    handleLogoSuccess(res, file) {
      if (res.code) {
        return res.message & this.$warn(res.message)
      }
      if (!res.data) return
      this.form.logo = res.data
    },
    handleCoversRemove(file, fileList) {
      if (file.status !== 'success') {
        return
      }
      if (!file.url) return
      const index = this.form.covers.indexOf(file.url)
      this.form.covers.splice(index, 1)
    },
    handleSchoolSuccess(res, file) {
      if (res.code) {
        return res.message & this.$warn(res.message)
      }
      if (!res.data) return
      this.form.covers = res.data
    },
    beforeAvatarUpload(file) {
      const isImg = (file.type === 'image/jpeg' || file.type === 'image/png')

      if (!isImg) {
        this.$message.error('请上传JPG/PNG格式的图片')
      }
      return isImg
    },
    handleVideoSuccess(res, file) {
      if (res.code) {
        return res.message && this.$warn(res.message)
      }
      this.$success('上传成功！！！')
      this.form.videoInfo.videoCoverUrl = res.data
    },
    handleVideoRemove() {
      this.videoLoading = false
      this.form.videoInfo.videoCoverUrl = ''
      this.form.videoInfo.videoUrl = ''
    },
    showMock() {
      this.videoLoading = true
    },
    handlePicturePreview(file) {
      this.previewImg = file.url
      this.dialogVisible = true
    },
    handlePicctureCoversSuccess(res, file) {
      if (res.code) {
        return res.message && this.$warn(res.message)
      }
      if (!res.data) return
      console.log('执行了')
      this.form.covers.push(res.data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../styles/store';
.content {
  .select {
    width: 120px;
    margin-right: 6px;
    /deep/ {
      &.el-input__inner {
        width: 120px;
      }
    }
  }
  .input {
    width: 510px;
    margin-top: 15px;
    height: 100px;
    /deep/ {
      &.el-textarea__inner {
        height: 100px;
        background:rgba(250,250,251,1);
        border:1px solid rgba(241,241,245,1);
        font-size:13px;
        font-weight:400;
        color:rgba(146,146,157,1);
        line-height:13px;
        padding: 15px
      }
    }
  }
  .uploader {
    display: block;
    width: 107px;
    height: 80px;
  }
  .logo {
    display: block;
    width: 107px;
    height: 80px;
  }
  .upload-tips {
    margin-top: 15px;
  }
  /deep/ {
    .el-upload--picture-card {
      width: 107px;
      height: 80px;
      line-height: 90px;
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width: 107px;
      height: 80px;
    }
  }
  .progress {
    margin-top: 10px;
  }
}
</style>
