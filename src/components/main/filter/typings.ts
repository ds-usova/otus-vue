interface Filters {
    priceFilter: PriceFilters
}

interface PriceFilters extends Valid {
    minPrice: number
    maxPrice: number
}

interface Valid {
    valid: boolean
}