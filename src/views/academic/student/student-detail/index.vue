<template>
  <div class="container">
    <h2 class="title">学员详情</h2>
    <div class="panel">
      <h3 class="panel__hd">学员基本信息</h3>
      <div class="panel__bd">
        <div class="student">
          <img class="student-avatar" src alt="头像">
          <div>
            <div class="student-name">张三</div>
            <div class="student-slogan">好好学习 天天向上</div>
          </div>
        </div>
        <el-row :gutter="50">
          <el-col :span="6">
            <span class="info-title">手机号码</span>
            <strong class="info-data">134847556373</strong>
          </el-col>
          <el-col :span="6">
            <span class="info-title">课程数量</span>
            <strong class="info-data">20</strong>
          </el-col>
          <el-col :span="6">
            <span class="info-title">消费总额（元）</span>
            <strong class="info-data">3000.00</strong>
          </el-col>
          <el-col :span="6">
            <span class="info-title">评价数量</span>
            <strong class="info-data">20</strong>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="panel tabs-wraper">
      <el-tabs v-model="activeName0" @tab-click="handleTabClick">
        <el-tab-pane label="正在学习中(2)" name="learning">
          <div v-if="list.length" class="table-wraper">
            <el-table class="table" :data="list">
              <el-table-column label="课程名称" />
              <el-table-column label="课时" />
              <el-table-column label="课程价格（元）" />
              <el-table-column label="上课地点" />
              <el-table-column label="当前讲师">
                <template slot-scope="scope">
                  {{ scope.row.createTime }}张老师
                  <span class="change" @click="openChangeTeacher">切换</span>
                </template>
              </el-table-column>
              <el-table-column label="状态" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="openGraduate(scope)">结业</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div v-else class="table-wraper">
            <div class="empty-table">
              <strong class="empty-table-head">课程名称</strong>
              <strong class="empty-table-head">课时</strong>
              <strong class="empty-table-head">课程价格（元）</strong>
              <strong class="empty-table-head">上课地点</strong>
              <strong class="empty-table-head">当前讲师</strong>
              <strong class="empty-table-head">状态</strong>
              <strong class="empty-table-head">操作</strong>
            </div>
            <div class="empty-content">
              <img class="empty-img" src="@/assets/暂无课程.png" alt>
              <p class="empty-text">暂无课程</p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="退款课程(1)" name="refund">
          <div v-if="list.length" class="table-wraper">
            <el-table class="table" :data="list">
              <el-table-column label="课程名称" />
              <el-table-column label="课时">
                <template slot-scope="scope">{{ scope.row.createTime }}</template>
              </el-table-column>
              <el-table-column label="课程价格（元）" />
              <el-table-column label="上课地点" />
              <el-table-column label="状态" />
              <el-table-column label="退款金额（元）" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="openRefund(scope)">退款</el-button>
                  <el-button type="info" size="mini" @click="openRefund(scope)">退款</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div v-else class="table-wraper">
            <div class="empty-table">
              <strong class="empty-table-head">课程名称</strong>
              <strong class="empty-table-head">课时</strong>
              <strong class="empty-table-head">课程价格（元）</strong>
              <strong class="empty-table-head">上课地点</strong>
              <strong class="empty-table-head">状态</strong>
              <strong class="empty-table-head">退款金额（元）</strong>
              <strong class="empty-table-head">操作</strong>
            </div>
            <div class="empty-content">
              <img class="empty-img" src="@/assets/暂无课程.png" alt>
              <p class="empty-text">暂无课程</p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="结束课程(5)" name="finish">
          <div v-if="list.length" class="table-wraper">
            <el-table class="table" :data="list">
              <el-table-column label="课程名称" />
              <el-table-column label="课时">
                <template slot-scope="scope">{{ scope.row.createTime }}</template>
              </el-table-column>
              <el-table-column label="课程价格（元）" />
              <el-table-column label="上课地点" />
              <el-table-column label="状态" />
              <el-table-column label="操作/评价">
                <template slot-scope="scope">
                  <el-button size="mini" @click="openComment(scope)">评语</el-button>
                  <el-tag size="medium">标签一</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div v-else class="table-wraper">
            <div class="empty-table">
              <strong class="empty-table-head">课程名称</strong>
              <strong class="empty-table-head">课时</strong>
              <strong class="empty-table-head">课程价格（元）</strong>
              <strong class="empty-table-head">上课地点</strong>
              <strong class="empty-table-head">状态</strong>
              <strong class="empty-table-head">/评价</strong>
            </div>
            <div class="empty-content">
              <img class="empty-img" src="@/assets/暂无课程.png" alt>
              <p class="empty-text">暂无课程</p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="panel tabs-wraper">
      <el-tabs v-model="activeName1" @tab-click="handleTabClick">
        <el-tab-pane label="消费记录" name="consumer">
          <div class="table-wraper">
            <el-table class="table" :data="list">
              <el-table-column label="订单号码" />
              <el-table-column label="课程名称" />
              <el-table-column label="课程价格（元）" />
              <el-table-column label="实付金额（元）" />
              <el-table-column label="下单时间">
                <template slot-scope="scope">{{ scope.row.createTime }}</template>
              </el-table-column>
              <el-table-column label="订单状态" />
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="学员评价" name="evaluate">
          <el-radio-group v-model="evaluateTarget" class="evaluate-radio" size="medium">
            <el-radio-button label="shop">店铺</el-radio-button>
            <el-radio-button label="course">课程</el-radio-button>
            <el-radio-button label="teacher">讲师</el-radio-button>
          </el-radio-group>

          <div v-show="evaluateTarget === 'shop'">
            <div v-if="list.length" class="table-wraper">
              <el-table class="table" :data="list">
                <el-table-column label="店铺名称" />
                <el-table-column label="发布时间">
                  <template slot-scope="scope">{{ scope.row.createTime }}</template>
                </el-table-column>
                <el-table-column label="评价星级">
                  <template>
                    <star :score="2" /></template>
                </el-table-column>
                <el-table-column label="评论内容" />
              </el-table>
            </div>

            <div v-else class="table-wraper">
              <div class="empty-table">
                <strong class="empty-table-head">店铺名称</strong>
                <strong class="empty-table-head">发布时间</strong>
                <strong class="empty-table-head">评价星级</strong>
                <strong class="empty-table-head">评论内容</strong>
              </div>
              <div class="empty-content">
                <img class="empty-img" src="@/assets/暂无评价.png" alt>
                <p class="empty-text">暂无评价</p>
              </div>
            </div>
          </div>

          <div v-show="evaluateTarget === 'course'">
            <div v-if="list.length" class="table-wraper">
              <el-table class="table" :data="list">
                <el-table-column label="课程名称" />
                <el-table-column label="发布时间">
                  <template slot-scope="scope">{{ scope.row.createTime }}</template>
                </el-table-column>
                <el-table-column label="评价星级">
                  <template>
                    <star :score="2" /></template>
                </el-table-column>
                <el-table-column label="评论内容" />
              </el-table>
            </div>

            <div v-else class="table-wraper">
              <div class="empty-table">
                <strong class="empty-table-head">课程名称</strong>
                <strong class="empty-table-head">发布时间</strong>
                <strong class="empty-table-head">评价星级</strong>
                <strong class="empty-table-head">评论内容</strong>
              </div>
              <div class="empty-content">
                <img class="empty-img" src="@/assets/暂无评价.png" alt>
                <p class="empty-text">暂无评价</p>
              </div>
            </div>
          </div>
          <div v-show="evaluateTarget === 'teacher'">
            <div v-if="list.length" class="table-wraper">
              <el-table class="table" :data="list">
                <el-table-column label="讲师名称" />
                <el-table-column label="发布时间">
                  <template slot-scope="scope">{{ scope.row.createTime }}</template>
                </el-table-column>
                <el-table-column label="评价星级">
                  <template>
                    <star :score="2" /></template>
                </el-table-column>
                <el-table-column label="评论内容" />
              </el-table>
            </div>

            <div v-else class="table-wraper">
              <div class="empty-table">
                <strong class="empty-table-head">讲师名称</strong>
                <strong class="empty-table-head">发布时间</strong>
                <strong class="empty-table-head">评价星级</strong>
                <strong class="empty-table-head">评论内容</strong>
              </div>
              <div class="empty-content">
                <img class="empty-img" src="@/assets/暂无评价.png" alt>
                <p class="empty-text">暂无评价</p>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog :visible="isGraduateShow" :center="true" @close="isGraduateShow=false">
      <h4 class="dialog-text">确认该课程学员已结业吗？</h4>

      <span slot="footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="onComment">立即结业</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible="isCommentShow" @close="isCommentShow=false">
      <h6 slot="title" class="dialog-title">结业评价</h6>
      <div class="dialog-radio-wraper">
        <el-radio v-model="studentEvaluate" border size="medium" label="1">成绩超群</el-radio>
        <el-radio v-model="studentEvaluate" border size="medium" label="2">成绩优秀</el-radio>
        <el-radio v-model="studentEvaluate" border size="medium" label="3">成绩良好</el-radio>
        <el-radio v-model="studentEvaluate" border size="medium" label="4">成绩一般</el-radio>
        <el-radio v-model="studentEvaluate" border size="medium" label="5">不及格</el-radio>
      </div>

      <span slot="footer" class="dialog-footer">
        <span />
        <el-button type="primary" @click="onComment">提交评价</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible="isRefundShow" @close="isRefundShow=false">
      <h6 slot="title" class="dialog-title">退款</h6>
      <el-form
        ref="refundFrom"
        :inline-message="true"
        label-width="7em"
        :rules="refundFormRules"
        :model="refundForm"
      >
        <el-form-item label="退款金额">
          <el-input v-model="refundForm.money" placeholder="输入退款金额" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <span>
          <el-alert title="错误提示" type="error" :closable="false" show-icon />
        </span>
        <el-button type="primary" @click="onRefund('refundFrom')">提交评价</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible="isChangeShow" @close="isChangeShow=false">
      <h6 slot="title" class="dialog-title">切换讲师</h6>
      <el-form
        ref="teacherFrom"
        :inline-message="true"
        label-width="7em"
        :rules="teacherFormRules"
        :model="teacherForm"
      >
        <el-form-item label="课程讲师">
          <el-select v-model="teacherForm.teacher" placeholder="选择课程讲师" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <span>
          <el-alert title="错误提示" type="error" :closable="false" show-icon />
        </span>
        <el-button type="primary" @click="onChangeTeacher('teacherFrom')">确认切换</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Star from '@/components/Star'
