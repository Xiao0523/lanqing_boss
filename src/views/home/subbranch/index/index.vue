<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="card">
          <h6 class="card__hd">分店总数</h6>
          <div class="card__bd">
            <strong class="card-number">32</strong>
            <span class="rate">
              <span class="rate-number">+2.5%</span>
              <i class="el-icon-sort-up rate-icon" />
            </span>
          </div>
          <div class="card__ft">当前分店数量</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <h6 class="card__hd">学员总数</h6>
          <div class="card__bd">
            <strong class="card-number">320</strong>
            <span class="rate">
              <span class="rate-number">+2.5%</span>
              <i class="el-icon-sort-up rate-icon" />
            </span>
          </div>
          <div class="card__ft">当前学员数量</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <h6 class="card__hd">讲师总数</h6>
          <div class="card__bd">
            <strong class="card-number">32</strong>
            <span class="rate">
              <span class="rate-number">+2.5%</span>
              <i class="el-icon-sort-up rate-icon" />
            </span>
          </div>
          <div class="card__ft">当前教师数量</div>
        </div>
      </el-col>
    </el-row>

    <div class="title-wraper">
      <h4 class="title">分店管理</h4>
      <el-button type="primary" class="el-icon-plus add-btn" @click="openCreateDialog">新增分店</el-button>

    </div>

    <div v-if="list.length" class="flex">
      <div v-for="(item, index) in list" :key="index" class="flex-item">
        <div class="shop shop--disabled">
          <div class="shop__hd">
            <img class="shop-logo" src alt>
            <div class="shop-info">
              <h6 class="shop-name">一顺教育（南商水街店）</h6>
              <div class="shop-slogan">未设置标语</div>
            </div>
            <more>
              <div class="shop-action-wraper">
                <div class="shop-action shop-action--warn" @click="onChangeStatus(item, index)">下架</div>
                <!-- <div class="shop-action" @click="onChangeStatus(item, index)">上架</div> -->
              </div>
            </more>
          </div>
          <div class="shop__bd">
            <div class="shop-data">
              <div class="shop-data-title">课程数</div>
              <div class="shop-data-number">0</div>
            </div>
            <div class="shop-data">
              <div class="shop-data-title">学生数</div>
              <div class="shop-data-number">0</div>
            </div>
            <div class="shop-data">
              <div class="shop-data-title">讲师数</div>
              <div class="shop-data-number">0</div>
            </div>
            <div class="shop-data">
              <div class="shop-data-title">评分</div>
              <div class="shop-data-number">5.0</div>
            </div>
          </div>
          <div class="shop__ft">
            <img class="shop-avatar" src alt>
            <div class="shop-manager-info">
              <h6 class="shop-manager">未设置</h6>
              <div class="shop-phone">手机号：无</div>
            </div>
            <!-- <el-button type="primary" class="btn-setting">设置店长</el-button> -->
            <el-button class="btn-change" @click="onOpenSetDialog(item, index)">设置店长</el-button>
            <!-- <el-button type="primary" class="btn-setting">设置店长</el-button> -->
          </div>
        </div>
      </div>
    </div>

    <div class="no-data">
      <img class="no-data-img" src="@/assets/暂无店铺.png" alt="">
      <p class="no-data-text">暂无分店</p>
    </div>

    <!-- <div>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="pageNum"
        :limit.sync="pageSize"
        @pagination="pageChange"
      />
    </div> -->

    <el-dialog
      :visible.sync="isCreateShow"
      @close="closeDialog('createFrom')"
    >
      <h6 slot="title" class="dialog-title">创建分店</h6>
      <el-form
        ref="createFrom"
        :inline-message="true"
        label-width="5em"
        :rules="createFormRules"
        :model="createForm"
      >
        <el-form-item label="分店名称" prop="subbranchName">
          <el-input v-model="createForm.subbranchName" placeholder="请输入分店名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="">
          <el-alert
            title="错误提示"
            type="error"
            :closable="false"
            show-icon
          />
        </div>
        <el-button type="primary" @click="onSubmit('createFrom')">立即创建</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="isManangerShow"
      @close="closeDialog('setManagerFrom')"
    >
      <h6 slot="title" class="dialog-title">设置店长</h6>
      <el-form
        ref="setManagerFrom"
        :inline-message="true"
        label-width="5em"
        :rules="setManagerFormRules"
        :model="setManagerForm"
      >
        <el-form-item class="mb-10" label="店长" prop="subbranchName">
          <el-input v-model="setManagerForm.name" placeholder="请输入店长登录名" />
        </el-form-item>
        <el-form-item class="mb-10" label="登录密码" prop="subbranchName">
          <el-input v-model="setManagerForm.password" placeholder="请输入登录密码" />
        </el-form-item>
        <el-form-item label="手机号" prop="subbranchName">
          <el-input v-model="setManagerForm.phone" placeholder="请输入手机号" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="">
          <el-alert
            title="错误提示"
            type="error"
            :closable="false"
            show-icon
          />
        </div>
        <el-button type="primary" @click="onSubmit('setManagerFrom')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import Pagination from '@/components/Pagination'
import More from '../components/More'

