<template>
  <b-col v-if="isLoading" v-for="i in 12">
    <product-card>
      <b-spinner type="grow"></b-spinner>
    </product-card>
  </b-col>

  <b-col v-if="!isLoading" v-for="(product, index) in filteredProducts" :key="index">
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
import {computed, onMounted, onUpdated, ref} from "vue";
import {Product} from "../model/Product";

import ProductCard from "./ProductCard.vue";
import productApiService from "../services/ProductApiService";

const props = defineProps({
  productNameFilter: {type: String, required: true}
})

const products = Array<Product>()
const filteredProducts = ref(Array<Product>())
const isLoading = ref(true)
const searchValue = computed(() => props.productNameFilter)

onMounted(() => {
      productApiService.getProducts()
          .then(data => {
            products.push(...data)
            initProductsWith(data)
            handleSearchInput()
          })
          .catch(error => console.log("Error fetching product list: ", error))
          .finally(() => isLoading.value = false)
    }
)

onUpdated(() => {
  handleSearchInput()
})

function handleSearchInput() {
  const searchFilter = searchValue.value
  const newProductList = searchFilter.length == 0 ? products : products.filter(p => p.title.toLowerCase().includes(searchFilter))
  initProductsWith(newProductList)
}

function initProductsWith(data) {
  filteredProducts.value.length = 0
  filteredProducts.value.push(...data)
}
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