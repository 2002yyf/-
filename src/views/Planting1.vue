<template>
  <div>
    <Top />
  </div>
  <div style="width:100%;display: flex;flex-wrap: wrap">
    <Aside />
    <div class="box" style="width: auto">
      <div>
        <div class="btn1" style="width: 140px" @click="handleNew(row)">新增作物信息</div>
        <div class="btn1" style="margin-left: 120px" @click="select(row)">查找</div>
        <input class="input" style="margin-left: 10px" v-model="plantInfo.id" placeholder="请输入作物编号" />
      </div>
      <div class="table">
        <el-table :data="plantInfo"
                  border
                  :header-row-style="headerRowStyle"
                  :row-style="rowState"
                  :header-cell-style="{'background':'#e0eed1','text-align': 'center'}"
                  :cell-style="{'text-align':'center',backgroundColor: '#dee7da',}"
                  @selection-change="handleSelectionChange"
                 >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="id" label="作物编号" align="center" header-align="left" width="100px"/>
          <el-table-column prop="name"  label="作物名称" />
          <el-table-column prop="time"  label="开始培育时间 " />
          <el-table-column prop="address" label="培育地点"/>
          <el-table-column prop="num"  label="培育数量"/>
          <el-table-column  fixed="right" label="操作" width="250px">
            <template #default="{ row }">
                <div  class="btn" @click="handleDetail(row)">详情</div>
                <div  class="btn" @click="handleEdit(row)">编辑</div>
                <div  class="btn" @click="handleDel(row)">删除</div>
            </template>
          </el-table-column>
        </el-table>
      </div>

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

      <!-- 新建/编辑弹框 -->
      <Dialog
          v-if="dialogShow"
          v-model:dialogShow="dialogShow"
          :rowInfo="rowInfo"
          :title="title"
          :arrayNum="plantInfo.length"
          @addRow="addRow"
          @editRow="editRow"
      />
      <!-- 详情弹窗 -->
      <Detail v-if="detailShow" :rowInfo="rowInfo" @closeDetail="closeDetail" />
    </div>
  </div>
</template>

<script>
import Aside from '@/components/Aside.vue'
import Top from '@/components/Top.vue'
import Dialog from './dialog.vue'
import Detail from "./detail.vue"
import { reactive, toRefs } from "vue";
import {ElMessageBox} from "element-plus";
export default {
  name: 'Planting1',
  components: { Aside, Top ,Detail ,Dialog},
  setup() {
    const data = reactive({
      dialogShow: false, // 新增/编辑弹框
      detailShow: false, // 详情弹窗
      rowInfo: {}, // 新增/编辑的数据
      title: "", // 是新建还是修改
      total:0,
      pageSize4:5,
      plantInfo: [
        {
          id: 1,
          name: "西瓜",
          time: "2022-12-12",
          address: "杭州",
          num: "1亩",
        },
        {
          id: 2,
          name: "土豆",
          time: "2022-12-13",
          address: "上海",
          num: "6亩",
        }
        ,
        {
          id: 2,
          name: "土豆",
          time: "2022-12-13",
          address: "上海",
          num: "10亩",
        }
        ,
        {
          id: 2,
          name: "土豆",
          time: "2022-12-13",
          address: "上海",
          num: "7亩",
        }
        ,
        {
          id: 2,
          name: "土豆",
          time: "2022-12-13",
          address: "上海",
          num: "1亩",
        }
      ],
    });
    const method = reactive({
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
      select()
      {

      },
      handleNew() {
        data.title = "新增";
        data.rowInfo = {};
        data.dialogShow = true;
      },
      handleDetail(val) {
        data.detailShow = true;
        data.rowInfo = val;
      },
      handleEdit(val) {
        data.title = "修改";
        data.dialogShow = true;
        data.rowInfo = val;
      },
      handleDel(val) {
        ElMessageBox.confirm("你确定删除这个农产品的信息吗?", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        })
            .then(() => {
              method.handleSure(val);
            })
            .catch(() => {
              // catch error
            });
      },
      handleSure(val) {
        this.dialogVisible = false;
        const index = data.plantInfo.findIndex((item) => item.id === val.id);
        data.plantInfo.splice(index, 1);
      },
      // 添加行
      addRow(val) {
        data.plantInfo.push(val);
      },
      // 编辑行
      editRow(val) {
        let index = data.plantInfo.findIndex(
            (item, index) => item.id === val.id
        );
        data.plantInfo.splice(index, 1, val);
      },
      // 关闭详情弹窗
      closeDetail() {
        data.detailShow = false;
      },
    });
    return { ...toRefs(data), ...method };
  },
}
</script>

<style lang="scss" scoped>
.box {
  padding-top: 40px;
  padding-left: 40px;
  padding-right: 40px;
  width: 700px;
}
.table{
  padding-top: 20px;
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
  width:200px;
  border: 2px solid #6a6c0f;
  text-align: center;
  line-height: 40px;
  height: 40px;
  border-radius: 8px;
  display: inline-block;
  margin-left:10px;
  font-weight: bold;
  font-size:20px ;
  font-family:cursive;
  color:#6a6c0f;
}

.input::placeholder{
  font-weight: bolder;
  color:  #206c0f;
  font-size:20px ;
}
.input:hover {
  filter: brightness(1.2);
  color:  #206c0f;
  font-weight: bold;

}
.btn1 {
  width: 65px;
  border: 2px solid #6a6c0f;
  text-align: center;
  line-height: 35px;
  border-radius: 8px;
  display: inline-block;
  font-family:cursive;
  font-weight: bold;
  font-size:20px;
  color:#5b5e0b;
}
.btn1:hover {
  filter: brightness(1.2);
  color: #206c0f;
}
</style>
