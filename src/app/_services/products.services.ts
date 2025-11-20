import { productResponseType, productType } from "_/types/product.type";

export async function getAllProducts(pageNum: number = 1): Promise<productResponseType | null> {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}`, {
            cache: 'force-cache',
            next: { revalidate: 60 * 60 * 24 }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json()

        return data as productResponseType
    }
    catch {
        return null
    }
}

export async function getProductsByCategory(category: string): Promise<productResponseType | null> {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/?category[in]=${category}`, {
            cache: 'force-cache',
            next: { revalidate: 60 * 60 * 24 }
        })

        if (!response.ok) throw new Error(`couldn't get product`)

        const data = await response.json()

        return data as productResponseType

    } catch  {
        return null
    }
}

export async function getProductsBySubCategory(subCategory: string): Promise<productResponseType | null> {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/?category[in]=${subCategory}`, {
            cache: 'force-cache',
            next: { revalidate: 60 * 60 * 24 }
        })

        if (!response.ok) throw new Error(`couldn't get product`)

        const data = await response.json()

        return data as productResponseType

    } catch  {
        return null
    }
}

export async function getProductsByBrand(brandId: string): Promise<productResponseType | null> {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`, {
            cache: 'force-cache',
            next: { revalidate: 60 * 60 * 24 }
        })

        if (!response.ok) throw new Error(`couldn't get product`)

        const data = await response.json()

        return data as productResponseType

    } catch  {
        return null
    }
}

export async function getProductDetailsById(productID: string): Promise<productType | null> {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productID}`, {
            cache: 'force-cache',
            next: { revalidate: 60 * 60 * 24 }
        })

        if (!response.ok) throw new Error(`couldn't get product`)

        const data = await response.json()

        return data.data as productType

    } catch  {
        return null
    }
}