import {useShoppingCartStore} from "../../store/schoppintCart";
import orderApi from "../api/OrderApi";
import {Order} from "../../model/Order";

export default new class OrderService {

    sendOrder(order: Order): boolean {
        const shoppingCartStore = useShoppingCartStore()
        const products = shoppingCartStore.products
        orderApi.sendOrder(products, order)
        const isSuccess = Math.random() < 0.5
        if (isSuccess) {
            shoppingCartStore.clearCart()
        }
        return isSuccess
    }

}
