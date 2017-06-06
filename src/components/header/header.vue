<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="abc.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{abc.name}}</span>
        </div>
        <div class="description">{{abc.description}}/{{abc.deliveryTime}}分钟</div>
        <div v-show="abc.supports" class="support">
          <span class="icon" :class="classMap[abc.supports[0].type]"></span>
          <span class="text" v-text='abc.supports[0].description'></span>
        </div>
      </div>
      <div v-show="abc.supports" class="support-count">
        <span class="count" @click="displayDetail = true">{{abc.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="displayDetail = true">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{abc.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img width="100%" height="100%" :src="abc.avatar">
    </div>

    <div class="detail" v-show="displayDetail" @click="displayDetail = false">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{abc.name}}</h1>
          <div class="star-wrapper">
            <v-star :size="48" :score="abc.score"></v-star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="abc.supports" class="supports">
            <li class="support-item" v-for="item in abc.supports">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{abc.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="displayDetail = false">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '../star/star.vue'
  import store from '../../store/'
  export default {
    props: ["abc"],
    data: function () {
      return {
        displayDetail: false,
        // classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        classMap: this.$store.state.classMap
      }
    },
    components: {
      "v-star": star
  },
  store
  }
</script>
