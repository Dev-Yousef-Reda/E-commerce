import ProductCard from '_/components/ProductCard/ProductCard'
import { productType } from '_/types/product.type'
import React from 'react'

export default function SearchProducts({ products, searchName }: { products: productType[], searchName: string }) {

    const matchingProducts = products.filter((product) => product.title.includes(searchName))

    return (
        <>
            <div
                className='mt-[210px] mb-[40px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-5 gap-6'
            >
                {matchingProducts.map((product) =>
                    <div
                        key={product.id}
                        className='  '
                    >
                        <ProductCard
                            product={product}

                        />
                    </div>
                )}

            </div>
            {matchingProducts.length === 0 &&
                <p className=' font-semibold text-center text-slate-600 w-full ' >
                    No products has name: {searchName}
                </p>
            }
        </>
    )
}
