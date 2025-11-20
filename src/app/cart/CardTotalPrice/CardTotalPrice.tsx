import React from 'react'
import { cartDetailsType } from '../../../types/cart.types'
import Link from 'next/link'

export default function CardTotalPrice({ cartDetails }: { cartDetails: cartDetailsType }) {
    return (
        <>
            {(cartDetails?.numOfCartItems ?? 0) > 0 && (
                <section className=' h-full '>
                    <div className='  text-center sticky top-[100px] bg-white px-2 py-3 rounded-lg'>
                        <h2 className=' font-bold pb-2 text-slate-500 border-b-2 border-slate-300 mb-3 '>Order Summary</h2>
                        <p>
                            <span className='font-bold text-slate-700 ' > Total Cart Price:  </span>
                            {cartDetails?.data.totalCartPrice}
                        </p>
                        <Link
                            className='bg-blue-400 hover:bg-blue-500 transition-all duration-300 rounded-full text-white font-bold px-2 py-3  cursor-pointer mt-3 block'
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
