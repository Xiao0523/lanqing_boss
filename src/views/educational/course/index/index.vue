<template>
  <div class="container">

    <el-button class="el-icon-plus add-btn" size="medium" type="primary" @click="goEdit">新建课程</el-button>

    <h2 class="title">课程管理</h2>

    <el-form :inline="true" class="search-box">
      <el-form-item class="search-item">
        <el-input v-model.trim="keywords.name" placeholder="搜索课程名称" suffix-icon="el-icon-search" />
      </el-form-item>
      <el-form-item class="search-item" label="课程类目">
        <el-select v-model="keywords.categoryId">
          <el-option
            v-for="item in categoryList"
            :key="item.categoryName + item.categoryId"
            :value="item.categoryId"
            :label="item.categoryName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="课程状态">
        <el-select v-model="keywords.status">
          <el-option
            v-for="item in statusList"
            :key="item.label + item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>

      <el-form-item class="search-item seacher-btn">
        <el-button size="small" @click="fetchList">搜索</el-button>
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
        <el-table-column label="课时" prop="hours" />
        <el-table-column label="课程价格（元）" prop="price" />
        <el-table-column label="对应类目" prop="categoryName" />
        <el-table-column label="当前评分">
          <template slot-scope="scope">
            <star :score="scope.row.score" />
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | statusStr }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link :to="{name: 'CourseDetail', query: { id: scope.row.id }}">
              <el-button size="mini">详情</el-button>
            </router-link>
            <el-button size="mini" @click="changeStatus(scope.row.id, scope.row.status)">{{ scope.row.status | statusBtn }}</el-button>

          </template>
        </el-table-column>
        <template slot="empty">
          <div class="empty-content">
            <img class="empty-img" src="@/assets/no-cursor.png" alt>
            <p class="empty-text">暂无课程</p>
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
import {
  getCursorList,
  curosrOn,
  curosrOff
} from '@/api/course'
import { getCategoryListOk } from '@/api/categories'
import { getLocal } from '@/utils/local'
// import Pagination from '@/components/Pagination'
import Star from '@/components/Star'
export default {
  name: 'Course',
  components: { Star },
  filters: {
    statusStr(val) {
      return val === 0 ? '启用' : '关闭'
    },
    statusBtn(val) {
      return val === 0 ? '关闭' : '启用'
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
  mounted() {
    this.fetchList()
    this.getCategory()
  },
  methods: {
    fetchList() {
      this.list = []
      const getObj = this.keywords
      getCursorList(getObj).then(res => {
        if (res.code) return res.message && this.$warn(res.message)
        if (!res.data) return
        this.list = res.data
      })
    },
    getCategory() {
      getCategoryListOk().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.categoryList = [...this.categoryList, ...res.data]
      })
    },
    changeStatus(id, status) {
      const fn = status === 0 ? curosrOff : curosrOn
      const getObj = {
        id
      }
      fn(getObj).then(res => {
        if (res.code) return res.message && this.$warn(res.message)
        this.$success('状态修改成功')
        this.fetchList()
      })
    },
    goEdit() {
      if (getLocal('examineStatus') !== 1 || getLocal('storeStatus') !== 1) {
        const val = getLocal('examineStatus') !== 1 ? '请先前往店铺认证！！！' : '请先前往店铺上架！！！'
        this.$warn(val)
        return
      }
      this.$router.push({ name: 'CourseEdit' })
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
      top: -2px;
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
    border-radius: 5px;
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

.seacher-btn {
  button {
    display: block;
    width: 80px;
    height: 40px;
    line-height: 40px;
    padding: 0;
    text-align: center;
    color: #fff;
    background:rgba(0,210,165,1);
  }
}
</style>
