<template>
  <router-view/>
  <van-tabbar v-model="active" route>
    <van-tabbar-item icon="home-o" to="/appHome">首页</van-tabbar-item>
    <van-tabbar-item icon="search" to="/search">查询</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/AppInfo">信息</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  props:['active'],
  name: "AppBottom",
  data(){
    return{
      active:0,
    }

  },mounted() {

    },
  methods:{
  abc(){
    this.active=1;
    this.$router.push('/search');
  }
    }
}
</script>

<style scoped>

</style>