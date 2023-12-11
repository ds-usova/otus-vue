<template>
  <Header/>
  <ProductList/>
  <Footer/>
</template>

<script>
import ProductList from "../components/ProductList.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "MainPage",
  components: {ProductList, Header, Footer}
}
</script>

<style scoped>

</style>