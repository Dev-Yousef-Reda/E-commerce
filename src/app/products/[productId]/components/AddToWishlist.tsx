'use client'
import { addProductToWishlistAction } from '_/app/_actions/wishlist.actions'
import { Button } from '_/components/ui/button'
import { cartItemsCountContext } from '_/context/ProductsCount/ProductsCountProvider'
import { productType } from '_/types/product.type'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'

export default function AddToWishlist({ product }: { product: productType }) {

    const { updateCartItemsCount } = useContext(cartItemsCountContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const userState = useSession()
    const route = useRouter()

    async function handleAddingProductWishlist() {

        if (userState.status === 'unauthenticated') {
            toast.error("couldn't add product", {
                description: 'please login first'
            })
            route.push('/signin')
            return;
        }

        setIsLoading(true)
        const result = await addProductToWishlistAction(product.id);

        if (result.status === 'success') {
            updateCartItemsCount(result.numOfCartItems)
            toast.success('product is added to wishlist')
        } else {
            toast.error("couldn't add product to wishlist")
        }
        setIsLoading(false)
    }

    return (
        <>
            {isLoading ?
                <Button
                    className='bg-primary/80 font-bold text-primary-foreground rounded-full  w-13 h-13'
                    variant="outline"
                    disabled
                >
                    <i className="fa-solid fa-spinner fa-spin"></i>
                </Button>
                :
                <Button
                    type='submit'
                    className=' bg-primary/80 font-bold hover:bg-primary text-primary-foreground cursor-pointer  rounded-full w-13 h-13 '
                    onClick={handleAddingProductWishlist}
                >
                    <i className=" fa-solid fa-heart  text-3xl"></i>
                </Button>
            }
        </>
    )
}
