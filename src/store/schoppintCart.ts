import {defineStore} from "pinia";
import {Product} from "../model/Product";
import OrderItem from "../model/OrderItem";

export const useShoppingCartStore = defineStore('shoppingCart', {
    state: () => {
        return {
            orderItems: []
        }
    },
    actions: {
        addProduct(product: Product) {
            const productToUpdate = this.findById(product.id)
            if (productToUpdate) {
                productToUpdate.count++
            } else {
                this.orderItems.push(new OrderItem(product, 1))
            }
        },

        getProductCount(): number {
            return this.orderItems.reduce((sum, it) => sum + it.count, 0)
        },

        getTotal(): number {
            return this.orderItems
                .map(it => it.product.price * it.count)
                .reduce((acc, current) => acc + current, 0);
        },

        findById(id: number): OrderItem | undefined {
            return this.orderItems.find((it) => it.product.id == id)
        },

        emptyCart() {
            this.orderItems = []
        },

        deleteItemsWithZeroCount() {
            this.orderItems = this.orderItems.filter((it) => it.count > 0)
        }
    },
    persist: {
        storage: sessionStorage
    }
})