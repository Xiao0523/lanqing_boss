import { editLock } from '@/api/student'
export const studetnMixins = {
  methods: {
    editLocks(obj) {
      const getObj = obj
      editLock(getObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.$success('解锁成功，请前往学员管理查看！')
        this.fetchList()
      })
    }
  }
}
