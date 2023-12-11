import axios from "axios";
import {Product} from "../model/Product";

export default new class ProductApiService {
    getProducts(): Promise<Array<Product>> {
        return axios.get<Array<Product>>('https://fakestoreapi.com/products')
            .then(({data}) => {
                return Promise.resolve(data)
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }
}
