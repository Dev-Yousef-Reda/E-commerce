
import React from 'react'
import { cartProductType } from '../../../types/cart.types'
import UpdateCartProductCount from './UpdateCartProductCount/UpdateCartProductCount'
import RemoveCartProduct from './RemoveCartProduct/RemoveCartProduct'
import Image from 'next/image';

export default function CartProductCard({ product, showOrderActions }: { product: cartProductType, showOrderActions?: boolean }) {

    return (
        <>
            <div className='flex gap-2 py-2 not-last:border-b-1 border-b-border' >
                <div>
                    <Image
                        src={product.product.imageCover}
                        alt={product.product.title}
                        className='size-30 object-contain' 
                        width={200}
                        height={200}
                        />
                </div>
                <div className='flex flex-col justify-center w-[70%] '>
                    <h2 className='font-bold line-clamp-1'> {(product.product.title).split(' ', 3).join(' ')} </h2>
                    {showOrderActions && (
                        <>
                            <UpdateCartProductCount ProductCount={product.count} productId={` ${product.product._id} `} />
                            < RemoveCartProduct productId={`${product.product._id}`} />
                        </>
                    )}
                    {!showOrderActions && (
                        <h3 className='mt-2'>
                            Amount:
                            <span className='px-2'>
                                {product.count}
                            </span>
                        </h3>
                    )}
                </div>
                <div className='flex items-center'>
                    <h3 className='font-bold text-foreground w-max'> Price: {Number(product.price) * product.count } </h3>
                </div>
            </div>
        </>
    )
}
