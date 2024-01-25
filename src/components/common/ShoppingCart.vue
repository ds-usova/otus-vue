<template>
  <b-container v-if="emptyCart">
    <b-row>
      <span>Your shopping cart is empty</span>
    </b-row>
  </b-container>

  <b-container v-else>
    <b-row>
      <span>Shopping cart</span>
    </b-row>
    <b-row class="mt-4" v-for="product in products">
      <b-col class="col-3">
        <img class="product-img" :src="product.image" :alt="product.title"/>
      </b-col>
      <b-col class="col-7">
        <span>{{ product.title }}</span>
      </b-col>
      <b-col class="col-2">
        <span>${{ product.price }}</span>
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-button @click="toCheckout" class="w-100" variant="outline-secondary">Check out</b-button>
    </b-row>
  </b-container>
</template>

<script setup lang="ts">
import {useShoppingCartStore} from "../../store/schoppintCart";
import {useRouter} from "vue-router";
import {computed, ref} from "vue";

const shoppingCart = useShoppingCartStore()
const products = ref(shoppingCart.products)
const emptyCart = computed(() => products.value.length == 0)
const router = useRouter()

function toCheckout() {
  router.push('/checkout')
}
</script>

<style scoped>
.product-img {
  width: 100%;
  object-fit: scale-down;
}
</style>