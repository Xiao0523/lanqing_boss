<template>
  <div class="container">

    <h2 class="title">评价管理</h2>
    <el-form :inline="true" class="search-box">
      <el-form-item class="search-item">
        <el-input v-model.trim="keywords.name" placeholder="请输入订单号或课程名称" suffix-icon="el-icon-search" @blur="fetchList" />
      </el-form-item>
    </el-form>
    <div class="table-wraper">
      <el-table
        class="table"
        :data="list"
      >
        <el-table-column label="学员昵称">
          <template slot-scope="scope">
            <div class="img-box">
              <img class="img-warpper" :src="scope.row.photo" alt="">
              {{ scope.row.realName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="teachAge" />
        <el-table-column label="订单号" prop="curriculumAmount" />
        <el-table-column label="评价时间" prop="studentAmount" />
        <el-table-column label="课程名称" prop="studentAmount" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | statusStr }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link :to="{name: 'Teacher-edit', query: { id: scope.row.id }}">
              <el-button size="mini">回复</el-button>
            </router-link>
            <router-link :to="{name: 'Teacher-detail', query: { id: scope.row.id }}">
              <el-button size="mini">详情</el-button>
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
    <!-- <div class="pagination-wraper">
      <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="pageChange" />
    </div> -->
  </div>
</template>
<script>
import { getTeacherList, getCategoryList } from '@/api/teacher'
// import Pagination from '@/components/Pagination'
import Star from '@/components/Star'
export default {
  name: 'Stuedent',
  components: { Star },
  filters: {
    statusStr(val) {
      return val === 0 ? '在职' : '离职'
    }
  },
  data() {
    return {
      list: [],
      statusStr: '全部',
      categoryStr: '全部',
      statusList: [{
        label: '全部',
        value: ''
      }, {
        label: '5星',
        value: 4
      }, {
        label: '4星',
        value: 3
      }, {
        label: '3星',
        value: 2
      }, {
        label: '2星',
        value: 1
      }, {
        label: '1星',
        value: 0
      }],
      keywords: {
        name: '',
        categoryId: '',
        status: ''
      },
      value1: true,
      value2: true,
      total: 0, // 总记录数
      pageNum: 1, // 分页页面
      pageSize: 10 // 分页容量
    }
  },
  created() {
  },
  methods: {
    onDel(item) {

    },
    // 分页点击 事件
    pageChange(page) {

    },
    getCategory() {
      getCategoryList().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.categoryList = [...this.categoryList, ...res.data]
      })
    },
    // 获取教员列表
    fetchList() {
      const getObj = this.keywords
      getTeacherList(getObj).then(res => {
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
