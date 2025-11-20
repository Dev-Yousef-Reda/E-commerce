'use client'

import { cartItemsCountContext } from "_/context/ProductsCount/ProductsCountProvider"
import { useContext, useState } from "react"
import { toast } from "sonner"
import { Button } from "_/components/ui/button"
import { removeProductFromWishlist } from "_/app/_actions/wishlist.actions"

export default function RemoveFromWishlist({ productId }: { productId: string }) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { updateCartItemsCount } = useContext(cartItemsCountContext)

    async function handleRemovingWishlistProduct() {
        setIsLoading(true)
        const result = await removeProductFromWishlist(productId)
        if (result !== null) {
            toast.success('product is removed from wishlist')
            updateCartItemsCount(result)

        } else {
            toast.error('failed to Delete wishlist')
            setIsLoading(false)
        }
    }

    return (
        <>
            <Button
                className=' md:w-37 bg-red-500 hover:bg-red-600 cursor-pointer transition-colors duration-300 rounded-full '
                disabled={isLoading}
                onClick={handleRemovingWishlistProduct}
            >
                Remove
            </Button>
        </>
    )
}

