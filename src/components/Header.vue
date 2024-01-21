<template>
  <b-navbar>
    <b-navbar-brand href="/">
      Homework #3
    </b-navbar-brand>
    <b-nav-form class="d-flex">
      <b-input-group class="mt-3">
        <b-form-input type="text" placeholder="Search..." :value="props.modelValue"
                      @keydown.enter="$emit('search-update', $event.target.value)">
        </b-form-input>
        <template #prepend>
          <b-input-group-text>
            <font-awesome-icon icon="magnifying-glass"/>
          </b-input-group-text>
        </template>
      </b-input-group>
    </b-nav-form>
  </b-navbar>
</template>

<script setup>
const props = defineProps(['modelValue'])
</script>

<style scoped>

</style>