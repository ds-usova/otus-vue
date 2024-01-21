<template>
  <b-offcanvas v-model="showFiltersValue">
    <b-form @submit.prevent="submitForm" @keyup.enter="submitForm">
      <label>Price:</label>
      <b-input-group prepend="$" id="price">
        <b-form-input id="minPrice" v-model="minPrice"/>
        <b-form-input id="maxPrice" v-model="maxPrice"/>
      </b-input-group>
    </b-form>
  </b-offcanvas>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import productApiService from "../services/ProductApiService.ts";

const props = defineProps({
  showFilters: {type: Boolean, required: true}
})

const showFiltersValue = computed(() => props.showFilters)
const minPrice = ref(productApiService.defaultMinPrice)
const maxPrice = ref(productApiService.defaultMaxPrice)

onMounted(() => {
  productApiService.getMinPrice().then(it => minPrice.value = it)
  productApiService.getMaxPrice().then(it => maxPrice.value = it)
})

function submitForm() {
  this.$emit('filter', {
    minPrice: minPrice.value,
    maxPrice: maxPrice.value
  })

  console.log(minPrice.value)
}

</script>

<style scoped>

</style>