<template>
  <div class="sidebar-avatar-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <div v-if="collapse" key="collapse">
        <img v-if="avatar" class="avatar" :src="avatar" alt="头像">
      </div>

      <div v-else key="expand">
        <img class="avatar" :src="avatar" alt="头像">
        <h2 class="username">{{ userName }}</h2>
        <span class="role">{{ role }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarAvatar',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      userName: '张校长',
      avatar:
        'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
      role: '超级管理员'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-avatar-container {
  position: relative;
  width: 100%;
  padding: 20px 0;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    vertical-align: middle;
  }

  & .username{
    width:48px;
    height:16px;
    font-size:16px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:16px;
    text-align: center;
    display: block;
    width: 100%
  }
  & .role{
    width:55px;
    height:11px;
    font-size:11px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(170,178,189,1);
    line-height:11px;
  }

  &.collapse {
    .avatar {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
