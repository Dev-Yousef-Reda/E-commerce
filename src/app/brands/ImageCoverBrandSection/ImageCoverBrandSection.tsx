import { getProductsByBrand } from '_/app/_services/products.services'
import { brandType } from '_/types/brands.types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BrandSection from '../BrandSection/BrandSection'

export default async function ImageCoverBrandSection({ brand, defaultImage, alt }
    : { brand: brandType, defaultImage: string, alt: string }) {

    const brandProducts = await getProductsByBrand(brand._id)

    if ( (brandProducts?.data.length ?? 0) === 0 ){
        return
    }

    return (
        <>
            <section className=''>
                <h2
                    className='flex justify-between items-center mb-1 pb-5 border-b-2 border-b-slate-100 font-bold text-slate-600 w-[90%] mx-auto  '
                >
                    <span className='text-lg md:text-2xl lg:text-4xl  ' >
                        {brand.name}
                        {(brandProducts?.data.length ?? 0) > 5 && ' Picks'}
                    </span>
                    {(brandProducts?.data.length ?? 0) > 5 && (
                        <span
                            className=' border-2 border-slate-600 rounded-lg lg:text-lg  px-2 py-1 lg:px-3 lg:py-1.5
                    hover:bg-slate-600 hover:text-white transition-all duration-300 '
                        >
                            <Link href={`/brands/${brand._id}`} >View more</Link>
                        </span>
                    )}
                </h2>
                
                <div className=' w-[90%] mx-auto max-h-[70vh] mt-[20px] ' >
                    <Image
                        src={defaultImage}
                        alt={alt}
                        width={700}
                        height={900}
                        className='w-full h-full max-h-[70vh] object-fill xl:object-contain rounded-xl overflow-hidden '
                    />
                </div>

                {brandProducts?.data.length === 0 && (
                    <p className=' w-[90%] text-center text-slate-600 font-semibold my-[40px] bg-white  mx-auto p-5 rounded-xl ' >
                        No products are available in this brand
                    </p>
                )}
                <div className=' ' >
                    <BrandSection brand={brand} insideBrand={true} />
                </div>
            </section>
        </>
    )
}
