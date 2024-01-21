<template>
  <b-form @submit.prevent="submitForm" @keyup.enter="submitForm">
    <b-row>
      <price-filter @filter="price"/>
    </b-row>
    <b-row class="mt-2 text-center">
      <b-col>
        <b-button @click="submitForm" :disabled="!valid" class="w-100" variant="outline-secondary">Filter</b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script setup lang="ts">
import PriceFilter from "./PriceFilter.vue";
import {ref} from "vue";

interface Emits {
  (e: "filter", value: Filters)
}

const emits = defineEmits<Emits>()
const priceFilter = ref({})
const valid = ref(true)

function price(filter: PriceFilters) {
  priceFilter.value = filter
  valid.value = valid.value && filter.valid
}

function submitForm() {
  console.log('submit')
  console.log(filter())
  emits('filter', filter())
}

function filter() {
  return {
    priceFilter: priceFilter.value
  }
}
</script>

<style scoped>

</style>