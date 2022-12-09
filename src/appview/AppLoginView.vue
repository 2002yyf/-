<template>
  <div class="header">
    <div style="margin: 0 auto;width: 60vw;position: relative">
      <span style="font-size: 5vw;margin-left: 15vw;position: absolute;top: 15px;
      letter-spacing: 10px;font-family:SimSun-ExtB;">农产品溯源</span>
    </div>
  </div>
  <div class="body">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="form.userName"
            name="用户名"
            label="用户名"
            placeholder="用户名"

        />
        <van-field
            v-model="form.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"

        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
        登录
        </van-button>
        <van-button type="primary" round block style="margin-top: 50px" color="gray" @click="this.$router.push('/appRegister')">注册</van-button>
      </div>
    </van-form>

  </div>

  <div class="bottom">
  </div>


</template>

<script>
import request from "@/utils/request";

export default {
  name: "AppLoginView",
  data() {
    return {
   form:{
     userName:'',
     password:'',
     }
    }
  },
  // created() {
  //   sessionStorage.removeItem("user")
  // },
  methods: {
    onSubmit() {
          if (!this.form.userName||!this.form.password) {
            this.$message.error("请填写用户名和密码")
            return
          }
          request.post("/user/login",this.form ).then(res => {
            console.log(res)
            if (res.code === 1) {
              this.$message({
                type: "success",
                message: "登录成功"
              })
              // sessionStorage.setItem("user", JSON.stringify(res.data))  // 缓存用户信息
              // this.setToken({token: res.data.data.token});
              this.$router.push("/appHome")  //登录成功之后进行页面的跳转，跳转到主页
            }
            else {
              this.$message({
                type: "error",
                message: "用户名或密码错误"
              })
            }
          })
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
  margin-top: 100px;
}
</style>