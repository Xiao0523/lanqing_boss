<template>
  <section class="container">
    <div class="page-head-wraper">
      <page-head content="回复评价" @back="goBack" />
    </div>

    <div class="wraper">
      <div v-for="item in content.commentSubDetails" :key="item.id" class="guest-box">
        <h3 class="title">
          {{ item.type | typeStr }}
        </h3>
        <div class="img-box">
          <img v-show="item.icon" :src="item.icon" alt="">
          <div class="user-info">
            <span class="title">{{ item.name }}</span>
            <div class="star-box">
              <star :score="item.score" />
            </div>
          </div>
        </div>
        <div class="guest-font">{{ item.commentWords }}</div>
        <div class="form-box">
          <el-input v-model="item.replyWords" :disabled="content.commentInfo.status === 1" class="reply-input" placeholder="请输入回复内容" />
        </div>
      </div>
      <span class="tip"><i class="el-icon-info" />回复内容不得泄露用户隐私和信息，请谨慎</span>
      <div class="btn-box">
        <el-button v-show="content.commentInfo && content.commentInfo.status === 0" class="reply-btn" @click="backReply">立即回复</el-button>
      </div>
    </div>
  </section>
</template>
<script>
import PageHead from '@/components/PageHead'
import Star from '@/components/Star'
import { mixins } from '@/views/mixins'
import { getCommonDetail, getReply } from '@/api/common'
export default {
  name: 'CommentDtatil',
  components: { PageHead, Star },
  filters: {
    typeStr(val) {
      return Number(val) === 0 ? '机构评价' : Number(val) === 1 ? '课程评价' : '教师评价'
    }
  },
  mixins: [mixins],
  data() {
    return {
      content: {},
      viewId: ''
    }
  },
  created() {
    const id = this.$route.query.id
    if (id) {
      this.viewId = id
      this.getView(id)
    }
  },
  methods: {
    getView(id) {
      const getObj = {
        id
      }
      getCommonDetail(getObj).then(res => {
        if (res.code) return res.message && this.$warn(res.message)
        this.content = res.data
      })
    },
    backReply(obj) {
      const replyObj = []
      for (const items of this.content.commentSubDetails) {
        replyObj.push({
          content: items.replyWords,
          id: items.id
        })
      }
      const getObj = {
        replyCommentRecords: [
          ...replyObj
        ],
        trainingStudentCurriculumId: this.viewId
      }
      getReply(getObj).then(res => {
        if (res.code) return res.message && this.$warn(res.message)
        this.$success('回复成功！！！')
        this.getView(this.viewId)
      })
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
.btn-box {
  margin-top: 10px;
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
