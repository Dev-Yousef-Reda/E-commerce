import { NavigationMenuContent } from '@radix-ui/react-navigation-menu'
import { GetAllSubCategoriesOnCategory } from '_/app/_services/subCategories.services'
import { NavGridCard } from '_/components/navigation-menu'
import { subCategoryType } from '_/types/category.types'
import React, { useEffect, useState } from 'react'
import SubCategoryProducts from '../SubCategoryProducts/SubCategoryProducts'
import { productType } from '_/types/product.type'
import { SubAccordion } from '../NavbarSheet/SubAccordion/SubAccordion'


export default function SubCategories({ categoryId, products, insideNavSheet = false }:
    { categoryId: string, products: productType[] | undefined, insideNavSheet?: boolean }) {

    const [subCategories, setSubCategories] = useState<null | subCategoryType[]>(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        GetAllSubCategoriesOnCategory(categoryId).then((response) => setSubCategories(response)).finally(() => setIsLoading(false))
    }, [categoryId])

    if (!subCategories) return

    return (
        <>
            {!insideNavSheet &&
                <div className='absolute  left-0  md:top-[121%] xl:top-[150%]  w-full bg-secondary/70 backdrop-blur-lg rounded-lg text-foreground ' >
                    <NavigationMenuContent  >
                        <section
                            className={`  grid grid-cols-4 gap-1.5 px-2 py-4  `}
                        >
                            {products?.length === 0 &&
                                <p> Loading...  <i className="fa-solid fa-spinner fa-spin"></i> </p>
                            }
                            {subCategories?.map((subCategory, index) =>
                                <section key={`${subCategory._id}+${index}`} >
                                    <div>
                                        <NavGridCard link={{ title: subCategory.name, href: '1235' }} />
                                    </div>
                                    <SubCategoryProducts subCategory={subCategory.name} products={products} />
                                </section>
                            )}
                        </section>
                        {isLoading && <div>Loading...</div>}
                        {subCategories.length == 0 &&
                            <p className='text-center text-secondary-foreground pb-4 font-semibold ' >
                                No Available Subcategories for this category
                            </p >
                        }
                    </NavigationMenuContent >
                </div>
            }
            {insideNavSheet &&
                <div className=' ps-3 ' >

                    <section>
                        {subCategories?.map((subCategory, index) =>
                            <section key={`${subCategory._id}+${index}`} >
                                <SubAccordion subCategory={subCategory.name} products={products} />
                            </section>
                        )}
                    </section>
                    {subCategories.length == 0 &&
                        <p className='text-center text-secondary-foreground pb-4 font-semibold ' >
                            No Available Subcategories for this category
                        </p >
                    }
                </div>
            }

        </>
    )
}
