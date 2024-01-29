<template>
  <b-container>
    <b-row>
      <Header/>
    </b-row>

    <b-row>
      <div class="d-flex justify-content-between">
        <div>
          <b-button variant="link" @click="toStore">Return to store</b-button>
        </div>
        <div>
          <b-button variant="link" @click="logout">Log out</b-button>
        </div>
      </div>
    </b-row>

    <b-row class="mt-5">
      <b-col class="text-center">
        <h5>Hello, {{ username }}!</h5>
        <span class="mt-3">You haven't placed any orders yet</span>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup lang="ts">
import {useUserDataStore} from "../store/userData";
import Header from "../components/common/Header.vue";
import {useRouter} from "vue-router";
import authService from "../services/service/AuthService";

const userDataStore = useUserDataStore()
const username = userDataStore.username

const router = useRouter()

function toStore() {
  router.push('/')
}

function logout() {
  authService.logout()
  router.push('/login')
}
</script>

<style scoped>
span {
  color: grey
}
</style>