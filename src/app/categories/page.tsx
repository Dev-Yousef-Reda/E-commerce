import React from 'react'
import { getAllCategories } from '../_services/categories.services'
import ImageCoverCategorySection from './ImageCoverCategorySection/ImageCoverCategorySection'

export const metadata = {
  title: "Categories",
}

export default async function page() {
  const allCategories = await getAllCategories()

  return (
    <main className=' mt-[180px]' >

      {allCategories?.map((category) =>
        <ImageCoverCategorySection category={category} key={category._id} defaultImage={category.image} alt={category.name} />
      )}

    </main>
  )
}
