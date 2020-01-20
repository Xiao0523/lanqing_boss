<template>
  <section class="container">
    <div class="page-head-wraper">
      <page-head content="详情页面" @back="goBack" />
    </div>

    <div class="wraper">
      <el-form
        ref="content"
        :model="content"
        :rules="content"
        class="content"
        label-width="7em"
      >
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
        <el-form-item label="适合年龄段">
          <el-select v-model="ageStr" placeholder="请选择类目" @change="ageChange">
            <el-option
              v-for="item in ageList"
              :key="item.value + item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model.trim="content.name" placeholder="输入课程名称" />
        </el-form-item>
        <el-form-item v-show="!isAdd" label="状态">
          <el-radio v-model="content.status" label="0">启用</el-radio>
          <el-radio v-model="content.status" label="1">关闭</el-radio>
        </el-form-item>
        <el-form-item label="课程类目">
          <el-select v-model="categoryStr" placeholder="请选择类目" @change="cateChange">
            <el-option
              v-for="item in categoryValList"
              :key="item.categoryName + item.categoryId"
              :value="item.categoryName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="课程价格">
          <el-input v-model.number="content.price" placeholder="输入课程价格" @blur="isNumber('price')" />
        </el-form-item>
        <el-form-item label="开课日期">
          <el-date-picker v-model.trim="content.beginDate" type="date" placeholder="选择开课日期" />
        </el-form-item>
        <el-form-item label="课程时长">
          <el-input v-model.number="content.hours" placeholder="请输入课程时长" @blur="isNumber('hours')" />
        </el-form-item>
        <el-form-item label="课程登记人数">
          <el-input v-model.trim="content.enrolment" placeholder="请输入课程登记人数" />
        </el-form-item>

        <el-form-item label="课程标签">
          <el-input v-model.trim="content.tags" placeholder="请输入标签" />
          <div class="tags-msg">多个标识用半角逗号分隔</div>
        </el-form-item>

        <el-form-item label="课程文字描述">
          <el-input v-model.trim="content.detailWords" type="textarea" placeholder="输入课程标语" />
        </el-form-item>
        <el-form-item label="课程图片描述">
          <el-upload
            class="uploader"
            :action="uploadUrl"
            name="multipartFile"
            :show-file-list="false"
            :on-success="handleDetailSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="content.detailPic" :src="content.detailPic" class="avatar">
            <i v-else class="el-icon-picture uploader-icon" />
          </el-upload>
          <p class="upload-tips">只能上传jpg/png文件，建议尺寸为513x321px。</p>
          <input type="hidden">
        </el-form-item>
        <el-form-item label="课程标语">
          <el-input v-model.trim="content.slogans" type="textarea" placeholder="输入课程标语" />
        </el-form-item>
        <el-form-item label="推荐讲师">
          <el-select v-model="teacherStr" placeholder="可选择多个讲师" @change="teacherChange">
            <el-option
              v-for="item in teacherList"
              :key="item.id"
              :value="item.realName"
            />
          </el-select>
          <div v-for="(item, index) in teacherArr" :key="index" class="teacher">
            <img class="teacher-avatar" :src="item.photo" alt="头像">
            <div class="teacher-info">
              <h6 class="teacher-name">{{ item.realName }}</h6>
              <div class="teacher-slogan">{{ item.briefIntroduction }}</div>
            </div>
            <i class="el-icon-close teacher-close" @click="delTeacher(item, index)" />
          </div>
        </el-form-item>

        <el-form-item label="课程介绍">
          <el-upload
            class="student-uploader"
            name="multipartFile"
            list-type="picture-card"
            :action="uploadUrl"
            :on-success="handleIntroduceSuccess"
            :on-remove="handleIntroduceRemove"
            :file-list="introduceList"
          >
            <i class="el-icon-picture" />
            <div slot="tip" class="upload-tips">只能上传jpg/png文件。</div>
          </el-upload>
        </el-form-item>

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

        <el-form-item label="学员风采">
          <el-upload
            class="student-uploader"
            name="multipartFile"
            list-type="picture-card"
            :action="uploadUrl"
            :on-success="handleStudentSuccess"
            :on-remove="handleStudentRemove"
            :file-list="studentList"
          >
            <i class="el-icon-picture" />
            <div slot="tip" class="upload-tips">只能上传jpg/png文件。</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save('content')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </section>
