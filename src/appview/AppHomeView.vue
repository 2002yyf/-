<template>

  <div class="identity">
    <el-card class="card1" shadow="always">
      <span style="display: block;font-size: 30px;margin-top: 20px;padding-left: 20px">张三</span>
      <span style="display:block;margin-top: 20px;padding-left: 20px">{{identity}}</span>
    </el-card>
  </div>
  <div class="operate">
    <el-card class="card2" >
      <van-grid :column-num="3" style="margin: 0">
        <van-grid-item icon="orders-o" text="申请权限" v-if="identity==='普通用户'"/>
        <van-grid-item icon="shop-o" text="供应商查询" to="/providerSearch"/>
        <van-grid-item icon="plus" text="上传产品" v-if="identity==='供应商'" to="/uploadProject"/>
        <van-grid-item icon="friends-o" text="人员信息" v-if="identity==='供应商'" to="/personView"/>
        <van-grid-item icon="sign" text="上传检测证明" v-if="identity==='供应商'" to="/uploadDetectionView"/>
        <van-grid-item icon="logistics" text="上传物流证明" v-if="identity==='供应商'" to="/uploadLogisticsView"/>
        <van-grid-item icon="search" text="被搜次数" v-if="identity==='供应商'" @click="showSearchTimes"/>
        <van-grid-item icon="logistics" text="查询物流" v-if="identity==='普通用户'"/>
        <van-grid-item icon="plus" text="上传生长信息" v-if="identity==='供应商'"/>
      </van-grid>

    </el-card>
  </div>

  <AppBottom></AppBottom>
</template>

<script>
import AppBottom from "@/components/AppBottom";
import { Toast } from 'vant';
export default {
  name: "AppHomeView",
  components:{
    AppBottom
  },data(){
    return{
      // identity:'普通用户',
      identity:'供应商',
      searchTimes:0
    }
  }
  ,methods:{
    showSearchTimes(){
      Toast('您被查询过' + this.searchTimes + '次');
    }
  }
}
</script>

<style scoped>
.identity{
  height: 200px;
}
.operate{
  height: 350px;
}
.card1{
  width: 90%;
  margin: 15px auto;
  height: 80%;
  border-radius: 20px 20px 20px 20px;
  background-image: url("https://img2.baidu.com/it/u=2612001068,2467147997&fm=253&app=138&size=w931& n=0&f=JPEG&fmt=auto?sec=1667408400&t=7314b41ed04d7cb6fe8228ca68507098");
}
.card2{
  width: 90%;
  margin: 15px auto;
}

</style>