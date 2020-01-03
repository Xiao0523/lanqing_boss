<template>
  <section class="container">
    <el-form label-width="7em">
      <h4>1.基础设置</h4>
      <el-form-item label="课程名称">
        <el-input />
      </el-form-item>
      <el-form-item label="课程分类">
        <el-select value="" />
        <router-link :to="{name: 'Category'}">设置</router-link>
      </el-form-item>

      <el-form-item label="课程封面">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <input type="hidden">
      </el-form-item>

      <el-form-item label="课程介绍">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>

      <h4>2.收费方式</h4>

      <el-form-item label="总价">
        <el-input />
      </el-form-item>
      <el-form-item label="教学地点">
        <el-select value="" />
      </el-form-item>

      <el-form-item label="开课日期">
        <el-date-picker
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>

      <el-form-item label="开课教师">
        <el-select value="" placeholder="请选择" />

        <span v-for="(item, index) in teacherArr" :key="index">
          <el-select v-model="item.catelogVal" placeholder="请选择" />
          <i class="el-icon-minus" @click="delTeacher(item, index)" />
        </span>

        <el-button icon="el-icon-plus" circle @click="addTeacher" />
        <router-link :to="{name: 'Teacher'}">设置</router-link>
      </el-form-item>

      <el-form-item label="课时总数">
        <el-input />
      </el-form-item>

      <el-form-item label="课程承诺">
        <el-input />
      </el-form-item>
      <el-form-item label="报名人数">
        <el-input />
      </el-form-item>

      <h4>3.其他设置</h4>

      <el-form-item label="学员风采">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">建议使用word/ppt/excel格式</div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary ">保存</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

  </section>
</template>
<script>
export default {
  name: 'CompetitionDetail',
  data() {
    return {
      teacherArr: [],
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: []
    }
  },
  methods: {
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
      this.catelogArr.splice(index, 1)
    },
    addTeacher() {
      /* this.catelogArr.push({
        catelogVal: ''
      }) */
    },

    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }

  }
}
</script>
<style lang="scss" scoped>
.container{
  padding: 20px
}

.avatar-uploader  {
  width: 178px;
  & /deep/ {
    & .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover{
        border-color: #409EFF;
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
    object-fit: scale-down
  }
}
</style>
