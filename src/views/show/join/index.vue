<template>
  <div class="container">
    <el-button type="primary" @click="onJoin">提交加盟申请</el-button>

    <article>
      <h5>邀请加盟规则</h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
      </p>
    </article>

    <el-dialog title="加盟申请" :visible.sync="dialogVisible">
      <p><span>申请人：</span> <img width="100%" alt="图片"> <span>一顺二维教育</span></p>
      <p><span>申请时间：</span> 2019-12-13</p>

      <p><strong>本次发起加盟申请将扣除1-5个奖学币</strong></p>
      <div slot="footer">
        <el-button @click="onCancle">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Join',
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    onJoin() {
      this.dialogVisible = true
    },
    onCancle() {
      this.dialogVisible = false
    },
    onSubmit() {}
  }
}
</script>
<style lang="scss" scoped>
.container{
  padding: 20px
}
</style>
