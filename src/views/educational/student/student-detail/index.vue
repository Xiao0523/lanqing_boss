<template>
  <div class="container">
    <h2 class="title">学员详情</h2>
    <div class="panel">
      <h3 class="panel__hd">学员基本信息</h3>
      <div class="panel__bd">
        <div class="student">
          <img class="student-avatar" :src="studentContent.icon">
          <div>
            <div class="student-name">{{ studentContent.nickName }}</div>
            <div class="student-slogan">好好学习 天天向上</div>
          </div>
        </div>
        <el-row :gutter="50">
          <el-col :span="6">
            <span class="info-title">手机号码</span>
            <strong class="info-data">{{ studentContent.phone }}</strong>
          </el-col>
          <el-col :span="6">
            <span class="info-title">正在学习</span>
            <strong class="info-data">{{ studentContent.studyNum }}</strong>
          </el-col>
          <el-col :span="6">
            <span class="info-title">消费总额（元）</span>
            <strong class="info-data">{{ studentContent.money }}</strong>
          </el-col>
          <el-col :span="6">
            <span class="info-title">评价数量</span>
            <strong class="info-data">{{ studentContent.commentNum }}</strong>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="panel tabs-wraper">
      <el-tabs v-model="activeName0" @tab-click="getClassList">
        <el-tab-pane label="正在学习中">
          <div class="table-wraper">
            <el-table class="table" :data="classList">
              <el-table-column label="订单号" prop="orderNum" />
              <el-table-column label="课程名称" prop="curriculumName" />
              <el-table-column label="课时" prop="hours" />
              <el-table-column label="课程价格（元）" prop="curriculumPrice" />
              <el-table-column label="当前讲师">
                <template slot-scope="scope">
                  {{ scope.row.currentTeacherName }}
                  <span class="change" @click="openChangeTeacher(scope.row.curriculumId, scope.row.id)">切换</span>
                </template>
              </el-table-column>
              <el-table-column label="状态">
                <template>
                  学习中
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="openGraduate(scope.row.id)">结业</el-button>
                </template>
              </el-table-column>
              <template slot="empty">
                <div class="empty-content">
                  <img class="empty-img" src="@/assets/no-cursor.png" alt>
                  <p class="empty-text">暂无课程</p>
                </div>
              </template>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="退款课程">
          <div class="table-wraper">
            <el-table class="table" :data="classList">
              <el-table-column label="订单号" prop="orderNum" />
              <el-table-column label="课程名称" prop="curriculumName" />
              <el-table-column label="课时" prop="hours" />
              <el-table-column label="课程价格（元）" prop="curriculumPrice" />
              <el-table-column label="当前讲师" prop="currentTeacherName" />
              <el-table-column label="状态">
                <template slot-scope="scope">
                  {{ scope.row.status | refundStatusStr }}
                  <!-- {{ scope.row.description }} -->
                </template>
              </el-table-column>
              <el-table-column label="退款金额（元）" prop="payPrice" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" :disabled="!scope.row.refundId" size="mini" @click="backMoneys(scope.row)">退款</el-button>
                </template>
              </el-table-column>
              <template slot="empty">
                <div class="empty-content">
                  <img class="empty-img" src="@/assets/no-cursor.png" alt>
                  <p class="empty-text">暂无课程</p>
                </div>
              </template>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="结束课程">
          <div class="table-wraper">
            <el-table class="table" :data="classList">
              <el-table-column label="订单号" prop="orderNum" />
              <el-table-column label="课程名称" prop="curriculumName" />
              <el-table-column label="课时" prop="hours" />
              <el-table-column label="课程价格（元）" prop="curriculumPrice" />
              <el-table-column label="当前讲师" prop="currentTeacherName" />
              <el-table-column label="状态">
                <template>
                  已结束
                </template>
              </el-table-column>
              <el-table-column label="评价">
                <template slot-scope="scope">
                  {{ scope.row.storeEvaluate | storeEvaluateStr }}
                </template>
              </el-table-column>
              <template slot="empty">
                <div class="empty-content">
                  <img class="empty-img" src="@/assets/no-cursor.png" alt>
                  <p class="empty-text">暂无课程</p>
                </div>
              </template>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="panel tabs-wraper">
      <el-tabs v-model="activeName1">
        <el-tab-pane label="学员评价" name="evaluate">
          <el-radio-group v-model="evaluateTarget" class="evaluate-radio" size="medium">
            <el-radio-button label="shop">店铺</el-radio-button>
            <el-radio-button label="course">课程</el-radio-button>
            <el-radio-button label="teacher">讲师</el-radio-button>
          </el-radio-group>

          <div v-show="evaluateTarget === 'shop'">
            <div class="table-wraper box-p">
              <el-table class="table" :data="commentList.comment4StudentStoreViews">
                <el-table-column label="发布时间">
                  <template slot-scope="scope">{{ scope.row.commentTime | commentTimeStr }}</template>
                </el-table-column>
                <el-table-column label="评价星级">
                  <template slot-scope="scope">
                    <star :score="scope.row.score" />
                  </template>
                </el-table-column>
                <el-table-column label="评论内容" prop="commentWords" />
                <template slot="empty">
                  <div class="empty-content">
                    <img class="empty-img" src="@/assets/no-comment.png" alt>
                    <p class="empty-text">暂无评价</p>
                  </div>
                </template>
              </el-table>
            </div>
          </div>

          <div v-show="evaluateTarget === 'course'">
            <div class="table-wraper box-p">
              <el-table class="table" :data="commentList.comment4StudentCurriculumViews">
                <el-table-column label="课程名称" prop="curriculumName" />
                <el-table-column label="发布时间">
                  <template slot-scope="scope">{{ scope.row.commentTime | commentTimeStr }}</template>
                </el-table-column>
                <el-table-column label="评价星级">
                  <template slot-scope="scope">
                    <star :score="scope.row.score" />
                  </template>
                </el-table-column>
                <el-table-column label="评论内容" prop="commentWords" />
                <template slot="empty">
                  <div class="empty-content">
                    <img class="empty-img" src="@/assets/no-comment.png" alt>
                    <p class="empty-text">暂无评价</p>
                  </div>
                </template>
              </el-table>
            </div>
          </div>
          <div v-show="evaluateTarget === 'teacher'">
            <div class="table-wraper box-p">
              <el-table class="table" :data="commentList.comment4StudentTeacherViews">
                <el-table-column label="讲师名称" prop="realName" />
                <el-table-column label="发布时间">
                  <template slot-scope="scope">{{ scope.row.commentTime | commentTimeStr }}</template>
                </el-table-column>
                <el-table-column label="评价星级">
                  <template slot-scope="scope">
                    <star :score="scope.row.score" />
                  </template>
                </el-table-column>
                <el-table-column label="评论内容" prop="commentWords" />

                <template slot="empty">
                  <div class="empty-content">
                    <img class="empty-img" src="@/assets/no-comment.png" alt>
                    <p class="empty-text">暂无评价</p>
                  </div>
                </template>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog title="确认该课程学员已结业吗？" :visible="isGraduateShow" :center="true" @close="isGraduateShow=false">
      <div class="dialog-radio-wraper">
        <el-radio-group v-model="studentEvaluate" fill="#00D2A5" text-color="#00D2A5" size="medium">
          <el-radio border size="medium" label="0">成绩超群</el-radio>
          <el-radio border size="medium" label="1">成绩优秀</el-radio>
          <el-radio border size="medium" label="2">成绩良好</el-radio>
          <el-radio border size="medium" label="3">成绩一般</el-radio>
          <el-radio border size="medium" label="4">不及格</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer">
        <el-button @click="isGraduateShow=false">取 消</el-button>
        <el-button class="colorfulBtn" type="primary" @click="onComment">立即结业</el-button>
      </span>
    </el-dialog>
    <!--
    <el-dialog :visible="isRefundShow" @close="isRefundShow=false">
      <h6 slot="title" class="dialog-title">退款</h6>
      <el-form
        ref="refundFrom"
        :inline-message="true"
        label-width="7em"
      >
        <el-form-item label="退款金额">
          <el-input v-model="refundForm.applyPrice" placeholder="输入退款金额" @keyup.native="proving" />
        </el-form-item>
        <el-form-item label="退款描述">
          <el-input v-model="refundForm.refundDescription" type="textarea" placeholder="输入退款描述" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="colorfulBtn" type="primary" @click="onRefund">提交评价</el-button>
      </span>
    </el-dialog> -->

    <back-money :flag="backFlag" :obj="backObj" @closeFlag="closeDialog" />
    <el-dialog :visible="isChangeShow" @close="isChangeShow=false">
      <h6 slot="title" class="dialog-title">切换讲师</h6>
      <el-form
        ref="teacherFrom"
        :inline-message="true"
        label-width="7em"
      >
        <el-form-item label="课程讲师">
          <el-select v-model="teacherId" placeholder="选择课程讲师">
            <el-option
              v-for="item of teacherList"
              :key="item.realName"
              :value="item.id"
              :label="item.realName"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="colorfulBtn" type="primary" @click="onChangeTeacher">确认切换</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getStudentDetail, getStudentCursor, evaluation, getCommentList } from '@/api/student'
