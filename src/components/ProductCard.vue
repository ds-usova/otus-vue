<template>
  <b-card class="mb-2">
    <slot></slot>
    <b-card-body>
      <b-card-title>{{props.title}}</b-card-title>
      <star-rating :value="props.rating" :max="props.maxRating" :reviews-count="props.reviewsCount" />
      <b-card-subtitle class="mt-0">${{props.price}}</b-card-subtitle>
    </b-card-body>
  </b-card>
</template>

<script setup>
import StarRating from "./StarRating.vue";

const props = defineProps({
  title: {
    type: String,
    default : 'Loading...'
  },
  rating: {
    type: Number,
    default: 5
  },
  maxRating: {
    type: Number,
    default: 5
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 999
  }
})
</script>

<style scoped>
.card {
  border-color: transparent;
  padding: 15px;
}

.card-body {
  padding: 10px;
}

.card-title, .card-subtitle {
  color: rgb(120, 122, 120);
  font-size: 14px;
  text-align: start;
}
</style>