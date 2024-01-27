import {Product} from "../../model/Product";
import {Order} from "../../model/Order";
import axios from "axios";

export default new class OrderApi {

    sendOrder(products: Array<Product>, order: Order) {
        axios.post('https://httpbin.org/post', {products, order})
            .then(() => console.log('order sent...'))
    }

}