export default {
  name: 'StudentDetail',
  components: { Star },
  data() {
    return {
      list: [{}],
      activeName0: 'learning', // tab 栏
      activeName1: 'consumer', //
      evaluateTarget: 'shop', // 评价栏
      isGraduateShow: false,
      isCommentShow: false,
      studentEvaluate: '', // 学员评价
      isRefundShow: false,
      refundForm: {
        // 退款
        money: ''
      },
      refundFormRules: {},
      isChangeShow: false,
      teacherForm: {
        // 切换讲师
        teacher: ''
      },
      teacherFormRules: {}
    }
  },
  methods: {
    handleTabClick(tab, event) {
      console.log(tab, event)
    },

    // 结业
    openGraduate(item) {
      this.isGraduateShow = true
    },

    // 打开评价
    openComment() {
      this.isCommentShow = true
    },

    // 评价
    onComment() {},

    // 打开退款
    openRefund() {
      this.isRefundShow = true
    },

    // 退款
    onRefund(form) {
      this.$refs[form].validate(isValid => {
        if (!isValid) return
      })
    },

    // 打开 切换教师
    openChangeTeacher() {
      this.isChangeShow = true
    },

    // 切换教师
    onChangeTeacher() {}
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 30px;
}

.title {
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(23, 23, 37, 1);
  line-height: 33px;
  margin: 0;
  margin-bottom: 30px;
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
  }
  &__bd {
    padding: 25px 30px 0;
  }
}

