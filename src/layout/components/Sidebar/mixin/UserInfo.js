import { getLocal } from '@/utils/local'

export default {
  computed: {
    username() {
      return this.$store.state.user.name || getLocal('username') || ''
    },
    avatar() {
      return this.$store.state.user.avatar || getLocal('avatar') || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
    },
    role() {
      const roles = this.$store.state.user.token === 'store' ? '店长' : '超级管理员'
      return roles
    }
  }
}
