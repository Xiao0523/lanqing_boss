<template>
  <div class="content-detail">
    <div class="cell"><span class="cell-hd">店铺名称</span>{{ authList.name }}</div>
    <div class="cell"><span class="cell-hd">统一信用代码</span>{{ authList.unifiedCreditCode }}</div>
    <div class="cell"><span class="cell-hd">法人姓名</span>{{ authList.legalPersonName }}</div>
    <div class="cell"><span class="cell-hd">法人身份证号</span>{{ authList.legalPersonCardId }}</div>
    <div class="cell"><span class="cell-hd">银行卡号</span>{{ authList.bankNo }}</div>
    <div class="cell"><span class="cell-hd">银行名称</span>{{ authList.bankName }}</div>
    <div class="cell"><span class="cell-hd">工商营业执照</span><img class="thumbnail" :src="authList.businessLicense" alt="上传工商执照"></div>
    <div class="cell"><span class="cell-hd">办学许可证</span><img class="thumbnail" :src="authList.schoolLicense" alt="办学许可证" srcset=""></div>
  </div>
</template>

<script>
export default {
  name: 'AuthResult',
  props: {
    list: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      authList: {
        name: '',
        bankName: '',
        bankNo: '',
        businessLicense: '',
        legalPersonCardId: '',
        legalPersonName: '',
        schoolLicense: '',
        storeId: '',
        unifiedCreditCode: ''
      }
    }
  },
  watch: {
    list: {
      handler(val) {
        this.authList = this.list
      },
      deep: true
    }
  },
  mounted() {
    this.authList = this.list
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../styles/store';
</style>
