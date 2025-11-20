import { brandType } from "_/types/brands.types"
import { categoryType, subCategoryType } from "_/types/category.types"

export type itemType = {
    subcategory: subCategoryType,
    title: string,
    imageCover: string,
    category: categoryType,
    brand: brandType,
    _id: string,
}

export type cartProductType = {
    count: number,
    product: itemType,
    price: string,
}

export type cartItemsType = {
    products: cartProductType[],
    totalCartPrice: number,
}

export type cartDetailsType = {
    numOfCartItems: number,
    cartId: string,
    data: cartItemsType,
    status?: string
}