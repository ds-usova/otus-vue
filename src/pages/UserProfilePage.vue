<template>
  <b-container>
    <b-row>
      <Header/>
    </b-row>
    <b-row class="text-center mt-5">
      <h5>Hello, {{ username }}!</h5>
    </b-row>
  </b-container>
</template>

<script setup lang="ts">
import {useUserDataStore} from "../store/userData";
import Header from "../components/common/Header.vue";

const userDataStore = useUserDataStore()
const username = userDataStore.username
</script>

<style scoped>

</style>