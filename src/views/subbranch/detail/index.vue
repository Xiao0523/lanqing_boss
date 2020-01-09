<template>
  <section class="container">
    <h1>基础设置</h1>
    <el-form ref="submitForm" class label-width="7em" :model="content" :rules="rules">
      <el-form-item label="机构名称">
        <el-input readonly value="一顺教育" />
      </el-form-item>

      <el-form-item label="机构图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          name="multipartFile"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :before-upload="beforeUpload"
        >
          <img v-if="content.icon" :src="content.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <input type="hidden">
      </el-form-item>

      <el-form-item label="机构地址">
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

      <el-form-item label="营业时间">
        <el-time-select v-model="content.openTime" placeholder="选择时间" />
      </el-form-item>

      <el-form-item label="机构标语">
        <el-input v-model="content.slogan" />
      </el-form-item>

      <el-form-item label="机构简介">
        <el-input v-model.trim="content.intro" type="textarea" />
      </el-form-item>

      <el-form-item label="机构资质">
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
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="previewImg" alt>
    </el-dialog>
  </section>
</template>

<script>
import { Upload_Pic } from '@/api/URL.js'
export default {
  name: 'SubbranchDetail',
  data() {
    return {
      content: {
        icon: '',
        areas: '',
        address: '',
        contact: '',
        phone: '',
        openTime: '',
        slogan: '',
        intro: '',
        tag: '',
        category: ''
      },
      options: [
        {
          value: '北京',
          label: '北京',
          children: []
        }
      ],
      rules: {
        icon: [{ required: true, message: '请上传办学许可证', trigger: 'blur' }],
        areas: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        address: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        contact: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        openTime: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        slogan: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        intro: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        tag: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        category: [{ required: true, message: '请输入机构名称', trigger: 'blur' }]
      },
      imgList: [
        /* {
          url:
            'https://cdn.my51share.com/upload/2019-12-1017:19:045ea4fd9b6f43460581b456394edeadc3/TIM图片20190812164255.jpg'
        } */
      ],
      uploadUrl: Upload_Pic, // 图片上传地址
      catelogArr: [],
      courseSeverArr: [],
      previewImg: '',
      dialogVisible: false
    }
  },
  methods: {
    // 上传成功钩子
    uploadSuccess(res, file) {
      this.content.icon = URL.createObjectURL(file.raw)
    },

    // 上传之前钩子
    beforeUpload(file) {
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
    handlePicturePreview(file) {
      this.previewImg = file.url
      this.dialogVisible = true
    },
    handlePicctureSuccess(response, file, fileList) {
      console.log(fileList)
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
</style>
