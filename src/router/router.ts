import {createRouter, createWebHistory} from "vue-router";
import MainPage from "../pages/MainPage.vue";
import ProductPage from "../pages/ProductPage.vue";
import CheckoutPage from "../pages/CheckoutPage.vue";
import OrderPlacedPage from "../pages/OrderPlacedPage.vue";
import NewProductPage from "../pages/NewProductPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import UserProfilePage from "../pages/UserProfilePage.vue";

const routes = [
    {path: "/", name: "main", component: MainPage},
    {path: "/product/:id", name: "product", component: ProductPage},
    {path: "/checkout", name: "checkout", component: CheckoutPage},
    {path: "/success", name: "success", component: OrderPlacedPage},
    {path: "/new-product", name: "new-product", component: NewProductPage},
    {path: "/login", name: "login", component: LoginPage},
    {path: "/profile", name: "profile", component: UserProfilePage},
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;