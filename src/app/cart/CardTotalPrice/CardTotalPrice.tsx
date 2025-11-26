import React from 'react'
import { cartDetailsType } from '../../../types/cart.types'
import Link from 'next/link'

export default function CardTotalPrice({ cartDetails }: { cartDetails: cartDetailsType }) {
    return (
        <>
            {(cartDetails?.numOfCartItems ?? 0) > 0 && (
                <section className=' h-full '>
                    <div className='  text-center sticky top-[100px] shadow-xl border-border px-2 py-3 rounded-lg'>
                        <h2 className=' font-bold pb-2 text-foreground border-b-2 border-border mb-3 '>Order Summary</h2>
                        <p>
                            <span className='font-bold text-foreground ' > Total Cart Price:  </span>
                            {cartDetails?.data.totalCartPrice}
                        </p>
                        <Link
                            className='bg-primary/90 hover:bg-primary transition-all duration-300 rounded-full text-primary-foreground font-bold px-2 py-3  cursor-pointer mt-3 block'
                            href={`/checkout/${cartDetails?.cartId}`}
                        >
                            Proceed to  pay
                        </Link>
                    </div>
                </section>
            )}
        </>
    )
}
