<template>
  <b-navbar class="mt-2">
    <b-navbar-brand href="/">
      Homework #3
    </b-navbar-brand>
    <div class="d-flex justify-content-end">
      <b-nav-form v-if="renderSearch">
        <b-input-group>
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
      <b-navbar-nav class="p-1">
        <b-button variant="light" class="position-relative pl-2">
          <font-awesome-icon class="fa-xs mr-1" icon="shopping-cart"/>
          <b-badge variant="dark" text-indicator>{{ itemCount }}</b-badge>
        </b-button>
      </b-navbar-nav>
    </div>
  </b-navbar>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useShoppingCartStore} from "../../store/schoppintCart";

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
const shoppingCartStore = useShoppingCartStore()
const itemCount = computed(() => shoppingCartStore.getProductCount())

function submitSearch() {
  emits('search-update', search.value)
}
</script>

<style scoped>

</style>