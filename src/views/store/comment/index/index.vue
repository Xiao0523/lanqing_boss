<template>
  <div class="container">

    <h2 class="title">评价管理</h2>
    <el-form :inline="true" class="search-box">
      <el-form-item class="search-item" label="订单号：">
        <el-input v-model.trim="keywords.trainingStudentCurriculumId" placeholder="请输入订单号" suffix-icon="el-icon-search" @blur="fetchList" @keyup.enter="fetchList" />
      </el-form-item>
      <el-form-item class="search-item" label="学员昵称">
        <el-input v-model.trim="keywords.nickName" placeholder="请输入学员昵称" suffix-icon="el-icon-search" @blur="fetchList" @keyup.enter="fetchList" />
      </el-form-item>
    </el-form>
    <div class="table-wraper">
      <tabel-list :table-list="list" />
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.pageNum"
        :limit.sync="listQuery.pageSize"
        width="500px"
        @pagination="fetchList"
      />
    </div>
    <!-- <div class="pagination-wraper">
      <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="pageChange" />
    </div> -->
  </div>
</template>
<script>
import { getCommonList } from '@/api/common'
import Pagination from '@/components/Pagination'
import tabelList from '../components/tabel'
export default {
  name: 'Stuedent',
  components: { Pagination, tabelList },
  data() {
    return {
      list: [],
      keywords: {
        nickName: '',
        trainingStudentCurriculumId: ''
      },
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0, // 总记录数
      pageNum: 1, // 分页页面
      pageSize: 10 // 分页容量
    }
  },
  methods: {
    // 获取教员列表
    fetchList() {
      const getObj = {
        ...this.keywords,
        ...this.listQuery
      }
      getCommonList(getObj).then(res => {
        if (res.code) {
          return res.message && this.$(res.message)
        }
        if (!res.data) return
        this.list = res.data
      })
    },
    // 类目改变
    categoryChange() {
      for (const item of this.categoryList) {
        if (item.categoryName === this.categoryStr) {
          this.keywords.categoryId = item.categoryId
          break
        }
      }
      this.fetchList()
    },
    // 状态改变
    statusChange() {
      for (const item of this.statusList) {
        if (item.label === this.statusStr) {
          this.keywords.status = item.value
          break
        }
      }
      this.fetchList()
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  padding: 30px
}

.title {
  width:97px;
  height:38px;
  font-size:24px;
  font-weight:600;
  color:rgba(23,23,37,1);
  line-height:38px;
  margin: 0;
}

.search-item{
  margin-right: 30px;
}
.add-btn{
  float: right;
  width:111px;
  height:38px;
  line-height: 38px;
  background:linear-gradient(90deg,rgba(0,214,211,1) 0%,rgba(0,206,124,1) 100%);
  border-radius:4px;
  padding: 0;
  &.el-icon-plus:before {
    width: 18px;
    height: 18px;
    margin-right: 11px;
  }
  /deep/ {
    & span {
      position: relative;
      top: 0px;
    }
  }
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

.img-box {
  display: flex;
  height: 40px;
  line-height: 40px;
  img {
    width: 40px;
    margin-right: 10px;
  }
}

.search-box {
  margin-top: 20px;
  /deep/ {
    .el-form-item {
      margin-bottom: 20px;
    }
    .el-icon-search:before {
      font-size: 20px;
    }
  }
}
</style>
