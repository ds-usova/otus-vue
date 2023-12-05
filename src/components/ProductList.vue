<template>
  <Header :model-value="searchValue" @search-update="handleSearchInput"/>
  <b-container fluid>
    <b-row align-h="start">
      <b-col class="col-4" style="text-align: start; margin-left: 25px;">
        <b-button @click="showOrHideFilters" id="filter" variant="link" style="text-decoration: none">
          <font-awesome-icon class="fa-xs" icon="filter"/>
          <span style="margin-left: 5px">Filter</span>
        </b-button>
      </b-col>
    </b-row>

    <div v-if="isLoading">
      <b-row class="pt-0" cols="4">
        <b-col v-for="i in 12">
          <product-card>
            <b-spinner type="grow"></b-spinner>
          </product-card>
        </b-col>
      </b-row>
    </div>

    <div v-if="!isLoading">
      <b-row class="pt-0" cols="4">
        <b-col v-for="(product, index) in filteredProducts" :key="index">
          <product-card :title="product.title"
                        :rating="product.rating.rate"
                        :ratingMax="5"
                        :reviews-count="product.rating.count"
                        :price="product.price">
            <img class="card-img-top mb-3" :src="product.image" :alt="product.title"/>
          </product-card>
        </b-col>
      </b-row>
    </div>
  </b-container>
  <Footer/>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Product} from "../model/Product";

import ProductCard from "./ProductCard.vue";
import productApiService from "../services/ProductApiService";

const products = Array<Product>()
const filteredProducts = ref(Array<Product>())
const isLoading = ref(true)
const searchValue = ref('')
const showFilters = ref(false)

onMounted(() => {
  productApiService.getProducts()
      .then(data => {
        products.push(...data)
        initProductsWith(data)
      })
          .catch(error => console.log("Error fetching product list: ", error))
          .finally(() => isLoading.value = false)
    }
)

function initProductsWith(data) {
  filteredProducts.value.length = 0
  filteredProducts.value.push(...data)
}

function handleSearchInput(newSearchValue) {
  const newProductList = products.filter((product) => product.title.toLowerCase().includes(newSearchValue))
  initProductsWith(newProductList)
}

function showOrHideFilters() {
  showFilters.value = !showFilters.value
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

#filter {
  text-decoration: none;
}
</style>