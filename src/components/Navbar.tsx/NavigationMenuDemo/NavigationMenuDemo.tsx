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

    if (!categories) return

    return (
        <NavigationMenu viewport={isMobile}>
            <NavigationMenuList >

                {categories.map((category) =>
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

