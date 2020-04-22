<template>
  <div>
    <div class="content-detail">
      <div class="panel">
        <div class="panel__bd">
          <div>
            <div class="flex">
              <div class="flex__hd">店铺logo</div>
              <div class="flex__bd">
                <img v-show="storeList.logo" :src="storeList.logo" class="avatar">
              </div>
            </div>
            <div class="flex">
              <div class="flex__hd">店铺名称</div>
              <div class="flex__bd">
                <strong>{{ storeList.name }}</strong>
              </div>
            </div>
            <div class="flex">
              <div class="flex__hd">成立时间</div>
              <div class="flex__bd">
                <strong>{{ storeList.establishmentDate }}</strong>
              </div>
            </div>
            <div class="flex">
              <div class="flex__hd">店铺标语</div>
              <div class="flex__bd">
                <strong>{{ storeList.selfDescription }}</strong>
                <!-- <p class="shop-intro">{{ storeList.selfDescription }}</p> -->
              </div>
            </div>
            <div class="flex">
              <div class="flex__hd">店铺地址</div>
              <div class="flex__bd">
                <strong>{{ storeList.businessAddressSystem }}</strong>
              </div>
            </div>
            <div class="flex">
              <div class="flex__hd">营业时间</div>
              <div class="flex__bd">
                <strong>{{ storeList.businessHours }}</strong>
              </div>
            </div>
            <div class="flex">
              <div class="flex__hd">联系人</div>
              <div class="flex__bd">
                <strong>{{ storeList.contactName }}</strong>
              </div>
            </div>
            <div class="flex">
              <div class="flex__hd">联系电话</div>
              <div class="flex__bd">
                <strong>{{ storeList.contactPhone }}</strong>
              </div>
            </div>
            <div class="flex">
              <div class="flex__hd">店铺介绍</div>
              <div class="flex__bd">
                <strong v-html="storeList.introduce" />
              </div>
            </div>
            <div class="flex">
              <div class="flex__hd">店铺视频</div>
              <div class="flex__bd">
                <ul v-if="storeList.videoInfo && storeList.videoInfo.videoCoverUrl && storeList.videoInfo.videoUrl" class="list">
                  <li v-if="storeList.videoInfo.videoCoverUrl && storeList.videoInfo.videoUrl" class="video-img" @click="handleVideo">
                    <img class="list-img" :src="storeList.videoInfo.videoCoverUrl" alt="">
                  </li>
                </ul>
              </div>
            </div>
            <div class="flex">
              <div class="flex__hd">店铺封面</div>
              <div class="flex__bd">
                <ul v-show="storeList.covers" class="list">
                  <li v-for="(item, index) in storeList.covers" :key="item + index">
                    <img class="list-img" :src="item" alt="">
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="videoFlag" class="video-mack" @click="closeMack">
      <video
        id="video"
        :src="storeList.videoInfo && storeList.videoInfo.videoUrl"
        :poster="storeList.videoInfo && storeList.videoInfo.videoCoverUrl"
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
  </div>
</template>

<script>
export default {
  name: 'StoreDetail',
  props: {
    list: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      videoFlag: false,
      storeList: {}
    }
  },
  watch: {
    list: {
      handler(val) {
        this.storeList = this.list
      },
      deep: true
    }
  },
  mounted() {
    this.storeList = this.list
  },
  methods: {
    handleVideo() {
      this.videoFlag = true
    },
    closeMack() {
      this.videoFlag = false
      /* eslint-disable */
      video.pause()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../styles/store';

.video-mack {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 999;
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
  width: 200px;
  height: auto;
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
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, .4);
  }
}

.flex{
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  &__hd{
    width: 79px;
    font-size:13px;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:42px;
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

.list-img {
  display: block;
  max-width: 200px;
  max-height: 200px;
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
</style>
