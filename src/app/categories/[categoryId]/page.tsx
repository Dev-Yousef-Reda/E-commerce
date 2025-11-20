import ProductCard from '_/components/ProductCard/ProductCard'
import { getSpecificCategory } from '_/app/_services/categories.services'
import { getProductsByCategory } from '_/app/_services/products.services'
import React from 'react'
import Image from 'next/image'

export async function generateMetadata({ params }: { params: Promise<{ categoryId: string }> }) {
    const res = await params
    const categoryId = res.categoryId
    const categoryDetails = await getSpecificCategory(categoryId)

    return {
        title: `${categoryDetails?.slug}`,
    }
}

export default async function page(props: { params: Promise<{ categoryId: string }> }) {

    const res = await props.params
    const categoryId = res.categoryId
    const categoryDetails = await getSpecificCategory(categoryId)

    const categoryProducts = await getProductsByCategory(categoryId)

    if (categoryProducts?.data.length === 0) {
        return (
            <div className='mx-auto  w-[90%]  mt-[100px] md:mt-[210px] f ' >
                <div className='   mx-auto max-h-[70vh] mt-[20px] ' >
                    <Image
                        src={categoryDetails?.image ?? ''}
                        alt={categoryDetails?.name ?? ''}
                        width={700}
                        height={900}
                        className='w-full h-full max-h-[70vh] object-fill xl:object-contain rounded-xl overflow-hidden '
                    />
                </div>
                <p className='text-center text-slate-600 font-semibold my-3 bg-white p-5 rounded-xl' >
                    No products are available in this category
                </p>
            </div>
        )
    }

    return (
        <main className=' mt-[100px] md:mt-[180px]  w-[90%] mx-auto overflow-auto my-10' >
            <h1
                className='flex justify-between items-center my-4 pb-5 border-b-2 border-b-slate-100 font-bold text-slate-600'
            >
                <span className='text-lg md:text-2xl lg:text-4xl  ' > {categoryDetails?.name}  </span>
            </h1>
            
            <div className='   mx-auto max-h-[70vh] mt-[20px] ' >
                <Image
                    src={categoryDetails?.image ?? ''}
                    alt={categoryDetails?.name ?? ''}
                    width={700}
                    height={900}
                    className='w-full h-full max-h-[70vh] object-fill xl:object-contain rounded-xl overflow-hidden '
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-6 mt-[50px] ' >

                {categoryProducts?.data.map((product) =>
                    <ProductCard product={product} key={product.id} />
                )}

            </div>
        </main>
    )
}
