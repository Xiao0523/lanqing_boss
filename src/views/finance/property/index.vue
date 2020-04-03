<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="card">
          <h6 class="card__hd">累计收入</h6>
          <div class="card__bd">
            <strong class="card-number">{{ content.accumulatedIncome }}</strong>
          </div>
          <div class="card__ft">当前累计收入总计</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <h6 class="card__hd">待结算金额（元）</h6>
          <div class="card__bd">
            <strong class="card-number">{{ content.bossUnApplyIncome }}</strong>
          </div>
          <div class="card__ft">当前未结业付款课程</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <h6 class="card__hd">可用余额（元）</h6>
          <div class="card__bd">
            <strong class="card-number">{{ content.withdrawalIncome }}</strong>
          </div>
          <div class="card__ft">
            <span class="redraw-text">当前可提现余额</span>
            <el-button class="redraw-btn" type="primary" size="medium" @click="openRedraw">提现</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <h2 class="title">提现记录</h2>

    <div v-if="list.length" class="table-wraper">
      <el-table class="table" :data="list">
        <el-table-column label="时间">
          <template slot-scope="scope">
            {{ scope.row.createTime | createTimeStr }}
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="description" />
        <el-table-column label="提现金额" prop="money" />
      </el-table>
    </div>

    <div v-else class="table-wraper">
      <div class="empty-table">
        <strong class="empty-table-head">时间</strong>
        <strong class="empty-table-head">状态</strong>
        <strong class="empty-table-head">提现金额</strong>
      </div>
      <div class="empty-content">
        <img class="empty-img" src="@/assets/no-cash-out.png" alt>
        <p class="empty-text">暂无提现记录</p>
      </div>
    </div>
    <div>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.pageNum"
        :limit.sync="listQuery.pageSize"
        @pagination="fetchList"
      />
    </div>

    <el-dialog :visible="isRedrawShow" @close="isRedrawShow=false">
      <h6 slot="title" class="dialog-title">提现</h6>
      <el-form
        ref="redrawFrom"
        :inline-message="true"
        label-width="7em"
      >
        <el-form-item label="提现金额" class="redraw-item">
          <el-input v-model="redrawForm.money" placeholder="输入提现金额" @keyup.native="proving" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onRedraw">申请提现</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getStoreHome } from '@/api/store'
import { getWithdrawalList, getMoney } from '@/api/withdrawal'
import Pagination from '@/components/Pagination'
import { formatTime } from '@/utils/date'
export default {
  name: 'Property',
  components: { Pagination },
  filters: {
    createTimeStr(val) {
      return val && formatTime(val)
    }
  },
  data() {
    return {
      list: [],
      isRedrawShow: false,
      redrawForm: {
        // 退款
        money: ''
      },
      redrawFormRules: {},
      content: {},
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 9
      }
    }
  },
  created() {
    this.getHomeView()
    this.fetchList()
  },
  methods: {
    getHomeView() {
      getStoreHome().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.content = res.data
      })
    },
    // 验证只能输入正整数
    proving() {
      this.redrawForm.money = this.redrawForm.money.replace(/[^\.\d]/g, '')
      this.redrawForm.money = this.redrawForm.money.replace('.', '')
    },
    fetchList() {
      const submitObj = {
        ...this.listQuery
      }
      getWithdrawalList(submitObj).then(res => {
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
    // 打开提现
    openRedraw() {
      this.isRedrawShow = true
    },
    // 提现
    onRedraw(form) {
      const moneyObj = {
        ...this.redrawForm
      }
      getMoney(moneyObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.$success(res.message)
        this.isRedrawShow = false
        this.fetchList()
      })
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
  height: 155px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  position: relative;
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

.redraw-btn{
  position: absolute;
  bottom: 31px;
  right: 35px;
  width:96px;
  height:38px;
  background:linear-gradient(90deg,rgba(0,214,211,1) 0%,rgba(0,206,124,1) 100%);
  border-radius:4px;
}

.table-wraper {
  padding: 20px 15px;
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
.el-form-item {
  margin-bottom: 0;
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
.empty {
  &-table {
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
</style>
