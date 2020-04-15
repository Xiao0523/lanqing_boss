<template>
  <div>
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
          <router-link :to="{name: 'CommentDetail', query: { id: scope.row.id }}">
            <el-button size="mini">{{ scope.row.status | statusBtn }}</el-button>
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
</template>

<script>
export default {
  name: 'TabelList',
  filters: {
    statusStr(val) {
      return val === 0 ? '未回复' : '已回复'
    },
    statusBtn(val) {
      return val === 0 ? '回复' : '详情'
    }
  },
  props: {
    tableList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      list: []
    }
  },
  watch: {
    'tableList'() {
      this.list = this.tableList
    }
  },
  created() {
    this.list = this.tableList
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
