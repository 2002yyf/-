<template>
  <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <div style="width: 100vw;height: 500px">
    <van-cell-group inset style="margin-top: 50px">
      <van-field v-model="form.userName" label="用户名" placeholder="请输入用户名" />
      <van-field v-model="form.password" label="密码" placeholder="请输入密码" type="password" />
      <van-field v-model="form.repeatPassword" label="确认密码" placeholder="请确认密码" type="password" />
    </van-cell-group>
    <van-button type="primary" size="large" round style="width: 80%;left: 10%;top: 30px" @click="register">注册</van-button>
  </div>


</template>

<script>
import request from "@/utils/request";
export default {
  name: "AppRegisterView",
  data(){
    return{
      form:{
        username:'',
        password:'',
        repeatPassword:''
      }
    }
  },

  methods:{
    onClickLeft(){
      this.$router.push('/FrontLogin')
    },
    register(){
      if (!this.form.password || !this.form.repeatPassword || !this.form.userName) {
        this.$message({
          type: 'error',
          message: '请完成所有信息的输入！',
        })
      } else {
        if (this.form.password !== this.form.repeatPassword) {
          this.$message({
            type: 'error',
            message: '两次密码输入不一致！',
          })
          return
        } else {
              request.post("/user/register", this.form).then(res => {
                if (res.code === 1) {
                  this.$message({
                    type: "success",
                    message: "注册成功"
                  })
                  this.$router.push("/FrontLogin")
                } else {
                  this.$message({
                    type: "error",
                    message: res.errorMsg
                  })
                }
              })
        }
      }
    }
  }
}
</script>

<style scoped>

</style>