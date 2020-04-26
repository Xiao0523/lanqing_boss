<template>
  <section class="container">
    <h2 class="title">讲师管理</h2>

    <div class="panel">
      <div class="panel__hd">
        <h3 class="panel-title">讲师基本信息</h3>
        <router-link :to="{ name: 'TeacherEdit', query: { id: viewId }}">
          <el-button>编辑讲师</el-button>
        </router-link>
      </div>
      <div class="panel__bd">
        <div class="teacher">
          <img class="teacher-avatar" :src="content.photo" alt="头像">
          <div class="teacher-info">
            <div class="teacher-name">{{ content.realName }}</div>
            <div class="teacher-slogan">{{ content.briefIntroduction }}</div>
            <span class="teacher-age">{{ content.age }}</span>
          </div>
          <div class="teacher-score">
            <div class="teacher-score-number">{{ content.score }}</div>
            <star :score="Number(content.score)" />
          </div>
        </div>
        <el-row :gutter="50">
          <el-col :span="6">
            <span class="info-title">教龄</span>
            <strong class="info-data">{{ content.teachAge }}</strong>
          </el-col>
          <el-col :span="6">
            <span class="info-title">课程数量</span>
            <strong class="info-data">{{ content.curriculumAmount }}</strong>
          </el-col>
          <el-col :span="6">
            <span class="info-title">学生数</span>
            <strong class="info-data">{{ content.studentAmount }}</strong>
          </el-col>
        </el-row>

        <h4 class="teacher-honer">奖牌/荣誉</h4>
        <ul v-show="content.achievements" class="list">
          <li v-for="item in content.achievements" :key="item"><img class="list-img" :src="item" alt=""></li>
        </ul>

        <h4 class="teacher-intro">讲师介绍</h4>
        <div class="category-box">
          <el-tag v-for="item in tags" :key="item" class="category-item" type="success">{{ item }}</el-tag>
        </div>
        <p class="teacher-intro-text" v-html="content.detailedDescription" />
      </div>
    </div>

    <div class="panel tabs-wraper">
      <el-tabs v-model="activeName0">
        <el-tab-pane label="正在授课" name="learning">
          <div class="table-wraper">
            <el-table class="table" :data="studentList">
              <el-table-column label="学员名称" prop="studentName" />
              <el-table-column label="手机号" prop="phone" />
              <el-table-column label="课程名称" prop="curriculumNames" />
              <el-table-column label="开课时间">
                <template slot-scope="scope">
                  {{ scope.row.orderTime | orderTimeStr }}
                </template>
              </el-table-column>
              <template slot="empty">
                <div class="empty-content">
                  <img v-if="!listMsg" class="empty-img" src="@/assets/no-student.png" alt>
                  <p class="empty-text">{{ listMsg || '暂无授课学员' }}</p>
                </div>
              </template>
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

  </section>
</template>
<script>
import { getDetail, getStudentList } from '@/api/teacher'
import Pagination from '@/components/Pagination'
import Star from '@/components/Star'
import { formatTime } from '@/utils/date'
export default {
  name: 'TeacherDetail',
  components: { Star, Pagination },
  filters: {
    orderTimeStr(val) {
      return formatTime(val)
    }
  },
  data() {
    return {
      content: {
        achievements: {}
      },
      imageUrl: '',
      radio: '',
      list: [],
      activeName0: 'learning',
      listQuery: {
        pageNum: 1,
        pageSize: 9
      },
      total: 0,
      studentList: [],
      viewId: '',
      listMsg: '',
      tags: []
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
        teacherId: id,
        ...this.listQuery
      }
      getStudentList(getObj).then(res => {
        if (res.code && res.code !== -1) {
          return res.message && this.$warn(res.message)
        }
        if (res.code === -1) this.listMsg = '当前教员不在当前店铺的教员之列'
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
        this.tags = this.content.tags.split(',')
      })
    }
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

.teacher {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  &-avatar {
    width: 60px;
    height: 60px;
    background: rgba(0, 210, 165, 1);
    border-radius: 4px;
    margin-right: 20px;
  }
  &-name {
    font-size: 18px;
    font-weight: bold;
    font-family: PingFangSC-Medium, PingFang SC;
    color: rgba(23, 23, 37, 1);
    line-height: 18px;
    margin-bottom: 8px;
  }
  &-slogan, &-age {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(105, 105, 116, 1);
    margin-bottom: 4px;
  }
  &-info{
    flex: 1;
  }
  &-score-number{
    font-size:22px;
    font-family:Poppins-SemiBold,Poppins;
    font-weight:600;
    color:rgba(0,210,165,1);
    line-height:33px;
    text-align: center;
  }
  &-honer,&-intro{
    font-size:16px;
    font-family:PingFangSC-Medium,PingFang SC;
    color:rgba(23,23,37,1);
    line-height:18px;
    margin: 20px 0;
  }
  &-intro-text{
    font-size:15px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:bold;
    color:rgba(23,23,37,1);
    line-height:32px;
  }
}
.list{
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  & > li:first-child {
    margin: 0
  }
  li {
    margin-left: 10px;
  }
  &-img{
    display: block;
    width:80px;
    height:80px;
    background:rgba(254,254,254,1);
    border-radius:1px;
    border:1px solid rgba(241,241,245,1);
    object-fit: cover;
  }
}

.info-title{
  font-size:13px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(105,105,116,1);
  line-height:42px;
}
.info-data{
  font-size:13px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(23,23,37,1);
  line-height:42px;
  margin-left: 30px;
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
    width: 4em;
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
.course-radio{
  margin-bottom: 10px;
}

.el-radio /deep/ {
  .el-radio__inner {
    font-weight: bold;
  }
  .el-radio__label{
    color: rgba(23,23,37,1)
  }
  .is-checked .el-radio__inner {
    background: rgba(0, 210, 165, 1);
    border-color: rgba(0, 210, 165, 1);
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
  margin-top: 20px;
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

.empty {
  &-table {
    width: 1140px;
    background: rgba(250, 250, 251, 1);
    border-radius: 2px;
    display: flex;
    height: 38px;
    &-head {
      flex: 1;
      height: 18px;
      font-size: 13px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(68, 68, 79, 1);
      line-height: 38px;
      padding-left: 40px;
    }
  }
  &-content {
    padding-top: 50px;
    text-align: center;
  }
  &-img {
    display: inline-block;
    width: 90px;
    margin-bottom: 20px;
  }
  &-text {
    margin: 0;
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(105, 105, 116, 1);
    line-height: 15px;
  }
}

.category-box {
  & > .category-item:first-child {
    margin: 0;
  }
  .category-item {
    margin-left: 10px;
  }
}

</style>
