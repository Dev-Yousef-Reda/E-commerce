import { brandsPayloadType, brandType } from "_/types/brands.types"


export async function getAllBrands(pageNum: number = 1) {
    try {

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands?limit=10&page=${pageNum}`, {
            cache: 'force-cache',
            next: { revalidate: 60 * 60 * 24 },
        })

        const result = await response.json()

        return result as brandsPayloadType

    } catch  {
        return null
    }
}


export async function getBrandById(brandId: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`, {
            cache: 'force-cache',
            next: { revalidate: 60 * 60 * 24 },
        })

        const result = await response.json()

        return result.data as brandType

    } catch  {

        return null
    }
}