import { getDetail, editStudentTeacher } from '@/api/course'
import { postRefund } from '@/api/orders'
import Star from '@/components/Star'
import { formatTime } from '@/utils/date'
import backMoney from '@/views/finance/course-order/components/backMoney'
export default {
  name: 'StudentDetail',
  components: { Star, backMoney },
  filters: {
    storeEvaluateStr(val) {
      return val === 0 ? '成绩超群' : val === 1 ? '成绩优异' : val === 2 ? '成绩良好' : val === 3 ? '成绩一般' : val === 4 ? '不及格' : ''
    },
    refundStatusStr(val) {
      return val === 5 ? '退款中' : '已到账'
    },
    orderTimeStr(val) {
      return val && formatTime(val)
    },
    commentTimeStr(val) {
      return val && formatTime(val)
    },
    statusStr(val) {
      return val === 4 ? '已结业' : val === 6 ? '退款完成，课程终止' : '其他'
    }
  },
  data() {
    return {
      list: [],
      activeName0: 0, // tab 栏
      activeName1: 'evaluate', //
      evaluateTarget: 'shop', // 评价栏
      isGraduateShow: false,
      isCommentShow: false,
      studentEvaluate: '', // 学员评价
      isRefundShow: false,
      refundForm: {
        // 退款
        applyPrice: '',
        refundDescription: ''
      },
      backObj: {},
      backFlag: false,
      refundFormRules: {},
      isChangeShow: false,
      teacherFormRules: {},
      studentContent: {},
      viewId: '',
      classList: [{}],
      classOrder: [],
      commentList: {
        comment4StudentCurriculumViews: [],
        comment4StudentStoreViews: [],
        comment4StudentTeacherViews: []
      },
      refundId: '',
      curriculumId: '',
      teacherList: [],
      teacherId: '',
      editId: ''
    }
  },
  created() {
    const id = this.$route.query.id
    if (id) {
      this.viewId = id
      this.getView(id)
      this.getClassList(id)
      // this.getClassOrder(id)
      this.getComment(id)
    }
  },
  methods: {
    getView(id) {
      const submitObj = {
        id
      }
      getStudentDetail(submitObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.studentContent = res.data
      })
    },
    getTeacher(id) {
      const getObj = {
        id: id
      }
      getDetail(getObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.teacherList = res.data.teachers
        if (this.teacherList.length === 1) {
          this.$warn('该门课只有一位老师上课，无法切换！')
          this.isChangeShow = false
        }
      })
    },
    // // select教师切换
    // teacherChange() {
    //   for (const item of this.teacherList) {
    //     if (item.realName === this.teacherStr) {
    //       this.teacherId = item.id
    //       return
    //     }
    //   }
    // },
    // 验证只能输入正整数
    proving() {
      this.refundForm.applyPrice = this.refundForm.applyPrice.replace(/[^\.\d]/g, '')
      this.refundForm.applyPrice = this.refundForm.applyPrice.replace('.', '')
    },
    // 获取学员评价
    getComment(id) {
      const submitObj = {
        id
      }
      getCommentList(submitObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.commentList = res.data
      })
    },
    // 获取学员消费记录
    // getClassOrder(id) {
    //   const submitObj = {
    //     id
    //   }
    //   getStudentOrder(submitObj).then(res => {
    //     if (res.code) {
    //       return res.message && this.$warn(res.message)
    //     }
    //     if (!res.data) return
    //     this.classOrder = res.data
    //   })
    // },
    // 获取课程列表
    getClassList() {
      const submitObj = {
        studentId: this.viewId,
        type: this.activeName0
      }
      getStudentCursor(submitObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.classList = res.data
      })
    },
    // 结业
    openGraduate(id) {
      this.curriculumId = id
      this.isGraduateShow = true
    },
    // 结业请求
    onComment() {
      const submitObj = {
        id: this.curriculumId,
        type: this.studentEvaluate
      }
      evaluation(submitObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.$success(res.message)
        this.getClassList(this.viewId)
        this.isGraduateShow = false
      })
    },

    // 打开退款
    backMoneys(obj) {
      this.backObj = obj
      this.backFlag = true
    },
    closeDialog() {
      this.backFlag = false
      this.getClassList(this.viewId)
    },

    // 退款
    onRefund() {
      const submitObj = {
        refundId: this.refundId,
        ...this.refundForm
      }
      postRefund(submitObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.$success(res.message)
        this.getClassList(this.viewId)
        this.isRefundShow = false
      })
    },

    // 打开 切换教师
    openChangeTeacher(id, editId) {
      this.editId = editId
      this.getTeacher(id)
      this.isChangeShow = true
    },

    // 切换教师
    onChangeTeacher() {
      const submitObj = {
        teacherId: this.teacherId,
        tscId: this.editId
      }
      editStudentTeacher(submitObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.$success(res.message)
        this.isChangeShow = false
        this.getClassList(this.viewId)
      })
    }
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
    background: rgba(0, 210, 165, 0);
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
  padding: 20px 15px 30px;
  background: #fff;
  border-radius: 2px;
  &.box-p {
    padding-top: 0;
  }
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
  padding-bottom: 10px;
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
  margin-bottom: 10px;
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
/deep/ {
  .el-tabs__nav-scroll {
    padding-left: 0;
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
