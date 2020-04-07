<template>
  <div class="container">
    <h2 class="title">订单管理</h2>
    <el-form :inline="true">
      <el-form-item class="search-item">
        <el-input v-model.trim="keywords.orderNoOrCurriculumName" placeholder="请输入订单号或课程" suffix-icon="el-icon-search" @blur="fetchList" />
      </el-form-item>
      <el-form-item class="search-item" label="下单时间">
        <el-date-picker
          v-model="keywords.orderTime"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          @change="fetchList"
        />
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="keywords.orderStatus" @change="fetchList">
          <el-option
            v-for="(item, index) in statusList"
            :key="item + index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <div class="table-wraper">

      <el-table
        class="table"
        :data="list"
      >
        <el-table-column width="135px" label="订单号" prop="orderNum" />
        <el-table-column label="下单时间">
          <tamplate slot-scope="scope">
            {{ scope.row.orderTime | orderTimeStr }}
          </tamplate>
        </el-table-column>
        <el-table-column label="学员昵称" prop="curriculumName" />
        <el-table-column label="手机号" prop="price" />
        <el-table-column label="订单状态" prop="statusDescription" />
        <el-table-column label="课程名称" prop="curriculumName" />
        <el-table-column label="课程价格" prop="price" />
        <el-table-column label="实付金额" prop="payPrice" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini">退款</el-button>
          </template>
        </el-table-column>
      </el-table>
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
import Pagination from '@/components/Pagination'
import { getOrdersList } from '@/api/orders'
import { formatTime } from '@/utils/date'
export default {
  name: 'CourseOrder',
  components: { Pagination },
  filters: {
    orderTimeStr(val) {
      return val && formatTime(val)
    }
  },
  data() {
    return {
      list: [],
      keywords: {
        orderNoOrCurriculumName: '',
        orderStatus: '', // 状态：0:已支付/1：退款中/2退款完毕
        orderTime: ''
      },
      statusList: [{
        value: '',
        label: '全部'
      }, {
        value: 0,
        label: '已支付'
      }, {
        value: 1,
        label: '退款中'
      }, {
        value: 2,
        label: '退款完毕'
      }],
      activeName: 'first',
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  created() {
    // this.fetchList()
  },
  methods: {
    fetchList() {
      // const submitObj = {
      //   ...this.keywords,
      //   ...this.listQuery
      // }
      // getOrdersList(submitObj).then(res => {
      //   if (res.code) {
      //     return res.message && this.$warn(res.message)
      //   }
      //   if (!res.data) return
      //   const data = res.data
      //   this.total = data.total
      //   const records = data.records
      //   this.list = records && records.length ? records : []
      // })
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
