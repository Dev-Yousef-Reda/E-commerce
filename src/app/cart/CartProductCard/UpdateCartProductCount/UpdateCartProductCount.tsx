'use client'
import React from 'react'
import Decrease from './Decrease/Decrease'
import Increase from './Increase/Increase'

export default function UpdateCartProductCount({ ProductCount, productId }: { ProductCount: number, productId: string }) {


    return (
        <>
            <h3 className='my-2  flex items-center '>
                <span className='text-foreground text-lg me-2 ' >
                    Amount:
                </span>
                <Decrease
                    productId={productId}
                    productCount={ProductCount}
                />

                <span className='px-1 text-lg text-foreground font-bold '>
                    {ProductCount}
                </span>

                <Increase
                    productId={productId}
                    productCount={ProductCount}
                />
            </h3>
        </>
    )
}
