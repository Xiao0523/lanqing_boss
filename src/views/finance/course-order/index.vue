<template>
  <div class="container">
    <h2 class="title">讲师管理</h2>
    <el-form :inline="true">
      <el-form-item class="search-item">
        <el-input v-model.trim="keywords.name" placeholder="输入订单号或课程" suffix-icon="el-icon-search" @change="onSearch" />
      </el-form-item>
      <el-form-item class="search-item" label="下单时间">
        <el-select v-model="keywords.category" @change="onSearch" />
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="keywords.status" @change="onSearch" />
      </el-form-item>
    </el-form>

    <div class="table-wraper">

      <el-table
        class="table"
        :data="list"
      >
        <el-table-column width="135px" label="订单号">
          <template>
            <div class="order-number">239384849208923</div>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" />
        <el-table-column label="订单状态" />
        <el-table-column label="课程名称" />
        <el-table-column label="课程价格" />
        <el-table-column label="支付方式" />
        <el-table-column label="实付金额" />

      </el-table>
    </div>

    <!--分页-->
    <div class="pagination-wraper">
      <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="pageChange" />
    </div>

  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'CourseOrder',
  components: { Pagination },
  data() {
    return {
      list: [{}],
      keywords: {
        categroy: ''
      },
      activeName: 'first',
      total: 1, // 总记录数
      pageNum: 1, // 分页页面
      pageSize: 10// 分页容量
    }
  },
  methods: {
    handleTabClick(tab, event) {
      console.log(tab, event)
    },
    onDel(item) {

    },
    // 分页点击 事件
    pageChange(page) {

    },
    onSearch() {},
    handleSelectionChange(val) {

    },
    onCancle() {},
    onBatch() {

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
  margin: 0;
  margin-bottom: 30px;

}

.search-item{
  margin-right: 30px;
}
.add-btn{
  float: right;
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
.pagination-wraper{
  text-align: right
}
.order-number{
  width:135px;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(0,210,165,1);
  line-height:24px;
}
</style>
