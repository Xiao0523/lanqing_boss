<template>
  <section class="container">
    <div class="page-head-wraper">
      <page-head content="回复评价" @back="goBack" />
    </div>

    <div class="wraper">
      <div class="guest-box">
        <h3 class="title">
          机构评价
        </h3>
        <div class="img-box">
          <img src="@/assets/no-comment.png" alt="">
          <div class="user-info">
            <span class="title">青青教育</span>
            <div class="star-box">
              <star score="3" />
              <span>不错</span>
            </div>
          </div>
        </div>
        <div class="guest-font">教学环境很好，场地很大，还专门为家长提供了休息区</div>
        <div class="form-box">
          <el-input class="reply-input" placeholder="请输入回复内容" />
          <el-button class="reply-btn">立即回复</el-button>
        </div>
      </div>
      <div class="guest-box">
        <h3 class="title">
          课程评价
        </h3>
        <div class="img-box">
          <img src="@/assets/no-comment.png" alt="">
          <div class="user-info">
            <span class="title">青青教育</span>
            <div class="star-box">
              <star score="3" />
              <span>不错</span>
            </div>
          </div>
        </div>
        <div class="guest-font">教学环境很好，场地很大，还专门为家长提供了休息区</div>
        <div class="form-box">
          <el-input class="reply-input" placeholder="请输入回复内容" />
          <el-button class="reply-btn">立即回复</el-button>
        </div>
      </div>
      <div class="guest-box">
        <h3 class="title">
          讲师评价
        </h3>
        <div class="img-box">
          <img src="@/assets/no-comment.png" alt="">
          <div class="user-info">
            <span class="title">青青教育</span>
            <div class="star-box">
              <star score="3" />
              <span>不错</span>
            </div>
          </div>
        </div>
        <div class="guest-font">教学环境很好，场地很大，还专门为家长提供了休息区</div>
        <div class="form-box">
          <el-input class="reply-input" placeholder="请输入回复内容" />
          <el-button class="reply-btn">立即回复</el-button>
        </div>
      </div>
      <span class="tip"><i class="el-icon-info" />回复内容不得泄露用户隐私和信息，请谨慎</span>
    </div>
  </section>
</template>
<script>
import PageHead from '@/components/PageHead'
import Star from '@/components/Star'
export default {
  name: 'CommentDtatil',
  components: { PageHead, Star },
  data() {
    return {
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 30px;
}
.page-head-wraper{
  margin-bottom: 25px;
}
.wraper {
  background: #fff;
  padding: 30px;
}
.guest-box {
  width: 100%;
  padding: 30px;
  border-bottom: 1px solid #E2E2EA;
  box-sizing: border-box;
  & > .title {
    position: relative;
    width:64px;
    height:18px;
    font-size:16px;
    font-weight:500;
    color:rgba(23,23,37,1);
    line-height:18px;
    padding: 0;
    margin: 0;
    &::before{
      display: block;
      content: '';
      position: absolute;
      width:6px;
      height:18px;
      background:rgba(0,210,165,1);
      left: -30px;
    }
  }
  .img-box {
    display: flex;
    margin-top: 21px;
    img {
      display: block;
      width: 39px;
      height: 39px;
      margin-right: 12px;
    }
    .user-info {
      span {
        display: block;
        &.title {
          font-size:14px;
          font-weight:600;
          color:rgba(23,23,37,1);
          line-height:20px;
        }
      }
      .star-box {
        display: flex;
        & > span {
          font-size:15px;
          font-weight:500;
          color:rgba(0,210,165,1);
          line-height:15px;
          margin-left: 10px;
        }
      }
    }
  }
  .guest-font {
    margin: 22px 0 16px;
    font-size:14px;
    font-weight:400;
    color:rgba(68,68,79,1);
    line-height:24px;
  }
  .form-box {
    display: flex;
    /deep/ {
      .reply-input .el-input__inner {
        height: 46px;
        line-height: 46px;
        background: rgba(250,250,251,1);
        border-radius: 4px;
        border: 1px solid rgba(241,241,245,1);
      }
      .reply-btn {
        width:150px;
        height:46px;
        color: #fff;
        background:rgba(0,210,165,1);
        border-radius:0px 4px 4px 0px;
        border:1px solid rgba(0,0,0,0.05);
        font-size:14px;
        font-weight:600;
        line-height:20px;
      }
    }
  }
}
.tip {
  display: inline-block;
  font-size:12px;
  font-weight:400;
  color:rgba(157,157,167,1);
  line-height:24px;
  margin-top: 10px;
  i {
    margin-right: 5px;
  }
}
</style>
