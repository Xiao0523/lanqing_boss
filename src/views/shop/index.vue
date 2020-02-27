<template>
  <section class="container">
    <h2 class="title">店铺中心</h2>
    <div class="panel">
      <h3 class="panel__hd">
        <h2 class="panel-title">店铺信息</h2>
      </h3>
      <div class="panel__bd">
        <div>
          <div class="flex">
            <div class="flex__hd">店铺logo</div>
            <div class="flex__bd">
              <img v-show="content.logo" :src="content.logo | imageUrl" class="avatar">
            </div>
          </div>
          <div class="flex">
            <div class="flex__hd">店铺名称</div>
            <div class="flex__bd">
              <strong>{{ content.name }}</strong>
            </div>
          </div>
          <div class="flex">
            <div class="flex__hd">店铺标语</div>
            <div class="flex__bd">
              <strong>{{ content.selfDescription }}</strong>
              <!-- <p class="shop-intro">{{ content.selfDescription }}</p> -->
            </div>
          </div>
          <div class="flex">
            <div class="flex__hd">店铺地址</div>
            <div class="flex__bd">
              <strong>{{ content.businessAddressSystem }}</strong>
            </div>
          </div>
          <div class="flex">
            <div class="flex__hd">营业信息</div>
            <div class="flex__bd">
              <strong>{{ content.businessHours }}</strong>
            </div>
          </div>
          <div class="flex">
            <div class="flex__hd">店铺介绍</div>
            <div class="flex__bd">
              <strong>{{ content.introduce }}</strong>
            </div>
          </div>
          <div class="flex">
            <div class="flex__hd">店铺封面</div>
            <div class="flex__bd">
              <ul v-show="content.covers" class="list">
                <li v-for="item in content.covers" :key="item">
                  <img class="list-img" :src="item" alt="">
                </li>
              </ul>
            </div>
          </div>
          <div class="flex">
            <div class="flex__hd">店铺资质</div>
            <div class="flex__bd">
              <ul v-show="(content.qualifications && content.qualifications.length) || (content.videoCover && content.videoUrl)" class="list">
                <li v-show="content.videoCover && content.videoUrl" class="video-img" @click="handleVideo">
                  <img class="list-img" :src="content.videoCover" alt="">
                </li>
                <li v-for="item in content.qualifications" v-show="content.qualifications.length" :key="item">
                  <img class="list-img" :src="item" alt="">
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isEmpty" class="panel">
      <h3 class="panel__hd">店铺显示数据</h3>
      <div class="panel__bd">

        <el-form>
          <el-form-item label="讲师数量" class="">
            <el-input />
          </el-form-item>
          <el-form-item label="学生数量">
            <el-input />
          </el-form-item>
        </el-form>
        <el-button type="primary">保存</el-button>
      </div>
    </div>

    <div class="panel">
      <div class="panel__hd">账号与密码</div>
      <div class="content-detail">
        <el-button class="contact-btn">请联系超管 修改密码</el-button>
      </div>
    </div>
    <div v-show="videoFlag" class="video-mack" @click="closeMack">
      <video
        id="video"
        :src="content.videoUrl"
        :poster="content.videoCover"
        controls
        preload="auto"
        webkit-playsinline="true"
        playsinline="true"
        x-webkit-airplay="allow"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="false"
        x5-video-orientation="portraint"
        style="object-fit:fill"
      />
    </div>
  </section>
</template>
<script>
import { getStoreHome } from '@/api/store'

export default {
  name: 'TeacherDetail',
  filters: {
    imageUrl(val) {
      return val || ''
    }
  },
  data() {
    return {
      content: {
        covers: []
      },
      radio: '',
      isEmpty: true,
      videoFlag: false
    }
  },
  created() {
    this.getHomeView()
  },
  methods: {
    getHomeView() {
      getStoreHome().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.content = res.data
      })
    },
    handleVideo() {
      this.videoFlag = true
    },
    closeMack() {
      this.videoFlag = false
    }
  }
}
</script>

<style lang="scss" scoped>
.video-mack {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  video {
    position: absolute;
    max-width: 400px;
    max-height: 300px;
    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -200px;
  }
}
.video-img {
  position: relative;
  &:before {
    display: block;
    position: absolute;
    content: '';
    top: 50%;
    margin-top: -15px;
    left: 50%;
    margin-left: -10px;
    width: 0;
    height: 0;
    border: 20px solid #fff;
    border-width: 15px 0 15px 20px;
    border-color: transparent transparent transparent #fff;
    z-index: 2;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, .4);
  }
}
.container {
  padding: 30px;
}
.title{
  font-size:24px;
  font-family:PingFangSC-Semibold,PingFang SC;
  font-weight:600;
  color:rgba(23,23,37,1);
  line-height:33px;
  margin: 0;
  margin-bottom: 30px;
}

.avatar {
  width: 80px;
  height: 80px;
  display: block;
  object-fit: scale-down;
}

.shop-intro{
  margin: 0;
  width:600px;
  font-size:15px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:bold;
  color:rgba(23,23,37,1);
  line-height:32px;
}

.flex{
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  &__hd{
    width: 7em;
    text-align: right;
    font-size:13px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(105,105,116,1);
    line-height:42px;
    margin-right: 30px;
  }
  &__bd{
    font-size:13px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(23,23,37,1);
    line-height:42px;
    flex:1;
  }
}

.list{
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  &-img{
    display: block;
    width:107px;
    height:80px;
    background:rgba(226,226,229,1);
    border-radius:1px;
    border:1px solid rgba(241,241,245,1);
    object-fit: cover;
  }
}

.panel {
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin-bottom: 20px;
  padding-bottom: 50px;
  &__hd {
    padding: 22px 30px;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(23, 23, 37, 1);
    line-height: 25px;
    border-bottom: 1px solid rgba(226, 226, 234, 1);
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__bd {
    padding: 25px 30px 0;
  }
  &-title{
    margin: 0;
  }
}
.radio-wraper{
  margin-bottom: 20px;
}

.el-radio /deep/ {
  .el-radio__inner {
    font-weight: bold;
  }
  .el-radio__label{
    color: rgba(23,23,37,1)
  }
  .is-checked .el-radio__inner {
    background: rgba(0, 210, 165, 1);
    border-color: rgba(0, 210, 165, 1);
  }
}

.el-form-item {
  &__label {
    color: #333;
  }
}
.el-input {
  width: 240px;
  & /deep/ {
    .el-input__inner {
      background: rgba(250, 250, 251, 1);
      color: #333;
      font-weight: bold;
      &:focus {
        border-color: #00d2a5;
      }
    }
  }
}

.content{
  background:rgba(255,255,255,1);
  border-radius:10px;
  margin-bottom: 20px;
  &-title{
    font-size:18px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(23,23,37,1);
    line-height:25px;
    padding: 22px 30px;
    border-bottom: 1px solid rgba(226,226,234,1)

  }
  &-detail{
    padding: 20px;
  }
}

.contact-btn{
  background:rgba(241,241,245,1);
  border-radius:4px;
  font-size:15px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(146,146,157,1);
  line-height:21px;
  margin-left: 30px;
}

.empty {
  &-content {
    padding-top: 100px;
    text-align: center;
    padding-bottom: 130px;
  }
  &-img {
    display: inline-block;
    width: 90px;
    margin-bottom: 20px;
  }
  &-text {
    margin: 0;
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(105, 105, 116, 1);
    line-height: 15px;
  }
}

</style>
