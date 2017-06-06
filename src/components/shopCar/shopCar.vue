<template lang="html">
    <div>
      <div class="shopcart">
        <div class="content">
          <div class="content-left">
            <div class="logo-wrapper" @click="showList($event)">
              <div class="logo" :class="{'highlight':sumCount}">
                <i class="icon-shopping_cart" :class="{'highlight':sumCount}"></i>
              </div>
              <div class="num" v-show="sumCount">{{sumCount}}</div>
            </div>
            <div class="price" :class="{'highlight':sumPrice}">￥{{sumPrice}}</div>
            <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
          </div>

          <div class="content-right" @click.stop.prevent="pay($event)">
            <div class="pay" :class="sumPrice - minPrice >= 0 ? 'enough' : 'not-enough'">{{payDesc}}</div>
          </div>
        </div>

        <transition name="fold">
          <div class="shopcart-list" v-show="flag && sumCount">
            <div class="list-header">
              <h1 class="title myStyle">购物车</h1>
              <span class="empty" @click="emptyCar($event)">清空</span>
            </div>
            <div class="list-content" ref="listContent">
              <ul>
                <li class="food" v-for="selectedFood in selectedFoods">
                  <span class="name">{{selectedFood.name}}</span>
                  <div class="price">
                    <span>￥{{selectedFood.price*selectedFood.count}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <carcontrol :food="selectedFood"></carcontrol>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
      <transition name="fade">
        <div class="list-mask" v-show="flag && sumCount" @click='hideCar($event)'></div>
      </transition>
    </div>
</template>

<script>
import carcontrol from '../carControl/carControl.vue'
import BScroll from 'better-scroll'
export default {
  props: {
    selectedFoods: {
      type: Array,
      default () {
        return [{
          price: 10,
          count: 1
        }]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      flag: false
    }
  },
  computed: {
    sumCount() {
      let num = 0
      this.selectedFoods.forEach(selectedFood => {
        num += selectedFood.count
      })
      return num
    },
    sumPrice() {
      let money = 0
      this.selectedFoods.forEach(selectedFood => {
        money += selectedFood.count * selectedFood.price
      })
      return money
    },
    payDesc() {
      if (this.sumPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.sumPrice < this.minPrice) {
        return `还差${this.minPrice - this.sumPrice}元起送`
      } else {
        return `去结算`
      }
    }
  },
  methods: {
    showList(event) {
      if (!event._constructed) {
        return
      }
      if (this.sumCount) {
        if (!this.flag) {
          this.flag = true
          this.$nextTick(() => {
            this.scroll.refresh()
          })
        } else {
          this.flag = false
        }
      }
    },
    hideCar(event) {
      if (!event._constructed) {
        return
      }
      this.flag = false
    },
    pay() {
      if (!event._constructed) {
        return
      }
      if (this.sumPrice < this.minPrice) {
        return
      } else {
        window.alert(`请支付${this.sumPrice + this.deliveryPrice}元`)
        // let obj = {}
        // obj.val = this.sumPrice + this.deliveryPrice + ''
        // this.$emit('showPayPage',obj)
        this.emptyCar()
      }
    },
    emptyCar() {
      if (!event._constructed) {
        return
      }
      this.selectedFoods.forEach(selectedFood => {
        selectedFood.count = 0
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.listContent,{
          bounceTime: 300
      })
    })
  },
  watch: {
    selectedFoods() {
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    sumCount() { //监听sumCount，若为0，则将flag复位false
      if (!this.sumCount) {
        this.flag = false
      }
    }
  },
  components: {
    carcontrol
  },
}
</script>
<style>
.goods .foods-wrapper .title.myStyle {
  padding-left: 0;
  line-height: 40px;
  border-left: none;
  color: #00a0dc !important;
}
</style>
