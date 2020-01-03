<template>
  <div>
    <i v-for="item in count" :key="item" class="el-icon-star-on" :class="{'on': item <= score}" />
  </div>
</template>
<script>
export default {
  name: 'Star',
  props: {
    score: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      count: 5
    }
  },
  watch: {
    score(newVal) {

    }
  }
}
</script>
<style lang="scss" scoped>
.el-icon-star-on{
  color: #00D2A5;
  opacity: 0.3;
}
.on{
  opacity: 1;
}

</style>
