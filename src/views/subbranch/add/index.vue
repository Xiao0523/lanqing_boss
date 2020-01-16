<template>
  <section class="container">
    <el-form ref="submitForm" class="submitForm" label-width="7em" :model="form" :rules="rules">
      <el-form-item label="机构名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="联系人" prop="contactName">
        <el-input v-model="form.contactName" />
      </el-form-item>
      <el-form-item label="联系电话" prop="contactPhone">
        <el-input v-model="form.contactPhone" />
      </el-form-item>
      <el-form-item label="请选择地址">
        <div class="address">
          <el-select v-model="form.provinceStr" placeholder="请选择" @change="getSonList('province')">
            <el-option
              v-for="item in cityList.province"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
          <el-select v-model="form.cityStr" placeholder="请选择" @change="getSonList('city')">
            <el-option
              v-for="item in cityList.city"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
          <el-select v-model="form.districtStr" placeholder="请选择" @change="getSonList('district')">
            <el-option
              v-for="item in cityList.district"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
          <el-input v-model="form.businessAddress" class="input" />
        </div>
      </el-form-item>
      <el-form-item label="店铺封面">
        <el-upload
          :action="uploadUrl"
          name="multipartFile"
          list-type="picture-card"
          :file-list="CoverImgList"
          :on-preview="handlePicturePreview"
          :on-remove="handleCoversRemove"
          :on-success="handlePicctureCoversSuccess"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="店铺资质">
        <el-upload
          :action="uploadUrl"
          name="multipartFile"
          list-type="picture-card"
          :file-list="imgList"
          :on-preview="handlePicturePreview"
          :on-remove="handleRemove"
          :on-success="handlePicctureSuccess"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="学员数" prop="studentAmount">
        <el-input v-model="form.studentAmount" />
      </el-form-item>
      <el-form-item label="教员数" prop="teacherAmount">
        <el-input v-model="form.teacherAmount" />
      </el-form-item>
      <el-form-item label="营业时间" prop="businessHours">
        <el-input v-model="form.businessHours" />
      </el-form-item>
      <el-form-item label="课程数" prop="curriculumAmount">
        <el-input v-model="form.curriculumAmount" />
      </el-form-item>
      <el-form-item label="成立时间" prop="">
        <el-date-picker
          v-model="form.establishmentDate"
          type="date"
          placeholder="选择日期"
          :clearable="false"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="简介" prop="introduce">
        <el-input v-model="form.introduce" type="textarea" class="el-textarea" :rows="4" />
      </el-form-item>
      <el-form-item label="自我描述" prop="selfDescription">
        <el-input v-model="form.selfDescription" type="textarea" class="el-textarea" :rows="4" />
      </el-form-item>
      <el-form-item label="课程类目选择">
        <el-transfer
          v-model="form.categories"
          :data="categoriesValList"
          :props="{
            key: 'categoryId',
            label: 'categoryName'
          }"
          :titles="['未选', '已选']"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('submitForm')">提交</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="previewImg" alt>
    </el-dialog>
  </section>
</template>

<script>
import { Upload_Pic } from '@/api/URL'
import { getChinaCity } from '@/api/globl'
import { addBusiness, getBusinessView, editBusiness } from '@/api/subbranch'
import { getCategoriesList } from '@/api/categories'

