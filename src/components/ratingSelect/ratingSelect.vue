<template lang="html">
    <div class="ratingselect">
      <div class="rating-type border-1px">
        <span class="block positive" @click="selectAll">{{dvType[0]}}<span class="count">{{parseInt(this.posNum) + parseInt(this.negNum) + ''}}</span></span>
        <span class="block positive" @click="selectPos">{{dvType[1]}}<span class="count">{{posNum}}</span></span>
        <span class="block negative" @click="selectNeg">{{dvType[2]}}<span class="count">{{negNum}}</span></span>
    </div>
    <div class="switch" @click="onlyContent($event)" :class="{'on':status}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
    </div>
</template>

<script>
export default {
  props: ["posNum", "negNum", "status", 'dvType'],
  methods: {
    selectPos() {
      this.$emit('selectPos')
    },
    selectNeg() {
      this.$emit('selectNeg')
    },
    selectAll() {
      this.$emit('selectAll')
    },
    onlyContent() {
      if (!event._constructed) {
        return
      }
      this.$emit('onlyContent')
    }
  }
}
</script>
<style lang="css">
</style>
