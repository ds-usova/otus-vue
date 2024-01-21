import {Product} from "../../model/Product";

export default new class ShoppingCartService {

    addItem(product: Product) {
        const shoppingCart = sessionStorage.getItem("shoppingCart")
        if (shoppingCart) {
            const products = JSON.parse(shoppingCart)
            products.push(product)
            sessionStorage.setItem("shoppingCart", JSON.stringify(products))
        } else {
            sessionStorage.setItem("shoppingCart", JSON.stringify([product]))
        }
    }

}
