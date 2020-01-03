<template>
  <section class="container">
    <h2 class="title">讲师管理</h2>

    <div class="panel">
      <h3 class="panel__hd">讲师基本信息</h3>
      <div class="panel__bd">
        <div class="teacher">
          <img class="teacher-avatar" src alt="头像">
          <div class="teacher-info">
            <div class="teacher-name">张三</div>
            <div class="teacher-slogan">好好学习 天天向上</div>
            <span class="teacher-age">23岁</span>
          </div>
          <div class="teacher-score">
            <div class="teacher-score-number">4.5</div>
            <star />
          </div>
        </div>
        <el-row :gutter="50">
          <el-col :span="6">
            <span class="info-title">教龄</span>
            <strong class="info-data">13</strong>
          </el-col>
          <el-col :span="6">
            <span class="info-title">课程数量</span>
            <strong class="info-data">20</strong>
          </el-col>
          <el-col :span="6">
            <span class="info-title">学生数</span>
            <strong class="info-data">3000.00</strong>
          </el-col>
        </el-row>

        <h4 class="teacher-honer">奖牌/荣誉</h4>
        <ul class="list">
          <li><img class="list-img" src="" alt=""></li>
        </ul>

        <h4 class="teacher-intro">讲师介绍</h4>
        <div>
          <el-tag type="success">古筝</el-tag>
          <el-tag type="success">古筝</el-tag>
        </div>
        <p class="teacher-intro-text">中国科学院心理研究所博士。山东省省级教学团队主要成员，省级精品课程主讲教师。中国科学院心理研究所心理健康指导师，潍坊医学院心理健康服务中心咨询师。中国心理卫生协会青年专家，中国音乐治疗协会理事。</p>
      </div>
    </div>

    <div class="panel">
      <h3 class="panel__hd">课程显示数据</h3>
      <div class="panel__bd">
        <div class="course-radio">
          <el-radio v-model="radio" label="1">显示真实数据</el-radio>
          <el-radio v-model="radio" label="2">显示虚拟数据</el-radio>
        </div>
        <div class="flex">
          <div class="flex__hd">课程数</div>
          <div class="flex__bd">
            <strong>30</strong>
          </div>
        </div>
        <div class="flex">
          <div class="flex__hd">学生数</div>
          <div class="flex__bd">
            <strong>300</strong>
          </div>
        </div>
        <el-button type="primary">保存</el-button>
      </div>
    </div>

    <div class="panel tabs-wraper">
      <el-tabs v-model="activeName0">
        <el-tab-pane label="正在授课" name="learning">
          <div v-if="list.length" class="table-wraper">
            <el-table class="table" :data="list">
              <el-table-column label="学员名称" />
              <el-table-column label="手机号" />
              <el-table-column label="状态" />
              <el-table-column label="课程名称" />
              <el-table-column label="开课时间" />
            </el-table>
          </div>
          <div v-else class="empty-content">
            <img class="empty-img" src="@/assets/暂无学员.png" alt>
            <p class="empty-text">暂无授课学员</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </section>
</template>
<script>
import Star from '@/components/Star'
export default {
  name: 'TeacherDetail',
  components: { Star },
  data() {
    return {
      content: {},
      imageUrl: '',
      radio: '',
      list: [],
      activeName0: 'learning'
    }
  },
  methods: {

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
  width: 128px;
  height: 80px;
  display: block;
  object-fit: scale-down;
}

.course-avatar {
  display: block;
  width: 80px;
  height: 80px;
}
.course-intro{
  width:600px;
  font-size:15px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:bold;
  color:rgba(23,23,37,1);
  line-height:32px;
}

.teacher {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  &-avatar {
    width: 60px;
    height: 60px;
    background: rgba(0, 210, 165, 1);
    border-radius: 4px;
    margin-right: 20px;
  }
  &-name {
    font-size: 18px;
    font-weight: bold;
    font-family: PingFangSC-Medium, PingFang SC;
    color: rgba(23, 23, 37, 1);
    line-height: 18px;
    margin-bottom: 8px;
  }
  &-slogan, &-age {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(105, 105, 116, 1);
    margin-bottom: 4px;
  }
  &-info{
    flex: 1;
  }
  &-score-number{
    font-size:22px;
    font-family:Poppins-SemiBold,Poppins;
    font-weight:600;
    color:rgba(0,210,165,1);
    line-height:33px;
    text-align: center;
  }
  &-honer,&-intro{
    font-size:16px;
    font-family:PingFangSC-Medium,PingFang SC;
    color:rgba(23,23,37,1);
    line-height:18px;
    margin: 20px 0;
  }
  &-intro-text{
    font-size:15px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:bold;
    color:rgba(23,23,37,1);
    line-height:32px;
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
    width:80px;
    height:80px;
    background:rgba(254,254,254,1);
    border-radius:1px;
    border:1px solid rgba(241,241,245,1);
    object-fit: cover;
  }
}

.info-title{
  font-size:13px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(105,105,116,1);
  line-height:42px;
}
.info-data{
  font-size:13px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(23,23,37,1);
  line-height:42px;
  margin-left: 30px;
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
.flex{
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  &__hd{
    width: 4em;
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
.course-radio{
  margin-bottom: 10px;
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

.tabs-wraper /deep/ {
  .el-tabs__nav {
    margin-left: 30px;
  }
  .el-tabs__item {
    line-height: 70px;
    height: 70px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(23, 23, 37, 1);
  }
  .is-active {
    color: rgba(0, 210, 165, 1);
  }
  .el-tabs__active-bar {
    height: 4px;
    background-color: rgba(0, 210, 165, 1);
  }
}

.table-wraper {
  padding: 0 15px;
  background: #fff;
  border-radius: 2px;
}

.table {
  & /deep/ {
    thead > tr {
      border-radius: 2px;
    }
    & th {
      background: rgba(250, 250, 251, 1);
      font-size: 13px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(68, 68, 79, 1);
      line-height: 18px;
    }
  }
}

.empty {
  &-table {
    width: 1140px;
    background: rgba(250, 250, 251, 1);
    border-radius: 2px;
    display: flex;
    height: 38px;
    &-head {
      flex: 1;
      height: 18px;
      font-size: 13px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(68, 68, 79, 1);
      line-height: 38px;
      padding-left: 40px;
    }
  }
  &-content {
    padding-top: 50px;
    text-align: center;
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
