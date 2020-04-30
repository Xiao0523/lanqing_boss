<template>
  <section class="container">
    <div class="page-head-wraper">
      <page-head :content="title" @back="goBack" />
    </div>

    <div class="wraper">
      <el-form
        ref="content"
        :model="content"
        :rules="content"
        class="content"
        label-width="7em"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="课程封面">
              <el-upload
                class="uploader"
                :action="uploadUrl"
                name="multipartFile"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="content.cover" :src="content.cover" class="avatar">
                <i v-else class="el-icon-picture uploader-icon" />
              </el-upload>
              <p class="upload-tips">只能上传jpg/png文件，建议尺寸为513x321px。</p>
              <input type="hidden">
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="学员风采">
              <el-upload
                class="student-uploader"
                name="multipartFile"
                list-type="picture-card"
                :action="uploadUrl"
                :on-success="handleStudentSuccess"
                :on-remove="handleStudentRemove"
                :file-list="studentList"
                :before-upload="beforeAvatarUpload"
              >
                <i class="el-icon-picture" />
                <div slot="tip" class="upload-tips">只能上传jpg/png文件，且最多上传9张，建议尺寸宽为750，高不宜超过1200px。</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="课程名称">
              <el-input v-model.trim="content.name" placeholder="请输入课程名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开课日期">
              <el-date-picker v-model.trim="content.beginDate" type="date" placeholder="请选择开课日期" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="课程价格">
              <el-input v-model.number="content.price" placeholder="请输入课程价格" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班型">
              <el-input v-model.number="content.enrolment" placeholder="请输入班级人数" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="适合年龄段">
              <el-select v-model="content.ageInterval" placeholder="请选择年龄段">
                <el-option
                  v-for="item in ageList"
                  :key="item.value + item.label"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程时长">
              <el-input v-model.number="content.hours" placeholder="请输入课程时长" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="课程类目">
              <el-select v-model="content.categoryId" placeholder="请选择课程类目" @change="cateChange">
                <el-option
                  v-for="item in categoryValList"
                  :key="item.categoryName + item.categoryId"
                  :value="item.categoryId"
                  :label="item.categoryName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程标签">
              <el-input v-model="content.tags" placeholder="请输入标签展示课程优势" />
              <div class="tags-msg">多个标识用半角逗号分隔</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="推荐讲师">
              <el-select
                v-model="content.teachers"
                multiple
                collapse-tags
                style="margin-left: 20px;"
                placeholder="请选择讲师"
              >
                <el-option
                  v-for="item in teacherList"
                  :key="item.id"
                  :label="item.realName"
                  :value="item.id"
                />
              </el-select>
              <el-button class="add-teacher-btn" @click="addTeacher">新增讲师</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程大纲">
              <el-upload
                :action="uploadFile"
                :before-upload="handlePdfPreview"
                :on-success="handlePdfSuccess"
                :on-remove="handlePdfRemove"
                :limit="1"
                name="multipartFile"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="upload-tips outline-tip">建议上传格式为pdf，以便用户手机下载预览。</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="简单描述">
              <el-input v-model="content.simpleWords" type="textarea" placeholder="请输入简单描述(最多30个字符)" :rows="2" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="课程介绍">
              <Tinymce v-model="content.detailWords" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="save('content')">保存</el-button>
          <el-button @click="goBack()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </section>
</template>

