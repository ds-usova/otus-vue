interface Filters {
    priceFilter: PriceFilters
    nameFilter: string
}

interface PriceFilters extends Valid {
    minPrice: number
    maxPrice: number
}

interface Valid {
    valid: boolean
}