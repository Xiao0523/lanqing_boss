<template>
  <div>测试</div>
</template>

<script>
import { getConfigList, getOpenId, wxPay } from '@/api/pay'
import wx from 'weixin-jsapi'
import { getLocal, setLocal } from '@/utils/local'
// const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx09969c14f231f140&redirect_uri=https%3A%2F%2Flanqingback.my51share.com%2Ftest.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
export default {
  name: 'WxPay',
  data() {
    return {}
  },
  mounted() {
    this.getConfig()
  },
  methods: {
    getConfig() {
      const getObj = {
        target: window.location.href
      }
      const _this = this
      getConfigList(getObj).then(res => {
        const href = window.location.href
        console.log(window.localStorage)
        setLocal('storeId', this.$route.query.storeId)
        setLocal('amount', this.$route.query.amount)
        if (href.indexOf('code') <= 0) {
          const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + res.appId + '&redirect_uri=' + href + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
          location.href = url
          return false
        }
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appId, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名
          jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
        })
        wx.ready(function() {
          wx.checkJsApi({
            jsApiList: ['chooseWXPay'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
              const codeObj = {
                code: _this.$route.query.code
              }
              getOpenId(codeObj).then(res => {
                const payObj = {
                  openId: res.openid,
                  amount: getLocal('amount'),
                  storeId: getLocal('storeId')
                }
                console.log(payObj)
                wxPay(payObj).then(res => {
                })
              })
              // wx.chooseWXPay({
              //   timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              //   nonceStr: '', // 支付签名随机串，不长于 32 位
              //   package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              //   signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              //   paySign: '', // 支付签名
              //   success: function(res) {
              //     // 支付成功后的回调函数
              //   }
              // })
            }
          })
        })
        wx.error(function(res) {
          console.log(res)
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        })
        // alert(location.href.split('#')[0])
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
