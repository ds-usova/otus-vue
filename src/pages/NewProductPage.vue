<template>
  <b-container>
    <b-row>
      <Header/>
    </b-row>
    <b-row>
      <div class="col-7">
        <add-product-form @submit="addNewProduct" />
      </div>
    </b-row>
  </b-container>
</template>

<script setup lang="ts">
import Header from "../components/common/Header.vue";
import {useRouter} from "vue-router";
import {Product} from "../model/Product";
import productApi from "../services/api/ProductApi";
import AddProductForm from "../components/product/AddProductForm.vue";

const router = useRouter()

function addNewProduct(product: Product) {
  productApi.add(product)
  router.push('/')
}

</script>

<style scoped>

</style>