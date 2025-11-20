import ProductCard from '_/components/ProductCard/ProductCard'
import { getProductsByBrand } from '_/app/_services/products.services'
import React from 'react'
import Image from 'next/image'
import { getBrandById } from '_/app/_services/brands.services'


export async function generateMetadata({ params }: { params: Promise<{ brandId: string }> }) {
    const res = await params
    const brandId = res.brandId
    const brandDetails = await getBrandById(brandId)

    return {
        title: `Brand | ${brandDetails?.slug}`,
    }
}

export default async function page(props: { params: Promise<{ brandId: string }> }) {

    const res = await props.params
    const brandId = res.brandId
    const brandDetails = await getBrandById(brandId)

    const brandProducts = await getProductsByBrand(brandId)

    return (

        <main className='mt-[100px] md:mt-[210px] w-[90%] mx-auto overflow-auto my-10' >
            <h1
                className='flex justify-between items-center mb-4 mt-0 pt-0 pb-5 border-b-2 border-b-slate-100 font-bold text-slate-600'
            >
                <span className='text-lg md:text-2xl lg:text-4xl  ' > {brandDetails?.name}  </span>
            </h1>

            <div className=' rounded-xl overflow-hidden   mx-auto max-h-[70vh] mt-[20px] ' >
                <Image
                    src={brandDetails?.image ?? ''}
                    alt={brandDetails?.name ?? ''}
                    width={700}
                    height={900}
                    className='w-full h-full max-h-[70vh] object-fill xl:object-contain rounded-xl overflow-hidden '
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-6 mt-[50px] ' >

                {brandProducts?.data.map((product) =>
                    <ProductCard product={product} key={product.id} />
                )}

            </div>

            {brandProducts?.data.length === 0 &&
                <p className='text-center text-slate-600 font-semibold bg-white p-5 rounded-xl' >
                    No products are available in this brand
                </p>
            }

        </main>

    )
}
