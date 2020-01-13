<template>
  <section class="container">
    <h2 class="title">店铺中心</h2>

    <div class="panel">
      <h3 class="panel__hd">
        <h2 class="panel-title">店铺信息</h2>
        <router-link :to="{name: 'Shop-edit'}">
          <el-button>编辑店铺</el-button>
        </router-link>
      </h3>
      <div class="panel__bd">
        <div v-if="!isEmpty">
          <div class="flex">
            <div class="flex__hd">店铺logo</div>
            <div class="flex__bd">
              <img :src="imageUrl" class="avatar">
            </div>
          </div>
          <div class="flex">
            <div class="flex__hd">店铺名称</div>
            <div class="flex__bd">
              <strong>古筝课程初级</strong>
            </div>
          </div>
          <div class="flex">
            <div class="flex__hd">店铺标语</div>
            <div class="flex__bd">
              <strong>1000</strong>
            </div>
          </div>
          <div class="flex">
            <div class="flex__hd">店铺地址</div>
            <div class="flex__bd">
              <strong>3000.00</strong>
            </div>
          </div>
          <div class="flex">
            <div class="flex__hd">营业信息</div>
            <div class="flex__bd">
              <strong>2020-01-01 00:00:00</strong>
            </div>
          </div>
          <div class="flex">
            <div class="flex__hd">店铺介绍</div>
            <div class="flex__bd">
              <p class="shop-intro">中国科学院心理研究所博士。山东省省级教学团队主要成员，省级精品课程主讲教师。中国科学院心理研究所心理健康指导师，潍坊医学院心理健康服务中心咨询师。中国心理卫生协会青年专家，中国音乐治疗协会理事。</p>
            </div>
          </div>
          <div class="flex">
            <div class="flex__hd">店铺背景</div>
            <div class="flex__bd">
              <ul class="list">
                <li><img class="list-img" src="" alt=""></li>
              </ul>
            </div>
          </div>
        </div>

        <div v-else class="empty">
          <div class="empty-content">
            <img class="empty-img" src="@/assets/暂无店铺.png" alt="">
            <div>

              <router-link :to="{name: 'Shop-edit'}">
                <el-button>完善店铺信息</el-button>
              </router-link>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div v-if="!isEmpty" class="panel">
      <h3 class="panel__hd">店铺显示数据</h3>
      <div class="panel__bd">

        <el-form>
          <div class="radio-wraper">
            <el-radio v-model="radio" label="1">显示真实数据</el-radio>
            <el-radio v-model="radio" label="2">显示虚拟数据</el-radio>
          </div>
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
      <div class="panel__bd">
        <div class="flex">
          <div class="flex__hd">用户名</div>
          <div class="flex__bd">
            <strong>2020-01-01 00:00:00</strong>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">登录密码</div>
          <div class="flex__bd">
            <strong>2020-01-01 00:00:00</strong>
          </div>
        </div>
      </div>
      <el-button class="contact-btn">请联系超管 修改密码</el-button>
    </div>

  </section>
</template>
<script>
import { getStoreHome } from '@/api/store'

export default {
  name: 'TeacherDetail',
  data() {
    return {
      content: {},
      imageUrl: '',
      radio: '',
      isEmpty: true
    }
  },
  created() {
    this.getHomeView()
  },
  methods: {
    getHomeView() {
      getStoreHome().then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
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
