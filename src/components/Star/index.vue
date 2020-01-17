<template>
  <div>
    <i v-for="item in count" :key="item" class="el-icon-star-on" :class="{'on': item <= scores}" />
  </div>
</template>
<script>
export default {
  name: 'Star',
  props: {
    score: {
      type: [Number, String],
      default: '0'
    }
  },
  data() {
    return {
      count: 5,
      scores: 0
    }
  },
  watch: {
    score() {
      this.scores = parseInt(this.score)
    }
  },
  created() {
    this.scores = parseInt(this.score)
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
