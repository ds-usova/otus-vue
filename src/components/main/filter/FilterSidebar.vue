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
import {computed, ref} from "vue";

interface Emits {
  (e: "filter", value: Filters)
}

const emits = defineEmits<Emits>()
const priceFilter = ref({valid: true})
const valid = computed(() => priceFilter.value.valid)

function price(filter: PriceFilters) {
  priceFilter.value = filter
}

function submitForm() {
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