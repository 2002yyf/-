<template>
  <back msg="检测证明" from-where="/AppHome" right-text="新增检测" :click-right="clickRight"></back>

  <div v-for="(item) in certificates" style="">
    <van-tag size="large" type="primary" style="margin-left: 10px;margin-top: 10px">{{item.uploadTime}}</van-tag>
    <br>
    <img style="margin: 5px;left: 25%;position: relative;width: 50%" :src="item.picture" alt="">
  </div>

  <el-dialog v-model="dialogVisible" width="90%">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="pName"
            name="产品名称"
            label="产品名称"
            :rules="[{ required: true, message: '请填写产品名称' }]"
        />
        <van-field
            v-model="pPerson"
            name="检测人"
            label="检测人"
            :rules="[{ required: true, message: '请填写检测人' }]"
        />
        <van-field name="uploader" label="检测证明">
          <template #input>
            <van-uploader v-model="fileList" :after-read="afterRead"/>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </el-dialog>


</template>

<script>
import back from "@/components/back";
export default {
  name: "UploadDetectionView",
  components:{
    back
  },data(){
    return{
      certificates:[{
        uploadTime:'2022-11-13',
        picture:"https://tse1-mm.cn.bing.net/th/id/OIP-C.GApxMaWith-s3CDboh3d1QHaKL?w=203&h=279&c=7&r=0&o=5&dpr=1.1&pid=1.7"
      },{
        uploadTime:'2022-11-25',
        picture:"https://tse1-mm.cn.bing.net/th/id/OIP-C.GApxMaWith-s3CDboh3d1QHaKL?w=203&h=279&c=7&r=0&o=5&dpr=1.1&pid=1.7"

      }
      ],
      dialogVisible:false,
      pName:'',
      pPerson:'',
      fileList:[],
    }
  },methods:{
    clickRight(){
      this.dialogVisible = true
    },onSubmit(){

    },afterRead(){

    }
  }
}
</script>

<style scoped>

</style>