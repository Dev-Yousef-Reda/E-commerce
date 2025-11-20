'use server'

import { getLoggedUserToken } from "_/utils/getLoggedUserToken";
import { addressType } from "../checkout.types";

export async function addUserAddress(address: addressType) {
    const token = await getLoggedUserToken();

    try {

        const response = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
            method: 'POST',
            body: JSON.stringify({ address }),
            headers: {
                'Content-Type': 'application/json',
                token: token as string,
            }
        })

        const result = await response.json()

        return result

    } catch {
        return null
    }
}


