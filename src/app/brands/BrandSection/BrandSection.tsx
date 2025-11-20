import { getProductsByBrand } from '_/app/_services/products.services'
import React from 'react'
import Link from 'next/link'
import ProductCard from '_/components/ProductCard/ProductCard'
import { brandType } from '_/types/brands.types'


export default async function BrandSection({ brand, insideBrand = true }:
    { brand: brandType | null | undefined, insideBrand?: boolean }) {

    if (!brand) {
        return
    }

    const categoryProducts = await getProductsByBrand(brand._id)

    if (categoryProducts?.data.length === 0) {
        return
    }

    return (

        <section className=" w-[90%] mx-auto my-15 relative  mt-[100px]" >

            {!insideBrand && (
                <h2
                    className='flex justify-between items-center mb-4 pb-5 border-b-2 border-b-slate-100 font-bold text-slate-600'
                >
                    <span className='text-lg md:text-2xl lg:text-4xl  ' > {brand.name} Picks </span>
                    {(categoryProducts?.data.length ?? 0) > 0 && (
                        <span
                            className=' border-2 border-slate-600 rounded-lg lg:text-lg  px-2 py-1 lg:px-3 lg:py-1.5
                    hover:bg-slate-600 hover:text-white transition-all duration-300 '
                        >
                            <Link href={`/categories/${brand._id}`} >View more</Link>
                        </span>
                    )}
                </h2>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-5 gap-6 mt-[50px] ' >

                {categoryProducts?.data.slice(0, 5).map((product) =>
                    <ProductCard product={product} key={product.id} />
                )}

            </div>
        </section>
    )
}
