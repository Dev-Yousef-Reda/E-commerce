'use server'

import { getLoggedUserToken } from "_/utils/getLoggedUserToken";

export async function getUserAddresses() {
    const token = await getLoggedUserToken();

    try {

        const response = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
            headers: {
                token: token as string,
            },
        })

        const result = await response.json();

        if (result.status === 'success') {
            return result.data as string[]
        }
        else {
            throw new Error('')
        }

    } catch {
        return null
    }
}