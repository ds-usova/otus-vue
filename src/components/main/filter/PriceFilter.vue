<template>
  <label>Price:</label>
  <b-input-group prepend="$" id="price">
    <b-form-input id="minPriceValue" @input="onInput" v-model="minPriceInput" :state="!v$.minPriceInput.$invalid"/>
    <b-form-input id="maxPriceValue" @input="onInput" v-model="maxPriceInput" :state="!v$.maxPriceInput.$invalid"/>
  </b-input-group>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import productApi from "../../../services/api/ProductApiService";
import {between, numeric, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import productService from "../../../services/service/ProductService";

interface Emits {
  (e: "filter", value: PriceFilters)
}

const emits = defineEmits<Emits>()

const minPrice = ref(productService.defaultMinPrice)
const maxPrice = ref(productService.defaultMaxPrice)

const minPriceInput = ref(productService.defaultMinPrice)
const maxPriceInput = ref(productService.defaultMaxPrice)

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
  productApi.getMinPrice().then(it => {
    minPrice.value = it
    minPriceInput.value = it
  })
  productApi.getMaxPrice().then(it => {
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