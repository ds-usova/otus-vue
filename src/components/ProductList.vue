<template>
  <b-row class="pt-0">
    <b-col v-if="isLoading" class="col-3" v-for="n in 12">
      <product-card>
        <b-spinner type="grow"></b-spinner>
      </product-card>
    </b-col>

    <b-col v-if="!isLoading" class="col-3" v-for="(product, index) in products" :key="index">
      <product-card :title="product.title"
                    :rating="product.rating.rate"
                    :ratingMax="5"
                    :reviews-count="product.rating.count"
                    :price="product.price">
        <img class="card-img-top mb-3" :src="product.image" :alt="product.title"/>
      </product-card>
    </b-col>
  </b-row>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Product} from "../model/Product";

import ProductCard from "./ProductCard.vue";
import productApiService from "../services/ProductApiService";

const products = ref<Array<Product>>([])
const isLoading = ref(true)

onMounted(() => {
  productApiService.getProducts()
          .then(data => products.value.push(...data))
          .catch(error => console.log("Error fetching product list: ", error))
          .finally(() => isLoading.value = false)
    }
)
</script>

<style scoped>
.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: scale-down;
}
</style>