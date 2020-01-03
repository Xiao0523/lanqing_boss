<template>
  <section class="container">
    <div class="page-head-wraper">
      <page-head content="新增讲师" @back="goBack" />
    </div>

    <div class="wraper">
      <el-form
        ref="courseForm"
        :model="content"
        :rules="courseFormRules"
        label-width="7em"
      >
        <el-form-item label="讲师头像">
          <el-upload
            class="uploader"
            :action="uploadUrl"
            name="multipartFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-picture uploader-icon" />
          </el-upload>
          <p class="upload-tips">只能上传jpg/png文件，建议尺寸为513x321px。</p>
          <input type="hidden">
        </el-form-item>

        <el-form-item label="讲师名称">
          <el-input v-model.trim="content.name" placeholder="输入课程名称" />
        </el-form-item>
        <el-form-item label="讲师标语">
          <el-input v-model.trim="content.price" class="slogan-input" placeholder="输入课程价格" maxlength="40" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model.trim="content.signup" placeholder="输入报名人数" />
        </el-form-item>
        <el-form-item label="教龄">
          <el-input v-model.trim="content.courseNumber" placeholder="请输入课时" />
        </el-form-item>
        <el-form-item label="课程类目">
          <el-select v-model="content.tag" :multiple="true" />
          <span>-</span>
          <el-select v-model="content.tag" :multiple="true" />
          <div v-if="content.tag">
            <el-tag type="success" closable />
          </div>
        </el-form-item>
        <el-form-item label="教师介绍">
          <el-input v-model="content.intro" type="textarea" class="intro" placeholder="输入详细介绍" />
        </el-form-item>

        <el-form-item label="奖牌/荣誉">
          <el-upload
            class="student-uploader"
            name="multipartFile"
            list-type="picture-card"
            :action="uploadUrl"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-picture" />
            <div slot="tip" class="upload-tips">只能上传jpg/png文件，且最多上传9张，建议尺寸宽为750，高不宜超过1200px。</div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary ">保存</el-button>
          <el-button> 取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog :visible="isLeaveShow" :center="true" @close="isLeaveShow=false">
      <h4 class="dialog-text">离开将丢失已编辑内容，是否离开？</h4>

      <span slot="footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="onLeave">立即结业</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </section>
</template>
<script>
import PageHead from '@/components/PageHead'
import { Upload_Pic } from '@/api/URL.js'
export default {
  name: 'CourseEdit',
  components: { PageHead },
  data() {
    return {
      content: {},
      isEdit: false,
      courseFormRules: {},
      teacherArr: [{}],
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      uploadUrl: Upload_Pic, // 图片上传地址
      isLeaveShow: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    delTeacher(item, index) {
      this.teacherArr.splice(index, 1)
    },
    addTeacher() {
      this.teacherArr.push({
        catelogVal: ''
      })
    },

    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    // 打开 切换教师
    openChangeTeacher() {
      this.isChangeShow = true
    },

    // 切换教师
    onChangeTeacher() {},
    // 结业
    openGraduate(item) {
      this.isLeaveShow = true
    },
    // 评价
    onLeave() {}

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
      width: 80px;
      height: 80px;
      line-height: 82px;
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

</style>
