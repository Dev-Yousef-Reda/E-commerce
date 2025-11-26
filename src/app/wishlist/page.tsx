import React from 'react'
import { getLoggedUserWishlist } from '../_services/wishlist.services'
import Image from 'next/image'
import RemoveFromWishlist from './RemoveFromWishlist/RemoveFromWishlist'
import AddProductToCart from './AddProductToCart/AddProductCart'

export const metadata = {
    title: "Dashboard – MyApp",
}

export default async function page() {

    const wishlistProducts = await getLoggedUserWishlist()

    if (!wishlistProducts) return

    return (

        <main
            className=' w-[90%] xl:w-[70%]  mx-auto mt-[210px]   rounded-xl mb-10 '
        >
            <h1 className=' text-foreground font-semibold text-3xl mb-3 '  >Wishlist</h1>

            <section className='border-border shadow-xl px-5 py-3 rounded-xl ' >
                {wishlistProducts.data.map((product) =>
                    <div
                        className=' flex justify-between items-center my-3 flex-col md:flex-row w-full  not-last:border-b-1 border-b-slate-200 pb-3 '
                        key={product.id}
                    >
                        <div className='flex w-full justify-between items-center gap-3 grow  ' >
                            <div className=' flex items-center w-[100px] ' >
                                <Image
                                    src={product.imageCover}
                                    alt={product.title}
                                    width={200}
                                    height={200}
                                    className=' w-full '
                                />
                            </div>

                            <div className=' flex justify-start grow ' >
                                <p className=' line-clamp-1 ' > {(product.title).split(' ', 2).join(' ')} </p>
                            </div>

                        </div>

                        <div className='flex my-3 md:my-0 ' >
                            <div className='  ' >
                                <AddProductToCart product={product} />
                            </div>
                            <div>
                                <RemoveFromWishlist productId={product.id} />
                            </div>
                        </div>
                    </div>
                )}

                {wishlistProducts.data.length == 0 && 
                    <p
                        className='text-muted-foreground font-semibold text-cent text-lg text-center '
                    >
                        No Products are in wishlist
                    </p>
                }
            </section>
        </main>
    )
}
