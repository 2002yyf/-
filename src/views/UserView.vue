<template>
  <Top class="top"/>
  <Aside class="aside"/>
  <div class="main">

<!--        <div class="search" style="margin-left:100px ">-->
<!--            <input class="input"  style="width: 20%;height: 40px;margin-left:30%;" placeholder="请输入用户昵称"/>-->
<!--            <button class="btn1"  style="margin-left: 20px" size="large">查询</button>-->
<!--            <el-badge :value="application" class="item" style="margin-left: 68%;cursor:pointer;" @click="dealClick">-->
<!--              <el-icon :size="25"><Bell /></el-icon>-->
<!--            </el-badge>-->
<!--        </div>-->
    <div class="search" style="margin-left: 300px;margin-top: 40px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <input class="input" style="width: 200px" v-model="formInline.name" placeholder="请输入用户昵称"/>
        </el-form-item>
        <el-form-item>
          <div style="font-size: 17px;font-weight: bold;color: #0b5b33;font-family:cursive">状态：
          </div>
          <select class="input" style="width:80px"  v-model="formInline.status">
            <option class="input" label="删除" value=1></option>
            <option class="input" label="未删除" value=0></option>
          </select>
        </el-form-item>
        <el-form-item>
          <div style="font-size: 17px;font-weight: bold;color: #0b5b33;font-family:cursive">身份：
          </div>
          <select class="input" style="width:100px"  v-model="formInline.identity">
            <option class="input" label="普通用户" value="1"></option>
            <option class="input" label="产品提供方" value=0></option>
          </select>
        </el-form-item>
        <el-form-item>
          <button class="btn1" @click="onSubmit">查询</button>
          <button class="btn1" style="margin-left: 10px" @click="reSet">重置</button>
        </el-form-item>
      </el-form>
    </div>
<div class="table" style="margin-left: 150px">
  <el-table
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 60%;margin-left: 10%;"
      :cell-style="{textAlign: 'center'}"
      :header-row-style="headerRowStyle"
      :row-style="rowState"
      :header-cell-style="{'background':'#8c9d47',textAlign: 'center'}"
  >
    <el-table-column prop="identity" label="身份"  width="180" />
    <el-table-column prop="name" label="昵称" width="180" />
    <el-table-column prop="registerTime" label="注册日期" sortable/>
    <el-table-column label="公司人员" >
      <template #default="scope">
        <span v-if="scope.row.identity ==='普通用户'">无</span>
        <el-icon :size="20"  v-if="scope.row.identity === '产品供方'" @click = "openDraw(scope.row)"><User /></el-icon>
      </template>
    </el-table-column>>
    <el-table-column label="状态" width="180" >
      <template #default="scope">
        <el-switch
            v-model="scope.row.status"
            class="ml-2"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            @change="change(scope.$index)"
        />
      </template>
    </el-table-column>
  </el-table>
</div>

    <div style="margin-top:20px; margin-left: 400px;margin-bottom: 20px">
      <el-pagination style="color: #00b891;font-family:cursive;font-weight: bold;"
                     :current-page="page"
                     :page-size="pageSize"
                     :page-sizes="[6,8,10,12]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
      />
    </div>

  </div>
  <el-drawer v-model="drawer" title="员工信息" :with-header="false">
    <el-card v-for="(staff,i) in staff" style="margin-top: 40px;height: 20%;">
      <div style="width: 100%;height: 100%;display: flex">
        <el-avatar shape="square" :size="100" :src="staff.pic" />
        <span style="margin-left: 10%;font-size: 20px;margin-top:10%">{{staff.name}}</span>
        <el-avatar shape="square" :size="100" :src="staff.permit" style="margin-left:10%" />

      </div>
    </el-card>
  </el-drawer>

  <el-dialog
      v-model="dialogVisible"
      title="提示"
      width="30%"
  >
    <span style="font-size: 16px;letter-spacing: 1px">是否确认修改用户状态</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="rollbackModify">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
        >确定</el-button
        >
      </span>
    </template>
  </el-dialog>


  <el-dialog
      v-model="centerDialogVisible"
      title="产品供方申请"
      width="30%"
      align-center
  >
    <el-form
        label-width="100px"
        :model="userForm"
        style="max-width: 460px"
    >
      <el-form-item label="昵称">
        {{userForm.name}}
      </el-form-item>
      <el-form-item label="证明文件">
      </el-form-item>
      <el-form-item label="说明">
        {{userForm.text}}
      </el-form-item>
    </el-form>



    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">拒绝</el-button>
        <el-button type="info" @click="centerDialogVisible = false">忽略</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">同意</el-button>
      </span>
    </template>
  </el-dialog>


</template>

<script>
import Aside from '@/components/Aside.vue'
import Top from '@/components/Top.vue'
import request from "@/utils/request";
export default {
  name: "UserView",
  components:{
    Aside,
    Top
  },
  data(){
    return{
      page:1,
      pageSize:8,
      total: 0,
      formInline: {
        name:'',
        status:'',
        identity:''
      },
      confirmIndex:0,
      centerDialogVisible:false,
      application:0,
      userForm:{
        name:"",
        file:"",
        text:""
      },
      staff:[
        {
          name:"张三",
          pic:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          permit:""
        },{
          name: "李四",
          pic:"",
          permit:""
        },{
          name: "王五",
          pic:"",
          permit:""
        }
      ],
      drawer:false,
      dialogVisible:false,
      tableData:[
        {
          identity:'普通用户',
          name:'张三',
          registerTime:'2022-10-11',
          status:true
        },{
          identity:'产品供方',
          name:'开心牧场',
          registerTime:'2022-10-12',
          status:false
        },
      ]
    }
  },
  methods:{
    headerRowStyle(args){
      return {
        height: '50px',
        color:'#5b5e0b',
        fontSize:'18px',
        fontFamily:'cursive',
        fontWeight:'bolder',
        background:'#e0eed1',
      }
    },
    rowState(arg){
      return {
        color:'#6a9a49',
        fontWeight:'bold',
        background: '#dee7da',
        fontFamily:'cursive',
        fontSize:"15px",
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.loadData()
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page=val
      this.loadData()
      console.log(`当前页: ${val}`);
    },
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
    onSubmit() {
      this.loadData();
      console.log('submit!');
    },
    reSet()
    {
      this.formInline = {};
      this.loadData();
    },
    openDraw(row){
      this.drawer = true
      console.log(row)
    },
    dealClick(){
      this.centerDialogVisible = true
    },change(index){
      this.dialogVisible = true
      this.confirmIndex = index;
    },rollbackModify(){
      this.dialogVisible = false
      this.tableData[this.confirmIndex].status = !this.tableData[this.confirmIndex].status
    }
  }
}
</script>

<style scoped>

</style>