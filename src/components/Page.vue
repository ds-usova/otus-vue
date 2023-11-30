<template>
  <Header :model-value="searchValue" @search-update="handleSearchInput"/>
    <b-row id="main-page" class="pt-0">
      <b-col v-if="isLoading" class="col-3" v-for="n in 12">
        <product-card>
          <b-spinner type="grow"></b-spinner>
        </product-card>
      </b-col>
      <b-col v-if="!isLoading" class="col-3" v-for="(product, index) in filteredProducts" :key="index">
        <product-card :title="product.title"
                      :rating="product.rating.rate"
                      :ratingMax="5"
                      :reviews-count="product.rating.count"
                      :price="product.price">
          <img class="card-img-top mb-3" :src="product.image" :alt="product.title"/>
        </product-card>
      </b-col>
    </b-row>
  <Footer/>
</template>

<script setup lang="ts">
import axios from "axios";
import {onMounted, ref} from "vue";
import {Product} from "../model/Product";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import ProductCard from "./ProductCard.vue";

const products = Array<Product>()
const filteredProducts = ref(Array<Product>())
const isLoading = ref(true)
const searchValue = ref('')

const handleSearchInput = (newSearchValue) => {
  filteredProducts.value.length = 0
  filteredProducts.value.push(...products.filter((product) => product.title.toLowerCase().includes(newSearchValue)))
}

onMounted(() => {
      axios.get<Array<Product>>('https://fakestoreapi.com/products')
          .then(response => {
            products.push(...response.data)
            filteredProducts.value.push(...products)
          })
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