<template>
  <Top class="top"/>
  <Aside class="aside"/>
    <div class="main">
      <div class="search">
        <el-input
            v-model="input3"
            placeholder="请输入查询信息"
            class="input-with-select"
            clearable
            style="width:30%;margin-top: 40px;position: absolute;left: 35%;"

        >
          <template #append>
            <el-select v-model="select" placeholder="查询种类" style="width: 115px">
              <el-option label="编号" value="1" />
              <el-option label="产品名" value="2" />
            </el-select>
          </template>
        </el-input>
        <el-button style="position: absolute;left: 66%;margin-top:40px" type="primary" round
                   @click="searchInfo"
        >查询</el-button>
      </div>

      <div class="item">

        <div style="margin: 0 auto;width: 80%;">
          <el-table :data="logisticsData" border style="width: 80%;margin-left: 10%">

            <el-table-column prop="date" label="日期" width="120" />
            <el-table-column prop="name" label="产品名" width="160" />
            <el-table-column prop="company" label="供方" width="160" />
            <el-table-column prop="destination" label="目的地" width="130" />
            <el-table-column prop="source" label="产地" />
            <el-table-column label="操作" >
              <template #default="scope">

              <el-button type="primary" @click="showDetail(scope.row)">查看物流</el-button>
              </template>

            </el-table-column>
          </el-table>





          <el-empty description="无结果" v-if="logisticsData.length===0" />
        </div>

        <el-dialog
            v-model="dialogVisible"
            title="物流信息"
            width="30%"
        >

          <el-timeline>
            <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp"
                style="margin-left: 160px"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
          <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确定
        </el-button>
      </span>
          </template>
        </el-dialog>


      </div>
      <div class="page">
        <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[100, 200, 300, 400]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="margin-left: 35%"
        />
      </div>

    </div>
</template>

<script>
import Aside from "@/components/Aside";
import Top from "@/components/Top";


export default {
  name: "Logistics",
  components: { Aside, Top },data(){
    return{
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

        }
      ],activities:[
        {
          content: 'Event start',
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
      ]


    }
  },
  methods:{
    handleSizeChange(){

    },handleCurrentChange(){

    },showDetail(i){
      this.dialogVisible = true
      console.log(i)
    },searchInfo(){

    }
  }

}
</script>

<style scoped>
.search{
  float: left;
  width: 87%;
  height: 100px;
  position: relative;
}
.item {
  float: left;
  width:87%;
}

.page {
  float: left;
  width:87%;

}
</style>