<template>
  <Top class="top"/>
  <Aside class="aside"/>
  <icon class="icon"/>
  <div class="main">
      <div class="search">
        <button class="btn1" style="width: 140px" @click="handleNew(row)">新增生长信息</button>
        <button class="btn1" style="margin-left: 120px" @click="select(row)">查找</button>
        <input class="input" style="margin-left: 10px" v-model="plantInfo.id" placeholder="请输入信息编号" />
        <button class="btn1" style="margin-left: 120px" @click="select(row)">查找</button>
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
          <el-table-column prop="id" label="信息编号" align="center" header-align="left" width="100px"/>
          <el-table-column prop="id_"  label="作物编号"/>
          <el-table-column prop="name"  label="作物名称" />
          <el-table-column prop="time"  label="记录时间" />
          <el-table-column prop="weather" label="天气状况"/>
          <el-table-column prop="description" label="描述"/>
          <el-table-column  fixed="right" label="操作" width="200px">
            <template #default="{ row }">
              <!--              <div  class="btn" @click="handleDetail(row)">详情</div>-->
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
          :arrayid_="plantInfo.length"
          @addRow="addRow"
          @editRow="editRow"
      />
      <!-- 详情弹窗 -->
      <Detail v-if="detailShow" :rowInfo="rowInfo" @closeDetail="closeDetail" />
    </div>
</template>

<script>
import Aside from '@/components/Aside.vue'
import Top from '@/components/Top.vue'
import Dialog from './dialog1.vue'
import Detail from "./detail.vue"
import { reactive, toRefs } from "vue";
import {ElMessageBox} from "element-plus";
import Icon from "@/components/icon";
export default {
  name: 'Planting2',
  components: { Aside, Top ,Detail ,Dialog,Icon},
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
          weather: "晴天",
          id_: "1",
          description:"浇水2.0ml"
        },
        {
          id: 2,
          name: "土豆",
          time: "2022-12-13",
          weather: "小雨",
          id_: "6",
          description:"浇水1.00ml"
        }
        ,
        {
          id: 2,
          name: "土豆",
          time: "2022-12-13",
          weather: "多云",
          id_: "10",
          description:"施肥1.1g"
        }
        ,
        {
          id: 2,
          name: "土豆",
          time: "2022-12-13",
          weather: "阴天",
          id_: "7",
          description:"施肥1.1g"
        }
        ,
        {
          id: 2,
          name: "土豆",
          time: "2022-12-13",
          weather: "冰雹",
          id_: "1",
          description:"施肥1.0g"
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

</style>
