<template>
  <div class="container">
    <h1 class="title">课程类目</h1>

    <div class="table-wraper">
      <el-table
        class="table"
        :data="list"
        style="width: 100%"
      >
        <el-table-column align="center" label="一级类目名称" prop="pcategoryName" />
        <el-table-column align="center" label="二级类目名称" prop="categoryName" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-popconfirm
              icon="el-icon-info"
              icon-color="red"
              title="是否删除该类目？"
              @onConfirm="onDel(scope.row.id)"
            >
              <el-button slot="reference" type="danger" size="mini">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
        <template slot="empty">
          <div class="empty-content">
            <img class="empty-img" src="@/assets/no-record.png" alt>
            <p class="empty-text">暂无信息</p>
          </div>
        </template>
      </el-table>
      <div class="add" @click="addCategory"><i class="el-icon-circle-plus-outline" /><span class="add-text">新增类目</span></div>
    </div>
    <div>
      <pagination v-show="total > 0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="pageChange" />
    </div>
    <el-dialog title="添加类目" class="dialogs" :visible.sync="dialogFormVisible">
      <div class="dialog-box">
        <el-select v-model="keywords.categoryTitle" @change="getSonList">
          <el-option
            v-for="item of levelOneList"
            :key="item.name"
            :value="item.name"
            :label="item.name"
          />
        </el-select>
        <el-select v-model="keywords.categoryTwoTitle" @change="changeSon">
          <el-option
            v-for="item of levelTwoList"
            :key="item.name"
            :value="item.name"
            :label="item.name"
          />
        </el-select>
        <el-button class="add-btn" size="medium" @click="add">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { getCategoryList, getLevelOneList, getLevelTwoList, addCategoriesList, delCategoriesList } from '@/api/categories'
import { getLocal } from '@/utils/local'
export default {
  name: 'Course',
  components: { Pagination },
  data() {
    return {
      list: [
        // {
        //   category0: '琴棋书画',
        //   category1: '琴棋书画',
        //   idEdit: false
        // }
      ],
      keywords: {
        categoryTitle: '',
        categoryTwoTitle: ''
      },
      total: 0, // 总记录数
      pageNum: 1, // 分页页面
      pageSize: 10, // 分页容量
      levelOneList: [],
      levelTwoList: [],
      levelTwoId: '',
      dialogFormVisible: false,
      otherFrom: false
    }
  },
  mounted() {
    this.fetchList()
    this.getLevelOne()
    const other = this.$route.query.otherFlag
    if (String(other)) this.otherFrom = other
  },
  methods: {
    // 更改选中的子类id
    changeSon() {
      for (const item of this.levelTwoList) {
        if (item.name === this.keywords.categoryTwoTitle) {
          this.levelTwoId = item.id
          break
        }
      }
    },
    // 查找第二级列表
    getSonList() {
      const getObj = {}
      this.levelTwoList = []
      this.keywords.categoryTwoTitle = ''
      for (const item of this.levelOneList) {
        if (item.name === this.keywords.categoryTitle) {
          getObj.id = item.id
          break
        }
      }
      getLevelTwoList(getObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.levelTwoList = res.data
      })
    },
    // 获取列表
    fetchList() {
      getCategoryList().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.list = res.data
      })
    },
    // 查找第一级列表
    getLevelOne() {
      getLevelOneList().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.levelOneList = res.data
      })
    },
    // 添加类目
    add() {
      const addObj = {
        id: this.levelTwoId
      }
      addCategoriesList(addObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.$success(res.message)
        if (this.otherFrom) {
          return this.$router.go(-1)
        }
        this.fetchList()
        this.dialogFormVisible = false
        this.keywords = {
          categoryTitle: '',
          categoryTwoTitle: ''
        }
      })
    },
    // 删除
    onDel(id) {
      const delObj = {
        id: id
      }
      delCategoriesList(delObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.$success(res.message)
        this.fetchList()
      })
    },

    // 添加 类目
    addCategory() {
      if (getLocal('examineStatus') !== 1) {
        this.$warn('请先前往店铺认证！！！')
        return
      }
      this.dialogFormVisible = true
    },

    // 编辑’
    onEdit(item, index) {
      this.list = this.list.map((item, i) => {
        if (i === index) {
          item.isEdit = true
        }
        return item
      })
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

.dialog-box {
  display: flex;
  width: 100%;
  flex: 1;
  align-content: space-around;
  & > * {
    padding: 0 .25em;
    flex-grow: 1;
  }
  & > .add-btn {
    flex-grow: 2;
  }
}

.dialogs {
  /deep/ {
    .el-dialog__headerbtn:focus .el-dialog__close, .el-dialog__headerbtn:hover .el-dialog__close {
      color:#00D2A5;
    }
    .el-select .el-input.is-focus .el-input__inner {
      border-color: #00D2A5;
    }
    .el-select .el-input__inner:focus {
      border-color: #00D2A5;
    }
  }
}

.selected {
  color: #00D2A5;
  font-weight: 700;
}
</style>
