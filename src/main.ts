import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import BootstrapVueNext from 'bootstrap-vue-next'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
import { faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import '@fortawesome/fontawesome-free/css/all.css'

library.add(fasStar, faStarHalf, farStar, faMagnifyingGlass)
const app = createApp(App)
app.use(BootstrapVueNext)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
