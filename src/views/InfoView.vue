<template>
  <div>
    <Top />
  </div>

  <div style="width:100%;display: flex;">
    <Aside />

    <div style="padding-top: 15px;">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="商品名称">
            <el-input v-model="formInline.name" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="申请状态">
              <el-input v-model="formInline.status" placeholder="申请状态"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="reSet">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
        <el-table
            :data="tableData"
            style=" font-size: medium;left: 100px"
            border
        >
          <el-table-column label="产品编号" width="150">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span>{{ scope.row.id }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="产品名称" width="150">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span>{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>

        <el-table-column label="状态" width="150">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.status }}</span>
            </div>
          </template>
        </el-table-column>


        <el-table-column label="上传单位" width="150">
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

        <el-table-column label="生产时间" width="150">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 15px">{{ scope.row.createTime }}</span>
            </div>
          </template>
        </el-table-column>


        <el-table-column label="上传时间" width="150">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.updateTime }}</span>
            </div>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
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
<!--<script>-->
<!--import Aside from '@/components/Aside.vue'-->
<!--import Top from '@/components/Top.vue'-->
<!--import { ElMessage } from 'element-plus'-->
<!--export default {-->
<!--  name: 'InfoView',-->
<!--  components: { Aside, Top },-->
<!--  mounted() {},-->
<!--  data() {-->
<!--    return {-->
<!--      multipleSelection: [],-->
<!--      centerDialogVisible: false,-->
<!--      form: {},-->
<!--      total:0,-->
<!--      pageSize4:5,-->
<!--      options:[-->
<!--        {-->
<!--          value:"上线",-->
<!--          label:"上线"-->
<!--        },{-->
<!--          value:"下线",-->
<!--          label:"下线"-->
<!--        },-->

<!--      ],-->
<!--      currentPage4:1,-->
<!--      tableData: [-->
<!--        {-->
<!--          name: '牛奶',-->
<!--          status: '上线',-->
<!--          area: '北京',-->
<!--          plantTime: '2015-5-9',-->
<!--          uploadTime: '2016-4-3',-->
<!--          projectId: 'x123',-->
<!--          company:'abc'-->
<!--        },-->
<!--        {-->
<!--          name: '苹果干',-->
<!--          status: '上线',-->
<!--          area: '杭州',-->
<!--          plantTime: '2013-1-15',-->
<!--          uploadTime: '2016-4-3',-->
<!--          projectId: 'x124',-->
<!--          company:'abc'-->
<!--        },-->
<!--        {-->
<!--          name: '牛肉干',-->
<!--          area: '内蒙古',-->
<!--          status: '上线',-->
<!--          plantTime: '2016-7-2',-->
<!--          uploadTime: '2016-4-3',-->
<!--          projectId: 'x123',-->
<!--          company:'abc'-->
<!--        },-->
<!--        {-->
<!--          name: '葡萄',-->
<!--          plantTime: '2016-5-4',-->
<!--          area: '乌鲁木齐',-->
<!--          status: '上线',-->
<!--          uploadTime: '2016-4-3',-->
<!--          projectId: 'x123',-->
<!--          company:'abc'-->
<!--        },-->
<!--      ],-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    deleteRecord(index) {-->
<!--      this.tableData.splice(index, 1)-->
<!--      ElMessage({-->
<!--        message: '删除成功',-->
<!--        type: 'success',-->
<!--      })-->
<!--    },-->
<!--    handleSizeChange(){-->

<!--    },-->

<!--    deleteSelected() {-->


<!--    },-->
<!--    handleCurrentChange(){-->

<!--    },-->
<!--    handleSelectionChange(val) {-->
<!--      this.multipleSelection = val-->
<!--    },-->
<!--    editMessage(row, index) {-->
<!--      this.centerDialogVisible = true-->
<!--      this.form.id = row.id-->
<!--      this.form.area = row.area-->
<!--      this.form.status = row.status-->
<!--      this.form.name = row.name-->
<!--      this.form.plantTime = row.uploadTime-->
<!--      this.form.projectId = row.projectId-->
<!--      this.form.time = row.time-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->
