'use server'

import { getLoggedUserToken } from "_/utils/getLoggedUserToken";
import { changePasswordDataType } from "../ChangePassword/ChangePassword";

export async function handleChangePassword(changePasswordData: changePasswordDataType) {
    const token = await getLoggedUserToken()
    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', {
            method: 'PUT',
            body: JSON.stringify(changePasswordData),
            headers: {
                'Content-Type': 'application/json',
                token: token as string,
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