.student {
  display: flex;
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
    margin-bottom: 20px;
  }
  &-slogan {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(105, 105, 116, 1);
    line-height: 11px;
  }
}

.info {
  &-title {
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(105, 105, 116, 1);
    line-height: 42px;
    margin-right: 30px;
    &:first-child {
      margin-left: 13px;
    }
  }
  &-data {
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: bold;
    color: rgba(23, 23, 37, 1);
    line-height: 42px;
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
.change {
  cursor: pointer;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 210, 165, 1);
  line-height: 24px;
  margin-left: 10px;
  &:hover {
    text-decoration: underline;
  }
}

.evaluate-radio {
  margin: 10px 20px 20px;
  & /deep/ {
    .el-radio-button__inner {
      font-weight: bold;
    }
    .is-active .el-radio-button__inner {
      background: rgba(0, 210, 165, 1);
      border-color: rgba(0, 210, 165, 1);
    }
  }
}

.dialog-title {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: rgba(23, 23, 37, 1);
  line-height: 20px;
  margin: 0;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(241, 241, 245, 1);
}
.dialog-text {
  text-align: center;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(23, 23, 37, 1);
  line-height: 25px;
  font-weight: bold;
  margin-bottom: 0;
}
.dialog-footer {
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(241, 241, 245, 1);
}
.dialog-radio-wraper {
  width: 70%;
  margin: -30px auto;
  text-align: center;
  .el-radio {
    margin: 7px;
    &.is-bordered.is-checked {
      border-color: rgba(0, 210, 165, 1);
    }
    & /deep/ .el-radio__input.is-checked .el-radio__inner {
      border-color: rgba(0, 210, 165, 1);
      background: rgba(0, 210, 165, 1);
    }
  }
}
.el-alert--error {
  background: transparent;
}
.el-form-item {
  margin-bottom: 0;
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

.empty {
  &-table {
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