export default {
  name: 'SubbranchDetail',
  data() {
    return {
      form: {
        name: '',
        businessAddress: '',
        businessAddressSystem: '',
        businessHours: '',
        contactName: '',
        contactPhone: '',
        covers: [],
        curriculumAmount: '',
        establishmentDate: '',
        introduce: '',
        qualifications: [],
        selfDescription: '',
        studentAmount: '',
        teacherAmount: '',
        categories: [],
        provinceCode: '',
        provinceStr: '',
        cityCode: '',
        cityStr: '',
        districtCode: '',
        districtStr: '',
        streetCode: ''
      },
      categoriesValList: [],
      rules: {
        name: [
          { required: true, message: '请填写店铺名称', trigger: 'blur' }
        ],
        // contactName: [
        //   { type: 'string', required: true, message: '请输入联系人', trigger: 'blur' }
        // ],
        // contactPhone: [
        //   { required: true, message: '请输入手机号码', trigger: 'blur' }
        // ],
        businessHours: [
          { required: true, message: '请选择营业时间', trigger: 'blur' }
        ],
        curriculumAmount: [
          { required: true, message: '请输入课程数', trigger: 'blur' }
        ],
        establishmentDate: [
          { required: true, message: '请输入成立时间', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入简介', trigger: 'blur' }
        ],
        selfDescription: [
          { required: true, message: '请输入自我描述', trigger: 'blur' }
        ],
        studentAmount: [
          { required: true, message: '请输入学员数', trigger: 'blur' }
        ],
        teacherAmount: [
          { required: true, message: '请输入教员数', trigger: 'blur' }
        ],
        provinceCode: [
          { required: true, message: '请选择区域', trigger: 'blur' }
        ],
        cityCode: [
          { required: true, message: '请选择区域', trigger: 'blur' }
        ],
        districtCode: [
          { required: true, message: '请选择区域', trigger: 'blur' }
        ],
        businessAddress: [
          { required: true, message: '请填写地址', trigger: 'blur' }
        ]
      },
      CoverImgList: [
        /* {
          url:
            'https://cdn.my51share.com/upload/2019-12-1017:19:045ea4fd9b6f43460581b456394edeadc3/TIM图片20190812164255.jpg'
        } */
      ],
      imgList: [],
      uploadUrl: Upload_Pic, // 图片上传地址
      catelogArr: [],
      courseSeverArr: [],
      previewImg: '',
      dialogVisible: false,
      chinaCity: {
        province: '',
        city: ''
      },
      cityList: {
        province: [{ name: '暂无数据' }],
        city: [{ name: '暂无数据' }],
        district: [{ name: '暂无数据' }]
      },
      isAdd: true
    }
  },
  created() {
    const id = this.$route.query.id
    if (id) {
      this.getView(id)
      this.isAdd = false
    }
    this.getCityList()
    this.getCategoriesValList()
  },
  methods: {
    // 获取详细
    getView(id) {
      const viewObj = {
        id: id
      }
      getBusinessView(viewObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.form = JSON.parse(JSON.stringify(res.data))
        this.form.categories = []
        res.data.categories.forEach(item => {
          this.form.categories.push(item.categoryId)
        })
        res.data.covers.forEach(item => {
          this.CoverImgList.push({
            url: item
          })
        })
        res.data.qualifications.forEach(item => {
          this.imgList.push({
            url: item
          })
        })
        this.form.districtCode = res.data.areaCode
        this.getCityList()
        for (const item in this.chinaCity) {
          this.chinaCity[item] = res.data[item + 'Code']
          this.getCityList()
        }
      })
    },
    // 获取课程类目
    getCategoriesValList() {
      getCategoriesList().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.categoriesValList = res.data
      })
    },
    // 获取城市列表
    getCityList() {
      getChinaCity(this.chinaCity).then(res => {
        console.log(res)
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
              this.form[keys + 'Str'] = item.name
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
          this.form.cityStr = ''
          this.chinaCity.province = ''
          this.chinaCity.city = ''
        case 'city':
          this.form.districtCode = ''
          this.form.districtStr = ''
          break
        default:
          break
      }
      const keyStr = this.form[key + 'Str']
      for (const item of this.cityList[key]) {
        if (item.name === keyStr) {
          this.form[key + 'Code'] = item.adcode
          this.chinaCity[key] = item.adcode
          if (key === 'district') {
            this.form.streetCode = item.adcode
          }
          break
        }
      }
      this.getCityList()
    },
    handleRemove(file, fileList) {
      if (file.status !== 'success') {
        return this.$warn('删除失败')
      }
      if (!file.url) return
      const index = this.form.qualifications.indexOf(file.url)
      this.form.qualifications.splice(index, 1)
    },
    handleCoversRemove(file, fileList) {
      if (file.status !== 'success') {
        return this.$warn('删除失败')
      }
      if (!file.url) return
      const index = this.form.covers.indexOf(file.url)
      this.form.covers.splice(index, 1)
    },
    handlePicturePreview(file) {
      this.previewImg = file.url
      this.dialogVisible = true
    },
    handlePicctureSuccess(res, file) {
      if (res.code) {
        return res.message && this.$warn(res.message)
      }
      if (!res.data) return
      this.form.qualifications.push(res.data)
    },
    handlePicctureCoversSuccess(res, file) {
      if (res.code) {
        return res.message && this.$warn(res.message)
      }
      if (!res.data) return
      this.form.covers.push(res.data)
    },
    onSubmit(form) {
      const callFn = this.isAdd ? addBusiness : editBusiness
      this.$refs[form].validate(isValid => {
        if (!isValid) return
        const addObj = this.form
        addObj.businessAddressSystem = addObj.provinceStr + addObj.cityStr + addObj.districtStr + addObj.businessAddress
        addObj.areaCode = addObj.districtCode
        if (!this.isAdd) {
          addObj.storeId = this.$route.query.id
        }
        callFn(addObj).then(res => {
          if (res.code) {
            return res.message && this.$warn(res.message)
          }
          this.$success(res.message)
          this.$router.push({ name: 'Subbranch' })
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
}

.uoload {
  width: 148px;
  height: 148px;
  line-height: 146px;
}

.avatar-uploader {
  width: 178px;
  & /deep/ {
    & .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409eff;
      }
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    object-fit: scale-down;
  }
}

.address-wraper {
  display: flex;
}
.address-detail {
  margin-left: 10px;
}
.el-input,
.el-textarea {
  width: 50%;
}

.address {
  display: flex;
  width: 60%;
  flex: 1;
  align-content: space-around;
  & > * {
    flex-grow: 1;
    margin: 0 .25em;
  }
  & > .input {
    flex-grow: 2
  }
}
</style>
