import { getExamine, getStore } from '@/api/business.js'
import { setLocal } from '@/utils/local'

export const loginStatus = {
  methods: {
    getStatus(callback) {
      getExamine().then(res => {
        if (res.code) return this.$warn(res.message)
        setLocal('examineStatus', res.data.status)
        if (!(res.data.status === 1)) return callback && callback()
        getStore().then(res => {
          if (res.code) return this.$warn(res.message)
          setLocal('storeStatus', res.data.status)
        })
      })
      // if (loginFlag) {
      //   console.log(typeof loginFlag, loginFlag)
      //   console.log('this go 1')
      //   console.log(callback)
      //   return callback && callback()
      // }
    }
  }
}
