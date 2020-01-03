<template>
  <div class="container">
    <h1 class="title">课程类目</h1>

    <div class="table-wraper">
      <el-table
        class="table"
        :data="list"
      >
        <el-table-column label="一级类目">
          <template slot-scope="scope">
            <div v-if="!scope.row.isEdit">{{ scope.row.category0 }}</div>
            <div v-else>
              <el-select v-model="keywords.category0" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="二级类目">
          <template slot-scope="scope">
            <div v-if="!scope.row.isEdit">{{ scope.row.category1 }}</div>
            <div v-else>
              <el-select v-model="keywords.category1" />
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.isEdit" size="mini" @click="onEdit(scope.row, scope.$index)">编辑</el-button>
            <el-button v-else type="primary" size="mini" @click="onSubmit(scope.row, scope.$index)">确认</el-button>
            <el-button type="danger" size="mini" @click="onDel(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="add" @click="addCategory"><i class="el-icon-circle-plus-outline" /><span class="add-text">新增类目</span> </div>
    </div>

    <div>
      <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="pageChange" />
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'Course',
  components: { Pagination },
  data() {
    return {
      list: [{
        category0: '琴棋书画',
        category1: '琴棋书画',
        idEdit: false
      }],
      keywords: {
        category0: '',
        category1: ''
      },
      total: 0, // 总记录数
      pageNum: 1, // 分页页面
      pageSize: 10// 分页容量
    }
  },
  methods: {
    // 删除
    onDel(item, index) {

    },
    // 分页点击 事件
    pageChange(page) {

    },

    // 添加 类目
    addCategory() {
      this.list.push({
        category0: '琴棋书画',
        category1: '琴棋书画',
        isEdit: true
      })
    },

    // 编辑’
    onEdit(item, index) {
      this.list = this.list.map((item, i) => {
        if (i === index) {
          item.isEdit = true
        }
        return item
      })
    },

    // 确认
    onSubmit(item, index) {

    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  padding: 30px;
  display: flex;
  flex-direction: column;
  min-height: inherit;
}
.title{
  font-size:24px;
  font-family:PingFangSC-Semibold,PingFang SC;
  font-weight:600;
  color:rgba(23,23,37,1);
  line-height:33px;
  margin: 0;
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
.add{
  margin-top: 20px;
  height:14px;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(0,210,165,1);
  line-height:14px;
  cursor: pointer;
  &-text{
    margin-left: 10px;
  }
}
</style>
