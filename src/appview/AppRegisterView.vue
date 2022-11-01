<template>
  <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <div style="width: 100vw;height: 500px">
    <van-cell-group inset style="margin-top: 50px">
      <van-field v-model="username" label="用户名" placeholder="请输入用户名" />
      <van-field v-model="password" label="密码" placeholder="请输入密码" type="password" />
      <van-field v-model="passwordCon" label="确认密码" placeholder="请确认密码" type="password" />
    </van-cell-group>
    <van-button type="primary" size="large" round style="width: 80%;left: 10%;top: 30px" @click="register">注册</van-button>
  </div>


</template>

<script>
import {Toast} from "vant";
export default {
  name: "AppRegisterView",
  data(){
    return{
      username:'',
      password:'',
      passwordCon:''
    }
  },

  methods:{
    onClickLeft(){
      this.$router.push('/FrontLogin')
    },register(){
      this.$router.push('/FrontLogin')
      Toast.success('注册成功');

    }
  }
}
</script>

<style scoped>

</style>