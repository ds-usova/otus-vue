import {createRouter, createWebHistory} from "vue-router";
import MainPage from "../pages/MainPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import {useShoppingCartStore} from "../store/schoppintCart";
import {useUserDataStore} from "../store/userData";

const routes = [
    {path: "/", name: "main", component: MainPage},
    {path: "/product/:id", name: "product", component: () => import('../pages/ProductPage.vue')},
    {
        path: "/checkout",
        name: "checkout",
        component: () => import('../pages/CheckoutPage.vue'),
        beforeEnter: (to, from) => {
            const shoppingCart = useShoppingCartStore()
            if (shoppingCart.cartIsEmpty) {
                return {name: "main"}
            }
        }
    },
    {
        path: "/success",
        name: "success",
        component: () => import('../pages/OrderPlacedPage.vue'),
        beforeEnter: (to, from) => {
            if (from.name != 'checkout') {
                return {name: 'main'}
            }
        }
    },
    {
        path: "/new-product",
        name: "new-product",
        component: () => import('../pages/NewProductPage.vue'),
        beforeEnter: (to, from) => {
            const userData = useUserDataStore()
            if (!userData.isAdmin) {
                return {name: 'main'}
            }
        }
    },
    {
        path: "/login",
        name: "login",
        component: () => import('../pages/LoginPage.vue'),
        beforeEnter: (to, from) => {
            const userData = useUserDataStore()
            if (userData.loggedIn) {
                return {name: 'main'}
            }
        }
    },
    {path: "/profile", name: "profile", component: () => import('../pages/UserProfilePage.vue')},
    {path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage},
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;