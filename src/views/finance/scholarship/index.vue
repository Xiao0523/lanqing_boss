<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="card">
          <h6 class="card__hd">可使用蓝青币数</h6>
          <div class="card__bd">
            <strong class="card-number">{{ content.balance | surplusVal }}</strong>
          </div>
          <div class="card__ft">
            当前可使用蓝青币数
            <el-button class="pay-btn" @click="openMack">充值</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="card">
          <h6 class="card__hd">累计使用蓝青币数</h6>
          <div class="card__bd">
            <strong class="card-number">{{ content.used | surplusVal }}</strong>
          </div>
          <div class="card__ft">当前已使用蓝青币数</div>
        </div>
      </el-col>
    </el-row>

    <h2 class="title">金币记录</h2>

    <div class="panel tabs-wraper">
      <el-tabs v-model="activeName0" @tab-click="handleTabClick">
        <el-tab-pane label="充值记录" name="learning">
          <div v-if="list.length" class="table-wraper">
            <el-table class="table" :data="list">
              <el-table-column label="时间">
                <template slot-scope="scope">
                  {{ scope.row.createTime | createTimeStr }}
                </template>
              </el-table-column>
              <el-table-column label="类型">
                <template>
                  APP充值
                </template>
              </el-table-column>
              <el-table-column label="奖学金币数" prop="surplusIcon" />
              <el-table-column label="消费金额" prop="amount" />
            </el-table>
          </div>

          <div v-else class="table-wraper">
            <div class="empty-table">
              <strong class="empty-table-head">时间</strong>
              <strong class="empty-table-head">类型</strong>
              <strong class="empty-table-head">蓝青币数</strong>
              <strong class="empty-table-head">消费金额</strong>
            </div>
            <div class="empty-content">
              <img class="empty-img" src="@/assets/no-cursor.png" alt>
              <p class="empty-text">暂无课程</p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="消费记录" name="consum">
          <div v-if="list.length" class="table-wraper">
            <el-table class="table" :data="list">
              <el-table-column label="时间">
                <template slot-scope="scope">
                  {{ scope.row.createTime | createTimeStr }}
                </template>
              </el-table-column>
              <el-table-column label="类型" prop="description" />
              <el-table-column label="奖学金币数" prop="amount" />
            </el-table>
          </div>

          <div v-else class="table-wraper">
            <div class="empty-table">
              <strong class="empty-table-head">时间</strong>
              <strong class="empty-table-head">类型</strong>
              <strong class="empty-table-head">奖学金币数</strong>
            </div>
            <div class="empty-content">
              <img class="empty-img" src="@/assets/no-cursor.png" alt>
              <p class="empty-text">暂无课程</p>
            </div>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>
    <div>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.pageNum"
        :limit.sync="listQuery.pageSize"
        width="500px"
        @pagination="fetchList"
      />
    </div>
    <el-dialog :visible="isRedrawShow" @close="closeDialog">
      <h6 slot="title" class="dialog-title">充值中心</h6>
      <div class="dialog-radio-wraper">
        <el-radio-group v-model="rechargeLimit" fill="#00D2A5" text-color="#00D2A5" size="medium">
          <el-radio border size="medium" label="10">10元</el-radio>
          <el-radio border size="medium" label="20">20元</el-radio>
          <el-radio border size="medium" label="50">50元</el-radio>
          <el-radio border size="medium" label="100">100元</el-radio>
          <el-radio border size="medium" class="give" label="200">200元<span v-show="false">赠2000</span></el-radio>
          <el-radio border size="medium" class="give" label="500">500元<span v-show="false">赠4000</span></el-radio>
          <el-radio border size="medium" class="give" label="1000">1000元<span v-show="false">赠20000</span></el-radio>
        </el-radio-group>

        <div v-show="codeUrl" class="mask">
          <img class="loading-image" :src="codeUrl" alt="正在处理，请等待。。。">
          <span>扫码微信支付：<strong>{{ rechargeLimit }}</strong>元  <span>获 <strong>{{ rechargeLimit * 100 }}</strong> 个蓝青币</span> <span v-show="Number(rechargeLimit) === 20000">送 <strong>2000</strong> 个蓝青币</span> <span v-show="Number(rechargeLimit) === 50000">送 <strong>4000</strong> 个蓝青币</span> <span v-show="Number(rechargeLimit) === 100000">送 <Strong>20000</Strong> 个蓝青币</span></span>
          <div :class="{complete: wxFlag}">
            {{ wxContent }}
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <span>支付: <strong>{{ rechargeLimit }}</strong>元</span> -->
        <!-- <el-button class="btnColor" @click="openCode">立即充值</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getHomeDate, getRechargeList, getConsumeList, getNotify } from '@/api/recharge'
