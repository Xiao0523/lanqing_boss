<template>
  <div class="container">
    <router-link :to="{name: 'Course-detail'}">
      <el-button>新建课程</el-button>
    </router-link>

    <el-select v-model="keywords.categroy" />
    <el-table
      :data="list"
    >
      <el-table-column>
        <template slot-scope="scope">
          <div class="row">
            <div class="row__hd list">
              <router-link :to="{name: 'Competition-detail'}">
                <img class="list-img" src="" alt="图片">
              </router-link>
              <div class="list__bd">
                <h6 class="list-title"><span class="list-status">进行中</span>一顺二维古筝比赛</h6>
                <div class="list-content flex">
                  <div class="list-date">
                    <div class="list-start">发布时间：{{ scope.row.time }}2019-10-21</div>
                    <div class="list-end">结束时间：2019-10-21</div>
                  </div>
                  <div class="list-data flex">
                    <div class="list-data-item">
                      <div>0</div>
                      <div>转发数</div>
                    </div>
                    <div class="list-data-item">
                      <div>0</div>
                      <div>参与人数</div>
                    </div>
                    <div class="list-data-item">
                      <div>0</div>
                      <div>总投票数</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-button type="danger" size="mini" @click="onDel(scope.row, scope.$index)">立即参加</el-button>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="课程名称" />
      <el-table-column align="center" label="分类" />
      <el-table-column align="center" label="单价" />
      <el-table-column align="center" label="学员数" />
      <el-table-column align="center" label="教师" />
      <el-table-column align="center" label="课时数" />
      <el-table-column align="center" label="起始日期" /> -->
      <!-- <el-table-column>
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="onDel(scope.row, scope.$index)">立即参加</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <div>
      <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="pageChange" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'Competition',
  components: { Pagination },
  data() {
    return {
      list: [{}],
      keywords: {
        categroy: ''
      },
      total: 0, // 总记录数
      pageNum: 1, // 分页页面
      pageSize: 10// 分页容量
    }
  },
  methods: {
    onDel(item) {

    },
    // 分页点击 事件
    pageChange(page) {

    }
  }
}
</script>
<style lang="scss" scoped>
.flex,
.row{
  display: flex;
  align-items: center
}
.row{
  &__hd{
    flex: 1;

  }
}
.list{
  display: flex;
  align-items: center;
  &__bd{
    flex: 1;
    height: 100px;
    margin-left: 10px;
  }
  &-img{
    width: 100px;
    height: 100px;
    display: block
  }
  &-title{
    margin: 0 0 10px 0
  }
  &-status{
    margin-right: 30px;
  }
  &-date{
    padding-right: 20px;
    border-right: 1px solid #000;
  }
  &-end{
    margin-top: 10px;
  }
  &-data{
    padding-left: 20px;
    text-align: center;
    &-item{
      width: 100px
    }
  }

}
</style>
