<template>
  <div>测试</div>
</template>

<script>
import { getConfigList } from '@/api/pay'
export default {
  name: 'WxPay',
  data() {
    return {}
  },
  created() {
    this.getConfig()
  },
  methods: {
    getConfig() {
      const getObj = {
        target: window.location.href
      }
      getConfigList(getObj).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