import { getPayCode } from '@/api/pay'
import Pagination from '@/components/Pagination'
import { formatTime } from '@/utils/date'
import { getLocal } from '@/utils/local'
export default {
  name: 'ScholaSrship',
  components: { Pagination },
  filters: {
    createTimeStr(val) {
      return val && formatTime(val)
    },
    surplusVal(val) {
      return val || '0.00'
    }
  },
  data() {
    return {
      visible: false,
      list: [],
      activeName0: 'learning', // tab 栏
      content: {},
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      isRedrawShow: false,
      isRecharge: true,
      rechargeLimit: 0,
      codeUrl: null,
      showModal: false,
      wxContent: '扫一扫 微信支付',
      wxFlag: false,
      wxWaitTimer: null
    }
  },
  watch: {
    rechargeLimit() {
      this.openCode()
      if (this.wxWaitTimer) return
      this.wxWaitTimer = window.setInterval(() => {
        this.notify()
      }, 2000)
    }
  },
  created() {
    this.getHomeView()
    this.fetchList()
  },
  beforeDestroy() {
    this.closeDialog()
  },
  methods: {
    openMack() {
      if (getLocal('examineStatus') !== 1) return
      this.isRedrawShow = true
    },
    closeDialog() {
      this.isRedrawShow = false
      this.wxContent = '扫一扫 微信支付'
      this.wxFlag = false
      if (this.wxWaitTimer) {
        window.clearInterval(this.wxWaitTimer)
      }
    },
    notify() {
      getNotify().then(res => {
        if (res.code) return res.message && this.$warn(res.message)
        this.wxFlag = res.data === 1
        this.wxContent = this.wxFlag ? '支付完成' : '扫一扫 微信支付'
        if (this.wxWaitTimer && res.data) {
          window.clearInterval(this.wxWaitTimer)
        }
      })
    },
    getHomeView() {
      getHomeDate().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.content = res.data
      })
    },
    fetchList() {
      const callBack = this.isRecharge ? getRechargeList : getConsumeList
      const submitObj = {
        ...this.listQuery
      }
      callBack(submitObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        const data = res.data
        this.total = data.total
        const records = data.records
        this.list = records && records.length ? records : []
      })
    },
    handleTabClick(tab, event) {
      this.isRecharge = !this.isRecharge
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = 9
      this.fetchList()
    },
    openCode() {
      // this.isRedrawShow = false
      const getObj = {
        amount: this.rechargeLimit
      }
      getPayCode(getObj).then(res => {
        if (res.code) return res.message && this.$warn(res.message)
        this.codeUrl = res.data
        this.showModal = true
      })
    },
    closeCode() {
      this.codeUrl = null
      this.showModal = false
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  padding: 30px
}
.title {
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(23, 23, 37, 1);
  line-height: 33px;
  margin: 30px 0;
}
.card {
  background: #fff;
  padding: 20px 25px;
  // height: 155px;
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
    line-height: 38px;
    margin-top: 7px;
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
  }
  &__bd {
    padding: 25px 30px 0;
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
  padding: 20px 15px 30px;
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

.empty {
  &-table {
    width: 100%;
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
.pay-btn {
  padding: 0;
  width:146px;
  height:38px;
  background:linear-gradient(90deg,rgba(0,214,211,1) 0%,rgba(0,206,124,1) 100%);
  border-radius:4px;
  font-size:14px;
  font-weight:600;
  color:rgba(255,255,255,1);
  line-height:38px;
  float: right;
}
.dialog-title {
  margin: 0;
  padding: 0;
  font-size:14px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(23,23,37,1);
  line-height:20px;
}
.dialog-footer {
  display: flex;
  justify-content: space-between;
  span {
    font-size:13px;
    font-weight:400;
    color:rgba(23,23,37,1);
    line-height:38px;
    strong {
      font-size:23px;
      font-weight:600;
      color:rgba(23,23,37,1);
      line-height:38px;
    }
  }
}
/deep/ {
  .el-dialog {
    width: 500px;
  }
  .el-dialog__body {
    padding: 0;
  }
  .el-radio--medium.is-bordered {
    padding: 0;
  }
  .el-radio.is-bordered + .el-radio.is-bordered {
    margin-left: 0;
  }
  .el-radio-button__inner, .el-radio-group {
    display: flex;
    flex-wrap: wrap ;
  }
  .el-dialog__footer {
    padding: 0
  }
}
.dialog-radio-wraper {
  padding: 20px 15px;
  width: 500px;
  text-align: center;
  box-sizing: border-box;
  &.el-radio-group {
    display: flex;
    justify-content: flex-start;
  }
  .el-radio {
    display: flex;
    width: 140px;
    height: 38px;
    padding-left: 11px;
    line-height: 38px;
    margin: 0 15px 15px 0;
    align-items: center;
    box-sizing: border-box;
    &:nth-child(3n + 0) {
      margin-right: 0;
    }
    &.give {
      position: relative;
      span {
        position: absolute;
        right: -10px;
        top: 9px;
        display: block;
        height:20px;
        padding: 0 5px;
        background:rgba(252,90,90,1);
        border-radius:3px;
        font-size:10px;
        font-weight:500;
        text-align: center;
        color:rgba(255,255,255,1);
        line-height:20px;
      }
    }
    &.is-bordered.is-checked {
      padding: 0;
      padding-left: 11px;
      border-color: rgba(0, 210, 165, 1);
    }
    /deep/ {
      .el-radio__input.is-checked .el-radio__inner {
        border-color: rgba(0, 210, 165, 1);
        background: rgba(0, 210, 165, 1);
      }
    }
  }
}
.btnColor {
  width:96px;
  height:38px;
  padding: 0;
  background:rgba(0,210,165,1);
  border-radius:4px;
  border:1px solid rgba(0,0,0,0.05);
  font-size:14px;
  font-weight:600;
  color:rgba(255,255,255,1);
  line-height:38px;
}

.mask {
  border-top: 1px solid rgba(241, 241, 245, 1);
  padding-top: 20px;
  img {
    width: 134px;
    height: 134px;
  }
  span {
    display: block;
    margin-top: 10px;
    strong {
      font-size: 24px;
    }
  }
  div {
    margin: auto;
    margin-top: 10px;
    width:134px;
    height:38px;
    line-height: 38px;
    border-radius:4px;
    border:1px solid rgba(51,51,51,1);
    font-size:14px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(51,51,51,1);
    &.complete {
      border:1px solid rgba(0,211,165,1);
      color:rgba(0,210,165,1);
    }
  }
}
</style>
