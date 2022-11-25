<template>
  <div style="height: 70px;">
    <div style="width:1050px;margin-left: 10px;height: 70px;float: left;margin-top: 20px;font-family: Cambria,fantasy;font-size: 30px;font-weight: bolder;color: #0b5b33">
      Traceability of agricultural products
    </div>
    <div style="height: 70px;float: left">
      <div style="width:80px;margin-top:15px;float:left">
        <el-icon size="25px" @click="logout" color="#234d3e"><Avatar /></el-icon>
        <el-icon size="25px" @click="logout" color="#234d3e" style="margin-left: 10px"><BellFilled /></el-icon>
      </div>
      <!--  <div style="width:70px;height40px;margin-left:1000px;float:right;background-color: #0b5b33">-->
      <!--    <button class="btn2" style="margin-right: 20px;" @click="logout">退出登录</button>-->
      <!--  </div>-->
      <div style=" width:120px;margin-top: 10px;float:left">
        <div style="float:left;height: 20px;text-align: center;font-family: cursive;font-weight: bolder;font-size: 15px;color: #303038">
          {{information.userName}}
        </div>
        <img src="https://img.zcool.cn/community/01972c5f110b9fa801206621eba569.png@1280w_1l_2o_100sh.png">
        <!--          <img  :src="information.img" style="height: 40px;border-radius: 50%">-->
      </div>
      <div style="margin-top:15px;float:left">
        <el-icon size="25px" @click="logout" color="#234d3e"><Setting /></el-icon>
      </div>
    </div>
  </div>
</template>


<script>
import {ElMessageBox} from "element-plus";

export default {
  name: "Top",
  data(){
    return{
      information:{
        img:'',
        userName:'',
      }
    }
  },
  created() {
    this.GetInformation();
  },
  methods:{
    GetInformation(){
      let userinfo = JSON.parse(localStorage.getItem('userinfo'))
      this.information.userName=userinfo.userName;
      this.information.img=userinfo.img;
      console.info(userinfo)
    },
    logout()
    {
      ElMessageBox.confirm("你确定退出登录吗?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        localStorage.removeItem('userinfo')
        this.$router.push({ path: '/' })
      })
    },
  }
}
</script>

<style scoped>
.btn2 {
  width: 70px;
  border: 2px solid #e7c69f;
  text-align: center;
  height: 35px;
  border-radius: 5px;
  font-weight: bold;
  font-size:15px;
  margin-top: 10px;
  font-family: cursive;
  background-color: #ffffff;
  color: #8f7860;
}
.btn2:hover {

  color: #56481f;
}
img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 2px solid #4048a6;
  margin-left: 10px;
}
</style>