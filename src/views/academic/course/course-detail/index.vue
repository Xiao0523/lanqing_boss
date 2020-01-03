<template>
  <section class="container">
    <h2 class="title">课程详情</h2>

    <div class="wraper panel">

      <div class="panel__hd">
        <h2 class="panel-title">课程基本信息</h2>
        <router-link :to="{name: 'Course-edit'}">
          <el-button>编辑店铺</el-button>
        </router-link>
      </div>
      <div class="panel__bd">
        <div class="flex">
          <div class="flex__hd">课程封面</div>
          <div class="flex__bd">
            <img :src="imageUrl" class="avatar">
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">课程名称</div>
          <div class="flex__bd">
            <strong>古筝课程初级</strong>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">课程价格</div>
          <div class="flex__bd">
            <strong>1000</strong>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">报名人数</div>
          <div class="flex__bd">
            <strong>3000.00</strong>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">开课时间</div>
          <div class="flex__bd">
            <strong>2020-01-01 00:00:00</strong>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">课时</div>
          <div class="flex__bd">
            <strong>3</strong>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">上课地点</div>
          <div class="flex__bd">
            <strong>2020-01-01 00:00:00</strong>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">课程标签</div>
          <div class="flex__bd">
            <el-tag type="danger" closable />
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">推荐讲师</div>
          <div class="flex__bd">
            <div class="teacher">
              <img class="teacher-avatar" src="" alt="头像">
              <div class="teacher-info">
                <h6 class="teacher-name">王正好</h6>
                <div class="teacher-slogan">小孩子的教育问题是大问题</div>
              </div>
              <i class="el-icon-close teacher-close" @click="delTeacher(item, index)" />
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">课程介绍</div>
          <div class="flex__bd">
            <img class="course-avatar" src="" alt="课程介绍">
            <p class="course-intro">中国科学院心理研究所博士。山东省省级教学团队主要成员，省级精品课程主讲教师。中国科学院心理研究所心理健康指导师，潍坊医学院心理健康服务中心咨询师。中国心理卫生协会青年专家，中国音乐治疗协会理事。</p>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">课程大纲</div>
          <div class="flex__bd">
            <el-button type="primary">下载大纲</el-button>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">学员风采</div>
          <div class="flex__bd">
            <ul class="list">
              <li><img class="list-img" src="" alt=""></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-if="list.length" class="panel tabs-wraper">
      <el-tabs v-model="activeName0">
        <el-tab-pane label="正在上课" name="learning">
          <div class="table-wraper">
            <el-table class="table" :data="list">
              <el-table-column label="学员名称" />
              <el-table-column label="手机号" />
              <el-table-column label="状态" />
              <el-table-column label="上课地点" />
              <el-table-column label="当前讲师">
                <template slot-scope="scope">
                  {{ scope.row.createTime }}张老师
                  <span class="change" @click="openChangeTeacher">切换</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog :visible="isChangeShow" @close="isChangeShow=false">
      <h6 slot="title" class="dialog-title">切换讲师</h6>
      <el-form
        ref="teacherFrom"
        :inline-message="true"
        label-width="7em"
        :rules="teacherFormRules"
        :model="teacherForm"
      >
        <el-form-item label="课程讲师">
          <el-select v-model="teacherForm.teacher" placeholder="选择课程讲师" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <span>
          <el-alert title="错误提示" type="error" :closable="false" show-icon />
        </span>
        <el-button type="primary" @click="onChangeTeacher('teacherFrom')">确认切换</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </section>
</template>
<script>
export default {
  name: 'CourseDetail',
  data() {
    return {
      content: {},
      isEdit: false,
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      list: [{}],
      activeName0: 'learning',
      isChangeShow: false,
      teacherForm: {
        // 切换讲师
        teacher: ''
      },
      teacherFormRules: {},
      isLeaveShow: false
    }
  },
  methods: {
    goBack() {
      this.$router.goBack()
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
.title{
  font-size:24px;
  font-family:PingFangSC-Semibold,PingFang SC;
  font-weight:600;
  color:rgba(23,23,37,1);
  line-height:33px;
  margin: 0;
  margin-bottom: 30px;
}
.wraper {
  background: #fff;
}

.avatar {
  width: 128px;
  height: 80px;
  display: block;
  object-fit: scale-down;
}

.course-avatar {
  display: block;
  width: 80px;
  height: 80px;
}
.course-intro{
  width:600px;
  font-size:15px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:bold;
  color:rgba(23,23,37,1);
  line-height:32px;
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

.panel {
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin-bottom: 20px;
  padding-bottom: 50px;
  &__hd {
    padding: 22px 30px;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(23, 23, 37, 1);
    line-height: 25px;
    border-bottom: 1px solid rgba(226, 226, 234, 1);
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__bd {
    padding: 25px 30px 0;
  }
  &-title{
    margin: 0;
  }
}
.flex{
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  &__hd{
    width: 7em;
    text-align: right;
    font-size:13px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(105,105,116,1);
    line-height:42px;
    margin-right: 30px;
  }
  &__bd{
    font-size:13px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(23,23,37,1);
    line-height:42px;
  }
}

.list{
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  &-img{
    display: block;
    width:80px;
    height:80px;
    background:rgba(216,216,216,1);
    border-radius:1px;
    margin-right: 10px;
  }
}

.tabs-wraper /deep/ {
  .el-tabs__nav {
    margin-left: 30px;
  }
  .el-tabs__item {
    line-height: 70px;
    height: 70px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(23, 23, 37, 1);
  }
  .is-active {
    color: rgba(0, 210, 165, 1);
  }
  .el-tabs__active-bar {
    height: 4px;
    background-color: rgba(0, 210, 165, 1);
  }
}

.table-wraper {
  padding: 0 15px;
  background: #fff;
  border-radius: 2px;
}

.table {
  & /deep/ {
    thead > tr {
      border-radius: 2px;
    }
    & th {
      background: rgba(250, 250, 251, 1);
      font-size: 13px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(68, 68, 79, 1);
      line-height: 18px;
    }
  }
}
.change {
  cursor: pointer;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 210, 165, 1);
  line-height: 24px;
  margin-left: 10px;
  &:hover {
    text-decoration: underline;
  }
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

.el-alert--error {
  background: transparent;
}

</style>
