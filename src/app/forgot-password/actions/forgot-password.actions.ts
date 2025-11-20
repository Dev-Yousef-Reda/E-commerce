'use server'

export async function handleForgetPassword(email: string) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
        method: 'POST',
        body: JSON.stringify({ email: email }),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const result = await response.json()

    return result
}

export async function handleSendingVerifyCode(code: string) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        method: 'POST',
        body: JSON.stringify({ resetCode: code.trim() }),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const result = await response.json()

    return result
}

export async function resetPassword(data: { email: string, newPassword: string }) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
        method: 'PUT',
        body: JSON.stringify({
            email: data.email,
            newPassword: data.newPassword
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const result = await response.json()

    return result
}   