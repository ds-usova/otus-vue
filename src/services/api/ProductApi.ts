import axios from "axios";
import {Product} from "../../model/Product";
import productService from "../service/ProductService";

export default new class ProductApi {

    getFilteredProducts(filters: Filters): Promise<Array<Product>> {
        return axios.get<Array<Product>>('https://fakestoreapi.com/products')
            .then(({data}) => {
                return Promise.resolve(productService.filter(data, filters))
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }

    getProducts(): Promise<Array<Product>> {
        return axios.get<Array<Product>>('https://fakestoreapi.com/products')
            .then(({data}) => {
                return Promise.resolve(data)
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }

    add(product: Product) {
        axios.post('https://httpbin.org/post', product)
            .then(() => console.log('order added...'))
    }

    getMaxPrice(): Promise<Number> {
        return this.getProducts()
            .then(products => productService.getMaxPrice(products))
            .catch(() => productService.defaultMaxPrice)
    }

    getMinPrice(): Promise<Number> {
        return this.getProducts()
            .then(products => productService.getMinPrice(products))
            .catch(() => productService.defaultMinPrice)
    }

    getProduct(id: string): Promise<Product> {
        return axios.get<Product>('https://fakestoreapi.com/products/' + id)
            .then(({data}) => {
                return Promise.resolve(data)
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }

}
