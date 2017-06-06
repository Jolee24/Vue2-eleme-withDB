<template lang="html">
    <div class="food" ref="food">
        <div class="food-content">
          <div class="image-header">
            <img :src="selectedFood.image">
            <div class="back" @click="showOrHide($event)">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>

          <div class="content">
            <h1 class="title">{{selectedFood.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{selectedFood.sellCount}}份</span>
              <span class="rating">好评率{{selectedFood.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{selectedFood.price}}</span><span class="old" v-show="selectedFood.oldPrice">￥{{selectedFood.oldPrice}}</span>
            </div>

            <div class="cartcontrol-wrapper">
              <carcontrol :food="selectedFood"></carcontrol>
            </div>
            <transition name="fade">
              <div @click.stop.prevent="addFirst($event)" class="buy" v-show="!selectedFood.count">
                加入购物车
              </div>
            </transition>
          </div>

          <div class="split" v-show="selectedFood.info"></div>
          <div class="info" v-show="selectedFood.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{selectedFood.info}}</p>
          </div>

          <div class="split"></div>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect @selectPos="selectPos" @selectNeg="selectNeg" @selectAll="selectAll" @onlyContent="onlyContent" :posNum="posNum" :negNum="negNum" :status="status" :dvType="dvType"></ratingselect>
            <div class="rating-wrapper">
              <ul v-show="selectedFood.ratings && selectedFood.ratings.length">
                <li v-for="rating in ratings" class="rating-item border-1px">
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                  </div>
                  <div class="time">{{rating.rateTime | formatDate}}</div>
                  <p class="text">
                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!selectedFood.ratings || !selectedFood.ratings.length">暂无评价</div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import BScroll from 'better-scroll'
import ratingselect from "../ratingSelect/ratingSelect.vue"
import carcontrol from '../carControl/carControl.vue'
import Vue from 'vue'
export default {
  data() {
    return {
      ratingsArr: [],
      posNum: '',
      negNum: '',
      status: true,
      flag: 0,
      dvType: ['全部', '推荐', '吐槽'],
    }
  },
  methods: {
    addFirst(event) {
      if (!event._constructed) {
        return
      }
      Vue.set(this.selectedFood, 'count', 1) //强制赋值，这里还设置内存指针问题
    },
    selectAll() {
      this.flag = 0
    },
    selectPos() {
      this.flag = 1
    },
    selectNeg() {
      this.flag = 2
    },
    onlyContent() {
      this.status ? this.status = false : this.status = true
    },
    showOrHide(event) {
      if (!event._constructed) {
        return
      }
      this.$emit("showOrHide")
    }
  },
  computed: {
    ratings: function() {
      return this.filterArr
    },
    filterArr: function() {
      if (this.status) {
        console.log(true)
        if (this.flag == 1) {
          return this.ratingsArr.filter(obj => {
            return obj.rateType === 0
          }).filter(obj => {
            return obj.text.length > 0
          })
        } else if (this.flag == 2) {
          return this.ratingsArr.filter(obj => {
            return obj.rateType === 1
          }).filter(obj => {
            return obj.text.length > 0
          })
        } else if (this.flag == 0) {
          return this.ratingsArr.filter(obj => {
            return obj.text.length > 0
          })
        }
      } else {
        console.log(false)
        if (this.flag == 1) {
          return this.ratingsArr.filter(obj => {
            return obj.rateType === 0
          })
        } else if (this.flag == 2) {
          return this.ratingsArr.filter(obj => {
            return obj.rateType === 1
          })
        } else if (this.flag == 0) {
          return this.ratingsArr
        }
      }
    }
  },
  created() {
    this.ratingsArr = this.selectedFood.ratings
    this.posNum = this.ratingsArr.filter(obj => {
      return obj.rateType === 0
    }).length
    this.negNum = this.ratingsArr.filter(obj => {
      return obj.rateType === 1
    }).length
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.food, {
      click: true
    })
  },
  watch: {
    ratings() {
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return (date.getFullYear()) + "-" + (date.getMonth() + 1) + "-" + (date.getDate()) + " " + (date.getHours()) + ":" + (date.getMinutes()) + ":" + (date.getSeconds())
    }
  },
  props: ["selectedFood"],
  components: {
    ratingselect,
    carcontrol
  }
}
</script>
