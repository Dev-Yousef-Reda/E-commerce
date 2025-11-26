'use client'
import { addProductToCart } from '_/app/_actions/addProductToCart'
import { Button } from '_/components/ui/button'
import { Spinner } from '_/components/ui/spinner'
import { cartItemsCountContext } from '_/context/ProductsCount/ProductsCountProvider'
import { productType } from '_/types/product.type'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'

export default function AddToCart({ product }
    : { product: productType }) {

    const { updateCartItemsCount } = useContext(cartItemsCountContext)
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
            updateCartItemsCount(result.numOfCartItems)
            toast.success('product is added to cart')
        } else {
            toast.error("couldn't add product to cart")
        }
        setIsLoading(false)
    }

    return (
        <>
            {isLoading ?
                <Button
                    className=' me-3 px-8 md:px-15 py-7! bg-primary/80 font-bold text-primary-foreground cursor-pointer  rounded-full text-base md:text-xl md:tracking-wider  '
                    variant="outline"
                    disabled
                >
                    <Spinner />
                    Loading...
                </Button>
                :
                <Button
                    type='submit'
                    className=' me-3 px-8 md:px-15 py-7! bg-primary/90 hover:bg-primary transition-opacity duration-300 font-bold  text-primary-foreground cursor-pointer  rounded-full text-base md:text-xl md:tracking-wider  '
                    onClick={handleAddingProductToCart}
                >
                    Add to Cart | {product.priceAfterDiscount ? product.priceAfterDiscount : product.price} EGP
                </Button>
            }

        </>
    )
}
