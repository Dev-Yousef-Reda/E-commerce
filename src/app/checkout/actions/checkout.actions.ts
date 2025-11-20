'use server'

import { getLoggedUserToken } from "_/utils/getLoggedUserToken";
import { addressType } from "../checkout.types";


export async function handleCashPayment(cartId: string, address: addressType) {
    const token = await getLoggedUserToken()
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
            method: 'POST',
            body: JSON.stringify({ 'shippingAddress': address }),
            headers: {
                token: token as string,
                'Content-Type': "application/json",
            }
        })
        const result = await response.json();

        if (result.status === 'success') {

            return true
        }
        else {
            throw new Error('')
        }
    } catch  {
        return false
    }
}

export async function handleCardPayment(cartId: string, address: addressType) {
    const token = await getLoggedUserToken()
    const url = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
            method: 'POST',
            body: JSON.stringify({ 'shippingAddress': address }),
            headers: {
                token: token as string,
                'Content-Type': "application/json",
            }
        })
        const result = await response.json();

        if (result.status == 'success') {

            return result.session.url
        }
        else {
            throw new Error('')
        }
    } catch  {
        return false
    }
}