import React from 'react'
import { getLoggedUserCartDetails } from '../_services/cart.services'
import CartProducts from './CartProducts/CartProducts'
import CardTotalPrice from './CardTotalPrice/CardTotalPrice'
import ClearCart from './ClearCart/ClearCart'

export const metadata = {
    title: "Cart",
}

export default async function page() {

    const cartDetails = await getLoggedUserCartDetails()

    if (cartDetails == null) {
        return
    }
    return (
        <>
            {cartDetails?.numOfCartItems > 0 && (
                <main
                    className=' flex flex-wrap mt-[210px] mb-11 w-[90%] mx-auto justify-center '
                >
                    <>
                        <div className='w-[100%] lg:w-[70%] p-3 shadow-xl border-border rounded-xl ' >
                            < CartProducts cartDetails={cartDetails} />
                            {cartDetails.numOfCartItems > 0 && (
                                <div className=' flex justify-center w-full mt-2  ' >
                                    <ClearCart />
                                </div>
                            )}
                        </div>
                        <div className=' w-[100%] lg:w-[30%]  rounded-xl mt-3 lg:mt-0 lg:pl-3  ' >
                            <div className='h-full' >
                                <CardTotalPrice cartDetails={cartDetails} />
                            </div>
                        </div>
                    </>

                </main>
            )}

            {cartDetails?.numOfCartItems === 0 && (
                <p className='mt-[180px] text-center p-5 shadow-xl border-border w-[90%] mx-auto rounded-xl text-foreground font-semibold'>No products In the cart</p>
            )}
        </>
    )
}
