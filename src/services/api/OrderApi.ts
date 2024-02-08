import {Order} from "../../model/Order";
import axios from "axios";
import OrderItem from "../../model/OrderItem";

export default new class OrderApi {

    sendOrder(orderItems: Array<OrderItem>, order: Order) {
        axios.post('https://httpbin.org/post', {orderItems: orderItems, order})
            .then(() => console.log('order sent...'))
    }

}
