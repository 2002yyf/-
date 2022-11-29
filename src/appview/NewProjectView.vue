<template>
  <van-form @submit="onSubmit">
  <van-cell-group inset style="margin-top: 60px">
    <van-field v-model="name" label="产品名称" />
    <van-field v-model="area" label="种植地区" />
    <van-field  name="picture" label="产品图片" >
      <template #input>
        <van-uploader :after-read="afterRead" multiple v-model="filelist" />
      </template>
    </van-field>
    <van-field v-model="company" readonly label="上传公司" />
  </van-cell-group>
  <van-button type="warning" style="left: 10%;top:20px;width: 30%" @click="this.$router.push('/uploadProject')">取消</van-button>
  <van-button type="primary" style="left: 20%;width: 30%;top: 20px" @click="abc">上传</van-button>
  </van-form>
</template>

<script>
export default {

  name: "NewProjectView",
  data(){
    return{
      name:'',
      area:'',
      company:'',
      filelist:[]
    }
  },methods:{
    afterRead(file){
      console.log(file)
    },onSubmit(){

    },abc(){
      }
  },

}
</script>

<style scoped>

</style>