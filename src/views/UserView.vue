<template>
  <Top class="top"/>
  <Aside class="aside"/>
  <div class="main">

        <div style="width: 100%;margin-top:2%">
            <el-input style="width: 30%;height: 40px;margin-left:30%;" placeholder="请输入用户昵称"></el-input>
            <el-button type="primary" round style="margin-left: 20px" size="large">查询</el-button>
            <el-badge :value="application" class="item" style="margin-left: 68%;cursor:pointer;" @click="dealClick">
              <el-icon :size="25"><Bell /></el-icon>
            </el-badge>
        </div>

    <el-table
        :data="tableData"
        :default-sort="{ prop: 'date', order: 'descending' }"
        style="width: 60%;margin-left: 10%;"
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


        <el-drawer v-model="drawer" title="员工信息" :with-header="false">
          <el-card v-for="(staff,i) in staff" style="margin-top: 40px;height: 20%;">
            <div style="width: 100%;height: 100%;display: flex">
            <el-avatar shape="square" :size="100" :src="staff.pic" />
                <span style="margin-left: 10%;font-size: 20px;margin-top:10%">{{staff.name}}</span>
            <el-avatar shape="square" :size="100" :src="staff.permit" style="margin-left:10%" />

            </div>
          </el-card>
        </el-drawer>




        <el-pagination
            :currentPage="currentPage4"
            :page-size="pageSize4"
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="padding-left: 25%;padding-top: 22px"
        />

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

  </div>

</template>

<script>
import Aside from '@/components/Aside.vue'
import Top from '@/components/Top.vue'
export default {
  name: "UserView",
  components:{
    Aside,
    Top
  },
  data(){
    return{
      currentPage4:0,
      pageSize4:0,
      total:0,
      confirmIndex:0,
      centerDialogVisible:false,
      application:0,
      userForm:{
        name:"",
        file:"",
        text:""
      },staff:[
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
    handleSizeChange(){
      alert(1)
    },openDraw(row){
      this.drawer = true
      console.log(row)
    },
    handleCurrentChange(){

    },dealClick(){
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