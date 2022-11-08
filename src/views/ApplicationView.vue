<template>
<!--  <el-container>-->
<!--    <el-header><Top/></el-header>-->

<!--    <el-container>-->
<!--      <el-aside><Aside style="width: 74%"/></el-aside>-->
<!--    </el-container>-->
<!--  </el-container>-->


  <Top class="top"/>
  <Aside class="aside"/>
  <div class="main">

  </div>




</template>

<script>
import Aside from "@/components/Aside";
import Top from "@/components/Top";

export default {
  name: "ApplicationView",
  components:{
    Aside,
    Top
  },
  data(){
    return{
      application:[{

      },{

      }]
    }
  }
}
</script>

<style scoped>

</style>