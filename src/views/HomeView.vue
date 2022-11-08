<template>
  <Top class="top"/>
  <Aside class="aside"/>
    <div class="main" style="display: flex;flex-wrap:wrap;">
      <el-card shadow="hover" style="width:25%;height:20%;margin-top: 150px;margin-left: 100px">
        <div style="display: flex;justify-content: center;height: 30px;font-size: 25px;align-items: center">
          <el-icon  style="margin-right: 15px;"><User /></el-icon>
          {{user}}
        </div>
        <div style="opacity:80%;font-size: 25px;margin-top: 30px;text-align: center">
          普通用户数量
        </div>
      </el-card>


      <el-card shadow="hover" style="width:25%;height:20%;margin-top: 150px;margin-left: 100px">
        <div style="display: flex;justify-content: center;height: 30px;font-size: 25px;align-items: center">
          <el-icon  style="margin-right: 15px;"><Van /></el-icon>
          {{provider}}
        </div>
        <div style="opacity:80%;font-size: 25px;margin-top: 30px;text-align: center">
          产品供方数量
        </div>
      </el-card>


      <el-card shadow="hover" style="width:25%;height:20%;margin-top: 150px;margin-left: 100px">
        <div style="display: flex;justify-content: center;height: 30px;font-size: 25px;align-items: center">
          <el-icon  style="margin-right: 15px;"><PieChart /></el-icon>
          {{kind}}
        </div>
        <div style="opacity:80%;font-size: 25px;margin-top: 30px;text-align: center">
          产品种类数目
        </div>
      </el-card>


      <el-card shadow="hover" style="width:25%;height:20%;margin-top: 150px;margin-left: 100px">
        <div style="display: flex;justify-content: center;height: 30px;font-size: 25px;align-items: center">
          <el-icon  style="margin-right: 15px;"><Document /></el-icon>
          {{waiting}}
        </div>
        <div style="opacity:80%;font-size: 25px;margin-top: 30px;text-align: center">
          待审批产品数量
        </div>
      </el-card>


      <el-card shadow="hover" style="width:25%;height:20%;margin-top: 150px;margin-left: 100px">
        <div style="display: flex;justify-content: center;height: 30px;font-size: 25px;align-items: center">
          <el-icon  style="margin-right: 15px;"><FolderChecked /></el-icon>
          {{online}}
        </div>
        <div style="opacity:80%;font-size: 25px;margin-top: 30px;text-align: center">
          上线产品数量
        </div>
      </el-card>


      <el-card shadow="hover" style="width:25%;height:20%;margin-top: 150px;margin-left: 100px">
        <div style="display: flex;justify-content: center;height: 30px;font-size: 25px;align-items: center">
          <el-icon  style="margin-right: 15px;"><Search /></el-icon>
          {{searchTimes}}
        </div>
        <div style="opacity:80%;font-size: 25px;margin-top: 30px;text-align: center">
          用户查询次数
        </div>
      </el-card>

    </div>


</template>

<script>
import Aside from '@/components/Aside.vue'
import Top from '@/components/Top.vue'
export default {
  name: 'HomeView',
  components: {
    Aside,
    Top
  },data(){
    return{
      user:0,
      provider:0,
      kind:0,
      waiting:0,
      online:0,
      searchTimes:0,

    }
  }
}
</script>
