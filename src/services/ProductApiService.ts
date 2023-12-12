import axios from "axios";
import {Product} from "../model/Product";

export default new class ProductApiService {

    readonly defaultMinPrice: Number = 0
    readonly defaultMaxPrice: Number = 99_999

    getProducts(): Promise<Array<Product>> {
        return axios.get<Array<Product>>('https://fakestoreapi.com/products')
            .then(({data}) => {
                return Promise.resolve(data)
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }

    getMaxPrice(): Promise<Number> {
        return this.getProducts()
            .then(products => Math.max(...products.map(p => p.price)))
            .catch( () => this.defaultMaxPrice)
    }

    getMinPrice(): Promise<Number> {
        return this.getProducts()
            .then(products => Math.min(...products.map(p => p.price)))
            .catch( () => this.defaultMinPrice)
    }

}
