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
    <b-row class="mt-4" v-for="orderItem in orderItems">
      <b-col class="col-2">
        <img class="product-img" :src="orderItem.product.image" :alt="orderItem.product.title"/>
      </b-col>
      <b-col class="col-6">
        <span>{{ orderItem.product.title }}</span>
        <counter-input class="w-75 mt-2"
                       @minValueReached="updateShoppingCart"
                       v-model="orderItem.count"
                       :minValue="0"/>
      </b-col>
      <b-col class="col-4">
        <span>${{ orderItem.product.price }}</span>
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
import {computed} from "vue";
import CounterInput from "./CounterInput.vue";

const shoppingCart = useShoppingCartStore()
const orderItems = computed(() => shoppingCart.orderItems)
const emptyCart = computed(() => shoppingCart.orderItems.length == 0)
const router = useRouter()

function toCheckout() {
  router.push('/checkout')
}

function updateShoppingCart() {
  shoppingCart.deleteItemsWithZeroCount()
}
</script>

<style scoped>
.product-img {
  width: 100%;
  object-fit: scale-down;
}
</style>