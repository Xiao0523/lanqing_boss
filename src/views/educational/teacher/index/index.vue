<template>
  <div class="container">
    <el-button class="el-icon-plus add-btn" size="medium" type="primary" @click="goEdit">新增讲师</el-button>

    <h2 class="title">讲师管理</h2>
    <el-form :inline="true" class="search-box">
      <el-form-item class="search-item">
        <el-input v-model.trim="keywords.name" placeholder="搜索老师名称" suffix-icon="el-icon-search" />
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
      <el-form-item label="讲师状态">
        <el-select v-model="keywords.status">
          <el-option
            v-for="item in statusList"
            :key="item.label + item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>

        <el-form-item class="search-item seacher-btn">
          <el-button size="small" @click="fetchList">搜索</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
    <div class="table-wraper">
      <el-table
        class="table"
        :data="list"
      >
        <el-table-column label="讲师名称">
          <template slot-scope="scope">
            <div class="img-box">
              <img class="img-warpper" :src="scope.row.photo" alt="">
              {{ scope.row.realName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="课程类目">
          <template slot-scope="scope">
            {{ scope.row.categories | categoriesStr }}
          </template>
        </el-table-column>
        <el-table-column label="课程数" prop="curriculumAmount" />
        <el-table-column label="学生数" prop="studentAmount" />
        <el-table-column label="评分">
          <template slot-scope="scope">
            <star :score="Number(scope.row.score)" />
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | statusStr }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link :to="{name: 'TeacherDetail', query: { id: scope.row.id }}">
              <el-button size="mini">详情</el-button>
            </router-link>
            <el-popconfirm
              confirm-button-text="好的"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              title="是否确定该老师的当前状态？"
              @onConfirm="editStatus(scope.row.id, scope.row.status)"
            >
              <el-button slot="reference" size="mini">{{ scope.row.status | statusBtn }}</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
        <template slot="empty">
          <div class="empty-content">
            <img class="empty-img" src="@/assets/no-record.png" alt>
            <p class="empty-text">暂无记录</p>
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
import { getTeacherList, editTeacherStatus } from '@/api/teacher'
import { getCategoryListOk } from '@/api/categories'
import { getLocal } from '@/utils/local'
// import Pagination from '@/components/Pagination'
import Star from '@/components/Star'
export default {
  name: 'Stuedent',
  components: { Star },
  filters: {
    statusStr(val) {
      return val === 0 ? '在职' : '离职'
    },
    statusBtn(val) {
      return val === 0 ? '离职' : '在职'
    },
    categoriesStr(val) {
      return val.length ? val.join(',') : ''
    }
  },
  data() {
    return {
      list: [],
      statusList: [{
        label: '全部',
        value: ''
      }, {
        label: '在职',
        value: 0
      }, {
        label: '离职',
        value: 1
      }],
      categoryList: [{
        categoryName: '全部',
        categoryId: ''
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
    this.fetchList()
    this.getCategory()
  },
  methods: {
    getCategory() {
      getCategoryListOk().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        console.log(res.data)
        // this.categoryList = [...this.categoryList, ...res.data]
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
    editStatus(id, status) {
      const getObj = {
        id
      }
      getObj.status = status === 0 ? 1 : 0
      editTeacherStatus(getObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.fetchList()
      })
    },
    goEdit() {
      if (getLocal('examineStatus') !== 1) {
        this.$warn('请先前往店铺认证！！！')
        return
      }
      this.$router.push({ name: 'TeacherEdit' })
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
  margin-left: 10px;
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
