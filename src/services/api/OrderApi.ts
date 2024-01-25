import {Product} from "../../model/Product";
import {Order} from "../../model/Order";

export default new class OrderApi {

    sendOrder(products: Array<Product>, order: Order) {
        console.log('sending order...')
    }

}
