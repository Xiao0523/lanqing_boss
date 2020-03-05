<template>
  <section class="container">
    <h1 class="title">机构中心</h1>
    <div class="content">
      <h2 class="content-title">1.机构信息</h2>
      <div class="content-detail">
        <div class="cell"><span class="cell-hd">企业名称</span>{{ form.enterpriseName }}</div>
        <div class="cell"><span class="cell-hd">银行开户名</span>{{ form.bankName }}</div>
        <div class="cell"><span class="cell-hd">开户银行</span>{{ form.bankNo }}</div>
        <div class="cell"><span class="cell-hd">联系人</span>{{ form.contacts }}</div>
        <div class="cell"><span class="cell-hd">联系方式</span> 13111111111</div>
        <div class="cell"><span class="cell-hd">办学许可证</span><img class="thumbnail" :src="form.schoolLicense" alt="办学许可证" srcset=""></div>
        <div class="cell"><span class="cell-hd">民办非企业单位登记证</span><img class="thumbnail" :src="form.registrationCertificateOfPrivateNonEnterpriseUnit" alt="非企业单位登记证"></div>
        <div class="cell"><span class="cell-hd">上传工商执照</span><img class="thumbnail" :src="form.businessLicense" alt="上传工商执照"></div>
      </div>
    </div>

    <div class="content">
      <h2 class="content-title">账号与密码</h2>
      <div class="content-detail">
        <el-button class="contact-btn">修改密码 请联系客服!</el-button>
      </div>
    </div>

  </section>
</template>
<script>
import { getExamine } from '@/api/user.js'

export default {
  name: 'Home',
  data() {
    return {
      form: {}
    }
  },
  mounted() {
    this.getBusiness()
  },
  methods: {
    // 获取商家信息列表
    getBusiness() {
      getExamine().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.form = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  padding: 30px;
  background: #FAFAFB;
}
.title{
  font-size:24px;
  font-family:PingFangSC-Semibold,PingFang SC;
  font-weight:600;
  color:rgba(23,23,37,1);
  line-height:33px;
  padding: 0 0 30px 0;
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

.thumbnail{
  display: inline-block;
  width:80px;
  height:80px;
  background:rgba(249,249,240,1);
  border-radius:1px;
}

.cell{
  display: flex;
  align-items: center;
  font-size:13px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:42px;
  margin-bottom: 10px;
  &-hd{
    display: inline-block;
    width:79px;
    line-height:20px;
    text-align: right;
    margin-right: 30px;
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
}
</style>
