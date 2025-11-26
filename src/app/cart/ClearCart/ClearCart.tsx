'use client'
import { Button } from '_/components/ui/button'
import React, { useContext, useState } from 'react'
import { clearCartProducts } from '../actions/cartItems.actions'
import { toast } from 'sonner'
import { cartItemsCountContext } from '_/context/ProductsCount/ProductsCountProvider'

export default function ClearCart() {
    const { updateCartItemsCount } = useContext(cartItemsCountContext)
    const [isLoading, setIsLoading] = useState(false)

    async function handleClearingCart() {
        setIsLoading(true)
        const payload = await clearCartProducts()
        if (payload) {
            toast.success('cart is cleared')
            updateCartItemsCount(0)
        } else {
            toast.error('error happened')
        }
        setIsLoading(false)
    }


    return (
        <Button
            className='w-37 text-secondary-foreground py-5  bg-secondary border-2 border-border   hover:bg-secondary cursor-pointer transition-colors duration-300 rounded-full '
            onClick={handleClearingCart}
            aria-disabled={isLoading}
        >
            {isLoading ? 'Loading...' : 'Clear Cart'}
        </Button>
    )
}
