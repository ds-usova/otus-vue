<template>
  <b-row id="main-page" class="pt-0">
    <b-col class="col-3" v-for="(product, index) in products" :key="index">
      <b-card class="mb-2">
        <img class="card-img-top mb-3" :src="product.image" :alt="product.title"/>
        <b-card-body>
          <b-card-title>{{ product.title }}</b-card-title>
          <star-rating :value="product.rating.rate" :max="5" :reviews-count="product.rating.count" />
          <b-card-subtitle>${{ product.price }}</b-card-subtitle>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script setup lang="ts">
import axios from "axios";
import {ref} from "vue";
import {Product} from "../model/Product";
import StarRating from "./StarRating.vue";

const products = ref<Array<Product>>([])
const isLoading = ref(true)

axios.get<Array<Product>>('https://fakestoreapi.com/products')
    .then(response => products.value.push(...response.data))
    .catch(error => console.log("Error fetching product list: ", error))
    .finally(() => isLoading.value = false)
</script>

<style scoped>
.card {
  border-color: transparent
}

.card-title {
  color: rgb(120, 122, 120);
  text-align: start;
  font-size: 14px;
}

.card-subtitle {
  color: rgb(120, 122, 120);
  font-size: 12px;
}

.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: scale-down;
}
</style>