<template>
  <div>
    <el-table
      class="table"
      :data="list"
    >
      <el-table-column label="学员昵称" prop="nickName" />
      <el-table-column label="咨询时间">
        <template slot-scope="scope">
          {{ scope.row.createTime | createTimeStr }}
        </template>
      </el-table-column>
      <el-table-column label="咨询类目" prop="categoryName" />
      <!-- <el-table-column label="课程费用（元）" prop="prices" /> -->
      <el-table-column label="培训区域" prop="areaName" />
      <el-table-column label="解锁" prop="scholarshipIcon" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="isLock" size="mini" @click="editLock(scope.row.entrustId, scope.row.studentId, scope.row.scholarshipIcon)">解锁</el-button>
          <el-button v-if="!isLock" size="mini" @click="goMessage(scope.row.studentId)">沟通</el-button>
        </template>
      </el-table-column>
      <template slot="empty">
        <div class="empty-content">
          <img class="empty-img" src="@/assets/no-student.png" alt>
          <p class="empty-text">暂无学员</p>
        </div>
      </template>
    </el-table>
    <el-dialog :visible="isRedrawShow" @close="isRedrawShow=false">
      <h6 slot="title" class="dialog-title" />
      <div class="dialog-box">
        <span>解锁后可以和神秘学员进行沟通</span>
        <span>所需蓝青币：{{ scholarshipIcon }} 剩余蓝青币: {{ scholar }}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isRedrawShow=false">取    消</el-button>
        <el-button type="primary" @click="goLock">立即解锁</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getHomeDate } from '@/api/recharge'
import { formatTime } from '@/utils/date'
export default {
  name: 'StudentLock',
  filters: {
    createTimeStr(val) {
      return val && formatTime(val)
    }
  },
  props: {
    tabelList: {
      type: Array,
      default: () => {
        return []
      }
    },
    isLock: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      list: [],
      lockObj: {},
      scholarshipIcon: null,
      isRedrawShow: false,
      scholar: null
    }
  },
  watch: {
    'tabelList'() {
      this.list = this.tabelList
    }
  },
  created() {
    this.list = this.tabelList
    this.getScholar()
  },
  methods: {
    goLock() {
      this.isRedrawShow = false
      this.$emit('goLocks', this.lockObj, this.scholarshipIcon)
    },
    editLock(entrustId, studentId, scholarshipIcon) {
      this.lockObj = {
        entrustId,
        studentId
      }
      this.scholarshipIcon = scholarshipIcon
      this.isRedrawShow = true
    },
    getScholar() {
      getHomeDate().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.scholar = res.data.balance
      })
    },
    goMessage(id) {
      this.$router.push({ name: 'Message', query: { id: id }})
    }
  }
}
</script>

<style lang="scss" scoped>

.dialog-box {
  margin: 20px 0;
  span {
    display: block;
    line-height: 24px;
  }
}

/deep/ {
  .el-dialog__header {
    padding-bottom: 25px;
    margin: 0;
  }
  .el-dialog__footer {
    display: flex;
    padding-top: 0;
    justify-content: center;
  }

  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
  }

  .el-dialog {
    width: 322px;
  }
}
.dialog-title {
  margin: 0;
  padding: 0;
}

</style>
