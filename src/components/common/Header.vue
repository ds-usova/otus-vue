<template>
  <b-navbar>
    <b-navbar-brand href="/">
      Homework #3
    </b-navbar-brand>
    <b-nav-form class="d-flex" v-if="renderSearch">
      <b-input-group class="mt-3">
        <b-form-input type="text"
                      placeholder="Search..."
                      v-model="search"
                      @keydown.enter="submitSearch">
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

<script setup lang="ts">
import {ref} from "vue";

interface Props {
  renderSearch?: boolean
}

interface Emits {
  (e: 'search-update', value: string)
}

const props = withDefaults(defineProps<Props>(), {
  renderSearch: false
})
const emits = defineEmits<Emits>()
const search = ref('')

function submitSearch() {
  emits('search-update', search.value)
}
</script>

<style scoped>

</style>