<template>
  <section class="container">
    <div class="content">
      <el-tabs>
        <el-tab-pane>
          <span slot="label">店铺认证</span>
          <div v-if="authStatus == -1 || authStatus == 1" class="auth">
            <h3 class="title">认证状态<span :class="{red: authStatus == -1}">{{ authStatus | authStr }}</span></h3>
            <auth-input v-show="authStatus == -1" :list="authList" @authOK="resetStatus" />
            <auth-detail v-show="authStatus == 1" :list="authList" />
          </div>
          <div v-show="authStatus == 0 || authStatus == 2" class="result">
            <div v-show="authStatus == 0">
              <h4 class="title">认证中</h4>
              <div class="result-img-wraper">
                <img class="result-img" src="@/assets/wite.png" alt="">
              </div>
              <p class="result-text">工作人员会在48小时内完成审核</p>
              <p class="result-text">请耐心等待</p>
            </div>
            <div v-show="authStatus == 2">
              <div class="result-img-wraper" style="margin-top: 50px">
                <img class="result-img" src="@/assets/warn.png" alt="">
              </div>
              <p class="result-text">审核失败</p>
              <p class="result-text">失败原因是：{{ logInfo }}</p>
              <el-button class="result-btn" type="primary" @click="resetPost">重新提交审核</el-button>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane>
          <span slot="label">店铺上架</span>
          <div v-if="storeStatus == 0 || storeStatus == 1 || storeStatus == 6 || storeStatus == ''" class="auth">
            <div class="tabels">
              <h3 class="title">上架状态<span :class="{red: storeStatus == 0 || storeStatus == 6 || storeStatus == ''}">{{ storeStatus | storeStr }}</span></h3>
              <div v-if="storeStatus == 1" class="storeBtn" @click="storeBtns">申请下架</div>
              <div v-if="storeStatus == 6" class="storeBtn" @click="resetStorePost">申请上架</div>
            </div>
            <store-input v-if="storeStatus == 0 || storeStatus == ''" :list="storeList" @listOk="resetStore" />
            <store-detail v-if="storeStatus == 1 || storeStatus == 6" :list="storeList" />
          </div>
          <div v-if="storeStatus == 2 || storeStatus == 3 || storeStatus == 4 || storeStatus == 5" class="result">
            <div v-if="storeStatus == 2 || storeStatus == 4">
              <h4 class="title">{{ storeStatus | storeStrs }}</h4>
              <div class="result-img-wraper">
                <img class="result-img" src="@/assets/wite.png" alt="">
              </div>
              <p class="result-text">工作人员会在48小时内完成审核</p>
              <p class="result-text">请耐心等待</p>
            </div>
            <div v-if="storeStatus == 3 || storeStatus == 5">
              <div class="result-img-wraper" style="margin-top: 50px">
                <img class="result-img" src="@/assets/warn.png" alt="">
              </div>
              <p class="result-text">审核失败</p>
              <p class="result-text">失败原因是：{{ logInfo }}</p>
              <el-button v-show="storeStatus == 3" class="result-btn" type="primary" @click="resetStorePost">重新提交上架</el-button>
              <el-button v-show="storeStatus == 5" class="result-btn" type="primary" @click="resetGo">重新提交下架</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>
<script>
import { getExamine, getStore, storeOff, storeSure } from '@/api/business'
import AuthInput from '../components/AuthInput'
import AuthDetail from '../components/AuthDetail'
import StoreInput from '../components/StoreInput'
import StoreDetail from '../components/StoreDetail'
export default {
  name: 'Home',
  components: {
    AuthInput,
    AuthDetail,
    StoreInput,
    StoreDetail
  },
  filters: {
    authStr(val) {
      return val === -1 ? '未认证' : '已认证'
    },
    storeStr(val) {
      return val === 0 ? '未上架' : val === 1 ? '已上架' : '已下架'
    },
    storeStrs(val) {
      return val === 2 ? '上架中' : '下架中'
    },
    storeBtn(val) {
      return val === 1 ? '申请下架' : '申请上架'
    }
  },
  data() {
    return {
      authList: {},
      authStatus: null,
      lastDate: '',
      logInfo: '',
      storeStatus: null,
      storeLogInfo: '',
      storeList: {}
    }
  },
  mounted() {
    this.getBusiness()
    this.getStores()
  },
  methods: {
    getBusiness() {
      getExamine().then(res => {
        if (res.code) return this.$warn(res.message)
        this.authStatus = res.data.status
        this.authList = res.data
        this.logInfo = res.data.logInfo
      })
    },
    getStores() {
      getStore().then(res => {
        if (res.code) return this.$warn(res.message)
        this.storeStatus = res.data.status
        this.storeList = res.data
        this.storeLogInfo = res.data.logInfo || ''
      })
    },
    resetStatus() {
      this.getBusiness()
    },
    resetStore() {
      this.getStores()
    },
    // 获取商家信息列表
    resetPost() {
      this.authStatus = -1
    },
    resetStorePost() {
      this.storeStatus = 0
    },
    storeBtns() {
      storeOff().then(res => {
        if (res.code) return res.message && this.$warn(res.message)
        this.$success('申请成功')
        this.getStores()
      })
    },
    resetGo() {
      storeSure().then(res => {
        if (res.code) return res.message && this.$warn(res.message)
        this.getStores()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../styles/store';
.container{
  padding: 30px;
  background: #FAFAFB;
}
.tabels {
  display: flex;
  justify-content: space-between;
  .storeBtn {
    width:80px;
    height:38px;
    line-height: 38px;
    border-radius:4px;
    text-align: center;
    border:1px solid rgba(226,226,234,1);
    font-size:12px;
    font-weight:600;
    color:rgba(23,23,37,1);
    cursor: pointer;
  }
}

.result {
  text-align: center;
  padding: 0 0 50px;
  box-sizing: border-box;
  .title {
    font-size:24px;
    font-weight:500;
    color:rgba(23,23,37,1);
    line-height:30px;
    margin: 50px 0 25px;
    padding: 0;
  }
  &-tip{
    width:509px;
    height:330px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 4px 0px rgba(44,90,74,0.21),0px -1px 0px 0px rgba(126,167,146,1);
    border-radius:8px;
    margin: 225px auto;
    text-align: center;
    overflow: hidden;
  }
  &-img-wraper{
    width:79px;
    height:79px;
    border-radius: 50%;
    position: relative;
    margin: 0 auto;
    margin-bottom: 21px;
    object-fit: cover;
  }
  &-img{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
  }
  &-text{
    font-size:18px;
    font-weight:500;
    color:rgba(146,146,157,1);
    line-height:30px;
    margin: 0;
  }
  &-btn{
    margin-top: 27px;
  }
}

</style>
