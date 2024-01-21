import {Product} from "../../model/Product";

export default new class ProductService {

    readonly defaultMinPrice: Number = 0
    readonly defaultMaxPrice: Number = 99_999

    getMaxPrice(products: Array<Product>): number {
        return Math.max(...products.map(p => p.price))
    }

    getMinPrice(products: Array<Product>): number {
        return Math.min(...products.map(p => p.price))
    }

    filter(products: Array<Product>, filter: Filters): Array<Product> {
        let filtered = products
        if (filter.nameFilter) {
            filtered = filtered.filter(p => p.title.toLowerCase().includes(filter.nameFilter))
        }

        if (filter.priceFilter) {
            filtered = filtered.filter(p => p.price >= filter.priceFilter.minPrice && p.price <= filter.priceFilter.maxPrice )
        }

        return filtered
    }

}
