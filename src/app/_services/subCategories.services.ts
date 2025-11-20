'use server'
import { subCategoryType } from "_/types/category.types"

export async function getAllSubCategories(limit: number = 10) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories?limit=${limit}`, {
            cache: 'force-cache',
            next: { revalidate: 60 * 60 * 24 },

        })

        const result = await response.json()

        return result.data as subCategoryType[]

    } catch  {
        return null
    }
}

export async function getSpecificSubCategory(subCategoryId: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${subCategoryId}`, {
            cache: 'force-cache',
            next: { revalidate: 60 * 60 * 24 },
        })

        const result = await response.json()

        return result.data as subCategoryType

    } catch  {

        return null
    }
}

export async function GetAllSubCategoriesOnCategory(CategoryId: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${CategoryId}/subcategories`, {
            cache: 'force-cache',
            next: { revalidate: 60 * 60 * 24 },
        })

        const result = await response.json()

        return result.data as subCategoryType[]

    } catch  {

        return null
    }
}