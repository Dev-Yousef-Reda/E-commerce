import { getLoggedUserId } from "_/utils/getLoggedUserId"

export async function getAllOrders() {

    const userId = await getLoggedUserId()

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)

    const result = await response.json()

    if (!result.statusMsg) {
        return result
    } else {
        return null
    }
}