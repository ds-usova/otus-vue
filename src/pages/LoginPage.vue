<template>
  <b-container>
    <b-row>
      <Header/>
    </b-row>
    <b-row class="text-center mt-5">
      <h5>Login</h5>
    </b-row>
    <b-row class="d-flex flex-column align-items-center mt-3">
      <login-form @submit="login" class="col-5"/>
    </b-row>
  </b-container>
</template>

<script setup lang="ts">
import Header from "../components/common/Header.vue";
import authService from "../services/service/AuthService";
import LoginForm from "../components/auth/LoginForm.vue";
import {User} from "../model/User";
import {useRouter} from "vue-router";

const router = useRouter()

function login(user: User) {
  authService.login(user)
  router.push('/')
}
</script>

<style scoped>

</style>