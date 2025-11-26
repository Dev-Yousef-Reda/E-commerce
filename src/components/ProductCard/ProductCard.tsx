
import { productType } from '_/types/product.type'
import React from 'react'
import Link from 'next/link'
import MainImage from './MainImage/MainImage'

export default function ProductCard({ product }: { product: productType | undefined}) {
    if (!product) {
        return
    }

    return (
        <>
            <div className='w-full bg-white border border-border shadow-lg shadow-primary/10  rounded-xl overflow-hidden cursor-pointer group relative ' >

                <Link href={`/products/${product.slug}?id=${product.id}`} >
                    <div className=' px-4 pt-3  ' >
                        <h3 className='text-lg font-bold  text-slate-800 line-clamp-1 ' > {(product.title)} </h3>
                        <h3 className='  text-blue-400 ' >
                            <span className='me-2 text-slate-500 text-lg font-medium' >
                                Brand:
                            </span>
                        </h3>
                        <h4 className='text-slate-700 mb-2 min-h-[50px] line-clamp-2 ' >
                            {(product.description)}
                        </h4>

                        <p className='text-sm font-bold' >
                            {product.priceAfterDiscount ? (<>
                                <span className=' line-through text-slate-500' > {product.price}  </span>
                                <span className='  me-2  text-slate-500' >EGP</span>
                                <span className=' text-red-600' > {product.priceAfterDiscount} </span>

                            </>
                            ) : (
                                <span className='' > {product.price}  </span>
                            )}
                            EGP
                        </p>
                    </div>

                    <MainImage defaultImage={product.imageCover} product={product} />

                </Link>
            </div>
        </>
    )
}
