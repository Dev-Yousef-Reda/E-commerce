'use client'

import { cartItemsCountContext } from "_/context/ProductsCount/ProductsCountProvider"
import { useContext, useState } from "react"
import { removeCartProductAction } from "../../actions/cartItems.actions"
import { toast } from "sonner"
import { Button } from "_/components/ui/button"

export default function RemoveCartProduct({ productId }: { productId: string }) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { updateCartItemsCount } = useContext(cartItemsCountContext)

    async function handleRemovingCartProduct() {
        setIsLoading(true)
        const result = await removeCartProductAction(productId)
        if (result !== null) {
            toast.success('product is removed from cart')
            updateCartItemsCount(result)

        } else {
            toast.error('failed to Delete product')
            setIsLoading(false)
        }
    }

    return (
        <>
            <Button
                className='w-37 bg-secondary/90 hover:bg-secondary text-secondary-foreground cursor-pointer transition-colors duration-300 rounded-full '
                disabled={isLoading}
                onClick={handleRemovingCartProduct}
            >
                Remove
            </Button>
        </>
    )
}

