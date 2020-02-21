<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="card">
          <h6 class="card__hd">分店总数</h6>
          <div class="card__bd">
            <strong class="card-number">{{ homeInfo.stores }}</strong>
          </div>
          <div class="card__ft">当前分店数量</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <h6 class="card__hd">学员总数</h6>
          <div class="card__bd">
            <strong class="card-number">{{ homeInfo.students }}</strong>
          </div>
          <div class="card__ft">当前学员数量</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <h6 class="card__hd">讲师总数</h6>
          <div class="card__bd">
            <strong class="card-number">{{ homeInfo.teachers }}</strong>
          </div>
          <div class="card__ft">当前教师数量</div>
        </div>
      </el-col>
    </el-row>

    <div class="title-wraper">
      <h4 class="title">分店管理</h4>
      <el-select v-model="selectActive" class="select-box" @change="editChange">
        <el-option
          v-for="item in selectList"
          :key="item.label"
          :value="item.label"
        />
      </el-select>
      <el-button type="primary" class="el-icon-plus add-btn" @click="openCreateDialog">新增分店</el-button>
    </div>

    <div v-if="list.length" class="flex">
      <div v-for="(item, index) in list" :key="index" class="flex-item">
        <div class="shop">
          <div class="shop__hd">
            <div v-show="activeStatus === 1" class="img-mack" />
            <img class="shop-logo" :src="item.covers[0] | coversStr" alt>
            <div class="shop-info">
              <h6 class="shop-name" :class="{'status-back': activeStatus === 1}">{{ item.name }}</h6>
              <div class="shop-slogan" :class="{'status-back': activeStatus === 1}">{{ item.selfDescription }}</div>
            </div>
            <more>
              <div class="shop-action-wraper">
                <div class="shop-action">
                  <router-link :to="{ name: 'EditSubbranch', query: {id: item.id} }">修改</router-link>
                </div>
                <div class="shop-action" :class="{'shop-action--warn': activeStatus === 0}" @click="editStatus(item.id)">{{ activeStatus | statusStr }}</div>
                <!-- <div class="shop-action" @click="onChangeStatus(item, index)">上架</div> -->
              </div>
            </more>
          </div>
          <div class="shop__bd">
            <div class="shop-data">
              <div class="shop-data-title" :class="{'status-back': activeStatus === 1}">课程数</div>
              <div class="shop-data-number" :class="{'status-back': activeStatus === 1}">{{ item.curriculumAmount }}</div>
            </div>
            <div class="shop-data">
              <div class="shop-data-title" :class="{'status-back': activeStatus === 1}">学生数</div>
              <div class="shop-data-number" :class="{'status-back': activeStatus === 1}">{{ item.studentAmount }}</div>
            </div>
            <div class="shop-data">
              <div class="shop-data-title" :class="{'status-back': activeStatus === 1}">讲师数</div>
              <div class="shop-data-number" :class="{'status-back': activeStatus === 1}">{{ item.teacherAmount }}</div>
            </div>
            <div class="shop-data">
              <div class="shop-data-title" :class="{'status-back': activeStatus === 1}">评分</div>
              <div class="shop-data-number" :class="{'status-back': activeStatus === 1}">{{ item.score }}</div>
            </div>
          </div>
          <div class="shop__ft">
            <div v-show="activeStatus === 1" class="avatar-mack" />
            <img class="shop-avatar" :src="item.covers[0] | coversStr" alt>
            <div class="shop-manager-info">
              <h6 class="shop-manager" :class="{'status-back': activeStatus === 1}">{{ item.contactName | contactPeo }}</h6>
              <div class="shop-phone" :class="{'status-back': activeStatus === 1}">手机号：{{ item.contactPhone | contactPhoneStr }}</div>
            </div>
            <!-- <el-button type="primary" class="btn-setting">设置店长</el-button> -->
            <el-button v-show="!item.storeAdminLoginName && !item.storeAdminNickName" class="btn-change" :disabled="activeStatus === 1" @click="onOpenSetDialog('set', item.id, item.storeAdminLoginName, item.storeAdminNickName)">设置店长</el-button>
            <el-button v-show="item.storeAdminLoginName && item.storeAdminNickName" class="btn-change" :disabled="activeStatus === 1" @click="onOpenSetDialog('edit', item.id, item.storeAdminLoginName, item.storeAdminNickName)">更改店长</el-button>
            <!-- <el-button type="primary" class="btn-setting">设置店长</el-button> -->
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-data">
      <img class="no-data-img" src="@/assets/暂无店铺.png" alt="">
      <p class="no-data-text">暂无分店</p>
    </div>

    <div>
      <pagination
        v-show="total > 9"
        :total="total"
        :page.sync="listQuery.pageNum"
        :limit.sync="listQuery.pageSize"
        @pagination="fetchList"
      />
    </div>

    <el-dialog
      :visible.sync="isManangerShow"
      class="dialog"
      top="-178px"
      @close="closeDialog()"
    >
      <h6 slot="title" class="dialog-title">店长管理</h6>
      <el-form
        :inline-message="true"
        label-width="6em"
        :model="setManagerForm"
      >
        <el-form-item class="mb-10" label="店长" prop="subbranchName">
          <el-input v-model="setManagerForm.userName" placeholder="请输入店长登录名" />
        </el-form-item>
        <el-form-item class="mb-10" label="登录密码" prop="subbranchName">
          <el-input v-model="setManagerForm.password" type="password" placeholder="请输入登录密码" />
        </el-form-item>
        <el-form-item label="昵称" prop="subbranchName">
          <el-input v-model="setManagerForm.nickName" placeholder="请输入昵称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="colorfullBtn" @click="onSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import More from './components/More'
