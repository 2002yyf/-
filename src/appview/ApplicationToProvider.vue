<template>
  <Back msg="申请权限" from-where="/AppHome" right-text="申请记录"></Back>
  <van-form @submit="onSubmit" >
    <van-cell-group inset style="margin-top: 100px">
      <van-field label="公司名称">

      </van-field>
      <van-field name="uploader" label="文件上传">
        <template #input>
          <van-uploader v-model="fileList" />
        </template>
      </van-field>
    </van-cell-group>
    <van-button type="primary" style="margin-left: 30%;margin-top: 30px;width: 40%"  round>提交申请</van-button>
  </van-form>
</template>

<script>
import Back from '@/components/back'
export default {
  name: "ApplicationToProvider",
  components:{
    Back
  },data(){
    return{
      fileList:[

      ]
    }
  },methods:{
    onSubmit(){

    }
  }
}
</script>

<style scoped>

</style>