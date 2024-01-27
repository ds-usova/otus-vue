<template>
  <div>
    <b-container>
      <Header @search-update="handleSearchInput" render-search="true" />
      <b-row align-h="start">
        <b-col class="col-12" style="text-align: start; margin-left: 25px;">
          <div>
            <b-button @click="showFilters" variant="link" style="text-decoration: none">
              <font-awesome-icon class="fa-xs" icon="filter"/>
              <span style="margin-left: 5px">Filter</span>
            </b-button>
            <b-offcanvas v-model="filtersVisible">
              <filter-sidebar @filter="filterProducts"/>
            </b-offcanvas>
          </div>
        </b-col>
      </b-row>
      <b-row class="pt-0" cols="4">
        <product-list :isLoading="isLoading" :products="products"/>
      </b-row>
      <Footer/>
    </b-container>
  </div>
</template>

<script setup lang="ts">
import ProductList from "../components/ProductList.vue";
import Header from "../components/common/Header.vue";
import Footer from "../components/common/Footer.vue";
import {onMounted, ref} from "vue";
import FilterSidebar from "../components/main/filter/FilterSidebar.vue";
import productApi from "../services/api/ProductApi";
import {Product} from "../model/Product";

const filtersVisible = ref(false)
const filters = ref({})
const products = ref(Array<Product>())
const isLoading = ref(true)

onMounted(() => readProducts())

function handleSearchInput(newSearchValue: String) {
  filters.value= {
    nameFilter: newSearchValue
  }
  readProducts()
}

function readProducts() {
  isLoading.value = true
  productApi.getFilteredProducts(filters.value)
      .then(data => initProductsWith(data))
      .catch(error => console.log("Error fetching product list: ", error))
      .finally(() => isLoading.value = false)
}

function initProductsWith(data) {
  products.value.length = 0
  products.value.push(...data)
}

function showFilters() {
  filtersVisible.value = true
}

function hideFilters() {
  filtersVisible.value = false
}

function filterProducts(updatedFilters: Filters) {
  const nameFilter = filters.value.nameFilter
  filters.value = updatedFilters
  filters.value.nameFilter = nameFilter
  hideFilters()
  readProducts()
}
</script>

<style scoped>

</style>