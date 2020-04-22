<template>
  <section class="container">
    <div class="content">
      <div class="content-top">
        <h4 class="content-top-title">今日待办</h4>
        <div class="content-top-detail">
          <div class="content-top-detail-warpper">
            <img src="@/assets/peopleIcon.png" alt="">
            <div class="content-top-detail-warpper-font">
              <span>{{ content.mysteryStudentNumber | str }}</span>
              <span>神秘学员</span>
            </div>
          </div>

          <div class="content-top-detail-warpper">
            <img src="@/assets/messageIcon.png" alt="">
            <div class="content-top-detail-warpper-font">
              <span>{{ content.messageNumber | str }}</span>
              <span>消息</span>
            </div>
          </div>
          <div class="content-top-detail-warpper">
            <img src="@/assets/commentIcon.png" alt="">
            <div class="content-top-detail-warpper-font">
              <span>{{ content.evaluateNumber | str }}</span>
              <span>评价</span>
            </div>
          </div>

          <div class="content-top-detail-warpper">
            <img src="@/assets/menoyIcon.png" alt="">
            <div class="content-top-detail-warpper-font">
              <span>{{ content.refundNumber | str }}</span>
              <span>退款订单</span>
            </div>
          </div>
          <div class="content-top-detail-warpper">
            <img src="@/assets/listIcon.png" alt="">
            <div class="content-top-detail-warpper-font">
              <span>{{ content.newOrderNumber | str }}</span>
              <span>新增订单</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <el-tabs v-model="listKey" @tab-click="fetchList">
        <el-tab-pane name="getStudentList">
          <span slot="label">神秘学员</span>
          <div class="tabel-box">
            <lock-student :tabel-list="list" :is-lock="true" @goLocks="editLocks" />
          </div>
        </el-tab-pane>

        <el-tab-pane name="getCommonDetail">
          <span slot="label">评价</span>
          <div class="tabel-box">
            <tabel-list :table-list="list" />
          </div>
        </el-tab-pane>

        <el-tab-pane name="getRefund">
          <span slot="label">退款申请</span>
          <div class="tabel-box">
            <el-table
              class="table"
              :data="list"
            >
              <el-table-column label="学员昵称">
                <template slot-scope="scope">
                  <div class="img-box">
                    {{ scope.row.studentName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="手机号" prop="phone" />
              <el-table-column label="订单号" prop="orderNum" />
              <el-table-column label="退款时间" prop="createTime" />
              <el-table-column label="课程名称" prop="curriculumName" />
              <el-table-column label="申请退款金额（元）" prop="applyPrice" />
              <el-table-column label="课程支付金额（元）" prop="curriculumPayPrice" />
              <el-table-column label="订单状态" prop="statusDescription" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <router-link :to="{name: 'CommentDetail', query: { id: scope.row.id }}">
                    <el-button size="mini">沟通</el-button>
                  </router-link>
                  <el-button v-if="Number(scope.row.status) !== 1 && Number(scope.row.status) !== 3" size="mini" @click="backMoney(scope.row.id)">退款</el-button>
                </template>
              </el-table-column>
              <template slot="empty">
                <div class="empty-content">
                  <img class="empty-img" src="@/assets/no-comment.png" alt>
                  <p class="empty-text">暂无评价</p>
                </div>
              </template>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane name="getOrderList">
          <span slot="label">新增订单</span>
          <div class="tabel-box">
            <el-table
              class="table"
              :data="list"
            >
              <el-table-column label="学员昵称">
                <template slot-scope="scope">
                  <div class="img-box">
                    {{ scope.row.nickName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="手机号" prop="phone" />
              <el-table-column label="订单号" prop="orderNum" />
              <el-table-column label="下单时间" prop="orderTime" />
              <el-table-column label="课程名称" prop="curriculumName" />
              <el-table-column label="课程价格（元）" prop="price" />
              <el-table-column label="实际支付价格（元）" prop="payPrice" />
              <el-table-column label="订单状态" prop="statusDescription" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <router-link :to="{name: 'CommentDetail', query: { id: scope.row.id }}">
                    <el-button size="mini">沟通</el-button>
                  </router-link>
                </template>
              </el-table-column>
              <template slot="empty">
                <div class="empty-content">
                  <img class="empty-img" src="@/assets/no-comment.png" alt>
                  <p class="empty-text">暂无评价</p>
                </div>
              </template>
            </el-table>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>
    <back-money :flag="backFlag" :obj="backObj" @closeFlag="closeDialog" />
  </section>
</template>
<script>
import { getHomeData, getStudentList, getCommonDetail, getOrderList, getRefund } from '@/api/home'
import { toThousands } from '@/utils/toThousands'
import { studetnMixins } from '@/views/mixins/student'
import lockStudent from '@/views/educational/student/components/lockStudent'
import tabelList from '@/views/store/comment/components/tabel'
import backMoney from '@/views/finance/course-order/components/backMoney'
import { orderMixins } from '@/views/mixins/order'
import { getLocal } from '@/utils/local'
export default {
  name: 'Home',
  filters: {
    str(val) {
      return toThousands(val) || toThousands(0)
    }
  },
  components: { lockStudent, tabelList, backMoney },
  mixins: [studetnMixins, orderMixins],
  data() {
    return {
      list: [{}],
      content: {},
      listKey: 'getStudentList',
      fnObj: {
        getStudentList,
        getCommonDetail,
        getOrderList,
        getRefund
      },
      status: this.$store.state.user.examineStatus || getLocal('examineStatus') || ''
    }
  },
  created() {
    this.getData()
    this.fetchList()
  },
  methods: {
    getData() {
      getHomeData().then(res => {
        if (res.code) return res.message && this.$warn(res.message)
        this.content = res.data
      })
    },
    fetchList() {
      this.fnObj[this.listKey]().then(res => {
        if (res.code) return res.message && this.$warn(res.message)
        this.list = res.data
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
