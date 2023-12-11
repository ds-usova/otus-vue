<template>
  <div>
    <font-awesome-icon class="fa-xs" v-for="n in fullStarsCount" icon="star" />
    <font-awesome-icon class="fa-xs" v-if="hasHalfStar" :icon="['fas', 'star-half']" />
    <font-awesome-icon class="fa-xs" v-for="n in emptyStarCount" :icon="[ 'far', 'star' ]" />
    <span class="align-text-top">{{props.reviewsCount}} reviews</span>
  </div>
</template>

<script setup>
const props = defineProps(['value', 'max', 'reviewsCount'])

const fullStarsCount = Math.floor(props.value)
const hasHalfStar = (props.value - fullStarsCount) > 0.5
const emptyStarCount = props.max - fullStarsCount - (hasHalfStar ? 1 : 0)
</script>

<style scoped>
span {
  font-size: 13px;
  margin-left: 5px;
  color: rgb(120, 122, 120);
}

div {
  text-align: left;
}
</style>