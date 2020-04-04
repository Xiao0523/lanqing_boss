<template>
  <section class="container">
    <div class="content">
      <div class="content-top">
        <h4 class="content-top-title">今日待办</h4>
        <div class="content-top-detail">
          <div class="content-top-detail-warpper">
            <img src="@/assets/logo.png" alt="">
            <div class="content-top-detail-warpper-font">
              <span>3,458</span>
              <span>神秘学员</span>
            </div>
          </div>
          <div class="content-top-detail-warpper">
            <img src="@/assets/logo.png" alt="">
            <div class="content-top-detail-warpper-font">
              <span>3,458</span>
              <span>神秘学员</span>
            </div>
          </div>
          <div class="content-top-detail-warpper">
            <img src="@/assets/logo.png" alt="">
            <div class="content-top-detail-warpper-font">
              <span>3,458</span>
              <span>神秘学员</span>
            </div>
          </div>
          <div class="content-top-detail-warpper">
            <img src="@/assets/logo.png" alt="">
            <div class="content-top-detail-warpper-font">
              <span>3,458</span>
              <span>神秘学员</span>
            </div>
          </div>
          <div class="content-top-detail-warpper">
            <img src="@/assets/logo.png" alt="">
            <div class="content-top-detail-warpper-font">
              <span>3,458</span>
              <span>神秘学员</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <el-tabs @tab-click="changeTag">
        <el-tab-pane>
          <span slot="label">神秘学员</span>
          <div class="tabel-box">
            <el-table
              class="table"
              :data="list"
            >
              <el-table-column label="学员昵称" />
              <el-table-column label="咨询时间" />
              <el-table-column label="咨询课程" />
              <el-table-column label="课程费用（元）" />
              <el-table-column label="培训区域" />
              <el-table-column label="解锁" />
              <el-table-column label="状态" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <router-link :to="{name: 'Student-detail', query: {id: scope.row.studentId}}">
                    <el-button size="mini">详情</el-button>
                  </router-link>
                </template>
              </el-table-column>
              <template slot="empty">
                <div class="empty-content">
                  <img class="empty-img" src="@/assets/no-student.png" alt>
                  <p class="empty-text">暂无学员</p>
                </div>
              </template>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane>
          <span slot="label">我的行程</span>
          <div class="tabel-box">
            <el-table
              class="table"
              :data="list"
            >
              <el-table-column label="学员名称" />
              <el-table-column label="咨询时间" />
              <el-table-column label="咨询课程" />
              <el-table-column label="课程费用（元）" />
              <el-table-column label="培训区域" />
              <el-table-column label="解锁" />
              <el-table-column label="状态" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <router-link :to="{name: 'Student-detail', query: {id: scope.row.studentId}}">
                    <el-button size="mini">详情</el-button>
                  </router-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="消息中心">消息中心</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>
<script>
import { getMysteryStudent } from '@/api/student'
export default {
  name: 'Home',
  data() {
    return {
      list: [],
      page: {
        pageNum: 0,
        pageSize: 0
      }
    }
  },
  mounted() {
    // this.getStudentList()
  },
  methods: {
    // 获取商家信息列表
    changeTag(tab, event) {
      console.log(tab, event)
    },
    getStudentList() {
      getMysteryStudent(this.page).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  padding: 30px;
  background: #FAFAFB;
}
.table-wraper {
  width: 100%;
  padding: 15px 20px 47px;
  display: block;
}
.content{
  background:rgba(255,255,255,1);
  border-radius:10px;
  margin-bottom: 30px;
  &-top{
    width: 100%;
    &-title {
      width: 100%;
      margin: 0;
      padding: 22px 30px;
      font-size:18px;
      font-weight:600;
      color:rgba(23,23,37,1);
      line-height:25px;
      border-bottom: 1px solid #E2E2EA;
      box-sizing: border-box;
    }
    &-detail {
      width: 100%;
      display: flex;
      &-warpper {
        display: flex;
        flex: 1;
        height: 163px;
        border-right: 1px solid #E2E2EA;
        justify-content: center;
        align-items: center;
        & > img {
          display: block;
          width: 63px;
          height: 63px;
          margin-right: 20px;
        }
        &-font {
          & > span {
            display: block;
            &:first-child {
              font-size:24px;
              font-weight:600;
              color:rgba(23,23,37,1);
              line-height:24px;
            }
            &:last-child {
              font-size:14px;
              font-weight:400;
              color:rgba(105,105,116,1);
              line-height:20px;
              margin-top: 10px;
            }
          }
        }
        &:last-child {
          border: 0;
        }
      }
    }
  }
  /deep/ {
    .el-tabs__nav-scroll {
      width: 100%;
      height: 70px;
      line-height: 70px;
      padding: 0 30px;
      box-sizing: border-box;
    }
    .el-tabs__item {
      font-size:16px;
      font-weight:600;
      color:rgba(23,23,37,1);
      line-height:22px;
      &.is-active {
        color: #00D2A5;
      }
      &:hover {
        color: #00D2A5;
      }
    }
    .el-tabs__active-bar {
      height: 4px;
      background:rgba(0,210,165,1);
    }
    .el-tabs__header {
      margin: 0;
    }
    .has-gutter {
      & th {
        height: 38px;
        line-height: 38px;
        background:rgba(250,250,251,1);
        padding: 0;
        & .cell {
          color: #44444F;
          font-size: 13px;
        }
      }
    }
    .el-table__row {
      height: 68px;
      line-height: 68px;
    }
  }
}

.tabel-box {
  width: 100%;
  padding: 15px 20px 47px;
  box-sizing: border-box;
}

.thumbnail{
  display: inline-block;
  width:80px;
  height:80px;
  background:rgba(249,249,240,1);
  border-radius:1px;
}

.cell{
  display: flex;
  align-items: center;
  font-size:13px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:42px;
  margin-bottom: 10px;
  &-hd{
    display: inline-block;
    width:79px;
    line-height:20px;
    text-align: right;
    margin-right: 30px;
  }
}

.contact-btn{
  background:rgba(241,241,245,1);
  border-radius:4px;
  font-size:15px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(146,146,157,1);
  line-height:21px;
}
</style>
