'use server'
import { categoryType } from "_/types/category.types"

export async function getAllCategories(limit: number = 10) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories?limit=${limit}`, {
            cache: 'force-cache',
            next: { revalidate: 60 * 60 * 24 },

        })

        const result = await response.json()

        return result.data as categoryType[]

    } catch{
        return null
    }
}

export async function getSpecificCategory(categoryId: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`, {
            cache: 'force-cache',
            next: { revalidate: 60 * 60 * 24 },
        })

        const result = await response.json()

        return result.data as categoryType

    } catch{

        return null
    }
}
// /api/v1/categories/6407ebf65bbc6e43516931ec