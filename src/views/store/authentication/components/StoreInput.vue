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
      <el-col :span="24">
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
    </el-row>

    <el-row>
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
      <el-col :span="12">
        <el-form-item label="背景视频">
          <el-upload
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
          </el-upload>
          <p class="upload-tips">视频只能上传一个，建议视频大小为750px560px。</p>
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
          <el-input v-model.number="form.studentAmount" placeholder="请输入累计学员区间，如200-300" />
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
        <el-button class="submit" :loading="videoLoading" @click="getStoreAdd">提交上架</el-button>
        <span v-show="videoLoading" class="el-form-item__error">请等待视频上传完成！</span>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { postStore } from '@/api/business'
import { Upload_Pic, Upload_Video } from '@/api/URL.js'
import { getChinaCity } from '@/api/globl'
import Tinymce from '@/components/Tinymce/index'

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
      CoverImgList: []
    }
  },
  watch: {
    list: {
      handler(val) {
        this.form = JSON.parse(JSON.stringify(this.list))
        for (const item of this.form.covers) {
          this.CoverImgList.push({
            url: item
          })
        }
        this.form.districtCode = this.form.areaCode
        this.getCityList()
        for (const item in this.chinaCity) {
          this.chinaCity[item] = this.form[item + 'Code']
          this.getCityList()
        }
      },
      deep: true
      // immediate: true
    }
  },
  mounted() {
    this.getCityList()
  },
  methods: {
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
      this.videoLoading = false
      if (res.code) {
        return res.message && this.$warn(res.message)
      }
      this.$success('视频上传成功！！！')
      this.form.videoInfo.videoCoverUrl = res.data.videoBase.coverURL
      this.form.videoInfo.videoUrl = res.data.playInfoList[0].playURL
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
}
</style>
