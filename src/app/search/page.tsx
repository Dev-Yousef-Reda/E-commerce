import React from 'react'
import { getAllProducts } from '../_services/products.services'
import SearchProducts from './SearchProducts/SearchProducts'

export const metadata = {
    title: "Search",
}

export default async function page({ searchParams }: { searchParams: Promise<{name:string}>}) {

    const params = await searchParams
    
    const products1 = await getAllProducts(1)
    const products2 = await getAllProducts(2)

    if(!products1 || !products2 ) {
        return 
    }

    return (
        <div className=' w-[90%] mx-auto ' >
            <SearchProducts searchName={params.name} products={[...products1.data!, ...products2.data!]} />
        </div>
    )
}
