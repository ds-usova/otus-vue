<template>
  <b-input-group>
    <template #prepend>
      <b-button @click="decrement()" variant="light" :disabled="minValueReached">-</b-button>
    </template>
    <b-form-input v-model="input" disabled/>
    <template #append>
      <b-button @click="increment()" variant="light" :disabled="maxValueReached">+</b-button>
    </template>
  </b-input-group>
</template>

<script setup lang="ts">
import {computed, defineModel} from "vue";

interface Emits {
  (e: 'minValueReached', value: number)
  (e: 'maxValueReached', value: number)
}

interface Props {
  minValue?: number,
  maxValue?: number
}

const emits = defineEmits<Emits>()
const props = defineProps<Props>()

const input = defineModel({required: true})

const minValueReached = computed(() => input.value == props.minValue)
const maxValueReached = computed(() => input.value == props.maxValue)

function decrement() {
  const newValue = input.value - 1
  input.value = newValue
  if (newValue == props.minValue) {
    emits('minValueReached')
  }
}

function increment() {
  const newValue = input.value + 1
  input.value = newValue
  if (newValue == props.maxValue) {
    emits('maxValueReached')
  }
}
</script>

<style scoped>

</style>