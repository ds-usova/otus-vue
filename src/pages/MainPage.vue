<template>
  <Header :model-value="search" @search-update="handleSearchInput" />
  <ProductList :product-name-filter="search"/>
  <Footer/>
</template>

<script setup lang="ts">
import ProductList from "../components/ProductList.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import {ref} from "vue";

const search = ref('')

function handleSearchInput(newSearchValue: String) {
  search.value = newSearchValue
}
</script>

<style scoped>

</style>