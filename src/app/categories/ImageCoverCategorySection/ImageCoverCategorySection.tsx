import { getProductsByCategory } from '_/app/_services/products.services'
import CategorySection from '_/components/CategorySection/CategorySection'
import { categoryType } from '_/types/category.types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function ImageCoverCategorySection({ category, defaultImage, alt }
    : { category: categoryType, defaultImage: string, alt: string }) {

    const categoryProducts = await getProductsByCategory(category._id)

    if (categoryProducts?.data.length === 0) {
        return
    }

    return (
        <>
            <section className=''>
                <h2
                    className='flex justify-between items-center mb-1 pb-5 border-b-2 border-b-slate-100 font-bold text-slate-600 w-[90%] mx-auto  '
                >
                    <span className='text-lg md:text-2xl lg:text-4xl  ' >
                        {category.name}
                        {(categoryProducts?.data.length ?? 0) > 0 && ' Picks'}
                    </span>
                    {(categoryProducts?.data.length ?? 0) > 0 && (
                        <span
                            className=' border-2 border-slate-600 rounded-lg lg:text-lg  px-2 py-1 lg:px-3 lg:py-1.5
                    hover:bg-slate-600 hover:text-white transition-all duration-300 '
                        >
                            <Link href={`/categories/${category._id}`} >View more</Link>
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

                {categoryProducts?.data.length === 0 && (
                    <p className=' w-[90%] text-center text-slate-600 font-semibold my-[40px] bg-white  mx-auto p-5 rounded-xl ' >
                        No products are available in this category
                    </p>
                )}
                <div className=' ' >
                    <CategorySection category={category} insideCategories={true} />
                </div>
            </section>
        </>
    )
}
