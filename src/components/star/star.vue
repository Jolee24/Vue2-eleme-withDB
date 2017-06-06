<template>
  <div class="star" :class="starType">
    <span v-for="item in itemClasses" :class="item" class="star-item"></span>
  </div>
</template>

<script>
  const starNumber = 5                  // 设定最高评星数量
  const starAll = 'on'
  const starHalf = 'half'
  const starGray = 'off'

  export default {
    props: ['size', 'score'],           // 此处size的值与score的值从父元素header.vue中传入
    computed: {
      starType () {                     // 调用该函数返回一个'star-48'的class
        return 'star-' + this.size
      },
      itemClasses () {                 // 调用该函数之后返回的是一个数组
        let result = []
        let score = Math.floor(this.score * 2) / 2      // 假如得分为4.8，floor之后为4.5
        for (let i = 0; i < Math.floor(score); i++) {   // 取整星
          result.push(starAll)
        }
        if (score % 1 !== 0) {                          // 取半星
          result.push(starHalf)
        }
        while (result.length < starNumber) {            // 如果评分不够5星，加上灰色星补齐5颗星
          result.push(starGray)
        }
        return result
      }
    }
  }
</script>