<script>
import { getTeacherList } from '@/api/teacher'
import { getCategoryList } from '@/api/categories'
import { addCourse, editCourse, getDetail } from '@/api/course'
import PageHead from '@/components/PageHead'
import { Upload_Pic, Upload_File } from '@/api/URL.js'
import { formatTime } from '@/utils/date'
import Tinymce from '@/components/Tinymce/index'
import { mixins } from '@/views/mixins'
import { setLocal, getLocal } from '@/utils/local'
export default {
  name: 'CourseEdit',
  components: { PageHead, Tinymce },
  mixins: [mixins],
  data() {
    return {
      categoryStr: '',
      content: {
        ageInterval: '',
        beginDate: '',
        categoryId: '',
        cover: '',
        detailWords: '',
        enrolment: '',
        hours: '',
        name: '',
        outline: '',
        price: '',
        studentStyle: [],
        tags: '',
        teachers: [],
        simpleWords: ''
      },
      title: '新增课程',
      teacherStr: '',
      isEdit: false,
      courseFormRules: {
      },
      teacherArr: [],
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      uploadUrl: Upload_Pic, // 图片上传地址
      uploadFile: Upload_File,
      isLeaveShow: false,
      categoryValList: [],
      teacherList: [],
      studentList: [],
      ageList: [{
        value: 0,
        label: '0-3'
      }, {
        value: 1,
        label: '3-6'
      }, {
        value: 2,
        label: '6-9'
      }, {
        value: 3,
        label: '9-12'
      }, {
        value: 4,
        label: '12-15'
      }, {
        value: 5,
        label: '15-18'
      }],
      isAdd: true
    }
  },
  created() {
    this.getgetCategory()
    if (getLocal('cursorView') && String(getLocal('cursorAdd'))) {
      this.content = getLocal('cursorView')
      this.isAdd = getLocal('cursorAdd')
      this.content.studentStyle.forEach(item => {
        this.studentList.push({
          url: item
        })
      })
      this.getTeacher()
      this.clearLocal()
      return
    }
    const id = this.$route.query.id
    if (id) {
      this.isAdd = false
      this.getView(id)
    }
  },
  methods: {
    clearLocal() {
      setLocal('cursorAdd', '')
      setLocal('cursorView', '')
    },
    addTeacher() {
      setLocal('cursorAdd', this.isAdd)
      setLocal('cursorView', this.content)
      this.$router.push({ name: 'TeacherEdit', query: { otherFlag: true }})
    },
    // 获取详细
    getView(id) {
      const getObj = {
        id: id
      }
      getDetail(getObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.content = JSON.parse(JSON.stringify(res.data))
        this.content.studentStyle.forEach(item => {
          this.studentList.push({
            url: item
          })
        })
        this.content.price = Number(res.data.price)
        this.content.hours = Number(res.data.hours)
        this.content.teachers = []
        res.data.teachers.forEach(v => {
          this.content.teachers.push(v.id)
        })
        this.getTeacher()
      })
    },
    // 获取分类
    getgetCategory() {
      getCategoryList().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.categoryValList = res.data
      })
    },
    cateChange() {
      this.content.teachers = []
      this.getTeacher()
    },
    handleAvatarSuccess(res, file) {
      if (res.code) {
        return res.message && this.$warn(res.message)
      }
      if (!res.data) return
      this.content.cover = res.data
    },
    handleDetailSuccess(res, file) {
      if (res.code) {
        return res.message && this.$warn(res.message)
      }
      if (!res.data) return
      this.content.detailPic = res.data
    },
    handleStudentSuccess(res, file) {
      if (res.code) {
        return res.message && this.$warn(res.message)
      }
      if (!res.data) return
      this.content.studentStyle.push(res.data)
    },
    beforeAvatarUpload(file) {
      const isImg = (file.type === 'image/jpeg' || file.type === 'image/png')
      if (!isImg) {
        this.$message.error('请上传JPG/PNG格式的图片')
      }
      return isImg
    },
    handlePdfSuccess(res, file) {
      if (res.code) {
        return res.message && this.$warn(res.message)
      }
      if (!res.data) return
      this.content.outline = res.data
    },
    handlePdfRemove() {
      this.content.outline = ''
    },
    handlePdfPreview(file) {
      const isPDF = file.type === 'application/pdf'
      const isLt2M = file.size / 1024 / 1024 < 200

      if (!isPDF) {
        this.$message.error('上传课程大纲只能是 PDF 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传课程大纲大小不能超过 200MB!')
      }
      return isLt2M && isPDF
    },
    handleStudentRemove(file, fileList) {
      if (file.status !== 'success') {
        return this.$warn('删除失败')
      }
      if (!file.url) return
      const index = this.content.studentStyle.indexOf(file.url)
      this.content.studentStyle.splice(index, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    delTeacher(item, index) {
      this.teacherArr.splice(index, 1)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 保存
    save(form) {
      this.$refs[form].validate(isValid => {
        if (!isValid) return
        const saveObj = JSON.parse(JSON.stringify(this.content))
        const callFn = this.isAdd ? addCourse : editCourse
        if (typeof this.content.beginDate === 'object') {
          saveObj.beginDate = formatTime(this.content.beginDate.getTime(), 'YYYY-MM-DD')
        }
        // if (!this.isAdd) {
        //   saveObj.teachers = []
        //   this.content.teachers.forEach(v => {
        //     saveObj.teachers.push(v.id)
        //   })
        // }
        callFn(saveObj).then(res => {
          if (res.code) {
            return res.message && this.$warn(res.message)
          }
          this.$success(res.message)
          this.$router.push({ name: 'Course' })
        })
      })
    },
    // 获取类目教师
    getTeacher() {
      const submitObj = {
        categoryId: this.content.categoryId,
        status: 0
      }
      getTeacherList(submitObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.teacherList = res.data
      })
    },
    isNumber(key) {
      if (typeof this.content[key] !== 'number') {
        this.$warn('必须是数字')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 30px;
}
.page-head-wraper{
  margin-bottom: 25px;
}
.wraper {
  background: #fff;
  padding: 30px;
}
.uploader {
  width: 128px;
  & /deep/ {
    & .el-upload {
      border: 1px solid #DCDFE6;
      border-radius: 2px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      background: rgba(250, 250, 251, 1);
      &:hover {
        border-color: rgba(0,210,165,1);
      }
    }
  }
  .uploader-icon {
    font-size: 18px;
    color:rgba(222,226,233,1);
    width: 128px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 128px;
    height: 80px;
    display: block;
    object-fit: scale-down;
  }
}
.course-uploader{
  width: 80px;
  .uploader-icon {
    width: 80px;
    height: 80px;
    line-height: 80px;
  }
  .avatar {
    width: 80px;
    height: 80px;
  }
}
.student-uploader{
  & /deep/ {
    .el-upload-list--picture-card .el-upload-list__item {
      width: 80px;
      height: 80px;
    }
    .el-upload--picture-card{
      border: 1px solid #DCDFE6;
      border-radius: 2px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      background: rgba(250, 250, 251, 1);
      width: 80px;
      height: 80px;
      line-height: 78px;
      &:hover {
        border-color: rgba(0,210,165,1);
      }

    }
    .el-icon-picture{
      color:rgba(222,226,233,1);
      font-size: 18px;
    }
  }
  .upload-tips{
    margin-top: 15px;
  }
}
.upload-tips{
  font-size:11px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(157,157,167,1);
  line-height:11px;
  margin: 0;
}
.outline-tip{
  margin-top: 14px;
}

.el-form-item {
  &__label {
    color: #333;
  }
}
.el-input {
  width: 240px;
  & /deep/ {
    .el-input__inner {
      background: rgba(250, 250, 251, 1);
      color: #333;
      font-weight: bold;
      &:focus {
        border-color: #00d2a5;
      }
    }
  }
}
.el-textarea{
  width: 390px;
  & /deep/ {
    .el-textarea__inner{
      background: rgba(250, 250, 251, 1);
      color: #333;
      font-weight: bold;
      &:focus {
        border-color: #00d2a5;
      }
    }
  }
}

/deep/ .el-select {
  width: 240px;
}

.street{
  margin-top: 15px;
}

.teacher{
  display: flex;
  align-items: center;
  width:390px;
  background:rgba(250,250,251,1);
  border-radius:2px;
  padding: 10px;
  margin-top: 10px;
  &-avatar{
    width:48px;
    height:48px;
  }
  &-info{
    flex: 1;
    margin-left: 10px;
  }
  &-name{
    font-size:15px;
    margin: 0;
    font-family:PingFangSC-Medium,PingFang SC;
    color:rgba(51,51,51,1);
    line-height:15px;
  }
  &-slogan{
    font-size:13px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(168,168,168,1);
    line-height:13px;
    margin-top: 9px;
  }
  &-close{
    font-size: 20px;
    color:rgba(168,168,168,1);
  }
}

.intro{
  margin-top: 20px;
}

.dialog-title {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: rgba(23, 23, 37, 1);
  line-height: 20px;
  margin: 0;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(241, 241, 245, 1);
}
.dialog-text {
  text-align: center;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(23, 23, 37, 1);
  line-height: 25px;
  font-weight: bold;
  margin-bottom: 0;
}
.dialog-footer {
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(241, 241, 245, 1);
}
.tags-msg {
  position: relative;
  top: 12px;
  font-size: 11px;
  font-weight: 400;
  color: #9d9da7;
  line-height: 11px;
  margin: 0;
}
/deep/ {
  .el-select {
    margin-left: 0 !important;
  }
}
.add-teacher-btn {
  display: block;
  padding: 0;
  width:74px;
  height:34px;
  background:rgba(0,210,165,1);
  border-radius:4px;
  font-size:13px;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:34px;
  text-align: center;
  margin-top: 10px;
}
</style>
