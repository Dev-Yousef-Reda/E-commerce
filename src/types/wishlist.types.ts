import { productType } from "./product.type"

export type wishlistResponseType = {
    status?: string
    count: number,
    data: productType[],
}