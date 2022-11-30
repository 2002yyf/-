<template>
  <van-nav-bar
      :title="msg"
      left-arrow
      left-text="返回"
      :right-text="rightText"
      @click-left="this.$router.push(fromWhere)"
      @click-right="clickRight"
  />
</template>

<script>
export default {
  props:["msg","fromWhere","rightText","clickRight"],
  name: "back",
  methods:{
    clickRight(){
      this.clickRight()
    }
  }

}
</script>

<style scoped>

</style>