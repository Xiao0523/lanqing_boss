<template>
  <div>
    <el-dialog
      title=""
      :visible.sync="centerDialogVisible"
      width="400px"
      center
    >
      <span>您暂未认证或认证未通过，请先认证</span>
      <span slot="footer" class="dialog-footer">
        <el-button class="false-btn" @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" class="sure-btn" @click="goBusiness">立即前往</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getLocal, setLocal } from '@/utils/local'
import { getExamine } from '@/api/business.js'
export default {
  name: 'StatusDialog',
  data() {
    return {
      centerDialogVisible: false,
      whiteList: ['/store/authentication', '/authentication'],
      status: this.$store.state.user.examineStatus || getLocal('examineStatus') || ''
    }
  },
  watch: {
    $route(to) {
      if (!this.whiteList.includes(this.$route.path) && this.status !== '' && Number(this.status) !== 1) {
        console.log(3)
        this.centerDialogVisible = true
      }
    }
  },
  async mounted() {
    if (this.status === '') {
      await getExamine().then(res => {
        if (res.code) return this.$warn(res.message)
        this.status = res.data.status
        setLocal('examineStatus', res.data.status)
        this.centerDialogVisible = res.data.status !== 1
        console.log(1)
      })
    }
    if (!this.whiteList.includes(this.$route.path) && this.status !== '' && Number(this.status) !== 1) {
      console.log(2)
      this.centerDialogVisible = true
    }
  },
  methods: {
    goBusiness() {
      this.centerDialogVisible = false
      this.$router.replace({ name: 'Authentication' })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ {
  .el-dialog {
    position: relative;
    top: 50%;
    margin-top: -97px !important;

  }
  .el-dialog__body {
    margin-top: 15px;
    font-size:18px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(23,23,37,1);
    line-height:25px;
    text-align: center;
  }
  .false-btn {
    width:96px;
    height:38px;
    border-radius:4px;
    border:1px solid rgba(0,210,165,1);
    font-size:14px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(0,210,165,1);
    line-height:38px;
    padding: 0;
  }
  .sure-btn {
    width:96px;
    height:38px;
    background:rgba(0,210,165,1);
    border-radius:4px;
    border:1px solid rgba(0,0,0,0.05);
    font-size:14px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(255,255,255,1);
    line-height:38px;
    padding: 0;
  }
}
</style>
