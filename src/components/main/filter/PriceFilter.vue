<template>
  <label>Price:</label>
  <b-input-group prepend="$" id="price">
    <b-form-input id="minPriceValue" @input="onInput" v-model="minPriceInput" :state="!v$.minPriceInput.$invalid"/>
    <b-form-input id="maxPriceValue" @input="onInput" v-model="maxPriceInput" :state="!v$.maxPriceInput.$invalid"/>
  </b-input-group>
</template>

<script setup lang="ts">
import {computed, onMounted, onUpdated, ref} from "vue";
import productApiService from "../../../services/ProductApiService";
import {between, numeric, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

interface Emits {
  (e: "filter", value: PriceFilters)
}

const emits = defineEmits<Emits>()

const minPrice = ref(productApiService.defaultMinPrice)
const maxPrice = ref(productApiService.defaultMaxPrice)

const minPriceInput = ref(productApiService.defaultMinPrice)
const maxPriceInput = ref(productApiService.defaultMaxPrice)

const rules = computed(() => ({
  minPriceInput: {
    required,
    numeric,
    between: between(minPrice, Math.min(maxPriceInput.value, maxPrice.value))
  },
  maxPriceInput: {
    required,
    numeric,
    between: between(Math.max(minPriceInput.value, minPrice.value), maxPrice.value)
  }
}))

const state = {minPriceInput, maxPriceInput}
let v$ = useVuelidate(rules, state)

onMounted(() => {
  productApiService.getMinPrice().then(it => {
    minPrice.value = it
    minPriceInput.value = it
  })
  productApiService.getMaxPrice().then(it => {
    maxPrice.value = it
    maxPriceInput.value = it
  })
})

function onInput() {
  emits('filter', {
    minPrice: minPriceInput.value,
    maxPrice: maxPriceInput.value,
    valid: !v$.value.$invalid
  })
}
</script>

<style scoped>

</style>