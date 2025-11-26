import { getProductsByCategory } from '_/app/_services/products.services'
import { categoryType } from '_/types/category.types'
import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import Link from 'next/link'


export default async function CategorySection({ category, insideCategories = true }:
    { category: categoryType | null | undefined, insideCategories?: boolean }) {

    if (!category) {
        return
    }

    const categoryProducts = await getProductsByCategory(category._id)

    if (categoryProducts?.data.length === 0) {
        return
    }

    return (

        <section className=" w-[90%] mx-auto my-15 relative  mt-[100px]" >

            {!insideCategories && (
                <h2
                    className='flex justify-between items-center mb-4 pb-5 border-b-2 border-b-secondary font-bold text-foreground'
                >
                    <span className='text-lg md:text-2xl lg:text-4xl  ' > {category.name} Picks </span>
                    {(categoryProducts?.data.length ?? 0) > 0 && (
                        <span
                            className=' border-2 border-border rounded-lg lg:text-lg  px-2 py-1 lg:px-3 lg:py-1.5
                    hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 '
                        >
                            <Link href={`/categories/${category._id}`} >View more</Link>
                        </span>
                    )}
                </h2>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-5 gap-6 mt-[50px] p-3 ' >

                {categoryProducts?.data.slice(0, 5).map((product) =>
                    <ProductCard product={product} key={product.id} />
                )}

            </div>
        </section>
    )
}