const checkName = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('不能为空'))
  }
  callback()
}
export default {
  name: 'Subbranch',
  components: { More },
  data() {
    return {
      list: [],
      total: 0, // 总记录数
      pageNum: 1, // 分页页面
      pageSize: 10, // 分页容量
      isCreateShow: false, // 创建分店 弹窗
      createForm: {
        subbranchName: ''
      },
      createFormRules: {
        subbranchName: [{ validator: checkName, trigger: 'blur' }]
      },
      isManangerShow: false, // 设置店长
      setManagerForm: {
        name: '',
        password: '',
        phone: ''
      },
      setManagerFormRules: {}

    }
  },
  methods: {
    onAudit(item) {},
    // 分页点击 事件
    pageChange(page) {},

    // 上下架
    onChangeStatus(item, index) {
      console.log(item, index)
    },

    // 打开创建分店
    openCreateDialog() {
      this.isCreateShow = true
    },

    // 提交 分店名称 | 店长
    onSubmit(form) {
      this.$refs[form].validate(isValid => {
        if (!isValid) return
      })
    },

    // 关闭 弹窗
    closeDialog(form) {
      this.$refs[form].resetFields()
    },

    // 设置店长
    onOpenSetDialog(item, index) {
      this.isManangerShow = true
    }

    //
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 30px;
  background: rgba(250, 250, 251, 1);
}

.card {
  background: #fff;
  padding: 20px 25px;
  height: 155px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  &__hd {
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(23, 23, 37, 1);
    line-height: 22px;
    margin: 0;
  }
  &__bd {
    margin-top: 20px;
  }
  &-number {
    font-size: 28px;
    font-family: Poppins-SemiBold, Poppins;
    font-weight: 600;
    color: rgba(23, 23, 37, 1);
    line-height: 42px;
    margin-right: 20px;
  }
  &__ft {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(105, 105, 116, 1);
    line-height: 20px;
    margin-top: 7px;
  }
}

.rate {
  color: rgba(61, 213, 152, 1);
  &-number {
    font-size: 16px;
    font-family: Poppins-SemiBold, Poppins;
    font-weight: 600;
    line-height: 25px;
  }
  &--down {
    color: rgba(255, 73, 82, 1);
  }
}
.title-wraper{
  margin: 30px 0;
  display: flex;
}
.title {
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(23, 23, 37, 1);
  line-height: 33px;
  margin: 0;
  flex: 1;
}
.add-btn{
  text-align: right;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
  &-item {
    width: 33.33333%;
    padding: 0 10px
  }
}

.shop{
  padding: 25px 0;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  color:rgba(23,23,37,1);
  &__hd{
    padding: 0 25px ;
    display: flex;
    position: relative;
  }
  &__bd{
    display: flex;
    margin-bottom: 20px;
    padding: 0 25px;
  }
  &__ft{
    display: flex;
    align-items: center;
    border-top:1px solid rgba(241,241,245,1);
    padding: 20px 25px 0;
  }
  &-info{
    flex: 1
  }
  &-logo{
    width:60px;
    height:60px;
    background:rgba(0,183,255,1);
    border-radius:4px;
    border:1px solid rgba(216,216,216,1);
    margin-right: 15px;
  }
  &-action{
    text-align: center;
    font-size:15px;
    width: 70px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    line-height:50px;
    padding: 0 20px;
    color: rgba(110, 110, 121, 1);
    &--warn{
      color:rgba(255,73,82,1);
    }
  }
  &-name{
    margin: 0;
    font-size:18px;
    font-weight:bold;
    line-height:18px;
  }
  &-slogan{
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(105,105,116,1);
    margin-top: 10px;
  }
  &-data{
    flex: 1;
    padding: 0 10px;
    &-title{
      font-size:11px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(105,105,116,1);
      line-height:16px;
      margin-bottom: 3px;
      margin-top: 20px;
    }
    &-number {
      font-size:22px;
      font-family:DINPro-Medium,DINPro;
      font-weight:500;
      line-height:24px;
    }
  }
  &-avatar{
    width:42px;
    height:42px;
    border-radius: 50%;
    background:rgba(0,183,255,1);
    margin-right: 15px;
  }
  &-manager-info{
    flex: 1;
  }
  &-manager{
    font-size:14px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    line-height:20px;
    margin: 0;
    margin-bottom: 3px;
  }
  &-phone{
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(146,146,157,1);
    line-height:17px;
    margin: 0;
  }
  &--disabled{
    color:rgba(146,146,157,1);
    .shop-data-title{
      color:rgba(154,154,164,1);
    }
    .shop-data-number{
      color:rgba(154,154,164,1);
    }
    .shop-avatar{
      background:rgba(241,241,245,1);
    }
    .el-button{
      color:rgba(146,146,157,1);
      border: 0;
      background:rgba(241,241,245,1);
    }
  }
}

.btn-change{
  border-radius:4px;
  border:1px solid rgba(0,210,165,1);
  color: rgba(0,210,165,1);
}

.dialog-title{
  font-size:14px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:bold;
  color:rgba(23,23,37,1);
  line-height:20px;
  margin: 0;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(241,241,245,1)
}
.dialog-footer{
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(241,241,245,1)
}
.el-alert--error {
  background: transparent;
}
.el-form-item{
  margin-bottom: 0;
  &__label{
    color: #333;
  }
}
.el-input{
  width: 240px;
  & /deep/ {
    .el-input__inner{
      background: rgba(250,250,251,1);
      color: #333;
      font-weight: bold;
      &:focus{
        border-color: #00D2A5
      }
    }
  }
}

.mb-10{
  margin-bottom: 10px;
}

.no-data{
  margin-top: 100px;
  text-align: center;
  &-img{
    width: 120px;
  }
  &-text{
    font-size:15px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(105,105,116,1);
    line-height:15px;
    margin-top: 20px;
  }
}
</style>
