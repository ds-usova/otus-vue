<template>
  <b-container>
    <b-row id="header" align-h="end">
      <b-col class="col-3">
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
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup>
const props = defineProps(['modelValue'])
</script>

<style scoped>

</style>