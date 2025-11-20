import { brandType } from "./brands.types"
import { categoryType,  subCategoryType } from "./category.types"


export type productType = {
    sold: number | null,
    images: string[],
    imageCover: string,
    ratingsQuantity: number,
    ratingsAverage: number,
    title: string,
    description: string,
    id: string,
    price: number,
    priceAfterDiscount?: number,
    subcategory: subCategoryType[],
    category: categoryType
    brand: brandType,
    reviews: string[],
    quantity: number,
    slug:string,
}

export type metadata = {
    currentPage: number,
    numberOfPages: number,
    limit: number,
}

export type productResponseType = {
    results: number,
    metadata: metadata,
    data: productType[]
}