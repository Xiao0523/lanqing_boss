<template>
  <div>测试</div>
</template>

<script>
import { getConfigList } from '@/api/pay'
import wx from 'weixin-jsapi'
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
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appId, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名
          jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
