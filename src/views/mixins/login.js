import { getExamine, getStore } from '@/api/business.js'
import { setLocal } from '@/utils/local'

export const loginStatus = {
  methods: {
    getStatus(callback) {
      getExamine().then(res => {
        if (res.code) return this.$warn(res.message)
        setLocal('examineStatus', res.data.status)
        if (Number(res.data.status) === 1) {
          getStore().then(res => {
            if (res.code) return this.$warn(res.message)
            setLocal('storeStatus', res.data.status)
          })
        }
      })
      callback && callback()
    }
  }
}
