'use server'
import { getLoggedUserToken } from "_/utils/getLoggedUserToken";
import { revalidatePath } from "next/cache";

export async function removeCartProductAction(productId: string) {

    const token = await getLoggedUserToken()

    try {

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId.trim()}`, {
            method: 'DELETE',
            headers: {
                token: token as string,
            }
        })

        const result = await response.json();
        if (result.status === 'success') {
            revalidatePath('/cart')
            return result.numOfCartItems as number
        }
        else {
            throw new Error('')
        }
    } catch  {
        return null
    }
}

export async function updateCartProductCountOrder(productId: string, orderCount: number, orderUpdate: number) {


    const token = await getLoggedUserToken()

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId.trim()}`, {
            method: 'PUT',
            body: JSON.stringify({ count: orderCount + (orderUpdate) }),
            headers: {
                'Content-Type': 'application/json',
                token: token as string,
            }
        })
        const result = await response.json();
        if (result.status === 'success') {
            revalidatePath('/cart')
            return true
        }
        else {
            throw new Error('')
        }
    } catch  {
        return null
    }
}

export async function clearCartProducts() {
    const token = await getLoggedUserToken()
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        method: 'DELETE',
        headers: {
            token: token as string,
        }
    })
    const payload = await response.json()

    if (payload.message === 'success') {
        revalidatePath('/cart')
        return true
    }else {
        return false
    }
}