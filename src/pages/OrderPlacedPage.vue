<template>
  <b-container>
    <b-row>
      <Header/>
    </b-row>
    <b-row>
      <div class="d-flex justify-content-center col-12">
        <h2>Thank you!</h2>
      </div>
    </b-row>

    <b-row class="d-flex justify-content-center mt-2">
      <b-col class="col-5">
        <p>
          We are getting started on your order right away, and you will receive an order confirmation email shortly.
          In the meantime, explore the latest fashion and get inspired by new trends.
        </p>
      </b-col>
    </b-row>

    <b-row class="d-flex justify-content-center">
      <b-col class="col-5">
        <b-button class="w-100" variant="dark" @click="toMainPage">
          Home
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup lang="ts">
import Header from "../components/common/Header.vue";
import {useRouter} from "vue-router";

const router = useRouter()

function toMainPage() {
  router.push('/')
}
</script>

<style scoped>

</style>