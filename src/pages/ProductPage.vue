<template>
  <div>
    <b-container>
      <Header/>
      <b-row class="mt-1" v-if="added">
        <b-alert variant="success" :model-value="true">Success</b-alert>
      </b-row>
      <b-row class="mt-5" v-if="loaded">
        <b-col class="col-5">
          <img class="product-img" :src="product.image" :alt="product.title"/>
        </b-col>
        <b-col class="col-7">
          <h3>{{ product.title }}</h3>
          <p>${{ product.price }}</p>
          <star-rating :value="product.rating.rate" :max="5" :reviewsCount="product.rating.count"/>
          <p>{{ product.description }}</p>

          <b-button @click="addToCart">Add to cart</b-button>
        </b-col>

      </b-row>
      <b-row v-else>
        <b-col class="col-12 d-flex justify-content-center">
          <b-spinner></b-spinner>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import productApi from "../services/api/ProductApi";
import StarRating from "../components/common/StarRating.vue";
import Header from "../components/common/Header.vue";
import {useShoppingCartStore} from "../store/schoppintCart";

const route = useRoute()
const id = String(route.params.id)
const product = ref({})
const loaded = ref(false)
const added = ref(false)
const shoppingCartStore = useShoppingCartStore()

onMounted(() => {
  product.value = productApi.getProduct(id)
      .then(data => product.value = data)
      .finally(() => loaded.value = true)
})

function addToCart() {
  shoppingCartStore.addProduct(product.value)
  added.value = true
}
</script>

<style scoped>
.product-img {
  width: 80%;
}

p {
  color: grey;
}
</style>