<template>
  <Back msg="我的信息" from-where="/AppInfo" right-text="修改信息"></Back>
  <div>
    <van-cell-group inset style="margin-top: 40px">
      <van-cell title="用户名" value="内容" />
      <van-cell title="密码" value="·······"/>
      <van-cell title="创建时间" value="2022年12月8日" />
      <van-cell title="角色" value="供应商" />
    </van-cell-group>
  </div>
</template>

<script>
import Back from '@/components/back'
export default {
  name: "MyInfoView",
  components:{
    Back
  }
}
</script>

<style scoped>

</style>