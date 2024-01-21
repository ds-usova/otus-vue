<template>
  <b-card class="mb-2">
    <slot></slot>
    <b-card-body>
      <b-card-title>
        <router-link v-if="id" :to="{ name: 'product', params: { id: id }}">{{ title }}</router-link>
        <template v-else>
          {{ title }}
        </template>
      </b-card-title>
      <star-rating :value="rating" :max="maxRating" :reviewsCount="reviewsCount"/>
      <b-card-subtitle class="mt-0">${{ price }}</b-card-subtitle>
    </b-card-body>
  </b-card>
</template>

<script setup lang="ts">
import StarRating from "./common/StarRating.vue";

interface Props {
  id?: number
  title?: string
  rating?: number
  maxRating?: number
  reviewsCount?: number
  price?: number
}

withDefaults(defineProps<Props>(), {
  id: null,
  title: "Loading...",
  rating: 5,
  maxRating: 5,
  reviewsCount: 0,
  price: 999
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

a {
  text-decoration: none;
  color: inherit;
}
</style>