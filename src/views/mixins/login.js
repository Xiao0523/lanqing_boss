import { getExamine, getStore } from '@/api/business.js'
import { setLocal } from '@/utils/local'

export const loginStatus = {
  methods: {
    getStatus(callback, loginFlag = false) {
      getExamine().then(res => {
        if (res.code) return this.$warn(res.message)
        setLocal('examineStatus', res.data.status)
        if (Number(res.data.status) === 1 && !loginFlag) return callback && callback()
        getStore().then(res => {
          if (res.code) return this.$warn(res.message)
          setLocal('storeStatus', res.data.status)
        })
      })
      if (loginFlag) return callback && callback()
    }
  }
}
