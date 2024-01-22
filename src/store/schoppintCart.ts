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
        },

        getTotal(): number {
            return this.products.map(it => it.price).reduce((acc, current) => acc + current, 0);
        }
    },
    persist: {
        storage: sessionStorage
    }
})