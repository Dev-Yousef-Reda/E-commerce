'use server'

import { getLoggedUserToken } from "_/utils/getLoggedUserToken";
import { userData } from "../page";

export async function handleUpdateUserData(updateData: userData) {
    const token = await getLoggedUserToken()
    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/users/updateMe/', {
            method: 'PUT',
            body: JSON.stringify(updateData),
            headers: {
                'Content-Type': 'application/json',
                token: token as string
            }
        })

        const result = await response.json();

        return result

    } catch (error: unknown) {
        if (error instanceof Error) {
            return error.message
        }
        return String(error)
    }
}

