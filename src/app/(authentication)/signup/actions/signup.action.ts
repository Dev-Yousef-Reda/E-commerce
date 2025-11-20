'use server'

import { registerDataType } from "../types/signup.types";

export async function handleRegister(registerData: registerDataType) {

    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
            method: 'POST',
            body: JSON.stringify(registerData),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const result = await response.json();

        return result.message

    } catch (error: unknown) {
        if (error instanceof Error) {
            return error.message
        }
        return String(error)
    }
}

