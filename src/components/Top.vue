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
      <div style="width:850px;margin-left: 13px">
        <el-table :data="application"
                width="850px"
                  :cell-style="{textAlign: 'center'}"
                  :header-row-style="headerRowStyle"
                  :row-style="rowState"
                  :header-cell-style="{textAlign: 'center'}"
        >
          <el-table-column prop="role" label="身份" />
          <el-table-column prop="userName" label="昵称"  />
          <el-table-column prop="createTime" label="注册日期" />
          <el-table-column prop="isDelete" label="状态" />
          <el-table-column prop="" label="上传材料"/>
          <el-table-column label="操作">
            <button class="btn1" style="width: 100px" @click="">审批通过</button>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-top:20px; margin-bottom: 50px;margin-left: 120px">
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
      <div style="margin-top: 10px">
        <button class="btn1" style="margin-left:750px; width:100px" type="primary" @click="dialogVisible = false">
          退出
        </button>
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
    headerRowStyle(args){
      return {
        height: '50px',
        // color:'#5b5e0b',
        fontSize:'18px',
        fontFamily:'cursive',
        fontWeight:'bolder',
      }
    },
    rowState(arg){
      return {
        // color:'#6a9a49',
        fontWeight:'bold',
        // background: '#bdbdd7',
        fontFamily:'cursive',
        fontSize:"17px",
      }
    },
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
      request.get("/user/page",{
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
img {
  height: 40px;
  width: 40px;
  border-radius: 15px;
  border: 2px solid #4048a6;
  margin-left: 10px;
}
::v-deep .el-dialog {
  border-radius: 15px;
  /*background: linear-gradient(90deg, rgba(28, 97, 234, 0) 100%, #e0c8c8 20%);*/
  /*background: linear-gradient(90deg, #4f450a 0%, rgba(28, 97, 234, 0) 100%);*/
  background-color: #afafc2;
}
::v-deep .el-dialog__header {
  padding: 0 !important;
  width: 80%;
  height: 50px;
  /*background: linear-gradient(90deg, #6a98b4 0%, rgba(28, 97, 234, 0) 100%);*/
}
::v-deep .el-dialog__title {
  margin-left: 25px;
  line-height: 70px;
  /*color: #050500;*/
  font-family: cursive;
  font-weight: bold;
  font-size: 25px;
}
/*::v-deep .el-dialog__body {*/
/*  !*background: linear-gradient(90deg, #a19e76 0%, rgba(28, 97, 234, 0) 100%);*!*/
/*  !*background: #c4b4e5;*!*/
/*  font-weight: bold;*/
/*  font-family: cursive;*/
/*  border-radius: 15px;*/
/*}*/

.btn1 {
  width: 55px;
  border: 2px solid #6a6c0f;
  text-align: center;
  line-height: 30px;
  border-radius: 7px;
  display: inline-block;
  font-family:cursive;
  font-weight: bold;
  font-size:16px;
  background-color: #afafc2;
  color:#5b5e0b;
}
.btn1:hover {
  /*filter: brightness(2.2);*/
  background-color: #c5c5de;
  color:#5b5e0b;
}
</style>