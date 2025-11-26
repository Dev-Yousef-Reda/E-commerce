"use client"

import * as React from "react"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "_/components/ui/navigation-menu"
import { categoryType } from "_/types/category.types"
import SubCategories from "../SubCategories/SubCategories"
import { productType } from "_/types/product.type"
import Link from "next/link"



export function NavigationMenuDemo({ products, categories }
    : { products: productType[], categories: categoryType[] | null }) {

    const isMobile = false

    const [categoriesNum, setCategoriesNum] = React.useState<number | undefined>(() => categories?.length)

    React.useEffect(() => {

        function detectCategoriesNum() {
            const windowSize = window.innerWidth
            if (categories?.length) {
                let num = categories.length
                if (windowSize <= 1536) {
                    num = categories.length - 1
                }
                if (windowSize <= 1280) {
                    num = categories.length - 3
                }
                if (windowSize <= 1024) {
                    num = categories.length - 5
                }

                setCategoriesNum(num)
            } else {
                setCategoriesNum(undefined)
            }
        }

        detectCategoriesNum()

        window.addEventListener('resize', detectCategoriesNum)

        return () => window.removeEventListener('resize', detectCategoriesNum)

    }, [categories])

    if (!categories) return

    return (
        <NavigationMenu viewport={isMobile}>
            <NavigationMenuList >

                {categories.slice(0, categoriesNum).map((category) =>
                    <NavigationMenuItem key={category._id} >
                        <Link href={`/categories/${category.slug}?categoryId=${category._id}`} >
                            <NavigationMenuTrigger> {category.name} </NavigationMenuTrigger>
                        </Link>
                        <SubCategories categoryId={category._id} key={category._id} products={products} />
                    </NavigationMenuItem>
                )}

            </NavigationMenuList>
        </NavigationMenu>
    )
}

