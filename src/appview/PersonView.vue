<template>
  <back msg="人员信息" from-where="/AppHome"/>
  <van-grid square style="margin-top: 50px;" :column-num="3" :gutter="10">
    <van-grid-item v-for="(item) in person" :icon=item.picture :text=item.name @click="showPerson(item)"/>

    <van-grid-item icon="add-o" text="新增成员" />
  </van-grid>
</template>

<script>
import back from "@/components/back";
import {Dialog} from "vant";
export default {
  name: "PersonView",
  components:{
    back
  },data(){
    return{
      show:false,
      person:[{
        name:'张三',
        picture:'https://unpkg.com/@vant/assets/apple-1.jpeg'
      },{
        name:'李四',
        picture:'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/03/ChMkJlbKxo2IT63KACN7OztCegEAALHmwPZIQ0AI3tT786.jpg'
      },{
        name:'王五',
        picture:'https://ts1.cn.mm.bing.net/th/id/R-C.8b5a06e831ae5806110eb424a6f459c9?rik=nPKd57IQk5a3gw&riu=http%3a%2f%2fwww.waibao123.com%2fUploads%2fphoto%2f2014-07-16%2fff544162748b2ddf1d362b908737387f_big.jpg&ehk=bSsTClUJFllXvpJ8jjQH%2f8L6khOAnKYImCV4lSmrtYg%3d&risl=&pid=ImgRaw&r=0'
      },{
        name:'李明',
        picture:'https://b.zol-img.com.cn/desk/bizhi/image/10/960x600/1598319721647.jpg'
      }]
    }
  },methods:{
    showPerson(item){
      Dialog.alert({
        title:item.name
      })
    }
  }
}
</script>

<style scoped>

</style>