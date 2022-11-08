<template>
  <!-- 整体背景 -->
  <div class="login-wrap1">
    <div class="h">农产品溯源系统</div>
    <div class="login-wrap">
      <div class="form-wrapper">
        <div class="header">欢迎登录</div>
        <el-form ref="form" :model="form" class="input-wrapper">
          <el-form-item prop="userName">
            <div class="border-wrapper">
              <input
                  type="text"
                  v-model="form.userName"
                  placeholder="userName"
                  class="border-item"
                  autocomplete="off"
              />
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <div class="border-wrapper">
              <input
                  type="password"
                  v-model="form.password"
                  placeholder="password"
                  class="border-item"
                  autocomplete="off"
              />
            </div>
          </el-form-item>
          <el-form-item prop="role">
            <div class="radio">
              <el-radio-group class="el-radio-group" v-model="form.role">
                <el-radio class="radio1" label="1"  @keypress.native.enter="login">管理员</el-radio>
                <el-radio class="radio2" label="0"  @keypress.native.enter="login">非管理员</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-form>
        <div class="action">
          <div class="btn"  @click="login">登录</div>
          <div
              class="btn"
              @click="this.$router.push('register')"
              style="margin-left: 10px"
          >
            注册
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: 'LoginView',
  data() {
    return {
      form: {},
    }
  },
  // created() {
  //   sessionStorage.removeItem("user")
  // },
  methods: {
    login() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (!this.form.userName||!this.form.password) {
            this.$message.error("请填写用户名和密码")
            return
          }
          if (!this.form.role) {
            this.$message.error("请填选择角色")
            return
          }
          request.post("/user/login", this.form).then(res => {
            if (res.code === 1) {
              this.$message({
                type: "success",
                message: "登录成功"
              })
              localStorage.setItem("userinfo", JSON.stringify(res.data))  // 缓存用户信息
              this.$router.push("home")  //登录成功之后进行页面的跳转，跳转到主页
            }
            else {
              this.$message({
                type: "error",
                message: "用户名或密码错误"
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.login-wrap {
  font-family: JetBrains Mono Medium;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-wrap1 {
  background-size: cover;
  width: 100%;
  height: 100%;
  background:url("../assets/1.jpg");
  position:fixed;
  background-size:100% 100%;
}
.h {
  font-size: 50px;
  color: #0b5b33;
  text-align: center;
  margin-bottom: 50px;
  margin-top: 40px;
  font-weight: bold;
}
.form-wrapper {
  width: 350px;
  height:auto;
  background-color: rgba(40, 61, 42, 0.8);
  color: #ffffff;
  border-radius: 10px;
  padding: 30px;
}
.form-wrapper .header {
  text-align: center;
  font-size:40px;
  text-transform: uppercase;
  line-height: 100px;
  margin-bottom: 20px;
  font-weight: bold;
  margin-top: 0px;
}
.form-wrapper .input-wrapper input {
  background-color: rgb(41, 45, 62);
  border: 0;
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: #fff;
  outline: none;
}
.form-wrapper .input-wrapper input::placeholder {
  text-transform: uppercase;
}
.form-wrapper .input-wrapper input:hover {
  filter: brightness(3.1);
}
.form-wrapper .input-wrapper .border-wrapper {
  background-image: linear-gradient(to right, #9be7ae, #c7c6a0);
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-wrapper .input-wrapper .border-wrapper .border-item {
  height: calc(100% - 4px);
  width: calc(100% - 4px);
  border-radius: 15px;
  background-color: transparent;
  color: white;
}
 .action {
  display: flex;
  justify-content: center;
}
 .btn {
  width: 60%;
  text-transform: uppercase;
  border: 2px solid #6fc462;
  text-align: center;
  line-height: 50px;
  border-radius: 15px;
  cursor: pointer;
  font-weight: bold;
}
 .btn:hover {
  filter: brightness(3.1);
}
.form-wrapper .icon-wrapper {
  text-align: center;
  width: 60%;
  margin: 20px auto 0;
  border-top: 1px dashed rgb(146, 146, 146);
  padding: 20px;
}
.form-wrapper .icon-wrapper i {
  font-size: 20px;
  color: rgb(187, 187, 187);
  cursor: pointer;
  border: 1px solid #fff;
  padding: 5px;
  border-radius: 20px;
}
.form-wrapper .icon-wrapper i:hover {
  opacity: 1;
}
.radio {
  width: 300px;
}
.radio .radio1 {
  margin-left: 20px;
  color: #6fc462;
  font-weight: bold;
}
.radio .radio2 {
  margin-left: 50px;
  color: #6fc462;
  font-weight: bold;
}
</style>
