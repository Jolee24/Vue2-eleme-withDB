<template lang="html">
    <div class="seller" ref="seller">
    <div class="seller-content">
    <div class="overview">
      <h1 class="title">{{xyz.name}}</h1>
      <div class="desc border-1px">
        <v-star :size="36" :score="xyz.score"></v-star>
        <span class="text">({{xyz.ratingCount}})</span>
        <span class="text">月售{{xyz.sellCount}}单</span>
      </div>

      <ul class="remark">
        <li class="block" v-for="item in sellerInfo">
          <h2>{{item.type}}</h2>
          <div class="content">
            <span class="stress">{{item.info}}</span>元
          </div>
        </li>
      </ul>
      <div class="favorite" @click="toggleFavorite($event)">
        <span class="icon-favorite" :class="{'active':favoriteText == '已收藏'}"></span>
        <span class="text">{{favoriteText}}</span>
      </div>
    </div>

    <!-- <split></split> -->
    <div class="split"></div>
    <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{xyz.bulletin}}</p>
        </div>
        <ul v-if="xyz.supports" class="supports">
          <li class="support-item border-1px" v-for="item in xyz.supports">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>

      <div class="split"></div>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in xyz.pics">    <!--单个li元素绑定单个img元素并遍历-->
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>

      <div class="split"></div>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in xyz.infos">{{info}}</li>
        </ul>
      </div>

</div>
</div>
</template>

<script>
import star from "../star/star.vue"
import BScroll from "better-scroll"
import store from '../../store/'
export default {
  data() {
    return {
      //   sellerInfo: [],
      favoriteText: '收藏',
      //   classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      classMap: this.$store.state.classMap
    }
  },
  props: ["xyz"],
  components: {
    "v-star": star
  },
  store,
  computed: {
    sellerInfo() {
      this.$nextTick(() => {
        this.initScroll()
        this.initPics()
      })
      return [{
          type: '起送价',
          info: this.xyz.minPrice
        },
        {
          type: '商家配送',
          info: this.xyz.deliveryPrice
        },
        {
          type: '平均配送时间',
          info: this.xyz.deliveryTime
        }
      ]
    }
  },
  // mounted() {
  //   this.$nextTick(() => { //nextTick方法相当于setTimeout定时器，用于处理异步回调问题
  //     this.initScroll()
  //     this.initPics()
  //   })
  // },
  methods: {
    toggleFavorite(event) {
      if (!event._constructed) {
        return
      }
      this.favoriteText == "收藏" ? this.favoriteText = "已收藏" : this.favoriteText = "收藏"
    },
    initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    initPics() {
      if (this.xyz.pics) {
        let picWidth = 120
        let margin = 6
        let width = (picWidth + margin) * this.xyz.pics.length - margin
        this.$refs.picList.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    }
  }
}
</script>

<style>
/*.seller {
        overflow:auto;
    }*/
</style>
