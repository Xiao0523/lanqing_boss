<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="card">
          <h6 class="card__hd">正式学员</h6>
          <div class="card__bd">
            <strong class="card-number">{{ content.formalStudentNum }}</strong>
          </div>
          <div class="card__ft">在该机构学习过的学员</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <h6 class="card__hd">意向学员</h6>
          <div class="card__bd">
            <strong class="card-number">{{ content.intentionStudentNum }}</strong>
          </div>
          <div class="card__ft">将该机构课程加入购物车的学员</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <h6 class="card__hd">潜在学员</h6>
          <div class="card__bd">
            <strong class="card-number">{{ content.latentStudentNum }}</strong>
          </div>
          <div class="card__ft">浏览该过机构课程的学员</div>
        </div>
      </el-col>
    </el-row>

    <div class="title-wraper">
      <h4 class="title">正式学员管理</h4>
    </div>

    <el-form :inline="true" @submit.native.prevent>
      <el-form-item class="search-item">
        <el-input v-model.trim="keywords.nickName" placeholder="输入学员昵称" suffix-icon="el-icon-search" @blur="fetchList" @keydown.enter.native="fetchList" />
      </el-form-item>

      <el-form-item class="search-item seacher-btn">
        <el-button size="small" @click="fetchList">搜索</el-button>
      </el-form-item>
    </el-form>

    <div class="table-wraper">
      <el-tabs v-model="labelName" @tab-click="fetchList">
        <el-tab-pane>
          <span slot="label">正式学员</span>
          <div class="tabel-box">
            <el-table
              class="table"
              :data="list"
            >
              <el-table-column label="学员昵称" min-width="15%">
                <template slot-scope="scope">
                  <div class="img-box">
                    <img class="img-warpper" :src="scope.row.icon" alt="">
                    {{ scope.row.nickName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="手机号" prop="phone" min-width="15%" />
              <el-table-column min-width="40%" label="课程情况">
                <template slot-scope="scope">
                  <div class="course-info">
                    <div class="course-info__item">
                      <h6 class="info-title">学习中</h6>
                      <div class="info-number green">{{ scope.row.studyNum }}</div>
                    </div>
                    <div class="course-info__item">
                      <h6 class="info-title">退款课程</h6>
                      <div class="info-number red">{{ scope.row.refundNum }}</div>
                    </div>
                    <div class="course-info__item">
                      <h6 class="info-title">结束课程</h6>
                      <div class="info-number">{{ scope.row.completeNum }}</div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="消费总额（元）" prop="money" min-width="15%" />
              <el-table-column label="操作" min-width="15%">
                <template slot-scope="scope">
                  <router-link :to="{name: 'StudentDetail', query: {id: scope.row.studentId}}">
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
          <span slot="label">神秘学员</span>
          <el-radio-group v-model="isLock" class="evaluate-radio" size="medium" @change="fetchList">
            <el-radio-button :label="false">已解锁</el-radio-button>
            <el-radio-button :label="true">未解锁</el-radio-button>
          </el-radio-group>
          <div class="tabel-box box-p">
            <lock-student :tabel-list="list" :is-lock="isLock" @goLocks="editLocks" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--分页-->
    <div>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.pageNum"
        :limit.sync="listQuery.pageSize"
        @pagination="fetchList"
      />
    </div>
  </div>
</template>
<script>
import { getStudentList, getStudentLocked, getStudentUnlock, getMainInfo } from '@/api/student'
import lockStudent from '../components/lockStudent'
import Pagination from '@/components/Pagination'
import { studetnMixins } from '@/views/mixins/student'
export default {
  name: 'Stuedent',
  components: { Pagination, lockStudent },
  mixins: [studetnMixins],
  data() {
    return {
      list: [],
      keywords: {
        nickName: ''
      },
      content: {},
      activeName: 'second',
      listQuery: {
        pageNum: 1,
        pageSize: 9
      },
      total: 0,
      labelName: '',
      isLock: false
    }
  },
  created() {
    this.getHomeView()
    this.fetchList()
  },
  methods: {
    getHomeView() {
      getMainInfo().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.content = res.data
      })
    },
    fetchList() {
      const fn = !Number(this.labelName) ? getStudentList : !this.isLock ? getStudentLocked : getStudentUnlock
      const submitObj = {
        ...this.listQuery,
        ...this.keywords
      }
      fn(submitObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        const data = res.data
        this.total = data.total
        const records = data.records
        this.list = records && records.length ? records : []
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  padding: 30px
}

.card {
  background: #fff;
  padding: 20px 25px;
  height: 155px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  &__hd {
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(23, 23, 37, 1);
    line-height: 22px;
    margin: 0;
  }
  &__bd {
    margin-top: 20px;
  }
  &-number {
    font-size: 28px;
    font-family: Poppins-SemiBold, Poppins;
    font-weight: 600;
    color: rgba(23, 23, 37, 1);
    line-height: 42px;
    margin-right: 20px;
  }
  &__ft {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(105, 105, 116, 1);
    line-height: 20px;
    margin-top: 7px;
  }
}

.title-wraper{
  margin: 30px 0 20px;
  display: flex;
}
.title {
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(23, 23, 37, 1);
  line-height: 33px;
  margin: 0;
  flex: 1;
}

.search-item{
  margin-right: 20px;
  /deep/ &.el-form-item{
    margin-bottom: 0px;
  }
}

.table-wraper{
  margin-top: 30px;
  background: #fff;
  border-radius:2px;
  flex: 1;
  height: 100%;
}

.table{
  & /deep/ {
    & th {
      background:rgba(250,250,251,1);
      font-size:13px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(68,68,79,1);
      line-height:18px;
    }
  }
}

.student-info{
  display: flex;
  align-items: center
}
.thumbnail{
  display: inline-block;
  width:38px;
  height:38px;
  background:rgba(0,210,165,1);
  border-radius:4px;
}
.course-info{
  display: flex;
  &__item{
    width: 100px;
    text-align: center;
    border-left:1px solid rgba(241,241,245,1);
    &:last-child{
      border-right:1px solid rgba(241,241,245,1);
    }
  }
  .info-title{
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(25,25,39,1);
    line-height:20px;
    margin: 0;
    margin-bottom: 6px;
  }
  .info-number{
    font-size:16px;
    font-family:Poppins-SemiBold,Poppins;
    font-weight:600;
    color:rgba(23,23,37,1);
    line-height:25px;
  }
  .green{
   color:rgba(61,213,152,1);
  }
  .red{
    color:rgba(255,73,82,1);
  }
}
.tabel-box {
  padding: 20px 15px 30px;
  &.box-p {
    padding-top: 0;
  }
}

.img-box {
  display: flex;
  height: 40px;
  line-height: 40px;
  img {
    width: 40px;
    margin-right: 10px;
    border-radius: 5px;
  }
}

.evaluate-radio {
  margin: 20px 20px;
  & /deep/ {
    .el-radio-button__inner:hover {
      color: #00D2A5;
    }
    .el-radio-button__inner {
      font-weight: bold;
    }
    .is-active .el-radio-button__inner {
      background: rgba(0, 210, 165, 1);
      border-color: rgba(0, 210, 165, 1);
    }
  }
}

/deep/ {
  .el-dialog__header {
    padding-bottom: 25px;
    margin: 0;
  }
  .el-dialog__footer {
    display: flex;
    padding-top: 0;
    justify-content: center;
  }

  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
  }

  .el-dialog {
    width: 322px;
  }

  .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
    box-shadow: none
  }
  .evaluate-radio .is-active .el-radio-button__inner:hover {
    color: #fff;
  }
  .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    box-shadow: none
  }
}
.dialog-title {
  margin: 0;
  padding: 0;
}
.dialog-box {
  margin: 20px 0;
  span {
    display: block;
    line-height: 24px;
  }
}

.seacher-btn {
  button {
    display: block;
    width: 80px;
    height: 40px;
    line-height: 40px;
    padding: 0;
    text-align: center;
    color: #fff;
    background:rgba(0,210,165,1);
  }
}

</style>
