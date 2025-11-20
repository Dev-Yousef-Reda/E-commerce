import { wishlistResponseType } from "_/types/wishlist.types"
import { getLoggedUserToken } from "_/utils/getLoggedUserToken"


export async function getLoggedUserWishlist(): Promise<wishlistResponseType | null> {
    const token = await getLoggedUserToken()
    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: {
                token: token as string,
            },
            next: { tags: ['wishlist'] }
        })

        const result = await response.json()
        return result as wishlistResponseType

    } catch {
        return null
    }
}