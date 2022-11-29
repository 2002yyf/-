<template>
  <back msg="上传产品" fromWhere="/AppHome"></back>
  <van-tag type="primary" style="left: 20px;top: 20px" size="large">我的产品</van-tag>
  <el-card v-for="(item,i) in myProject" class="project" :class="item.num===1?'gray':'green'">
  {{item.name}}
  </el-card>
  <el-card class="project">
    <div>
      <van-icon name="add-o" style="left: 35%;font-size: 20px" />
      <span style="position:absolute;left: 45%;font-size: 20px" @click="this.$router.push('/newProjectView')">新增</span>
    </div>
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
        name:'西瓜',
        num:1
      },{
        name:'白菜'
      }],
    }
  },methods:{

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