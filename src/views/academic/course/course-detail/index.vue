<template>
  <section class="container">
    <h2 class="title">课程详情</h2>

    <div class="wraper panel">

      <div class="panel__hd">
        <h3 class="panel-title">课程基本信息</h3>
      </div>
      <div class="panel__bd">
        <div class="flex">
          <div class="flex__hd">课程封面</div>
          <div class="flex__bd">
            <img :src="content.cover" class="avatar">
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">课程名称</div>
          <div class="flex__bd">
            <strong>{{ content.name }}</strong>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">课程价格</div>
          <div class="flex__bd">
            <strong>{{ content.price }}</strong>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">报名人数</div>
          <div class="flex__bd">
            <strong>{{ content.enrolment }}</strong>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">开课时间</div>
          <div class="flex__bd">
            <strong>{{ content.beginDate }}</strong>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">课时</div>
          <div class="flex__bd">
            <strong>{{ content.hours }}</strong>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">课程标签</div>
          <div class="flex__bd">
            <el-tag v-for="item of tagList" :key="item" type="danger" class="tags" closable>{{ item }}</el-tag>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">推荐讲师</div>
          <div class="flex__bd">
            <div v-for="item of content.teachers" :key="item.name" class="teacher">
              <img class="teacher-avatar" :src="item.photo" alt="头像">
              <div class="teacher-info">
                <h6 class="teacher-name">{{ item.realName }}</h6>
                <div class="teacher-slogan">{{ item.briefIntroduction }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">课程介绍</div>
          <div class="flex__bd">
            <img class="course-avatar" :src="content.detailPic" alt="课程介绍">
            <p class="course-intro">{{ content.detailWords }}</p>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">课程大纲</div>
          <div class="flex__bd">
            <a :href="content.outline" target="_blank">
              <el-button type="primary">打开大纲</el-button>
            </a>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">学员风采</div>
          <div class="flex__bd">
            <ul class="list">
              <li v-for="item of content.studentStyle" :key="item"><img class="list-img" :src="item" alt=""></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-if="studentList.length" class="panel tabs-wraper">
      <el-tabs v-model="activeName0">
        <el-tab-pane label="正在上课" name="learning">
          <div class="table-wraper">
            <el-table class="table" :data="studentList">
              <el-table-column label="学员名称" prop="studentName" />
              <el-table-column label="手机号" prop="phone" />
              <el-table-column label="入学时间">
                <template slot-scope="scope">
                  {{ scope.row.orderTime | orderTimeStr }}
                </template>
              </el-table-column>
              <el-table-column label="当前讲师">
                <template slot-scope="scope">
                  {{ scope.row.currentTeacherName }}
                  <span class="change" @click="openChangeTeacher(scope.row.id)">切换</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.pageNum"
          :limit.sync="listQuery.pageSize"
          @pagination="getStudentList"
        />
      </div>
    </div>

    <el-dialog title="更换讲师" width="30%" :visible="isChangeShow" @close="isChangeShow=false">
      <el-form>
        <el-form-item class="el-form-item" label="讲师">
          <el-select v-model="teacherStr" placeholder="请选择讲师" @change="teacherChange">
            <el-option
              v-for="item of content.teachers"
              :key="item.realName"
              :value="item.realName"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onChangeTeacher">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </section>
</template>
<script>
import { getDetail, getStudent, editTeacher } from '@/api/course'
import Pagination from '@/components/Pagination'
import { formatTime } from '@/utils/date'
export default {
  name: 'CourseDetail',
  components: { Pagination },
  filters: {
    orderTimeStr(val) {
      return formatTime(val)
    }
  },
  data() {
    return {
      content: {},
      isEdit: false,
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      list: [{}],
      activeName0: 'learning',
      listQuery: {
        pageNum: 1,
        pageSize: 9
      },
      total: 0,
      isChangeShow: false,
      teacherStr: '',
      isLeaveShow: false,
      tagList: [],
      studentList: [],
      classId: '',
      teacherId: '',
      viewId: ''
    }
  },
  created() {
    const id = this.$route.query.id
    if (id) {
      this.viewId = id
      this.getView(id)
      this.getStudentList(id)
    }
  },
  methods: {
    getStudentList(id) {
      const getObj = {
        curriculumId: id,
        ...this.listQuery
      }
      getStudent(getObj).then(res => {
        if (res.code) {
          return res.message && this.$wran(res.message)
        }
        if (!res.data) return
        const data = res.data
        this.total = data.total
        const records = data.records
        this.studentList = records && records.length ? records : []
      })
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
        this.tagList = res.data.tags.split(',')
      })
    },
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
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    // 打开 切换教师
    openChangeTeacher(id) {
      this.isChangeShow = true
      this.classId = id
    },
    // select教师切换
    teacherChange() {
      for (const item of this.content.teachers) {
        if (item.realName === this.teacherStr) {
          this.teacherId = item.id
          return
        }
      }
    },
    // 切换教师
    onChangeTeacher() {
      const submitObj = {
        teacherId: this.teacherId,
        tscId: this.classId
      }
      editTeacher(submitObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.$success(res.message)
        this.isChangeShow = false
        this.getStudentList(this.viewId)
      })
    },
    // 结业
    openGraduate(item) {
      this.isLeaveShow = true
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 30px;
}
.title{
  font-size: 24px;
  font-family: PingFangSC-Semibold,PingFang SC;
  font-weight: 600;
  color: rgba(23,23,37,1);
  line-height: 33px;
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
  width: 600px;
  font-size: 15px;
  font-family: PingFangSC-Regular,PingFang SC;
  font-weight: bold;
  color: rgba(23,23,37,1);
  line-height: 32px;
}

.teacher{
  display: flex;
  align-items: center;
  width: 390px;
  background: rgba(250,250,251,1);
  border-radius: 2px;
  padding: 10px;
  margin-top: 10px;
  &-avatar{
    width: 48px;
    height: 48px;
  }
  &-info{
    flex: 1;
    margin-left: 10px;
  }
  &-name{
    font-size: 15px;
    margin: 0;
    font-family: PingFangSC-Medium,PingFang SC;
    color: rgba(51,51,51,1);
    line-height: 15px;
  }
  &-slogan{
    font-size: 13px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: rgba(168,168,168,1);
    line-height: 13px;
    margin-top: 9px;
  }
  &-close{
    font-size: 20px;
    color: rgba(168,168,168,1);
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
    font-size: 13px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: rgba(105,105,116,1);
    line-height: 42px;
    margin-right: 30px;
  }
  &__bd{
    font-size: 13px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: rgba(23,23,37,1);
    line-height: 42px;
  }
}

.list{
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  &-img{
    display: block;
    width: 80px;
    height: 80px;
    background: rgba(216,216,216,1);
    border-radius: 1px;
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

.el-form-item {
  margin: 0;
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
  display: flex;
  align-items: center;
}

.el-alert--error {
  background: transparent;
}

.tags {
  margin-right: 10px;
}
</style>
