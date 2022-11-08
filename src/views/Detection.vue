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

          <div style="margin: 0 auto;width: 80%;height: 450px">

            <el-card
                shadow="hover"
                style="width: 25%;height: 180px;margin-left: 5%;margin-top: 30px;float: left"
                v-for="(item,index) in certificate"
            >
              <template #header>
                <div class="card-header">
                  <span>{{item.name}}</span>
                  <el-button text style="margin-left: 50%;color: blue" @click="showDetail(index)">查看详情</el-button>
                </div>
              </template>
              <span>化学成分检测:{{item.res1}}</span><br>
              <span>防疫检测:{{item.res2}}</span>
              <span></span>
            </el-card>
            <el-empty description="无结果" v-if="certificate.length===0" />
          </div>

        <el-dialog
            v-model="dialogVisible"
            title="检测信息"
            width="50%"
        >
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="company" label="所属公司" width="180" />
            <el-table-column prop="chemistry" label="化学物质检测证明" width="280" />
            <el-table-column prop="virus" label="防疫检测证明" />
          </el-table>

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
import Aside from '@/components/Aside.vue'
import Top from '@/components/Top.vue'
export default {
  name: "Detection",
  components: { Aside, Top },
  data(){
    return{
      select:'',
      input3:'',
      currentPage:0,
      pageSize:0,
      total:0,
      dialogVisible:false,
      certificate:[
          {
          name:'西瓜',
          res1:'合格',
          res2:'合格'
      },{
          name:'苹果',
        res1:'合格',
        res2:'合格'
      },{
        name:'梨',
        res1:'合格',
        res2:'合格'
      },{
        name:'芒果',
        res1:'合格',
        res2:'合格'
      }
      ],
      tableData:[{
          company:'',
          chemistry:'',
          virus:''
      }]

    }
  },
  methods:{
    handleSizeChange(){

    },handleCurrentChange(){

    },showDetail(i){
        this.dialogVisible = true

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
  height: 450px;
}

.page {
  float: left;
  width:87%;

}
</style>