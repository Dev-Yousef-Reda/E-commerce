'use client'
import { NavSmallItem } from '_/components/navigation-menu'
import { productType } from '_/types/product.type'
import Link from 'next/link'

export default function SubCategoryProducts({ subCategory, products, insideNavSheet = false }:
    { subCategory: string, products: productType[] | undefined, insideNavSheet?: boolean }) {

    if (!products) return

    const productsMatching = products.filter((product) => subCategory.includes(product.subcategory[0].name)).slice(0, 5)

    return (
        <>
            {!insideNavSheet &&
                <ul className="grid grid-cols-1! m-2 ">
                    {productsMatching
                        .map((product, index) => (
                            <li key={`${product.id}+${index}`}>
                                <NavSmallItem
                                    item={{ title: (product.title).split(' ', 2).join(' '), href: `/products/${product.id}` }}
                                    href={`/products/${product.id}`}
                                    className="min-w-max "
                                />
                            </li>
                        ))
                    }

                    {productsMatching.length == 0 &&
                        <p className='text-slate-600 text-xs font-semibold' >
                            No products are Available in this subcategory
                        </p>
                    }
                </ul>
            }
            {insideNavSheet &&
                <ul className="grid grid-cols-1! m-2 ">
                    {productsMatching
                        .map((product, index) => (
                            <li key={`${product.id}+${index}`}
                                className='line-clamp-1 my-1 py-1 px-2 bg-neutral-100 rounded-xs cursor-pointer '
                            >
                                <Link className='w-full block ' href={`/products/${product.id}`} > {product.title} </Link>
                            </li>
                        ))
                    }

                    {productsMatching.length == 0 &&
                        <p className='text-slate-600 text-xs font-semibold' >
                            No products are Available in this subcategory
                        </p>
                    }
                </ul>
            }
        </>
    )
}
