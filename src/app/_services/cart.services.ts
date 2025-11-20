'use server'

import { getLoggedUserToken } from "_/utils/getLoggedUserToken"
import { cartDetailsType } from "../../types/cart.types"

export async function getLoggedUserCartDetails(): Promise<cartDetailsType | null> {
    const token = await getLoggedUserToken()
    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: {
                token: token as string,
            },
            next: { tags: ['cartDetails'] }
        })

        const result = await response.json()
        return result as cartDetailsType

    } catch  {
        return null
    }
}