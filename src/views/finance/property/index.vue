<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="card">
          <h6 class="card__hd">累计收入</h6>
          <div class="card__bd">
            <strong class="card-number">32</strong>
          </div>
          <div class="card__ft">当前累计收入总计</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <h6 class="card__hd">待结算金额（元）</h6>
          <div class="card__bd">
            <strong class="card-number">320</strong>
          </div>
          <div class="card__ft">当前未结业付款课程</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <h6 class="card__hd">可用余额（元）</h6>
          <div class="card__bd">
            <strong class="card-number">320</strong>
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
        <el-table-column label="时间" />
        <el-table-column label="类型" />
        <el-table-column label="提现金额" />
      </el-table>
    </div>

    <div v-else class="table-wraper">
      <div class="empty-table">
        <strong class="empty-table-head">时间</strong>
        <strong class="empty-table-head">类型</strong>
        <strong class="empty-table-head">提现金额</strong>
      </div>
      <div class="empty-content">
        <img class="empty-img" src="@/assets/暂无提现记录.png" alt>
        <p class="empty-text">暂无提现记录</p>
      </div>
    </div>

    <div>
      <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="pageChange" />
    </div>

    <el-dialog :visible="isRedrawShow" @close="isRedrawShow=false">
      <h6 slot="title" class="dialog-title">提现</h6>
      <el-form
        ref="redrawFrom"
        :inline-message="true"
        label-width="7em"
        :rules="redrawFormRules"
        :model="redrawForm"
      >
        <el-form-item label="提现金额" class="redraw-item">
          <el-input v-model="redrawForm.money" placeholder="输入提现金额" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <span>
          <el-alert title="错误提示" type="error" :closable="false" show-icon />
        </span>
        <el-button type="primary" @click="onRedraw('redrawFrom')">申请提现</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'Property',
  components: { Pagination },
  data() {
    return {
      list: [],
      isRedrawShow: false,
      redrawForm: {
        // 退款
        money: ''
      },
      redrawFormRules: {},
      total: 1, // 总记录数
      pageNum: 1, // 分页页面
      pageSize: 10// 分页容量
    }
  },
  methods: {
    // 分页点击 事件
    pageChange(page) {

    },
    // 打开提现
    openRedraw() {
      this.isRedrawShow = true
    },

    // 提现
    onRedraw(form) {
      this.$refs[form].validate(isValid => {
        if (!isValid) return
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
