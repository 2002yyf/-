<template>
  <van-nav-bar
      :title="msg"
      left-arrow
      left-text="返回"
      @click-left="this.$router.push(fromWhere)"
  />
</template>

<script>
export default {
  props:["msg","fromWhere"],
  name: "back"
}
</script>

<style scoped>

</style>