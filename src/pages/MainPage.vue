<template>
  <div>
    <b-container>
      <Header :model-value="search" @search-update="handleSearchInput"/>
      <b-row align-h="start">
        <b-col class="col-12" style="text-align: start; margin-left: 25px;">
          <div> <!-- todo: make a component out of this button -->
            <b-button @click="showOrHideFilters" variant="link" style="text-decoration: none">
              <font-awesome-icon class="fa-xs" icon="filter"/>
              <span style="margin-left: 5px">Filter</span>
            </b-button>
            <FilterSidebar :show-filters="showFilters"/>
          </div>
        </b-col>
      </b-row>
      <b-row class="pt-0" cols="4">
        <ProductList :product-name-filter="search"/>
      </b-row>
      <Footer/>
    </b-container>
  </div>
</template>

<script setup lang="ts">
import ProductList from "../components/ProductList.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import {ref} from "vue";
import FilterSidebar from "../components/FilterSidebar.vue";

const search = ref('')
const showFilters = ref(false)

function handleSearchInput(newSearchValue: String) {
  search.value = newSearchValue
}

function showOrHideFilters() {
  showFilters.value = !showFilters.value
}
</script>

<style scoped>

</style>