<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="card">
          <h6 class="card__hd">正式学员</h6>
          <div class="card__bd">
            <strong class="card-number">{{ content.studentFormalNum }}</strong>
          </div>
          <div class="card__ft">当前正式学员数量</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <h6 class="card__hd">意向学员</h6>
          <div class="card__bd">
            <strong class="card-number">{{ content.studentIntentionNum }}</strong>
          </div>
          <div class="card__ft">当前意向学员数量</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <h6 class="card__hd">潜在学员</h6>
          <div class="card__bd">
            <strong class="card-number">{{ content.studentPotentialNum }}</strong>
          </div>
          <div class="card__ft">当前潜在学员数量</div>
        </div>
      </el-col>
    </el-row>

    <div class="title-wraper">
      <h4 class="title">正式学员管理</h4>
    </div>

    <el-form :inline="true">
      <el-form-item class="search-item">
        <el-input v-model.trim="keywords.name" placeholder="输入学员名称" suffix-icon="el-icon-search" @change="onSearch" />
      </el-form-item>
      <el-form-item label="课程类目">
        <el-select v-model="keywords.category" @change="onSearch" />
      </el-form-item>
    </el-form>

    <div class="table-wraper">
      <el-table
        class="table"
        :data="list"
      >
        <el-table-column label="学员姓名">
          <template slot-scope="scope">
            <div class="student-info">
              <span>{{ scope.row.studentName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="" />
        <el-table-column width="320px" label="课程情况">
          <template>
            <div class="course-info">
              <div class="course-info__item">
                <h6 class="info-title">学习中</h6>
                <div class="info-number green">3</div>
              </div>
              <div class="course-info__item">
                <h6 class="info-title">退款课程</h6>
                <div class="info-number red">3</div>
              </div>
              <div class="course-info__item">
                <h6 class="info-title">结束课程</h6>
                <div class="info-number">3</div>
              </div>
            </div>

          </template>
        </el-table-column>

        <el-table-column label="消费总额（元）" />
        <el-table-column label="操作">
          <template>
            <router-link :to="{name: 'Student-detail'}">
              <el-button size="mini">详情</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>
<script>
import { getStoreHome } from '@/api/store'
import { getstudentList } from '@/api/student'
export default {
  name: 'Stuedent',
  data() {
    return {
      list: [],
      keywords: {
        name: '',
        categoryId: ''
      },
      content: {},
      activeName: 'second',
      total: 1, // 总记录数
      pageNum: 1, // 分页页面
      pageSize: 10// 分页容量
    }
  },
  created() {
    this.getHomeView()
    this.fetchList()
  },
  methods: {
    getHomeView() {
      getStoreHome().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.content = res.data
      })
    },
    fetchList() {
      const submitObj = {
        ...this.keywords
      }
      getstudentList(submitObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.list = res.data
      })
    },
    onDel(item) {
    },
    // 分页点击 事件
    pageChange(page) {
    },
    // 搜索
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

.title-wraper{
  margin: 30px 0 20px;
  display: flex;
}
.title {
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(23, 23, 37, 1);
  line-height: 33px;
  margin: 0;
  flex: 1;
}

.search-item{
  margin-right: 30px;
}

.table-wraper{
  margin-top: 30px;
  padding: 20px 15px;
  background: #fff;
  border-radius:2px;
  flex: 1;
  height: 100%;
}

.table{
  & /deep/ {
    & th {
      background:rgba(250,250,251,1);
      font-size:13px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(68,68,79,1);
      line-height:18px;
    }
  }
}

.student-info{
  display: flex;
  align-items: center
}
.thumbnail{
  display: inline-block;
  width:38px;
  height:38px;
  background:rgba(0,210,165,1);
  border-radius:4px;
}
.course-info{
  display: flex;
  &__item{
    width: 100px;
    text-align: center;
    border-left:1px solid rgba(241,241,245,1);
    &:last-child{
      border-right:1px solid rgba(241,241,245,1);
    }
  }
  .info-title{
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(25,25,39,1);
    line-height:20px;
    margin: 0;
    margin-bottom: 6px;
  }
  .info-number{
    font-size:16px;
    font-family:Poppins-SemiBold,Poppins;
    font-weight:600;
    color:rgba(23,23,37,1);
    line-height:25px;
  }
  .green{
   color:rgba(61,213,152,1);
  }
  .red{
    color:rgba(255,73,82,1);
  }
}

</style>
