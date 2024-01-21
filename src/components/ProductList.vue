<template>
  <b-col v-if="isLoading" v-for="i in 12">
    <product-card>
      <b-spinner type="grow"></b-spinner>
    </product-card>
  </b-col>

  <b-col v-if="!isLoading" v-for="(product, index) in products" :key="index">
    <product-card :title="product.title"
                  :rating="product.rating.rate"
                  :ratingMax="5"
                  :reviews-count="product.rating.count"
                  :price="product.price">
      <img class="card-img-top mb-3" :src="product.image" :alt="product.title"/>
    </product-card>
  </b-col>
</template>

<script setup lang="ts">
import {Product} from "../model/Product";
import ProductCard from "./ProductCard.vue";

interface Props {
  isLoading: boolean
  products: Array<Product>
}

const props = defineProps<Props>()
</script>

<style scoped>
span, button {
  color: rgb(120, 122, 120);
}

.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: scale-down;
}
</style>