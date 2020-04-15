<template>
  <section class="container">
    <div class="page-head-wraper">
      <page-head content="编辑讲师" @back="goBack" @click="clearLocal" />
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
                :action="uploadUrl"
                name="multipartFile"
                list-type="picture-card"
                :file-list="AchievementsImgList"
                :limit="9"
                :before-upload="beforeAvatarUpload"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
              >
                <i class="el-icon-plus" />
                <div slot="tip" class="el-upload__tip upload-tips-color">只能上传jpg/png文件，且最多上传9张，建议尺寸为750x560px。</div>
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
              <el-input v-model.trim="content.briefIntroduction" placeholder="请以简洁的语言突出讲师风采" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年龄">
              <el-input v-model.trim="content.age" placeholder="请输入讲师年龄" maxlength="3" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="教龄">
              <el-input v-model.trim="content.teachAge" placeholder="请输入讲师教龄" maxlength="3" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model.trim="content.contactPhone" placeholder="请输入讲师联系电话" maxlength="40" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="累计课程数">
              <el-input v-model.trim="content.curriculumAmount" placeholder="请输入累计课程区间，如10-50" maxlength="40" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="课程类目">
              <el-select
                v-model="content.categoryViews"
                multiple
                collapse-tags
                style="margin-left: 20px;"
                placeholder="请选择类目"
              >
                <el-option
                  v-for="item in categoriesValList"
                  :key="item.categoryId"
                  :label="item.categoryName"
                  :value="item.categoryId"
                />
              </el-select>
              <p class="upload-tips addCategories" @click="addCategories">保存当页，前往添加类目</p>
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
              <el-input v-model.trim="content.tags" placeholder="输入标签展示讲师优势" />
              <div class="tags-msg">多个标识用半角逗号分隔</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="讲师介绍">
              <Tinymce v-model="content.detailedDescription" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="save">提交</el-button>
          <el-button @click="goBack();clearLocal();">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </section>
</template>
<script>
import { addTeacher, getDetail, editTeacher } from '@/api/teacher'
import { getCategoryList } from '@/api/categories'
import PageHead from '@/components/PageHead'
import { setLocal, getLocal } from '@/utils/local'
import { Upload_Pic } from '@/api/URL.js'
import Tinymce from '@/components/Tinymce/index'
import { mixins } from '@/views/mixins'
export default {
  name: 'CourseEdit',
  components: { PageHead, Tinymce },
  mixins: [mixins],
  data() {
    return {
      content: {
        achievements: [],
        age: '',
        briefIntroduction: '',
        categoryViews: [],
        contactPhone: '',
        curriculumAmount: '',
        detailedDescription: '',
        photo: '',
        realName: '',
        studentAmount: '',
        tags: '',
        teachAge: ''
      },
      AchievementsImgList: [],
      categoriesValList: [],
      courseFormRules: {},
      teacherArr: [{}],
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      uploadUrl: Upload_Pic, // 图片上传地址
      isAdd: true,
      otherFrom: false
    }
  },
  created() {
    this.getCategory()

    const other = this.$route.query.otherFlag
    if (String(other)) this.otherFrom = other
    if (getLocal('teacherView') && String(getLocal('teacherAdd')) && !this.otherFrom) {
      this.content = getLocal('teacherView')
      this.isAdd = getLocal('teacherAdd')
      this.content.achievements.forEach(item => {
        this.AchievementsImgList.push({
          url: item
        })
      })
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
      setLocal('teacherAdd', '')
      setLocal('teacherView', '')
    },
    addCategories() {
      setLocal('teacherAdd', this.isAdd)
      setLocal('teacherView', this.content)
      this.$router.push({ name: 'CategoryList', query: { otherFlag: true }})
    },
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
          this.AchievementsImgList.push({
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
    handleAvatarSuccess(res, file) {
      if (res.code) {
        return res.message & this.$warn(res.message)
      }
      if (!res.data) return
      this.content.photo = res.data
    },
    beforeAvatarUpload(file) {
      const isImg = (file.type === 'image/jpeg' || file.type === 'image/png')
      if (!isImg) {
        this.$message.error('请上传JPG/PNG格式的图片')
      }
      return isImg
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
        this.clearLocal()
        if (this.otherFrom) {
          return this.$router.go(-1)
        }
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
/deep/ {
  .el-upload--picture-card {
    width: 80px;
    height: 80px;
    line-height: 90px;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 80px;
    height: 80px;
  }

  .el-upload-list--picture-card .el-upload-list__item:nth-child(6+n) {
    margin-bottom: 0px;
  }
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
    margin-top: 20px;
  }
}
.upload-tips{
  font-size:11px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(157,157,167,1);
  line-height:11px;
  margin: 0;
  margin-top: 6px;
}
.upload-tips-color {
  color:rgba(157,157,167,1);
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
/deep/ {
  .el-select {
    margin-left: 0 !important;
    width: 240px;
  }
}
.addCategories {
  position: relative;
  top: 8px;
  text-decoration: underline;
  cursor: pointer;
}
</style>
