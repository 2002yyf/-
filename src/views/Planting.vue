<template>
  <Top class="top"/>
  <Aside class="aside"/>
  <div class="main">
    <div class="tag">
      生长记录
    </div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <input class="input" v-model="formInline.name" placeholder="作物名称"/>
        </el-form-item>
        <el-form-item>
          <input class="input" v-model="formInline.place" placeholder="种植地点"/>
        </el-form-item>
        <el-form-item>
          <button class="btn1" @click="onSubmit">查询</button>
          <button class="btn1" style="margin-left: 10px" @click="reSet">重置</button>
        </el-form-item>
      </el-form>
    </div>
      <div class="table">
        <el-table :data="plantInfo"
                  element-loading-background="#dee7da"
                  element-loading-text="拼命加载中"
                  v-loading="loading"
                  border
                  :header-row-style="headerRowStyle"
                  :row-style="rowState"
                  :header-cell-style="{'background':'#e0eed1','text-align': 'center'}"
                  :cell-style="{'text-align':'center',backgroundColor: '#dee7da',}"

        >

          <el-table-column prop="id" label="信息编号" align="center" header-align="left" width="100px"/>
          <el-table-column prop="name"  label="作物名称" />
          <el-table-column prop="plantTime"  label="种植时间" />
          <el-table-column prop="plantPlace" label="种植地点"/>
          <el-table-column prop="plantNum" label="种植数量（亩）"/>
          <el-table-column  fixed="right" label="操作" width="200px">
            <template #default="scope">
              <button class="btn1" style="width: 100px" @click="showDetail(scope.row.id)">生长记录</button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    <div style="margin-top:20px; margin-left: 350px;margin-bottom: 20px">
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
    <div>
      <el-dialog
          v-model="dialogVisible"
          title="生长记录"
          :visible.sync="specDlgVisible"
          class="spec-dialog"
          width="30%"
          v-loading="loading1"
      >
        <div
            style="height:350px;"
            element-loading-background="#abc59e"
            element-loading-text="拼命加载中"
            v-loading="loading1">
          <el-scrollbar class="bor" style="height:280px;">
            <el-timeline>
              <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :timestamp="activity.updateTime"
                  style="margin-left: 20px;">
                {{ activity.info }}
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
</div>
</template>

<script>
import Aside from '@/components/Aside.vue'
import Top from '@/components/Top.vue'
import Icon from "@/components/icon";
import request from "@/utils/request";
export default {
  name: 'Planting',
  components: { Aside, Top ,Icon},
  data() {
    return {
      loading: false,
      loading1: false,
      dialogVisible:false,
      formInline: {
        name:'',
        status:'',
      },
      page:1,
      pageSize:8,
      total: 0,
      plantInfo: [
      ],
      activities:[
      ],
    }
  },
  created(){
    this.loadData()
  },
  methods: {
        headerRowStyle(args){
          console.log(args)
          return {
            height: '50px',
            color:'#5b5e0b',
            fontSize:'18px',
            fontFamily:'cursive',
            fontWeight:'bolder',
            textAlign:'center'
          }
        },
        rowState(arg){
          return {
            color:'#6a9a49',
            fontWeight:'bold',
            backgroundColor: '#dee7da',
            fontFamily:'cursive',
            fontSize:"17px",
          }
        },
    created(){
      this.loadData()
    },
    loadData(){
      this.loading = true
      request.get("/crop/page",{
            params:{
              page:this.page,
              pageSize:this.pageSize,
              name:this.formInline.name,
              place:this.formInline.place
            }
          }
      ).then(res => {
        setTimeout(() => {
          this.plantInfo=res.data.records;
          this.total=res.data.total;
          this.loading = false;
        }, 600)
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.loadData()
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
      let id=i;
      this.dialogVisible = true
      this.loading1 = true
      let url='/crop/'+id
      console.log(url)
      request.get(url).then(res => {
        setTimeout(() => {
          this.activities=res.data;
          this.loading1 = false
        }, 600)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  border-radius: 30px;
}
::v-deep .el-dialog__header {
  padding: 0 !important;
  width: 100%;
  height: 70px;
  background: linear-gradient(90deg, #6ba250 0%, rgba(28, 97, 234, 0) 100%);
}
::v-deep .el-dialog__title {
  margin-left: 25px;
  line-height: 70px;
  /*color: #050500;*/
  font-family: cursive;
  font-weight: bold;
  font-size: 25px;
}
::v-deep .el-dialog__body {
  /*background: linear-gradient(90deg, #a19e76 0%, rgba(28, 97, 234, 0) 100%);*/
  background: #abc59e;
  font-weight: bold;
  font-family: cursive;
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
