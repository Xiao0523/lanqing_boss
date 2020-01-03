<template>
  <div class="page-head">
    <div class="page-head__action" @click="back">返回</div>
    <div class="page-head__content">{{ content }}</div>
  </div>
</template>
<script>
export default {
  name: 'PageHead',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  methods: {
    back() {
      this.$emit('back')
    }
  }
}
</script>
<style lang="scss" scoped>
.page-head{
  display: flex;
  align-items: center;
  font-size:17px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(146,146,157,1);
  line-height:24px;
  font-weight: bold;
  &__action{
    cursor: pointer;
    padding-right: 10px;
  }
  &__content{
    padding-left: 10px;
    border-left: 2px solid rgba(146,146,157,1);
  }

}
</style>
