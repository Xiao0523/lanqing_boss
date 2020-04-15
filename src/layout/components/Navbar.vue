<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <span class="user-info">
            <strong class="user-name">{{ username }}</strong>
            <!-- <span class="user-role">{{ role }}</span> -->
          </span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/Home">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import UserInfo from './Sidebar/mixin/UserInfo'
// import { init } from '@/utils/rongyun'
// import { getLocal } from '@/utils/local'
import { rongyunMixins } from '@/views/mixins/rongyun'

var RongIMLib = window.RongIMLib // 由 window 赋值
var RongIMClient = RongIMLib.RongIMClient
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  mixins: [UserInfo, rongyunMixins],
  data() {
    return {
      // initObj: {
      //   appkey: this.$store.state.user.appKey,
      //   token: this.$store.state.user.messageToken || getLocal('messageToken') || ''
      // }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      RongIMClient.getInstance().disconnect()
      RongIMClient.getInstance().logout()
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  z-index: 1;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 40px;

      .avatar-wrapper {
        margin-top: 8px;
        position: relative;
        display: flex;
        align-items: center;
        .user-avatar {
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 12px;
          font-size: 12px;
        }
        .user-info{
          cursor: pointer;
        }
        .user-name{
          font-size:14px;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:600;
          color:rgba(23,23,37,1);
          line-height:14px;
          display: block;
        }
        .user-role{
          display: block;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(146,146,157,1);
          line-height:12px;
        }
      }
    }
  }
}
/deep/ {
  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
    color: #00D2A5;
  }
}
</style>
