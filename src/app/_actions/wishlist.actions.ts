'use server'
import { getLoggedUserToken } from "_/utils/getLoggedUserToken";
import { revalidatePath } from "next/cache";


export async function addProductToWishlistAction(productId: string) {

    const token = await getLoggedUserToken()
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
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

export async function removeProductFromWishlist(productId: string) {

    const token = await getLoggedUserToken()

    try {

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId.trim()}`, {
            method: 'DELETE',
            headers: {
                token: token as string,
            }
        })

        const result = await response.json();
        if (result.status === 'success') {
            revalidatePath('/wishlist')
            return result
        }
        else {
            throw new Error('')
        }
    } catch {
        return null
    }
}
