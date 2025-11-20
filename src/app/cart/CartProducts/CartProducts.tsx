import React from 'react'
import { cartDetailsType } from '../../../types/cart.types'
import CartProductCard from '../CartProductCard/CartProductCard'



export default function CartProducts({ cartDetails }: { cartDetails: cartDetailsType }) {

    return (
        <>
            {
                cartDetails?.data.products.map((item) =>
                    < CartProductCard product={item} key={item.product._id} showOrderActions />
                )
            }
        </>
    )
}
