<template>
  <AppBottom></AppBottom>
  <div>
    <van-image
      style="display:block;margin:10px auto"
      round
      width="10rem"
      height="10rem"
      src="https://unpkg.com/@vant/assets/cat.jpeg"
  />
    <span style="display:block;font-size: 30px;text-align: center;padding-top: 10px">张三</span>
  </div>
  <div style="height: 400px">
    <van-cell-group style="top: 40px">
      <van-cell title="我的信息" is-link url="https://github.com" />
      <van-cell title="申请记录" is-link url="https://github.com" />
      <van-cell title="搜索记录" is-link to="index" />
    </van-cell-group>

  </div>
</template>

<script>
import AppBottom from "@/components/AppBottom";

export default {
  name: "InfoView",
  components:{
    AppBottom
  },
}
</script>

<style scoped>

</style>