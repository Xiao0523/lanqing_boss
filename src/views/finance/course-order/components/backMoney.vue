<template>
  <div>
    <el-dialog :visible="backFlag" @close="closeFlag">
      <h6 slot="title" class="dialog-title">退款</h6>
      <el-form
        ref="redrawFrom"
        :inline-message="true"
        label-width="7em"
      >
        <el-form-item label="退款金额" class="redraw-item">
          <el-input v-model="backObj.applyPrice" placeholder="请输入退款金额" @keyup.native="proving" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onRedraw">确认退款</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postRefund } from '@/api/orders'
export default {
  name: 'BackMoney',
  props: {
    flag: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    obj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      backObj: {},
      backFlag: false
    }
  },
  watch: {
    'obj'() {
      this.backObj = this.obj
    },
    flag() {
      this.backObj = this.flag
    }
  },
  created() {
    this.backObj = this.obj
    this.flag = this.flag
  },
  methods: {
    onRedraw() {
      const getObj = this.backObj
      postRefund(getObj).then(res => {
        if (res.code) return res.message && this.$warn(res.message)
        this.$success('操作成功，请等待!')
        this.closeFlag()
      })
    },
    closeFlag() {
      this.$emit('closeFlag', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-title {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: rgba(23, 23, 37, 1);
  line-height: 20px;
  margin: 0;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(241, 241, 245, 1);
}
.dialog-text {
  text-align: center;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(23, 23, 37, 1);
  line-height: 25px;
  font-weight: bold;
  margin-bottom: 0;
}
.dialog-footer {
  padding-top: 20px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  border-top: 1px solid rgba(241, 241, 245, 1);
}
/deep/ {
  .el-dialog__header {
    padding-bottom: 25px;
  }
  .el-dialog__footer {
    padding-top: 0;
  }

  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
  }

  .el-dialog {
    width: 500px;
  }
}
</style>
