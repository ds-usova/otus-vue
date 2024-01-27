<template>
  <b-form @submit="submit">
    <h5>Add new product</h5>
    <b-form-group class="mt-2">
      <b-form-input
          id="title"
          v-model="title"
          type="text"
          placeholder="Title"
          :state="!v$.title.$invalid"/>
    </b-form-group>

    <b-form-group class="mt-2">
      <b-form-input
          id="description"
          v-model="description"
          type="text"
          placeholder="Description"
          :state="!v$.description.$invalid"/>
    </b-form-group>

    <b-row class="mt-2">
      <div class="col-6">
        <b-form-input
            id="price"
            type="number"
            v-model="price"
            placeholder="Price"
            :state="!v$.price.$invalid"
        />
      </div>

      <div class="col-6">
        <b-form-input
            id="category"
            type="text"
            v-model="category"
            placeholder="Category"
            :state="!v$.category.$invalid"
        />
      </div>
    </b-row>

    <b-form-group class="mt-2">
      <b-form-input
          id="imageLink"
          v-model="imageLink"
          type="text"
          placeholder="Image"
          :state="!v$.imageLink.$invalid"/>
    </b-form-group>

    <b-button type="submit" class="w-100 mt-2" :disabled="v$.$invalid" variant="outline-dark">
      Add new product
    </b-button>
  </b-form>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {minValue, numeric, required, url} from "@vuelidate/validators/dist/index";
import useVuelidate from "@vuelidate/core/dist/index";
import {Product} from "../../model/Product";

interface Emits {
  (e: 'submit', product: Product)
}

const emits = defineEmits<Emits>()

const title = ref('')
const description = ref('')
const price = ref(null)
const category = ref('')
const imageLink = ref('')

const state = {title, price, description, category, imageLink}
const rules = {
  title: {required},
  description: {required},
  price: {required, numeric, minValue: minValue(0)},
  category: {required},
  imageLink: {required, url}
}
const v$ = useVuelidate(rules, state)

function submit() {
  emits('submit', new Product(0, title.value, price.value,
      description.value, category.value,
      imageLink.value,
      {rate: 0, count: 0}
  ))
}
</script>

<style scoped>

</style>