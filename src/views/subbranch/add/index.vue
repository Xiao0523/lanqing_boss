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
          <el-input v-model="form.contactPhone" class="input" />
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
        />
      </el-form-item>
      <el-form-item label="简介" prop="introduce">
        <el-input v-model="form.introduce" type="textarea" class="el-textarea" :rows="4" />
      </el-form-item>
      <el-form-item label="自我描述" prop="selfDescription">
        <el-input v-model="form.selfDescription" type="textarea" class="el-textarea" :rows="4" />
      </el-form-item>
      <el-form-item label="课程类目选择">
        <el-select v-model="categoriesVal" multiple placeholder="请选择">
          <el-option
            v-for="item in categoriesValList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <router-link :to="{name: 'Category'}">设置</router-link>
      </el-form-item>

      <!-- <el-form-item label="机构地址">
        <div class="address-wraper">
          <el-cascader v-model="content.area" :options="options" :show-all-levels="false" />
          <el-input v-model="content.address" class="address-detail" />
        </div>
      </el-form-item>

      <el-form-item label="联系人">
        <el-input v-model.trim="content.contact" />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model.trim="content.phone" />
      </el-form-item>

      <el-form-item label="机构标语">
        <el-input v-model="content.slogan" />
      </el-form-item>

      <el-form-item label="机构简介">
        <el-input v-model.trim="content.intro" type="textarea" />
      </el-form-item>

      <el-form-item label="课程服务标签">
        <el-select value placeholder="请选择" />

        <span v-for="(item, index) in courseSeverArr" :key="index">
          <el-select v-model="item.catelogVal" placeholder="请选择" />
          <i class="el-icon-minus" @click="delCourseSever(item, index)" />
        </span>

        <el-button icon="el-icon-plus" circle @click="addCourseSever" />
      </el-form-item>

      <el-form-item label="课程类目选择">
        <el-select value placeholder="请选择" />

        <span v-for="(item, index) in catelogArr" :key="index">
          <el-select v-model="item.catelogVal" placeholder="请选择" />
          <i class="el-icon-minus" @click="delCatelog(item, index)" />
        </span>

        <el-button icon="el-icon-plus" circle @click="addCatelog" />
        <router-link :to="{name: 'Category'}">设置</router-link>
      </el-form-item> -->

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
import { addBusiness } from '@/api/subbranch'
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
        categories: '',
        provinceCode: '',
        provinceStr: '',
        cityCode: '',
        cityStr: '',
        districtCode: '',
        districtStr: '',
        streetCode: ''
      },
      categoriesVal: [],
      categoriesValList: [],
      rules: {
        name: [
          { required: true, message: '请填写店铺名称', trigger: 'blur' }
        ],
        contactName: [
          { type: 'string', required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { type: 'number', min: 11, max: 11, required: true, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        businessHours: [
          { required: true, message: '请选择营业时间', trigger: 'blur' }
        ],
        curriculumAmount: [
          { required: true, message: '请输入课程数', trigger: 'blur' },
          { type: 'number', required: true, message: '课程数必须是数字', trigger: 'blur' }
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
          { required: true, message: '请输入学员数', trigger: 'blur' },
          { type: 'number', required: true, message: '学员数必须是数字', trigger: 'blur' }
        ],
        teacherAmount: [
          { required: true, message: '请输入教员数', trigger: 'blur' },
          { type: 'number', required: true, message: '教员数必须是数字', trigger: 'blur' }
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
      }
    }
  },
  created() {
    this.getCityList()
    this.getCategoriesValList()
  },
  methods: {
    // 获取课程类目
    getCategoriesValList() {
      getCategoriesList().then(res => {
        console.log(res)
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
      const res = file.response
      if (!res.data) return
      const index = this.form.qualifications.indexOf(res.data)
      this.form.qualifications.splice(index, 1)
    },
    handleCoversRemove(file, fileList) {
      const res = file.response
      if (!res.data) return
      const index = this.form.covers.indexOf(res.data)
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
    delCourseSever(item, index) {
      this.courseSeverArr.splice(index, 1)
    },
    addCourseSever() {
      this.courseSeverArr.push({
        catelogVal: ''
      })
    },
    delCatelog(item, index) {
      this.catelogArr.splice(index, 1)
    },
    addCatelog() {
      this.catelogArr.push({
        catelogVal: ''
      })
    },
    onSubmit(form) {
      this.$refs[form].validate(isValid => {
        if (!isValid) return
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
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
