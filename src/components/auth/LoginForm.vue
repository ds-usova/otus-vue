<template>
  <b-form @submit="submit">
    <b-input-group>
      <b-form-input type="text"
                    placeholder="Username"
                    :state="!v$.username.$invalid"
                    v-model="username">
      </b-form-input>
    </b-input-group>

    <b-input-group class="mt-2">
      <b-form-input type="password"
                    placeholder="Password"
                    :state="!v$.password.$invalid"
                    v-model="password">
      </b-form-input>
    </b-input-group>

    <b-button type="submit" class="w-100 mt-2" :disabled="v$.$invalid" variant="outline-dark">
      Sign in
    </b-button>
  </b-form>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {User} from "../../model/User";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

interface Emits {
  (e: 'submit', value: User)
}

const emits = defineEmits<Emits>()

const username = ref('')
const password = ref('')

const state = {username, password}
const rules = {
  username: {required},
  password: {required}
}

let v$ = useVuelidate(rules, state)

function submit() {
  emits('submit', new User(username.value, password.value))
}
</script>

<style scoped>

</style>