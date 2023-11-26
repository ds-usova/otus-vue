<template>
  <b-container id="app" fluid>
    <Header/>
    <Page/>
    <Footer/>
  </b-container>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Page from "./components/Page.vue";
</script>

<style scoped>
</style>
