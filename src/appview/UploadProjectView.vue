<template>
  <back msg="上传产品" fromWhere="/AppHome"></back>
  <el-card v-for="(item,i) in myProject" class="project" :class="item.num===1?'gray':'green'">

  </el-card>
</template>

<script>
import back from "@/components/back";
export default {
  name: "UploadProjectView",
  components:{
    back
  },data(){
    return{
      myProject:[{
        num:1
      },{
        num:2
      }],
    }
  }
}
</script>

<style scoped>
.project{
  width: 90%;
  margin: 40px auto;
}
.gray{
  background: gray;
}
.green{
  background: green;
}

</style>