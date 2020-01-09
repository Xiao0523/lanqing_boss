<template>
  <div class="more-wraper">
    <div class="more el-icon-more" @click="isShow = !isShow" />
    <el-collapse-transition>
      <div v-show="isShow" class="expand-action">
        <slot />
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
export default {
  name: 'More',
  data() {
    return {
      isShow: false
    }
  }
}
</script>
<style lang="scss" scoped>
.more-wraper{
  position: relative;
}
.more{
  padding:0 5px 5px;
  color:rgba(146,146,157,1);
  cursor: pointer;
}
.expand-action{
  position: absolute;
  right: 0;
  margin-top: 8px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 8px 0px rgba(227,227,227,0.5);
  border-radius:4px;
  border:1px solid rgba(236,238,246,1);
}
</style>
