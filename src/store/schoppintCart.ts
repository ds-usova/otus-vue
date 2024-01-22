import {defineStore} from "pinia";
import {Product} from "../model/Product";

export const useShoppingCartStore = defineStore('shoppingCart', {
    state: () => {
        return {
            products: []
        }
    },
    actions: {
        addProduct(product: Product) {
            this.products.push(product)
        },

        getProductCount(): number {
            return this.products.length
        }
    },
    persist: {
        storage: sessionStorage
    }
})