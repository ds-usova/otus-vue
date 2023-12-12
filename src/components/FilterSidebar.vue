<template>
  <b-offcanvas v-model="showFiltersValue">
    <Slider id="priceRange" :min="minPrice" :step="1" :max="maxPrice" v-model="priceRange" range/>
    <p>Price: {{ priceRange }}</p>
  </b-offcanvas>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import productApiService from "../services/ProductApiService.ts";
import Slider from 'primevue/slider';

const props = defineProps({
  showFilters: {type: Boolean, required: true}
})

const showFiltersValue = computed(() => props.showFilters)
const minPrice = ref(productApiService.defaultMinPrice)
const maxPrice = ref(productApiService.defaultMaxPrice)
const priceRange = ref([minPrice, maxPrice])

onMounted(() => {
  productApiService.getMinPrice().then(it => minPrice.value = it)
  productApiService.getMaxPrice().then(it => maxPrice.value = it)
})

</script>

<style scoped>

</style>