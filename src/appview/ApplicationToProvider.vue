<template>
  <Back msg="申请权限" from-where="/AppHome" right-text="申请记录"></Back>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field name="uploader" label="文件上传">
        <template #input>
          <van-uploader v-model="fileList" />
        </template>
      </van-field>
    </van-cell-group>
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