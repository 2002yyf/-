<template>
  <div style="height: 70px;">
    <div style="float: left;margin-left: 10px">
      <icon/>
    </div>
      <div style="float: left;width:1050px;height: 70px;margin-left:30px;margin-top: 25px;font-family: cursive;font-size: 50px;font-weight: bolder;color: #5b500b">
        农 产 品 溯 源 系 统
      </div>
      <div style="height: 70px;float: left">
        <div style="width:80px;margin-top:25px;float:left">
          <el-icon size="25px" @click="logout" color="#234d3e"><Avatar /></el-icon>
          <el-icon size="25px" @click="showDetail()" color="#234d3e" style="margin-left: 10px"><BellFilled /></el-icon>
        </div>
        <!--  <div style="width:70px;height40px;margin-left:1000px;float:right;background-color: #0b5b33">-->
        <!--    <button class="btn2" style="margin-right: 20px;" @click="logout">退出登录</button>-->
        <!--  </div>-->
        <div style=" width:110px;margin-top: 15px;float:left">
          <div style="float:left;height: 20px;text-align: center;font-family: cursive;font-weight: bolder;font-size: 15px;color: #303038">
            {{information.userName}}
          </div>
          <img src="https://img.zcool.cn/community/01972c5f110b9fa801206621eba569.png@1280w_1l_2o_100sh.png">
        </div>
        <div style="margin-top:25px;float:left">
          <el-icon size="25px" @click="logout" color="#234d3e"><Setting /></el-icon>
        </div>
      </div>
  </div>

  <div>
    <el-dialog
        v-model="dialogVisible"
        title="待审批用户"
        class="spec-dialog"
        width="60%"
        v-loading="loading"
    >
      <div style="width:80%;">
        <el-table :data="application"
                  element-loading-background="#dee7da"
                  element-loading-text="拼命加载中"
                  v-loading="loading"
                  border
                  :header-cell-style="{'background':'#e0eed1','text-align': 'center'}"
                  :cell-style="{'text-align':'center',backgroundColor: '#dee7da',}"
        >
          <el-table-column prop="id" label="信息编号" align="center" header-align="left"/>
          <el-table-column prop="name"  label="作物名称" />
          <el-table-column prop="plantTime"  label="种植时间" />
          <el-table-column prop="plantPlace" label="种植地点"/>
          <el-table-column prop="plantNum" label="种植数量（亩）"/>
          <el-table-column  fixed="right" label="操作">
            <button class="btn1" style="width: 100px" @click="">审批通过</button>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-top:20px; margin-bottom: 20px;margin-left: 20px">
        <el-pagination style="color: #00b891;font-family:cursive;font-weight: bold;"
                       :current-page="page"
                       :page-size="pageSize"
                       :page-sizes="[4,6]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
        />
      </div>

    </el-dialog>
  </div>
</template>


<script>
import {ElMessageBox} from "element-plus";
import Icon from "@/components/icon";
import request from "@/utils/request";
export default {
  components: {Icon},
  name: "Top",
  data(){
    return{
      loading: false,
      dialogVisible:false,
      page:1,
      pageSize:4,
      total:0,
      application:[],
      information:{
        img:'',
        userName:'',
      }
    }
  },
  created() {
    this.GetInformation();
    this.loadData()
  },
  methods:{
    GetInformation(){
      let userinfo = JSON.parse(localStorage.getItem('userinfo'))
      this.information.userName=userinfo.userName;
      this.information.img=userinfo.img;
      console.info(userinfo)
    },
    logout()
    {
      ElMessageBox.confirm("你确定退出登录吗?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        localStorage.removeItem('userinfo')
        this.$router.push({ path: '/' })
      })
    },
    showDetail(){
      this.dialogVisible=true
    },
    loadData(){
      this.loading = true
      request.get("/crop/page",{
            params:{
              page:this.page,
              pageSize:this.pageSize,
            }
          }
      ).then(res => {
        setTimeout(() => {
          this.application=res.data.records;
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
    },
  }
}
</script>

<style scoped>
.btn2 {
  width: 70px;
  border: 2px solid #e7c69f;
  text-align: center;
  height: 35px;
  border-radius: 5px;
  font-weight: bold;
  font-size:15px;
  margin-top: 10px;
  font-family: cursive;
  background-color: #ffffff;
  color: #8f7860;
}
.btn2:hover {

  color: #56481f;
}
img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 2px solid #4048a6;
  margin-left: 10px;
}


::v-deep .el-dialog {
  border-radius: 30px;
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
  /*color: #050500;*/
  font-family: cursive;
  font-weight: bold;
  font-size: 25px;
}
::v-deep .el-dialog__body {
  /*background: linear-gradient(90deg, #a19e76 0%, rgba(28, 97, 234, 0) 100%);*/
  background: #b4a97f;
  font-weight: bold;
  font-family: cursive;
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>