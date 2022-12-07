<template>
<Back msg="生长信息" from-where="/AppHome" right-text="新增生长信息" :clickRight="showDialog"></Back>
<div class="menu">
  <div class="left">
    <van-sidebar v-model="active" @change="onChange">
      <van-sidebar-item :title="item.name" v-for="item in crop" />
    </van-sidebar>
  </div>
  <div class="right">
    <div style="border: 1px solid gainsboro;width: 250px;min-height: 45px;background: white"
    v-for="item in growInfo" @click="show=true"><span style="display: block;margin: 10px auto">{{item.info}}</span></div>
  </div>
</div>

  <van-overlay :show="show" @click="show = false">
    <div class="wrapper">
      <van-image src="https://unpkg.com/@vant/assets/cat.jpeg"></van-image>
    </div>
  </van-overlay>
  <el-dialog v-model="visiable"></el-dialog>
</template>

<script>
import Back from'@/components/back'
export default {
  name: "GrowView",
  components:{
    Back
  },data(){
    return{
      active:0,
      crop:[{
        name:'苹果'
      },{
        name:'香蕉'
      },{
        name: '梨'
      }],
      growInfo:[{
        info:'浇了水，高了五英寸'
      },{
        info:'生根'
      }],
      show:false,
      visiable:false
    }
  },methods:{
    onChange(){
      console.log(this.active)
    },showDialog(){
      this.visiable = true
    }
  }

}
</script>

<style scoped>
.menu{
  display: flex;
}
.left{
  margin-top: 20px;
  width: auto;
}
.right{
  overflow: auto;
  margin-top: 20px;
  text-align: center;
}
.block {
  width: 120px;
  height: 120px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>