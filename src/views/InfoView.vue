<template>
    <Top class="top"/>
    <Aside class="aside"/>
    <div class="main">
      <div class="tag">
        商品信息
      </div>
      <div class="search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <input class="input" v-model="formInline.name" placeholder="商品名称"/>
          </el-form-item>
          <el-form-item>
            <div style="font-size: 17px;font-weight: bold;color: #0b5b33;font-family:cursive">状态选择：
            </div>
            <select class="input" style="width:100px"  v-model="formInline.status">
              <option class="input" label="已上线" value=1></option>
              <option class="input" label="已下线" value=0></option>
            </select>
          </el-form-item>
          <el-form-item>
            <button class="btn1" @click="onSubmit">查询</button>
            <button class="btn1" style="margin-left: 10px" @click="reSet">重置</button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table" style="margin-top: 20px">
        <el-table
            element-loading-background="rgba(162,162,185,0.32)"
            element-loading-text="拼命加载中"
            v-loading="loading"
            border
            :data="tableData"
            :cell-style="{textAlign: 'center'}"
            :header-row-style="headerRowStyle"
            :row-style="rowState"
            :header-cell-style="{'background':'#8c9d47',textAlign: 'center'}"
            width="1500"
        >
          <el-table-column  label="产品编号" width="100">
            <template #default="scope">
                <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="产品名称" width="150">
            <template #default="scope">
                <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="100">
            <template #default="scope">
                <span>{{ scope.row.status }}</span>
            </template>
          </el-table-column>


          <el-table-column label="上传单位" width="300">
            <template #default="scope">
                <span >{{ scope.row.company }}</span>
            </template>
          </el-table-column>


          <el-table-column label="地区" width="150">
            <template #default="scope">
                <span>{{ scope.row.area }}</span>
            </template>
          </el-table-column>

          <el-table-column label="上传时间" width="220">
            <template #default="scope">
                <el-icon><timer /></el-icon>
                <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>

<!--          <el-table-column label="作物组成" width="220">-->
<!--            <template #default="scope">-->
<!--                <el-icon><timer /></el-icon>-->
<!--                <span>{{ scope.row.crops.name}}</span>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column label="图片" width="220">
            <template #default="scope">
              <img  :src="scope.row.image" style="width: 70px;height: 70px">
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
</template>


<script>
import Aside from '@/components/Aside.vue'
import Top from '@/components/Top.vue'
import request from "@/utils/request";
import Icon from "@/components/icon";
export default {
  name: 'InfoView',
  components: { Aside, Top,Icon },
  data() {
    return {
      loading: false,
      formInline: {
        name:'',
        status:'',
      },
      page:1,
      pageSize:8,
      total: 0,
      tableData: [],
    }
  },
  created(){
    this.loadData()
  },
  methods: {
    headerRowStyle(args){
      return {
        height: '50px',
        color:'#5b5e0b',
        fontSize:'18px',
        fontFamily:'cursive',
        fontWeight:'bolder',
      }
    },
    rowState(arg){
      return {
        color:'#6a9a49',
        fontWeight:'bold',
        background: 'rgba(162,162,185,0.32)',
        fontFamily:'cursive',
        fontSize:"17px",
      }
    },
    loadData(){
      this.loading = true;
      request.get("/product/page",{
        params:{
          page:this.page,
          pageSize:this.pageSize,
          name:this.formInline.name,
          status:this.formInline.status
        }
          }
      ).then(res => {
        setTimeout(() => {
          this.tableData=res.data.records;
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
    }

  },

}
</script>
<style lang="scss" scoped>

</style>