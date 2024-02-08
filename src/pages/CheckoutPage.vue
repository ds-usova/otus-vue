<template>
  <b-container>
    <b-row>
      <Header :renderShoppingCart="false" />
    </b-row>
    <b-row>
      <div class="col-12" ref="errorBanner">
        <b-alert variant="danger" :model-value="orderSent && !success">
          Sorry, we are currently unable to process your order. Please try again later. If the issue persists, contact
          our customer support for assistance. We apologize for any inconvenience.
        </b-alert>
      </div>
    </b-row>
    <b-row>
      <div class="col-7">
        <create-order-form @submit="sendOrder"/>
      </div>

      <div class="col-5">
        <h5>Your cart</h5>
        <b-card no-body>
          <b-list-group flush>
            <b-list-group-item v-for="orderItem in orderItems" class="d-flex justify-content-between align-items-center">
              {{ orderItem.product.title }} <span>{{ orderItem.count }} x ${{ orderItem.product.price }}</span>
            </b-list-group-item>
          </b-list-group>

          <b-card-body class="d-flex justify-content-between align-items-center">
            Total <span>${{ total }}</span>
          </b-card-body>
        </b-card>
      </div>
    </b-row>
  </b-container>
</template>

<script setup lang="ts">
import Header from "../components/common/Header.vue";
import {ref} from "vue";
import {useShoppingCartStore} from "../store/schoppintCart";
import orderService from "../services/service/OrderService";
import {useRouter} from "vue-router";
import {Order} from "../model/Order";
import CreateOrderForm from "../components/order/CreateOrderForm.vue";

const shoppingCartStore = useShoppingCartStore()

const orderItems = shoppingCartStore.orderItems
const total = shoppingCartStore.getTotal()

const orderSent = ref(false)
const success = ref(false)

const router = useRouter()

const errorBanner = ref(null)

function sendOrder(order: Order) {
  orderSent.value = true
  success.value = orderService.sendOrder(order)
  if (success.value) {
    router.push('success')
  } else {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}
</script>

<style scoped>

</style>