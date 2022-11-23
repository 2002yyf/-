<template>
  <Top class="top"/>
  <Aside class="aside"/>
    <div class="main">
      <div class="tag" style="margin-left: 100px">
        物流信息
      </div>
      <div class="search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <input class="input" v-model="formInline.name" placeholder="商品名称"/>
          </el-form-item>
          <el-form-item>
            <input class="input" v-model="formInline.name" placeholder="物流目的地"/>
          </el-form-item>
          <el-form-item>
            <button class="btn1" @click="onSubmit">查询</button>
            <button class="btn1" style="margin-left: 10px" @click="reSet">重置</button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table" style="margin-top: 20px;width: 1100px; margin-left: 100px;">
        <el-table :data="logisticsData"
                  border
                  :cell-style="{textAlign: 'center'}"
                  :header-row-style="headerRowStyle"
                  :row-style="rowState"
                  :header-cell-style="{'background':'#6a98b4',textAlign: 'center'}"
                  width="1100">
          <el-table-column label="物流编号" width="150">
            <template #default="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="创建时间" width="150">
            <template #default="scope">
              <el-icon><timer /></el-icon>
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>

          <el-table-column  label="商品名称" width="150">
            <template #default="scope">
              <span>{{ scope.row.name}}</span>
            </template>
          </el-table-column>

          <el-table-column label="生产商" width="150">
            <template #default="scope">
              <span>{{ scope.row.company }}</span>
            </template>
          </el-table-column>

          <el-table-column label="产地" width="150">
            <template #default="scope">
              <span>{{ scope.row.area }}</span>
            </template>
          </el-table-column>

          <el-table-column label="物流目的地" width="200">
            <template #default="scope">
              <span >{{ scope.row.address }}</span>
            </template>
          </el-table-column>


          <el-table-column label="操作"  width="150" >
            <template #default="scope">
              <button class="btn" style="width: 100px" @click="showDetail(scope.row)">查看物流</button>
            </template>
          </el-table-column>
          <el-empty description="无结果" v-if="logisticsData.length===0" />
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
  <div class="dialog">
    <el-dialog
        v-model="dialogVisible"
        title="物流信息"
        :visible.sync="specDlgVisible"
        class="spec-dialog"
        width="30%"
        v-loading="loading"
    >
      <div style="height:350px;">
        <el-scrollbar class="bor" style="height:300px;">
          <el-timeline>
            <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp"
                style="margin-left: 20px">
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
          <el-empty description="无结果" v-if="activities.length===0" />
        </el-scrollbar>
        <div style="margin-top: 30px">
          <button class="btn1" style="margin-left:300px; width:100px" type="primary" @click="dialogVisible = false">
            退出
          </button>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import Aside from "@/components/Aside";
import Top from "@/components/Top";
import request from "@/utils/request";


export default {
  name: "Logistics",
  components: { Aside, Top },data(){
    return{
      loading: false,
      formInline: {
        name:'',
        status:'',
      },
      select:'',
      input3:'',
      currentPage:0,
      pageSize:0,
      total:0,
      dialogVisible:false,
      logisticsData:[
        {
          date:'',
          name:'西瓜',
          company:'',
          destination:'',
          source:''

        },{
          date:'',
          name:'苹果',
          company:'',
          destination:'',
          source:''

        },{
          date:'',
          name:'梨',
          company:'',
          destination:'',
          source:''

        },{
          date:'',
          name:'芒果',
          company:'',
          destination:'',
          source:''
        },{
          date:'',
          name:'苹果',
          company:'',
          destination:'',
          source:''

        },
      ],
      activities:[
        {
          content: 'Event startgregergergerggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggr',
          timestamp: '2018-04-15',
        },
        {
          content: 'Approved',
          timestamp: '2018-04-13',
        },
        {
          content: 'Success',
          timestamp: '2018-04-11',
        },
        {
          content: 'Success',
          timestamp: '2018-04-11',
        },   {
          content: 'Success',
          timestamp: '2018-04-11',
        },   {
          content: 'Success',
          timestamp: '2018-04-11',
        },   {
          content: 'Success',
          timestamp: '2018-04-11',
        },
      ]
    }
  },
  methods:{
    headerRowStyle(args){
      return {
        height: '50px',
        color:'#000303',
        fontSize:'18px',
        fontFamily:'cursive',
        fontWeight:'bolder',
      }
    },
    rowState(arg){
      return {
        color:'#347070',
        fontWeight:'bold',
        background: '#f6f3dc',
        fontFamily:'cursive',
        fontSize:"17px",
      }
    },
    created(){
      this.loadData()
    },
    loadData(){
      this.loading = true
      request.get("",{
            params:{
              page:this.page,
              pageSize:this.pageSize,
              name:this.formInline.name,
              status:this.formInline.status
            }
          }
      ).then(res => {
        setTimeout(() => {
          this.certificate=res.data.records;
          this.total=res.data.total;
          this.loading = false
        }, 600)
      })
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
    onSubmit() {
      this.loadData();
      console.log('submit!');
    },
    reSet()
    {
      this.formInline = {};
      this.loadData();
    },
    showDetail(i){
      this.dialogVisible = true
      console.log(i)
    },
  }
}
</script>

<style scoped>
::v-deep .el-dialog {
  border-radius: 50px;
}
::v-deep .el-dialog__header {
  padding: 0 !important;
  width: 100%;
  height: 70px;
  background: linear-gradient(90deg, #6a98b4 0%, rgba(28, 97, 234, 0) 100%);
}
::v-deep .el-dialog__title {
  margin-left: 25px;
  line-height: 70px;
  color: #2d2f01;
  font-family: cursive;
  font-weight: bold;
  font-size: 25px;
}
::v-deep .el-dialog__body {
  background: linear-gradient(90deg, #a19e76 0%, rgba(28, 97, 234, 0) 100%);
  font-weight: bold;
  font-family: cursive;
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>