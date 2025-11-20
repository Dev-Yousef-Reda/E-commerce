'use client'
import { addProductToCart } from '_/app/_actions/addProductToCart'
import {  removeProductFromWishlist } from '_/app/_actions/wishlist.actions'
import { Button } from '_/components/ui/button'
import { Spinner } from '_/components/ui/spinner'
import { productType } from '_/types/product.type'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function AddProductToCart({ product }
    : { product: productType }) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const userState = useSession()
    const route = useRouter()

    async function handleAddingProductToCart() {

        if (userState.status === 'unauthenticated') {
            toast.error("couldn't add product", {
                description: 'please login first'
            })
            route.push('/signin')
            return;
        }

        setIsLoading(true)
        const result = await addProductToCart(product.id);

        if (result.status === 'success') {
            toast.success('product is added to cart')

            removeProductFromWishlist(product.id)

        } else {
            toast.error("couldn't add product to cart")
        }
        setIsLoading(false)
    }

    return (
        <>
            {isLoading ?
                <Button
                    className=' me-3 bg-blue-500 font-bold text-white cursor-pointer  rounded-full   '
                    variant="outline"
                    disabled
                >
                    <Spinner />
                    Loading...
                </Button>
                :
                <Button
                    type='submit'
                    className=' me-3 bg-blue-500 font-bold hover:bg-blue-500 text-white cursor-pointer  rounded-full md:w-37   '
                    onClick={handleAddingProductToCart}
                >
                    Add to Cart
                </Button>
            }



        </>
    )
}
