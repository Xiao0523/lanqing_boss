<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="card">
          <h6 class="card__hd">可使用奖学金币数</h6>
          <div class="card__bd">
            <strong class="card-number">32</strong>
          </div>
          <div class="card__ft">当前可使用奖学金币</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="card">
          <h6 class="card__hd">累计使用奖学金币数</h6>
          <div class="card__bd">
            <strong class="card-number">320</strong>
          </div>
          <div class="card__ft">当前已使用奖学金币数</div>
        </div>
      </el-col>
    </el-row>

    <h2 class="title">金币记录</h2>

    <div class="panel tabs-wraper">
      <el-tabs v-model="activeName0" @tab-click="handleTabClick">
        <el-tab-pane label="充值记录" name="learning">
          <div v-if="list.length" class="table-wraper">
            <el-table class="table" :data="list">
              <el-table-column label="时间" />
              <el-table-column label="类型" />
              <el-table-column label="奖学金币数" />
              <el-table-column label="消费金额" />
            </el-table>
          </div>

          <div v-else class="table-wraper">
            <div class="empty-table">
              <strong class="empty-table-head">时间</strong>
              <strong class="empty-table-head">类型</strong>
              <strong class="empty-table-head">奖学金币数</strong>
              <strong class="empty-table-head">消费金额</strong>
            </div>
            <div class="empty-content">
              <img class="empty-img" src="@/assets/暂无课程.png" alt>
              <p class="empty-text">暂无课程</p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="消费记录" name="consum">
          <div v-if="list.length" class="table-wraper">
            <el-table class="table" :data="list">
              <el-table-column label="时间" />
              <el-table-column label="类型">
                <template slot-scope="scope">{{ scope.row.createTime }}</template>
              </el-table-column>
              <el-table-column label="奖学金币数" />
            </el-table>
          </div>

          <div v-else class="table-wraper">
            <div class="empty-table">
              <strong class="empty-table-head">时间</strong>
              <strong class="empty-table-head">类型</strong>
              <strong class="empty-table-head">奖学金币数</strong>
            </div>
            <div class="empty-content">
              <img class="empty-img" src="@/assets/暂无课程.png" alt>
              <p class="empty-text">暂无课程</p>
            </div>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ScholaSrship',
  data() {
    return {
      list: [],
      activeName0: 'learning' // tab 栏
    }
  },
  methods: {
    handleTabClick(tab, event) {
      console.log(tab, event)
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
</style>
