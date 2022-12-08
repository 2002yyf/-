<template>
  <AppBottom></AppBottom>
  <div>
    <van-image
      style="display:block;margin:10px auto"
      round
      width="10rem"
      height="10rem"
      :src=src
  />
    <span style="display:block;font-size: 30px;text-align: center;padding-top: 10px">张三</span>
  </div>
  <div style="height: 400px">
    <van-cell-group style="top: 40px">
      <van-cell title="我的信息" to="/myInfo" />
      <van-cell title="搜索记录"  />
    </van-cell-group>

  </div>
</template>

<script>
import AppBottom from "@/components/AppBottom";
import request from "@/utils/request";

export default {
  name: "InfoView",
  components:{
    AppBottom
  },mounted() {
  },data(){
    return{
      src:''
    }
  }
}
</script>

<style scoped>

</style>