import { getBusinessHome, getStoreList, addStore, editStoreStatus } from '@/api/subbranch'

export default {
  name: 'Subbranch',
  components: { More, Pagination },
  filters: {
    contactPeo(val) {
      return val || '未设置'
    },
    contactPhoneStr(val) {
      return val || '无'
    },
    coversStr(val) {
      return val || ''
    },
    statusStr(val) {
      return val === 0 ? '下架' : '上架'
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 9
      },
      activeStatus: 0,
      selectList: [{
        value: 0,
        label: '已上架'
      }, {
        value: 1,
        label: '已下架'
      }],
      selectActive: '已上架',
      isManangerShow: false, // 设置店长
      setManagerForm: {
        userName: '',
        password: '',
        nickName: ''
      },
      homeInfo: {
        stores: 0,
        students: 0,
        teachers: 0
      },
      isAdd: true,
      activeId: ''
    }
  },
  mounted() {
    this.getHomeInfo()
    this.fetchList()
  },
  methods: {
    // 获取首页数据
    getHomeInfo() {
      getBusinessHome().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        if (!res.data) return
        this.homeInfo = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取店铺列表
    fetchList() {
      const getObj = this.listQuery
      getObj.status = this.activeStatus
      getStoreList(getObj).then(res => {
        if (res.code) {
          return res.message && this.$wran(res.message)
        }
        if (!res.data) return
        const data = res.data
        this.total = data.total
        const records = data.records
        this.list = records && records.length ? records : []
        console.log(this.list)
      })
    },
    onAudit(item) {},
    // 分页点击 事件
    // pageChange(page) {},

    // 上下架
    onChangeStatus(item, index) {
      console.log(item, index)
    },

    // 打开创建分店
    openCreateDialog() {
      this.$router.push({ name: 'EditSubbranch' })
    },

    // 提交 分店名称 | 店长
    onSubmit() {
      const submitObj = this.setManagerForm
      submitObj.storeId = this.activeId
      if (!submitObj.password) {
        return this.$warn('请输入新密码！！！')
      }
      addStore(submitObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.$success(res.message)
        this.isManangerShow = false
        this.fetchList()
      })
    },

    // 关闭 弹窗
    closeDialog() {
    },

    // 设置店长
    onOpenSetDialog(key, id, loginName, nickName) {
      if (key === 'set') {
        this.isAdd = true
      } else {
        this.isAdd = false
      }
      this.setManagerForm.nickName = nickName
      this.setManagerForm.userName = loginName
      this.setManagerForm.password = ''
      this.activeId = id
      this.isManangerShow = true
    },

    // 更改列表获取状态
    editChange() {
      for (const item of this.selectList) {
        if (item.label === this.selectActive) {
          this.activeStatus = item.value
          break
        }
      }
      this.fetchList()
    },

    // 上架 下架
    editStatus(id) {
      const statusObj = {
        id: id
      }
      statusObj.status = this.activeStatus === 0 ? 1 : 0
      editStoreStatus(statusObj).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.$success(res.message)
        this.getHomeInfo()
        this.fetchList()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 30px;
  background: rgba(250, 250, 251, 1);
}
.colorfullBtn {
  display: inline-block;
  width:96px;
  height:38px;
  background:linear-gradient(90deg,rgba(0,214,211,1) 0%,rgba(0,206,124,1) 100%);
  border-radius:4px;
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
  .img-mack {
    width:60px;
    height:60px;
    background: rgba(255, 255, 255, 0.6);
    border-radius:4px;
    position: absolute;
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
    width: 100%;
    overflow: hidden;
    height: 24px;
    line-height: 24px;
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
  .avatar-mack {
    width:42px;
    height:42px;
    border-radius: 50%;
    position: absolute;
    background:rgba( 255,255,255,.6);
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

.status-back {
  color: #92929D;
}

.btn-change {
  border-radius:4px;
  border: 1px solid rgba(0,210,165,1);
  color: #00D2A5;
  background: transparent;
  &:hover {
    color: #FFFFFF;
    background: linear-gradient(to right, #00D6D3, #00CE7C);
    transition: all .5s;
  }
}

// .btn-change-edit {
// }

.select-box {
  margin-right: 20px;
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
  justify-content: flex-end;
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
.dialog {
  & /deep/ {
    .el-dialog {
      width: 500px;
      top: 50%;
    }
    .el-form-item__label {
      padding: 0 20px 0 0;
    }
    .el-dialog__footer {
      padding: 0 30px 20px;
    }
  }
}
.el-input{
  width: 240px;
  & /deep/ {
    .el-input__inner{
      width:240px;
      height:42px;
      background:rgba(250,250,251,1);
      border-radius:4px;
      border:1px solid rgba(241,241,245,1);
      &:focus{
        border-color: #00D2A5
      }
    }
  }
}

.mb-10{
  margin-bottom: 10px;
}

.shop-action {
  cursor: pointer;
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
