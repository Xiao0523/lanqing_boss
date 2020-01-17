<template>
  <div class="container">

    <router-link :to="{name: 'Course-edit'}">
      <el-button class="el-icon-plus add-btn" size="medium" type="primary">新建课程</el-button>
    </router-link>

    <h2 class="title">课程管理</h2>

    <el-form :inline="true">
      <el-form-item class="search-item">
        <el-input v-model.trim="keywords.name" placeholder="搜索课程名称" suffix-icon="el-icon-search" @blur="fetchList" />
      </el-form-item>
      <el-form-item class="search-item" label="课程类目">
        <el-select v-model="categoryStr" @change="categoryChange">
          <el-option
            v-for="item in categoryList"
            :key="item.categoryName + item.categoryId"
            :value="item.categoryName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="课程状态">
        <el-select v-model="statusStr" @change="statusChange">
          <el-option
            v-for="item in statusList"
            :key="item.label + item.value"
            :value="item.label"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <div class="table-wraper">

      <el-table
        class="table"
        :data="list"
      >
        <el-table-column label="课程名称">
          <template slot-scope="scope">
            <div class="img-box">
              <img class="img-warpper" :src="scope.row.cover" alt="">
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="categoryName" />
        <el-table-column label="课时" prop="hours" />
        <el-table-column label="课程价格（元）" prop="price" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | statusStr }}
          </template>
        </el-table-column>
        <el-table-column label="当前评分">
          <template slot-scope="scope">
            <star :score="scope.row.score" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link :to="{name: 'Course-edit', query: { id: scope.row.id }}">
              <el-button size="mini">编辑</el-button>
            </router-link>
            <router-link :to="{name: 'Course-detail', query: { id: scope.row.id }}">
              <el-button size="mini">详情</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- <div class="pagination-wraper">
      <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="pageChange" />
    </div> -->
  </div>
</template>
<script>
import {
  getStoreList
} from '@/api/course'
import { getCategoryList } from '@/api/teacher'
// import Pagination from '@/components/Pagination'
import Star from '@/components/Star'
export default {
  name: 'Course',
  components: { Star },
  filters: {
    statusStr(val) {
      return val === 0 ? '启用' : '关闭'
    }
  },
  data() {
    return {
      list: [{}],
      statusStr: '全部',
      categoryStr: '全部',
      statusList: [{
        label: '全部',
        value: ''
      }, {
        label: '启用',
        value: 0
      }, {
        label: '关闭',
        value: 1
      }],
      keywords: {
        name: '',
        categoryId: '',
        status: ''
      },
      categoryList: [{
        categoryName: '全部',
        categoryId: ''
      }],
      total: 1, // 总记录数
      pageNum: 1, // 分页页面
      pageSize: 10 // 分页容量
    }
  },
  created() {
    this.fetchList()
    this.getCategory()
  },
  methods: {
    fetchList() {
      const fetchObj = this.keywords
      getStoreList(fetchObj).then(res => {
        if (res.code) {
          return res.message && this.$(res.message)
        }
        if (!res.data) return
        this.list = res.data
      })
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

.img-box {
  display: flex;
  height: 40px;
  line-height: 40px;
  img {
    width: 40px;
    margin-right: 10px;
  }
}
</style>
