<template>
<back msg="供应商查询" fromWhere="/AppHome"></back>
  <van-cell-group inset style="margin-top: 50px">
    <van-field
        v-model="providerID"
        center
        clearable
        label="供应商名称"
        placeholder="请输入供应商名称"

    >
      <template #button>
        <van-button size="small" type="primary" @click="search">查询</van-button>
      </template>
    </van-field>
  </van-cell-group>
  <el-card v-for="(item,i) in results" class="result" shadow="hover" @click="show=true">
    <span>{{item.userName}}</span>

  </el-card>

  <van-dialog v-model:show="show" confirmButtonColor="blue" title="标题">
    <div style="border: 1px red solid">
      <span style="text-align: center;display: block">nihao</span>
    </div>
  </van-dialog>


</template>





<script>
import back from "@/components/back";
import request from "@/utils/request";
export default {

  name: "ProviderSearchView",
  components:{
    back
  },
  data(){
    return{
      show:false,
      providerID:'',
      results:[],
    }
  },mounted() {
    request.get("/user/page",{
      params:{
        role:2,
        page:0,
        pageSize:100
      }
    }).then(res => {
      // console.log(res.data.records)
      for(var i in res.data.records){
        this.results.push(res.data.records[i])
      }
    })
  },methods:{
    search(){
      request.get("/user/page",{
        params:{
          role:2,
          page:0,
          pageSize:100,
          name:this.providerID
        }
      }).then(res => {
        // console.log(res.data)
        this.results = []
        for (var i in res.data.records){
          this.results.push(res.data.records[i])
        }

      })
    }
  }
}
</script>

<style scoped>
.result{
  width: 90%;
  margin: 50px auto;
  background: lightblue;
}
</style>