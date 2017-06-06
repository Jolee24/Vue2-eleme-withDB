<template>
<div>
  <v-header :abc="seller"></v-header>
  <div class="tab border-1px">
    <div class="tab-item">
      <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/ratings">评论</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/seller">商家</router-link>
    </div>
  </div>
  <keep-alive>
    <router-view :xyz="seller"></router-view>
  </keep-alive>
</div>
</template>

<script>
import header from "./components/header/header.vue"
// import data from "../data.json"
// import axios from 'axios'
export default {
  data() {
    return {
      seller: {}
    }
  },
  components: {
    "v-header": header
  },
  created() {
    // this.seller = JSON.parse(JSON.stringify(data.seller))
    this.$axios.get('/api/seller').then(res => {    //this.$axios的用法前提是将axios挂载到Vue的原型上，否则需要使用import引入axios的方法
      this.seller = JSON.parse(JSON.stringify(res.data))
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
