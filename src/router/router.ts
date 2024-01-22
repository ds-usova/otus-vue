import {createRouter, createWebHistory} from "vue-router";
import MainPage from "../pages/MainPage.vue";
import ProductPage from "../pages/ProductPage.vue";

const routes = [
    {path: "/", name: "main", component: MainPage},
    {path: "/product/:id", name: "product", component: ProductPage},
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;