<template>
  <back msg="物流证明" from-where="/AppHome" right-text="新增物流" :click-right="clickRight"></back>

  <el-table :data="tableData" border style="width: 300px;margin: 50px auto" >
    <el-table-column prop="name" label="产品名称" width="150px" />
    <el-table-column  label="操作" width="150px" align="center">
      <span style="color: cornflowerblue" @click="logisticVisible = true">查看</span>
      <span style="margin-left: 10px;color: red">删除</span>
    </el-table-column>
  </el-table>

  <el-dialog v-model="logisticVisible" width="90%">
    <van-steps direction="vertical" :active="0">
      <van-step>
        <h3>【城市】物流状态1</h3>
        <p>2016-07-12 12:40</p>
      </van-step>
      <van-step>
        <h3>【城市】物流状态2</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>快件已发货</h3>
        <p>2016-07-10 09:30</p>
      </van-step>
    </van-steps>
  </el-dialog>

  <el-dialog v-model="uploadVisible" width="90%">
    <van-form @submit="onSubmit">
      <van-cell-group inset id="info">
        <van-field
            v-model="product"
            name="产品名"
            label="产品名"
            :rules="[{ required: true, message: '请填写产品名' }]"
        />
        <van-field
            v-model="area"
            name="产地"
            label="产地"
            :rules="[{ required: true, message: '请填写产地' }]"
        />
        <van-field
            v-model="destination"
            name="目的地"
            label="目的地"
            :rules="[{ required: true, message: '请填写目的地' }]"
        />
      <div v-for="i in count">
        <span>物流信息{{i}}</span>
          <van-field
              v-model="info"
              name="物流信息"
              :rules="[{ required: true, message: '请填写物流信息' }]"
          />
        <span>物流信息{{i}}时间</span>
          <van-field
              v-model="info"
              name="物流时间"
              :rules="[{ required: true, message: '请填写物流时间' }]"
          />
      </div>
        <van-button icon="plus" type="primary" size="small" style="left: 30%;" @click="addInfo">添加条目</van-button>
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
  name: "UploadLogisticsView",
  components:{
    back
  },data(){
    return{
      count:0,
      logisticVisible:false,
      uploadVisible:false,
      product:'',
      destination:'',
      area:'',
      info:[],
      tableData:[{
          name:'苹果'
      },{
          name:'香蕉'
      }]
    }
  },methods:{
    clickRight(){
      this.uploadVisible = true
    },onSubmit(){

    },addInfo(){
      this.count++

    }
  }
}
</script>

<style scoped>

</style>