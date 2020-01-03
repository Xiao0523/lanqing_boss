<template>
  <div class="container">

    <router-link :to="{name: 'Course-edit'}">
      <el-button class="el-icon-plus add-btn" size="medium" type="primary">新建课程</el-button>
    </router-link>

    <h2 class="title">课程管理</h2>

    <el-form :inline="true">
      <el-form-item class="search-item">
        <el-input v-model.trim="keywords.name" placeholder="搜索课程名称" suffix-icon="el-icon-search" @change="onSearch" />
      </el-form-item>
      <el-form-item class="search-item" label="课程类目">
        <el-select v-model="keywords.category" @change="onSearch" />
      </el-form-item>
      <el-form-item label="课程状态">
        <el-select v-model="keywords.status" @change="onSearch" />
      </el-form-item>
    </el-form>

    <div class="table-wraper">

      <el-table
        class="table"
        :data="list"
      >
        <el-table-column align="center" label="课程名称">
          <template>
            <div>
              <img src="" alt="图片">
              <span>古筝课程</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="分类" />
        <el-table-column align="center" label="课时" />
        <el-table-column align="center" label="课程价格（元）" />
        <el-table-column align="center" label="对应类目" />
        <el-table-column align="center" label="状态" />
        <el-table-column align="center" label="状态" />
        <el-table-column align="center" label="当前评分">
          <template> <star :score="2" /></template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <router-link :to="{name: 'Course-detail'}">
              <el-button size="mini">详情</el-button>
            </router-link>
            <el-button type="danger" size="mini" @click="onDel(scope.row, scope.$index)">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-wraper">
      <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="pageChange" />
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import Star from '@/components/Star'
export default {
  name: 'Course',
  components: { Pagination, Star },
  data() {
    return {
      list: [{}],
      keywords: {
        name: '',
        categroy: '',
        status: ''
      },
      total: 1, // 总记录数
      pageNum: 1, // 分页页面
      pageSize: 10// 分页容量
    }
  },
  methods: {
    onDel(item) {

    },
    // 分页点击 事件
    pageChange(page) {

    },

    // 搜索
    onSearch() {

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
</style>
