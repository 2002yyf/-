<template>
  <back msg="人员信息" from-where="/AppHome"/>
  <van-grid square style="margin-top: 50px;" :column-num="3" :gutter="10">
    <van-grid-item v-for="(item) in person" :icon=item.picture :text=item.name @click="showPerson(item)"/>

    <van-grid-item icon="add-o" text="新增成员" @click="dialogVisible=true" />
  </van-grid>
  <el-dialog v-model="dialogVisible" width="90%">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="wName"
            name="姓名"
            label="姓名"
            placeholder="姓名"
            :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field name="radio" label="性别">
          <template #input>
            <van-radio-group v-model="wSex" direction="horizontal">
              <van-radio name="1">男</van-radio>
              <van-radio name="2">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="uploader" label="健康证">
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
  <el-dialog v-model="personVisible" width="90%">
    姓名：<span>{{pName}}</span><br>
    性别：<span>{{pSex}}</span><br>
    健康证：<br><img :src="pCertificate" alt="" style="width: 70%;height: 70%"><br>
  </el-dialog>

</template>

<script>
import back from "@/components/back";
export default {
  name: "PersonView",
  components:{
    back
  },data(){
    return{
      show:false,
      fileList:[],
      personVisible:false,
      wName:'',
      wSex:'',
      dialogVisible:false,
      file1:'',
      person:[{
        name:'张三',
        sex:'男',
        picture:''
      },{
        name:'李四',
        sex:'男',
        picture:'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/03/ChMkJlbKxo2IT63KACN7OztCegEAALHmwPZIQ0AI3tT786.jpg'
      },{
        name:'王五',
        sex:'女',
        picture:'https://ts1.cn.mm.bing.net/th/id/R-C.8b5a06e831ae5806110eb424a6f459c9?rik=nPKd57IQk5a3gw&riu=http%3a%2f%2fwww.waibao123.com%2fUploads%2fphoto%2f2014-07-16%2fff544162748b2ddf1d362b908737387f_big.jpg&ehk=bSsTClUJFllXvpJ8jjQH%2f8L6khOAnKYImCV4lSmrtYg%3d&risl=&pid=ImgRaw&r=0'
      },{
        name:'李明',
        sex:'男',
        picture:'https://b.zol-img.com.cn/desk/bizhi/image/10/960x600/1598319721647.jpg'
      }],
      pName:'',
      pSex:'',
      pCertificate:''
    }
  },methods:{
    showPerson(item){
      this.personVisible=true
      this.pName = item.name
      this.pSex = item.sex
      this.pCertificate = item.picture
    },onSubmit(){

    },afterRead(){
      console.log(this.fileList[0].content)
    }
  },
}
</script>

<style scoped>

</style>