<template>
  <div class="header">
    <div style="margin: 0 auto;width: 60vw;position: relative">
      <span style="font-size: 5vw;margin-left: 15vw;position: absolute;top: 15px;
      letter-spacing: 10px;font-family:SimSun-ExtB;">农产品溯源</span>
    </div>
  </div>
  <div class="body">
    <van-cell-group inset style="margin-top: 60px">
      <van-field v-model="username" type="text" label="用户名"  />
      <van-field v-model="password" type="password" label="密码" />
    </van-cell-group>
    <van-button type="primary" block style="margin-top: 50px" color="gray" @click="this.$router.push('/appRegister')">注册</van-button>
    <van-button type="primary" block style="margin-top: 10px"
                @click="login">登录</van-button>
  </div>

  <div class="bottom">
  </div>



</template>

<script>
import {Toast} from "vant";

export default {
  name: "AppLoginView",
  data(){
    return{
      username:'',
      password:'',
      show:false,
    }

  },methods:{
    onInput(){
    this.username = this.input
      console.log(this.username)
    },onDelete(){
    this.username = this.input
    },login(){
      Toast.success('登陆成功');
      this.$router.push('/appHome');
    }

  }

}
</script>

<style scoped>
.header{
  width: 100vw;
  height: 50px;
  background-color: #52a640;
  border-radius: 0 0 20px 20px;
}
.body{
  width: 100vw;
  height: 500px;
}
</style>