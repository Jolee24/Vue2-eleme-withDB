<template lang="html">

    <div class="ratings" ref="ratings">
        <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{xyz.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{xyz.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <v-star :size="36" :score="xyz.serviceScore"></v-star>
            <span class="score">{{xyz.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <v-star :size="36" :score="xyz.foodScore"></v-star>
            <span class="score">{{xyz.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{xyz.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <div class="split"></div>
      <ratingselect @selectPos="selectPos" @selectNeg="selectNeg" @selectAll="selectAll" @onlyContent="onlyContent" :posNum="posNum" :negNum="negNum" :status="status" :dvType="dvType"></ratingselect>

      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in filterArr" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <v-star :size="24" :score="rating.score"></v-star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
  </div>
  </div>
</template>

<script>
import star from "../star/star.vue"
// import data from "../../../data.json"
import BScroll from 'better-scroll'
import ratingselect from "../ratingSelect/ratingSelect.vue"
export default {
  data() {
    return {
      ratingsArr: [],
      posNum: '',
      negNum: '',
      status: true,
      flag: 0,
      dvType: ['全部', '满意', '不满意']
    }
  },
  watch: {
    filterArr() {
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  computed: {
    filterArr: function() {
      if (this.status) {
        console.log(true)
        if (this.flag == 1) {
          return this.ratingsArr.filter(obj => {
            return obj.score > 3
          }).filter(obj => {
            return obj.text.length > 0
          })
        } else if (this.flag == 2) {
          return this.ratingsArr.filter(obj => {
            return obj.score <= 3
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
            return obj.score > 3
          })
        } else if (this.flag == 2) {
          return this.ratingsArr.filter(obj => {
            return obj.score <= 3
          })
        } else if (this.flag == 0) {
          return this.ratingsArr
        }
      }
    }
  },
  methods: {
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
    }
  },
  created() {
    // this.ratingsArr = JSON.parse(JSON.stringify(data.ratings))
    this.$axios.get('/api/ratings').then(res => {
      this.ratingsArr = JSON.parse(JSON.stringify(res.data))
      this.posNum = this.ratingsArr.filter(obj => {
        return obj.score > 3
      }).length
      this.negNum = this.ratingsArr.filter(obj => {
        return obj.score <= 3
      }).length
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.ratings, {
          click: true
        })
      })
    }).catch(err => {
      console.log(err)
    })
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return (date.getFullYear()) + "-" + (date.getMonth() + 1) + "-" + (date.getDate()) + " " + (date.getHours()) + ":" + (date.getMinutes()) + ":" + (date.getSeconds())
    }
  },
  props: ['xyz'],
  components: {
    "v-star": star,
    ratingselect
  }
}
</script>
<style lang="css">
    /*.ratings {
        overflow-y: auto;
    }*/
</style>
