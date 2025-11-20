'use server'

import { getLoggedUserToken } from "_/utils/getLoggedUserToken";

export async function addProductToCart(productId: string) {

    const token = await getLoggedUserToken()
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        method: "POST",
        body: JSON.stringify({ productId: productId }),
        headers: {
            'Content-Type': 'application/json',
            token: token as string,
        }
    })
    const result = await response.json();

    return result
}