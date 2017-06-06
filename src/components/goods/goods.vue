<template lang="html">
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" @click="clickMenu(index,$event)" :class="{'current':currentIndex==index}">
          <span class="text border-1px">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food,$event)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <carcontrol :food="food"></carcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <shopcart :deliveryPrice="xyz.deliveryPrice" :minPrice="xyz.minPrice" :selectedFoods="selectedFoods" ref="shopcart"></shopcart>
      </div>
     <food :selectedFood="selectedFood" v-if="showOrHide" @showOrHide="showOrHide = false"></food>

     <!-- <div class="pay-page" v-show='true'>
         <div class="pay-page-content">
             <p>请支付{{payPrice}}元</p>
         </div>
         <div class="list-mask"></div>
     </div> -->
    </div>

</template>

<script>
// import data from "../../../data.json"
import BScroll from 'better-scroll'
import food from './food.vue'
import carcontrol from '../carControl/carControl.vue'
import shopcart from "../shopCar/shopCar.vue"
import store from '../../store/'
export default {
  props: ["xyz"],
  data() {
    return {
      goods: [],
      classMap: this.$store.state.classMap,
      scrollY: 0,
      listHeight: [],
      selectedFood: {},
      showOrHide: false,
      payPrice: 0
    }
  },
  computed: {
    selectedFoods() {
      let selectedFoods = []
      this.goods.forEach(item => {
        item.foods.forEach(food => {
          if (food.count) {
            selectedFoods.push(food)
          }
        })
      })
      return selectedFoods
    },
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1] //i+1超过最后一个索引会得到undefined
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  },
  methods: {
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true,
        bounceTime: 300
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        bounceTime: 300,
        probeType: 3 //设置该值之后才能进行scroll事件监听
      })
      this.foodsScroll.on('scroll', (pos) => { //监听右侧食物栏滚动事件，并记录值=>触发computed中的currentIndex属性
        this.scrollY = Math.abs(Math.round(pos.y))
        // console.log(this.scrollY)
      })
    },
    calculateHeight() {
      let height = 0
      this.listHeight.push(height)
      for (let i = 0, foodList = this.$refs.foodList; i < foodList.length; i++) {
        height += foodList[i].clientHeight //clientHeight为js原生属性
        this.listHeight.push(height)
      }
    },
    clickMenu(index, event) {
      if (!event._constructed) {
        return
      }
      this.foodsScroll.scrollToElement(this.$refs.foodList[index])
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = food //浅复制，只复制指针，指向同一片内存地址
      this.showOrHide = true
    },
    // showPayPage(obj) {
    //   this.payPrice = obj.val
    // }
  },
  created() {
    // this.goods = JSON.parse(JSON.stringify(data.goods))
    this.$axios.get('/api/goods').then(res => {
      this.goods = JSON.parse(JSON.stringify(res.data))
      this.$nextTick(() => {
        this.initScroll()
        this.calculateHeight()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  components: {
    food,
    carcontrol,
    shopcart
  },
  store
}
</script>
<style lang="css">
    /*.menu-wrapper {
        overflow-y:auto;
        overflow-x:hidden;
    }
    .foods-wrapper {
        overflow-y: auto;
    }*/
    /*支付跳转界面css*/
    /*.pay-page {
        position:absolute;
        left: 18%;
        top: 30%;
        width: 60%;
        height:100px;
        border: 1px solid #ff0000;
        margin: 0 auto;
        z-index: 999;
        background: lightgrey;
        }
    .pay-page-content {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        }*/
</style>
