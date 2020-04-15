export const orderMixins = {
  data() {
    return {
      backObj: {
        applyPrice: null,
        refundId: ''
      },
      backFlag: false
    }
  },
  methods: {
    backMoney(val) {
      this.backFlag = true
      this.backObj.refundId = val
    },
    closeDialog() {
      this.backFlag = false
      this.backObj = {
        applyPrice: null,
        refundId: ''
      }
    }
  }
}