</template>
<script>
import { getCategoryList, getCateTeacher } from '@/api/teacher'
import { addCourse, editCourse, getDetail } from '@/api/course'
import PageHead from '@/components/PageHead'
import { Upload_Pic, Upload_File } from '@/api/URL.js'
import { formatTime } from '@/utils/date'
export default {
  name: 'CourseEdit',
  components: { PageHead },
  data() {
    return {
      categoryStr: '',
      content: {
        ageInterval: '',
        beginDate: '',
        categoryId: '',
        cover: '',
        detailPic: '',
        detailWords: '',
        enrolment: '',
        hours: '',
        introduce: [],
        name: '',
        outline: '',
        price: '',
        slogans: '',
        studentStyle: [],
        tags: '',
        teachers: []
      },
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
      introduceList: [],
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
      ageStr: '',
      isAdd: true
    }
  },
  created() {
    this.getgetCategory()
    const id = this.$route.query.id
    if (id) {
      this.isAdd = false
      this.getView(id)
    }
  },
  methods: {
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
        this.content = res.data
        this.content.studentStyle.forEach(item => {
          this.studentList.push({
            url: item
          })
        })
        this.content.introduce.forEach(item => {
          this.introduceList.push({
            url: item
          })
        })
        this.content.price = Number(res.data.price)
        this.content.hours = Number(res.data.hours)
        this.teacherArr = this.content.teachers
        this.categoryStr = this.content.categoryName
        for (const item of this.ageList) {
          if (Number(this.content.ageInterval) === Number(item.value)) {
            this.ageStr = item.label
            break
          }
        }
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
    goBack() {
      this.$router.go(-1)
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
    handleIntroduceSuccess(res, file) {
      if (res.code) {
        return res.message && this.$warn(res.message)
      }
      if (!res.data) return
      this.content.introduce.push(res.data)
    },
    handleStudentSuccess(res, file) {
      if (res.code) {
        return res.message && this.$warn(res.message)
      }
      if (!res.data) return
      this.content.studentStyle.push(res.data)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
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
    handleIntroduceRemove(file, fileList) {
      if (file.status !== 'success') {
        return this.$warn('删除失败')
      }
      if (!file.url) return
      const index = this.content.introduce.indexOf(file.url)
      this.content.introduce.splice(index, 1)
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
        const saveObj = this.content
        const callFn = this.isAdd ? addCourse : editCourse
        if (typeof this.content.beginDate === 'object') {
          saveObj.beginDate = formatTime(this.content.beginDate.getTime(), 'YYYY-MM-DD')
        }
        saveObj.teachers = []
        this.teacherArr.forEach(item => {
          saveObj.teachers.push(item.id)
        })
        if (!this.isAdd) {
          saveObj.status = this.content.status
        }
        callFn(saveObj).then(res => {
          if (res.code) {
            return res.message && this.$warn(res.message)
          }
          this.$success(res.message)
          this.$router.push({ name: 'Course' })
        })
      })
    },
    // 类目选择改变
    cateChange() {
      this.teacherArr = []
      for (const item of this.categoryValList) {
        if (item.categoryName === this.categoryStr) {
          this.content.categoryId = item.categoryId
          break
        }
      }
      this.getTeacher()
    },
    // 课程适合年龄段
    ageChange() {
      for (const item of this.ageList) {
        if (item.label === this.ageStr) {
          this.content.ageInterval = item.value
          break
        }
      }
    },
    // 教师更改
    teacherChange() {
      for (const item of this.teacherArr) {
        if (item.realName === this.teacherStr) {
          this.$warn('请不要重复添加')
          this.teacherStr = ''
          return
        }
      }
      for (const item of this.teacherList) {
        if (item.realName === this.teacherStr) {
          this.teacherArr.push(item)
          this.teacherStr = ''
          break
        }
      }
    },
    // 获取类目教师
    getTeacher() {
      const submitObj = {
        id: this.content.categoryId
      }
      getCateTeacher(submitObj).then(res => {
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
    .el-upload--picture-card{
      border: 1px solid #DCDFE6;
      border-radius: 2px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      background: rgba(250, 250, 251, 1);
      width: 148px;
      height: 148px;
      line-height: 146px;
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
  font-size: 12px;
}
</style>
