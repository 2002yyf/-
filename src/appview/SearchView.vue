<template>
  <AppBottom></AppBottom>
  <div>
      <van-search v-model="product" placeholder="请输入产品名称"/>
  </div>
  <div style="max-height:635px;overflow-y: auto">
    <van-index-bar ref="bar">
      <van-index-anchor index="A" v-if="productA.length!==0"/>
      <van-cell :title=item v-for="(item) in productA"/>
      <van-index-anchor index="B" v-if="productB.length!==0"/>
      <van-cell :title=item v-for="(item) in productB"/>
      <van-index-anchor index="C" v-if="productC.length!==0"/>
      <van-cell :title=item v-for="(item) in productC"/>
      <van-index-anchor index="D" v-if="productD.length!==0"/>
      <van-cell :title=item v-for="(item) in productD"/>
      <van-index-anchor index="E" v-if="productE.length!==0"/>
      <van-cell :title=item v-for="(item) in productE"/>
      <van-index-anchor index="F" v-if="productF.length!==0"/>
      <van-cell :title=item v-for="(item) in productF"/>
      <van-index-anchor index="G" v-if="productG.length!==0"/>
      <van-cell :title=item v-for="(item) in productG"/>
      <van-index-anchor index="H" v-if="productH.length!==0"/>
      <van-cell :title=item v-for="(item) in productH"/>
      <van-index-anchor index="I" v-if="productI.length!==0"/>
      <van-cell :title=item v-for="(item) in productI"/>
      <van-index-anchor index="J" v-if="productJ.length!==0"/>
      <van-cell :title=item v-for="(item) in productJ"/>
      <van-index-anchor index="K" v-if="productK.length!==0"/>
      <van-cell :title=item v-for="(item) in productK"/>
      <van-index-anchor index="L" v-if="productL.length!==0"/>
      <van-cell :title=item v-for="(item) in productL"/>
      <van-index-anchor index="M" v-if="productM.length!==0"/>
      <van-cell :title=item v-for="(item) in productM"/>
      <van-index-anchor index="N" v-if="productN.length!==0"/>
      <van-cell :title=item v-for="(item) in productN"/>
      <van-index-anchor index="O" v-if="productO.length!==0"/>
      <van-cell :title=item v-for="(item) in productO"/>
      <van-index-anchor index="P" v-if="productP.length!==0"/>
      <van-cell :title=item v-for="(item) in productP"/>
      <van-index-anchor index="Q" v-if="productQ.length!==0"/>
      <van-cell :title=item v-for="(item) in productQ"/>
      <van-index-anchor index="R" v-if="productR.length!==0"/>
      <van-cell :title=item v-for="(item) in productR"/>
      <van-index-anchor index="S" v-if="productS.length!==0"/>
      <van-cell :title=item v-for="(item) in productS"/>
      <van-index-anchor index="T" v-if="productT.length!==0"/>
      <van-cell :title=item v-for="(item) in product"/>
      <van-index-anchor index="U" v-if="productU.length!==0"/>
      <van-cell :title=item v-for="(item) in productU"/>
      <van-index-anchor index="V" v-if="productV.length!==0"/>
      <van-cell :title=item v-for="(item) in productV"/>
      <van-index-anchor index="W" v-if="productW.length!==0"/>
      <van-cell :title=item v-for="(item) in productW"/>
      <van-index-anchor index="X" v-if="productX.length!==0"/>
      <van-cell :title=item v-for="(item) in productX"/>
      <van-index-anchor index="Y" v-if="productY.length!==0"/>
      <van-cell :title=item v-for="(item) in productY"/>
      <van-index-anchor index="Z" v-if="productZ.length!==0"/>
      <van-cell :title=item v-for="(item) in productZ "/>
    </van-index-bar>
  </div>
</template>

<script>
import { pinyin } from 'pinyin-pro';
import AppBottom from "@/components/AppBottom";
import request from "@/utils/request";
export default {
  name: "SearchView",

  components:{
    AppBottom
  },mounted() {
    request.get("/crop/all").then(res =>{
      for(let i in res.data){
        // console.log(res.data[i].name)
        this.products.push(res.data[i].name)
      }
      // console.log(this.products[0])
      for(let i in this.products){
        // console.log(this.products[i])
        let firstLetter = pinyin(this.products[i],{toneType:"none"})[0].toUpperCase()
        if (firstLetter === 'Q') {
          this.productQ.push(this.products[i])
        } else if (firstLetter === 'W') {
          this.productW.push(this.products[i])
        } else if (firstLetter === 'E') {
          this.productE.push(this.products[i])
        } else if (firstLetter === 'R') {
          this.productR.push(this.products[i])
        } else if (firstLetter === 'T') {
          this.productT.push(this.products[i])
        } else if (firstLetter === 'Y') {
          this.productY.push(this.products[i])
        } else if (firstLetter === 'U') {
          this.productU.push(this.products[i])
        } else if (firstLetter === 'I') {
          this.productI.push(this.products[i])
        } else if (firstLetter === 'O') {
          this.productO.push(this.products[i])
        } else if (firstLetter === 'P') {
          this.productP.push(this.products[i])
        } else if (firstLetter === 'A') {
          this.productA.push(this.products[i])
        } else if (firstLetter === 'S') {
          this.productS.push(this.products[i])
        } else if (firstLetter === 'D') {
          this.productD.push(this.products[i])
        } else if (firstLetter === 'F') {
          this.productF.push(this.products[i])
        } else if (firstLetter === 'G') {
          this.productG.push(this.products[i])
        } else if (firstLetter === 'H') {
          this.productH.push(this.products[i])
        } else if (firstLetter === 'J') {
          this.productJ.push(this.products[i])
        } else if (firstLetter === 'K') {
          this.productK.push(this.products[i])
        } else if (firstLetter === 'L') {
          this.productL.push(this.products[i])
        } else if (firstLetter === 'Z') {
          this.productZ.push(this.products[i])
        } else if (firstLetter === 'X') {
          this.productX.push(this.products[i])
        } else if (firstLetter === 'C') {
          this.productC.push(this.products[i])
        } else if (firstLetter === 'V') {
          this.productV.push(this.products[i])
        } else if (firstLetter === 'B') {
          this.productB.push(this.products[i])
        } else if (firstLetter === 'N') {
          this.productN.push(this.products[i])
        } else if (firstLetter === 'M') {
          this.productM.push(this.products[i])
        }
      }
      this.$refs.bar.scrollTo('N')
    })

  },data(){
    return{
      product:'',
      products:[],
      productA:[],
      productQ:[],
      productW:[],
      productE:[],
      productR:[],
      productT:[],
      productU:[],
      productI:[],
      productO:[],
      productP:[],
      productS:[],
      productD:[],
      productF:[],
      productG:[],
      productH:[],
      productJ:[],
      productK:[],
      productL:[],
      productZ:[],
      productX:[],
      productC:[],
      productV:[],
      productB:[],
      productN:[],
      productM:[],
      productY:[],
    }
  }
  ,methods:{
    search(){
      this.$router.push('/searchResultView')
    }
  }

}
</script>

<style scoped>

</style>