import React from 'react'
import { getAllBrands } from '../_services/brands.services'
import ImageCoverBrandSection from './ImageCoverBrandSection/ImageCoverBrandSection'
import { brandType } from '_/types/brands.types'


export const metadata = {
    title: "All brands",
}

export default async function page() {

    const brandsPayload1 = await getAllBrands(1)
    const brandsPayload2 = await getAllBrands(2)
    let allBrands: brandType[] = []

    if (brandsPayload1?.data && brandsPayload2?.data) {
        allBrands = (brandsPayload1?.data)?.concat((brandsPayload2?.data))
    }


    
    return (

        <main className='mt-[180px] ' >

            {allBrands.map((brand) =>
                <ImageCoverBrandSection brand={brand} key={brand._id} defaultImage={brand.image} alt={brand.name} />
            )}

            
        </main>
    )
}
