<template>
  <section class="container">
    <div class="page-head-wraper">
      <page-head content="编辑讲师" @back="goBack" />
    </div>

    <div class="wraper">
      <el-form
        ref="courseForm"
        :model="content"
        :rules="courseFormRules"
        label-width="7em"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="讲师头像">
              <el-upload
                class="uploader"
                :action="uploadUrl"
                name="multipartFile"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="content.photo" :src="content.photo" class="avatar">
                <i v-else class="el-icon-picture uploader-icon" />
              </el-upload>
              <p class="upload-tips">只能上传jpg/png文件，建议尺寸为500x500px。</p>
              <input type="hidden">
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="奖牌/荣誉">
              <el-upload
                class="student-uploader"
                name="multipartFile"
                list-type="picture-card"
                :action="uploadUrl"
                :on-preview="handlePictureCardPreview"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :file-list="fileList"
              >
                <i class="el-icon-picture" />
                <div slot="tip" class="upload-tips">只能上传jpg/png文件，且最多上传9张，建议尺寸为750x750px。</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="讲师名称">
              <el-input v-model.trim="content.realName" placeholder="请输入讲师名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="讲师简介">
              <el-input v-model.trim="content.nickName" placeholder="请以简洁的语言突出讲师风采" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年龄">
              <el-input v-model.trim="content.age" class="slogan-input" placeholder="请输入讲师年龄" maxlength="3" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="教龄">
              <el-input v-model.trim="content.teachAge" class="slogan-input" placeholder="请输入讲师教龄" maxlength="3" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model.trim="content.contactPhone" class="slogan-input" placeholder="请输入讲师联系电话" maxlength="40" />
            </el-form-item>
          </el-col>
          <el-row>
            <el-col :span="12">
              <el-form-item label="累计课程数">
                <el-input v-model.trim="content.curriculumAmount" class="slogan-input" placeholder="请输入累计课程区间，如100-150" maxlength="40" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="课程类目">
              <el-transfer
                v-model="content.categoryViews"
                :data="categoriesValList"
                :props="{
                  key: 'categoryId',
                  label: 'categoryName'
                }"
                :titles="['未选', '已选']"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="累计学员数">
              <el-input v-model.trim="content.studentAmount" placeholder="请输入累计学员区间，如500-700 " />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="讲师标签">
              <el-input v-model.trim="content.performance" placeholder="输入标签展示讲师优势" />
              <div class="tags-msg">多个标识用半角逗号分隔</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="讲师介绍">
              <Tinymce />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="save">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </section>
</template>
<script>
import { getCategoryList, addTeacher, getDetail, editTeacher } from '@/api/teacher'
import PageHead from '@/components/PageHead'
import { Upload_Pic } from '@/api/URL.js'
import Tinymce from '@/components/Tinymce/index'
export default {
  name: 'CourseEdit',
  components: { PageHead, Tinymce },
  data() {
    return {
      content: {
        photo: '',
        nickName: '',
        realName: '',
        studentAmount: '',
        teachAge: '',
        performance: '',
        detailedDescription: '',
        curriculumAmount: '',
        contactPhone: '',
        briefIntroduction: '',
        age: '',
        categoryViews: [],
        achievements: []
      },
      categoriesValList: [],
      isEdit: false,
      courseFormRules: {},
      teacherArr: [{}],
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      uploadUrl: Upload_Pic, // 图片上传地址
      isAdd: true
    }
  },
  created() {
    this.getCategory()
    const id = this.$route.query.id
    if (id) {
      this.isAdd = false
      this.getView(id)
    }
  },
  methods: {
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
        this.content.achievements.forEach(item => {
          this.fileList.push({
            url: item
          })
        })
        const cateArr = []
        this.content.categoryViews.forEach(item => {
          cateArr.push(item.categoryId)
        })
        this.content.categoryViews = cateArr
      })
    },
    getCategory() {
      getCategoryList().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.categoriesValList = res.data
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    handleAvatarSuccess(res, file) {
      if (res.code) {
        return res.message & this.$warn(res.message)
      }
      if (!res.data) return
      this.content.photo = res.data
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    changeAge(str) {
      if (this.content[str] > 100) {
        this.content[str] = 100
      }
    },
    handleRemove(file, fileList) {
      if (file.status !== 'success') {
        return this.$warn('删除失败')
      }
      if (!file.url) return
      const index = this.content.achievements.indexOf(file.url)
      this.content.achievements.splice(index, 1)
    },
    handleSuccess(res, file) {
      if (res.code) {
        return res.message & this.$warn(res.message)
      }
      if (!res.data) return
      this.content.achievements.push(res.data)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    save() {
      const callBackFn = this.isAdd ? addTeacher : editTeacher
      const saveObj = this.content
      callBackFn(saveObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.$success(res.message)
        this.$router.push({ name: 'Teacher' })
      })
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
  width: 80px;
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
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
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
.slogan-input{
  width: 390px
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

</style>
