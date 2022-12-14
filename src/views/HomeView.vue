<template>
  <Top class="top"/>
  <Aside class="aside"/>
    <div class="main" style="display: flex;flex-wrap:wrap;">
      <el-card shadow="hover" class="card" style="margin-top: 100px;margin-left: 50px;background: linear-gradient(90deg, #9cb46a 0%, rgba(28, 97, 234, 0) 100%)">
        <div>
          <div style="width: 70px;height: 70px;float:left;">
            <el-icon size="70px"><User /></el-icon>
          </div>
          <div style="width: 180px;height: 90px;float:left;margin-left: 30px;text-align: center">
            <div style="font-family: cursive;font-weight: bold;font-size: 40px;">
              8
            </div>
            <div style="font-weight: bold;margin-top:40px;font-size: 30px">
              普通用户数量
            </div>
          </div>
        </div>
      </el-card>


      <el-card shadow="hover" class="card"  style="margin-top: 100px;margin-left: 50px;background: linear-gradient(90deg, #71b46a 0%, rgba(28, 97, 234, 0) 100%)">
        <div>
          <div style="width: 70px;height: 70px;float:left;">
            <el-icon size="70px"><Van /></el-icon>
          </div>
          <div style="width: 180px;height: 90px;float:left;margin-left: 30px;text-align: center">
            <div style="font-family: cursive;font-weight: bold;font-size: 40px;">
              6
            </div>
            <div style="font-weight: bold;margin-top:40px;font-size: 30px">
              产品供方数量
            </div>
          </div>
        </div>

      </el-card>


      <el-card shadow="hover" class="card"  style="margin-top: 100px;margin-left: 50px;background: linear-gradient(90deg, #b49f6a 0%, rgba(28, 97, 234, 0) 100%)">
          <div>
            <div style="width: 70px;height: 70px;float:left;">
              <el-icon size="70px"><PieChart /></el-icon>
            </div>
            <div style="width: 180px;height: 90px;float:left;margin-left: 30px;text-align: center">
              <div style="font-family: cursive;font-weight: bold;font-size: 40px;">
                32
              </div>
              <div style="font-weight: bold;margin-top:40px;font-size: 30px">
                产品种类数目
              </div>
            </div>
          </div>

      </el-card>


      <el-card shadow="hover" class="card"  style="margin-top: 50px;margin-left: 50px;background: linear-gradient(90deg, #6aa3b4 0%, rgba(28, 97, 234, 0) 100%)">
        <div>
          <div style="width: 70px;height: 70px;float:left;">
            <el-icon size="70px"><Document /></el-icon>
          </div>
          <div style="width: 180px;height: 90px;float:left;margin-left: 30px;text-align: center">
            <div style="font-family: cursive;font-weight: bold;font-size: 40px;">
              4
            </div>
            <div style="font-weight: bold;margin-top:40px;font-size: 30px">
              待审批数量
            </div>
          </div>
        </div>
      </el-card>


      <el-card shadow="hover" class="card"  style="margin-top: 50px;margin-left: 50px;background: linear-gradient(90deg, #856ab4 0%, rgba(28, 97, 234, 0) 100%)">
        <div>
          <div style="width: 70px;height: 70px;float:left;">
            <el-icon size="70px"><FolderChecked /></el-icon>
          </div>
          <div style="width: 180px;height: 90px;float:left;margin-left: 30px;text-align: center">
            <div style="font-family: cursive;font-weight: bold;font-size: 40px;">
              32
            </div>
            <div style="font-weight: bold;margin-top:40px;font-size: 30px">
              上线产品数量
            </div>
          </div>
        </div>
      </el-card>


      <el-card shadow="hover"  class="card"  style="margin-top: 50px;margin-left: 50px;background: linear-gradient(90deg, #b46ab0 0%, rgba(28, 97, 234, 0) 100%)">
        <div>
          <div style="width: 70px;height: 70px;float:left;">
            <el-icon size="70px"><Search /></el-icon>
          </div>
          <div style="width: 180px;height: 90px;float:left;margin-left: 30px;text-align: center">
            <div style="font-family: cursive;font-weight: bold;font-size: 40px;">
              130
            </div>
            <div style="font-weight: bold;margin-top:40px;font-size: 30px">
              用户查询次数
            </div>
          </div>
        </div>
      </el-card>

    </div>
</template>

<script>
import Aside from '@/components/Aside.vue'
import Top from '@/components/Top.vue'
import Icon from "@/components/icon";
import {ElNotification} from "element-plus";
import {h} from "vue";
import request from "@/utils/request";
export default {
  name: 'HomeView',
  components: {
    Aside,
    Top,
    Icon
  },data(){
    return{
      user:0,
      provider:0,
      application:0,
      waiting:0,
      online:0,
      searchTimes:0,
    }
  },
  created() {
    this.count();
    console.log(this.application)
  },
  methods:{
    count(){
      let url='/application/count/pending'
      request.get(url).then(res => {
        this.application=res.data
        this.load()
        console.log(this.application)
      })
    },
    load(){
      let date=localStorage.getItem("date")
      if(!date)
      {
        localStorage.setItem("date", JSON.stringify( new Date().getDate()))
        ElNotification({
          title: '消息',
          message: h('i', { style: 'color: teal' }, '您有'+this.application+'条申请待审批'),
        })
      }
      else{
        if(date!=new Date().getDate())
        {
          localStorage.setItem("date", JSON.stringify( new Date().getDate()))
          ElNotification({
            title: '消息',
            message: h('i', { style: 'color: teal' }, '您有'+this.application+'条申请待审批'),
          })
        }
      }
    },
  },
  mounted() {

  }
}
</script>

<style scoped>
.card{
  width:28%;height:20%;
}
.line {
width: 70%;
}
.line div {
width: 100%;
height: 0;
border-top: 2px solid black;
}
</style>