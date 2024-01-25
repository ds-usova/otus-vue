<template>
  <b-container>
    <b-row>
      <Header/>
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
        <b-form @submit="sendOrder">
          <h5>Contact</h5>
          <b-form-group class="mt-2"
                        description="We'll never share your email with anyone else.">
            <b-form-input
                id="email"
                v-model="emailAddress"
                type="email"
                placeholder="Email"
                :state="!v$.emailAddress.$invalid"
            />
          </b-form-group>

          <h5 class="mt-4">Shipping address</h5>
          <b-form-select class="mt-2" v-model="country">
            <b-form-select-option v-for="c in countries" :value="c">
              {{ c.name }}
            </b-form-select-option>
          </b-form-select>

          <b-row class="mt-2">
            <div class="col-6">
              <b-form-input
                  id="firstName"
                  type="text"
                  v-model="firstName"
                  placeholder="First name"
                  :state="!v$.firstName.$invalid"
              />
            </div>

            <div class="col-6">
              <b-form-input
                  id="lastName"
                  type="text"
                  v-model="lastName"
                  placeholder="Last name"
                  :state="!v$.lastName.$invalid"
              />
            </div>
          </b-row>

          <b-row class="mt-2">
            <div class="col-6">
              <b-form-input
                  id="postalCode"
                  type="number"
                  v-model="postalCode"
                  placeholder="Postal code"
                  :state="!v$.postalCode.$invalid"
              />
            </div>

            <div class="col-6">
              <b-form-input
                  id="city"
                  type="text"
                  v-model="city"
                  placeholder="City"
                  :state="!v$.city.$invalid"
              />
            </div>
          </b-row>

          <div class="mt-2">
            <b-form-input
                id="address"
                type="text"
                v-model="address"
                placeholder="Address"
                :state="!v$.address.$invalid"
            />
          </div>

          <h5 class="mt-4">Personal data</h5>
          <div class="mt-2">
            <b-form-group class="mt-2" label="Birthday">
              <b-form-input
                  id="birthday"
                  type="date"
                  v-model="birthday"
                  :state="!v$.birthday.$invalid"
              />
            </b-form-group>
          </div>

          <h5 class="mt-4">Payment</h5>
          <b-row class="mt-2">
            <div class="col-6">
              <b-form-input
                  id="nameOnCard"
                  type="text"
                  v-model="nameOnCard"
                  placeholder="Name on card"
                  :state="!v$.nameOnCard.$invalid"
              />
            </div>
            <div class="col-6">
              <b-form-input
                  id="creditCardNumber"
                  type="text"
                  v-model="creditCardNumber"
                  placeholder="Credit card number"
                  :state="!v$.creditCardNumber.$invalid"
              />
            </div>
          </b-row>

          <b-row class="mt-2">
            <div class="col-3">
              <b-form-input
                  id="expiration"
                  type="text"
                  v-model="expiration"
                  placeholder="Expiration"
                  :state="!v$.expiration.$invalid"
              />
            </div>
            <div class="col-3">
              <b-form-input
                  id="cvv"
                  type="password"
                  max="3"
                  v-model="cvv"
                  placeholder="CVV"
                  :state="!v$.cvv.$invalid"
              />
            </div>
          </b-row>

          <b-row class="mt-2">
            <b-form-group>
              <b-form-checkbox v-model="consent" :state="!v$.consent.$invalid">
                By placing an order, you agree to the terms and conditions of order processing.
                This includes providing accurate and complete information, consenting to the use of your data for
                order fulfillment purposes, and acknowledging our privacy policy.
              </b-form-checkbox>
            </b-form-group>
          </b-row>

          <b-row class="mt-3 mb-5">
            <b-button type="submit" :disabled="v$.$invalid" variant="outline-dark">
              Send order
            </b-button>
          </b-row>
        </b-form>
      </div>

      <div class="col-5">
        <h5>Your cart</h5>
        <b-card no-body>
          <b-list-group flush>
            <b-list-group-item v-for="product in products" class="d-flex justify-content-between align-items-center">
              {{ product.title }} <span>${{ product.price }}</span>
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
import {required, email, integer, alpha, numeric, maxLength, sameAs} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core/dist/index";
import countryApi from "../services/api/CountryApi";
import {expirationFormat} from "../validation/rules";
import {useShoppingCartStore} from "../store/schoppintCart";
import orderService from "../services/service/OrderService";
import {useRouter} from "vue-router";
import {Order} from "../model/Order";

const countries = countryApi.getCountries()
const shoppingCartStore = useShoppingCartStore()

const products = shoppingCartStore.products
const total = shoppingCartStore.getTotal()

const emailAddress = ref('')
const country = ref(countries[0])
const firstName = ref('')
const lastName = ref('')
const postalCode = ref('')
const city = ref('')
const address = ref('')
const birthday = ref(null)
const nameOnCard = ref('')
const creditCardNumber = ref('')
const expiration = ref('')
const cvv = ref('')
const consent = ref(false)

const orderSent = ref(false)
const success = ref(false)

const rules = {
  emailAddress: {required, email},
  country: {required},
  firstName: {required},
  lastName: {required},
  postalCode: {required, integer},
  city: {required},
  address: {required},
  birthday: {required},
  nameOnCard: {required, alpha},
  creditCardNumber: {required, numeric},
  expiration: {required, expirationFormat},
  cvv: {required, numeric, maxLengthValue: maxLength(3)},
  consent: {sameAsRawValue: sameAs(true)}
}
const state = {
  emailAddress,
  country,
  firstName,
  lastName,
  postalCode,
  city,
  address,
  birthday,
  nameOnCard,
  creditCardNumber,
  expiration,
  cvv,
  consent
}
const v$ = useVuelidate(rules, state)
const router = useRouter()

const errorBanner = ref(null)

function sendOrder() {
  console.log('sending order...')
  orderSent.value = true
  success.value = orderService.sendOrder(new Order(
      emailAddress.value,
      country.value,
      firstName.value,
      lastName.value,
      postalCode.value,
      city.value,
      address.value,
      birthday.value,
      nameOnCard.value,
      creditCardNumber.value,
      expiration.value,
      cvv.value
  ))
  if (success.value) {
    router.push('success')
  } else {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}
</script>

<style scoped>

</style>