<template>
  <section class="container">
    <h1 class="title">机构中心</h1>
    <div class="content">
      <h2 class="content-title">1.机构信息</h2>
      <div class="content-detail">
        <div class="cell"><span class="cell-hd">企业名称</span>一顺二维（水街店）</div>
        <div class="cell"><span class="cell-hd">银行开户名</span>鄞州区首南街道海运大厦602-1</div>
        <div class="cell"><span class="cell-hd">开户银行</span>鄞州区首南街道海运大厦602-1</div>
        <div class="cell"><span class="cell-hd">联系人</span> 李先生</div>
        <div class="cell"><span class="cell-hd">联系方式</span> 13111111111</div>
        <div class="cell"><span class="cell-hd">办学许可证</span><img class="thumbnail" src="" alt="办学许可证" srcset=""></div>
        <div class="cell"><span class="cell-hd">民办非企业单位登记证</span><img class="thumbnail" src="" alt="非企业单位登记证"></div>
        <div class="cell"><span class="cell-hd">上传工商执照</span><img class="thumbnail" src="" alt="上传工商执照"></div>
      </div>
    </div>

    <div class="content">
      <h2 class="content-title">账号与密码</h2>
      <div class="content-detail">
        <div class="cell"><span class="cell-hd">用户名</span> 张校长</div>
        <div class="cell"><span class="cell-hd">登录密码</span> ******</div>
        <el-button class="contact-btn">请联系客服 修改密码</el-button>
      </div>
    </div>

  </section>
</template>
<script>
export default {
  name: 'Home'
}
</script>
<style lang="scss" scoped>
.container{
  padding: 30px;
  background: rgba(250, 250, 251, 1)
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
