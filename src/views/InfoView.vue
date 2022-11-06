<template>
  <div>
    <Top />
  </div>

  <div style="width:100%;display: flex;">
    <Aside />

    <div style="width:100%;padding-top: 15px; background-color: #edf5ea; background-size:100% 100%;">
      <div class="box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <input class="input" v-model="formInline.name" placeholder="商品名称"/>
          </el-form-item>
          <el-form-item>
            <input class="input" v-model="formInline.status" placeholder="申请状态"/>
          </el-form-item>
          <el-form-item>
            <button class="btn1" @click="onSubmit">查询</button>
            <button class="btn1" style="margin-left: 10px" @click="reSet">重置</button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table
            :data="tableData"
            :header-row-style="headerRowStyle"
            :row-style="rowState"
            :header-cell-style="{'background':'#8c9d47',textAlign: 'center'}"
        >
          <el-table-column label="产品编号" width="100">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span>{{ scope.row.id }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="产品名称" width="200">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span>{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="100">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span>{{ scope.row.status }}</span>
              </div>
            </template>
          </el-table-column>


          <el-table-column label="上传单位" width="230">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span >{{ scope.row.company }}</span>
              </div>
            </template>
          </el-table-column>


          <el-table-column label="地区" width="150">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span>{{ scope.row.area }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="生产时间" width="230">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-icon><timer /></el-icon>
                <span style="margin-left: 15px">{{ scope.row.createTime }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="上传时间" width="250">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-icon><timer /></el-icon>
                <span style="margin-left: 15px">{{ scope.row.updateTime }}</span>
              </div>
            </template>
          </el-table-column>


        </el-table>
      </div>
      <div class="table">
        <el-pagination style="color: #00b891;font-family:cursive;font-weight: bold;"
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="[4, 6,8]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>


<script>
import Aside from '@/components/Aside.vue'
import Top from '@/components/Top.vue'
import request from "@/utils/request";
export default {
  name: 'InfoView',
  components: { Aside, Top },
  data() {
    return {
      formInline: {
        name:'',
        status:'',
      },
      page:1,
      pageSize:5,
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
        background:'#e0eed1',
      }
    },
    rowState(arg){
      return {
        color:'#6a9a49',
        fontWeight:'bold',
        background: '#dee7da',
        fontFamily:'cursive',
        fontSize:"17px",
      }
    },
    loadData(){
      request.get("/product/page",{
        params:{
          page:this.page,
          pageSize:this.pageSize,
          name:this.formInline.name,
        }
          }
      ).then(res => {
        this.tableData=res.data.records;
        this.total=res.data.total;
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
.table{
  padding-left: 40px;
  padding-right: 45px;
  padding-top: 20px;
}
.box {
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  width: 100%;
}
.btn {
  width: 55px;
  border: 2px solid #52a640;
  text-align: center;
  line-height: 30px;
  border-radius: 8px;
  display: inline-block;
  margin-left:10px;
}
.btn:hover {
  filter: brightness(1.2);
  color: #6a6c0f;
}
.input{
  width:130px;
  border: 2px solid #6a6c0f;
  text-align: center;
  line-height: 35px;
  height: 35px;
  border-radius: 8px;
  display: inline-block;
  font-weight: bold;
  font-size:16px ;
  font-family:cursive;
  color:#6a6c0f;
}

.input::placeholder{
  font-weight: bolder;
  color:  #206c0f;
  font-size:16px ;
  filter: brightness(1.2);
}
.input:hover {
  filter: brightness(1.2);
  color:  #206c0f;
  font-weight: bold;

}
.btn1 {
  width: 50px;
  border: 2px solid #6a6c0f;
  text-align: center;
  line-height: 30px;
  border-radius: 7px;
  display: inline-block;
  font-family:cursive;
  font-weight: bold;
  font-size:16px;
  color:#5b5e0b;
}
.btn1:hover {
  filter: brightness(1.2);
  color: #206c0f;
}
</style>