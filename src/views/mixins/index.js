export const mixins = {
  methods: {
    goBack() {
      this.$confirm('正在离开本页面，本页面内所有未保存数据都会丢失', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.clearLocal && this.clearLocal()
        this.$router.go(-1)
      }).catch(() => {
        return false
      })
    }
  }
}
