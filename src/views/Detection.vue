<template>
  <Top class="top"/>
  <Aside class="aside"/>
    <div class="main">
      <div class="search" style="margin-left: 70px;margin-top: 40px">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <input class="input" v-model="formInline.name" placeholder="商品名称"/>
          </el-form-item>
          <el-form-item>
            <div style="font-size: 17px;font-weight: bold;color: #0b5b33;font-family:cursive">检测合格：
            </div>
            <select class="input" style="width:120px"  v-model="formInline.status">
              <option class="input" label="检测合格" value=1></option>
              <option class="input" label="检测不合格" value=0></option>
            </select>
          </el-form-item>
          <el-form-item>
            <button class="btn1" @click="onSubmit">查询</button>
            <button class="btn1" style="margin-left: 10px" @click="reSet">重置</button>
          </el-form-item>
        </el-form>
      </div>
        <div class="table" style="height: 50px;margin-top: 0;margin-left: 20px;">
          <el-card class="box-card"
              shadow="hover"
              v-for="item in certificate">
            <div style="width: 250px;height: 100px">
              <div>检测编号：{{item.id}}</div>
              <div>商品编号：{{item.id}}</div>
              <div>商品名称：{{item.name}}</div>
              <div>化学成分检测:{{item.status}}</div>
              <div>防疫检测:{{item.isPass}}</div>
            </div>
            <div style="margin-top:5px">
              <button  class="btn1" style="width:100px;" @click="showDetail(item)">查看详情</button>
            </div>
          </el-card>
          <el-empty description="无结果" v-if="certificate.length===0" />
        </div>
      <div style="margin-top:430px; margin-left: 400px;width: 800px;padding: 30px">
        <el-pagination style="color: #00b891;font-family:cursive;font-weight: bold;"
                       :current-page="page"
                       :page-size="pageSize"
                       layout="total, prev, pager, next, jumper"
                       :total="total"
                       @current-change="handleCurrentChange"/>
      </div>
    </div>

  <div class="dialog">
    <el-dialog
        v-model="dialogVisible"
        title="检测信息"
        style="font-size: 45px;"
        width="700px"
    >
      <div class="card">
        <div class="card1" style="margin-left: 20px;">
          <div class="div" >商品编号：{{data.id}}</div>
          <div class="div" >商品名称：{{data.name}}</div>
          <div class="div" >所属公司:{{data.company}}</div>
          <div class="div" >化学物质检测证明:{{data.status}}</div>
          <div class="div" >防疫检测证明:{{data.isPass}}</div>
          <div class="div" >时间:{{data.createTime}}</div>
        </div>
        <div class="card1">
          <img  :src="data.image" class="image">
        </div>
      </div>
      <div style="margin-top: 30px">
        <button class="btn1" style="margin-left:550px; width:100px" type="primary" @click="dialogVisible = false">
          退出
        </button>
      </div>
    </el-dialog>
  </div>
</template>




<script>
import Aside from '@/components/Aside.vue'
import Top from '@/components/Top.vue'
import request from "@/utils/request";
export default {
  name: "Detection",
  components: { Aside, Top },
  data() {
    return {
      dialogVisible:false,
      formInline: {
        name:'',
        status:'',
      },
      page:1,
      pageSize:8,
      total: 0,
      certificate: [],
      data:{
        id:'',
        name:'',
        company:'',
        status:'',
        isPass:'',
        image:'',
      }
      ,
    }
  },
  created(){
    this.loadData()
  },
  methods: {
    created(){
      this.loadData()
    },
    loadData(){
      request.get("/product/page",{
            params:{
              page:this.page,
              pageSize:this.pageSize,
              name:this.formInline.name,
              status:this.formInline.status
            }
          }
      ).then(res => {
        this.certificate=res.data.records;
        this.total=res.data.total;
      })
    },
    handleCurrentChange(val) {
      this.page=val
      this.loadData()
      console.log(`当前页: ${val}`);
    },
    onSubmit() {
      this.loadData();
      console.log('submit!');
    },
    reSet()
    {
      this.formInline = {};
      this.loadData();
    },
    showDetail(item){
            this.dialogVisible = true;
            this.data = item;
        },
  },
}
</script>

<style scoped>
.box-card{
  border: 1px solid transparent;
  border-radius: 10px;
  background-color: #a4b990;
  box-shadow: 3px 3px #5e8c50;
  width: 250px;
  height:180px;
  margin-left:50px;
  margin-top: 40px;
  float: left;
  font-family: Dialog;
  font-size:16px;
  font-weight: bold;
}
.card{
  padding: 10px;
  height: 300px;
  width: 660px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.image{
  width: 300px;
  height: 250px;
}
.div{
  margin-top:20px;
  color: #0f3b1d;
  font-weight: bold;
  font-family: cursive;
  font-size:20px;
}
.card1{
  width:300px;
  height: 300px;
  display: inline-block;
  margin-top: 10px;
}
::v-deep .el-dialog {
  border-radius: 50px;
}
::v-deep .el-dialog__header {
    padding: 0 !important;
    width: 100%;
    height: 70px;
    background: linear-gradient(90deg, #9cb46a 0%, rgba(28, 97, 234, 0) 100%);
}
::v-deep .el-dialog__title {
    margin-left: 25px;
    line-height: 70px;
    font-size: 25px;
    color: #2d2f01;
    font-family: cursive;
    font-weight: bold;
}
::v-deep .el-dialog__body {
    background: linear-gradient(90deg, #b8ecba 0%, rgba(28, 97, 234, 0) 100%);
}

</style>