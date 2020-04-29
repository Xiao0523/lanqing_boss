<template>
  <div v-show="showFlag" class="time">
    {{ timer | timerStr }}
  </div>
</template>
<script>
import { getLocalTime } from '@/utils/date'
import { setLocal, getLocal } from '@/utils/local'
export default {
  filters: {
    timerStr(val) {
      console.log(val)
      return val ? getLocalTime(val) : ''
    }
  },
  props: {
    time: {
      type: Number,
      default: () => {
        return
      }
    }
  },
  data() {
    return {
      timer: getLocal('rongyunSentTime'),
      showFlag: false
    }
  },
  mounted() {
    if (!this.timer) {
      this.timer = this.time
      setLocal('rongyunSentTime', this.time)
    }
    this.timerComparison(this.time)
  },
  methods: {
    timerComparison(val) {
      if (val > (this.timer + 5 * 60 * 1000) || val === (this.timer)) {
        setLocal('rongyunSentTime', val)
        this.showFlag = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
