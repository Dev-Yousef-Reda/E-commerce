import React from 'react'
import CategoriesSlider from '_/components/CustomSlider/CustomSlider'
import { getAllCategories } from '_/app/_services/categories.services';
import { getAllBrands } from '_/app/_services/brands.services';
import CategorySection from '_/components/CategorySection/CategorySection';
import JoinUs from '_/components/JoinUs/JoinUs';
import GridSlider from '_/components/GridSlider/GridSlider';
import { getServerSession } from 'next-auth';
import { brandType } from '_/types/brands.types';
import { HeroSectionDemo } from '_/components/Header/Header';
import { Testimonials } from '_/components/Testimonials/Testimonials';

export default async function page() {

  const categories = await getAllCategories()
  const brandsPage1 = await getAllBrands(1)
  const brandsPage2 = await getAllBrands(2)

  let allBrands: brandType[] = []
  if (brandsPage1?.data && brandsPage2?.data) {
    allBrands = (brandsPage1?.data).concat((brandsPage2?.data))
  }

  const userSession = await getServerSession()

  return (
    <>

      {userSession == null && (
        <HeroSectionDemo />
      )}

      <GridSlider height={200} imageArea='contain' sliderName='Brands' slides={allBrands} />
      <CategoriesSlider imageArea='cover' sliderName='Categories' slides={categories} slideType='category' />
      {categories?.map((category) =>
        <CategorySection category={category} key={category._id} insideCategories={false} />
      )}
      {userSession == null && (
        <>
          <Testimonials />
          <JoinUs />
        </>
      )}

    </>
  )
}
