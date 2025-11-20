export const experimental_ppr = true;

import React from 'react'
import ProductDetailsImageSlider from './components/ProductDetailsImageSlider';
import { getProductDetailsById, getProductsByCategory } from '_/app/_services/products.services';
import Link from 'next/link';
import CustomSlider from '_/components/CustomSlider/CustomSlider';
import AddToCart from './components/AddToCart';
import AddToWishlist from './components/AddToWishlist';

export async function generateMetadata({ params }: { params: Promise<{ productId: string }> }) {
    const result = await params

    const productId = result.productId

    const productDetails = await getProductDetailsById(productId)

    return {
        title: `${productDetails?.slug}`,
    }
}

export default async function page(props: { params: Promise<{ productId: string }> }) {

    const result = await props.params

    const productId = result.productId

    const productDetails = await getProductDetailsById(productId)

    if (!productDetails) {
        return
    }

    const similarProducts = await getProductsByCategory(productDetails.category._id)

    function handleShowingRating(rating: number = 0) {
        const stars = []
        for (let i = 0; i < Math.floor(rating); i++) {
            stars.push(<i key={i} className="fa-solid fa-star text-blue-400  text-xl"></i>)
        }
        if (rating - Math.floor(rating) > 0) {
            stars.push(<i key={'half'} className="fa-solid fa-star-half-stroke text-blue-400 text-xl "></i>)
        }
        return stars
    }

    let discountPercentage = 0
    if (productDetails.priceAfterDiscount) {
        discountPercentage = Number.parseInt(`${((productDetails.price - productDetails.priceAfterDiscount) / productDetails.price) * 100}`)
    }

    return (
        <main className=' mb-15 mt-[100px] md:mt-[210px]  w-[90%] mx-auto' >
            <section className=' productDetails grid grid-cols-12 grid-rows-7 gap-4 ' >

                <div className=' col-span-12 xl:col-span-6 row-span-5 xl:row-span-7 w-full mx-auto xl:w-full rounded-xl '>
                    <ProductDetailsImageSlider defaultImage={productDetails.imageCover} product={productDetails} />
                </div>

                <div className='content p-5 rounded-xl bg-white col-span-12 xl:col-span-6 row-span-2 xl:row-span-2 -order-1 xl:order-2 '>
                    <h1 className='text-xl md:text-3xl lg:text-4xl text-slate-600 font-bold ' > {productDetails.title} </h1>
                    <h2 className='text-lg md:text-xl text-slate-500 my-6 leading-8  border-b-1 border-b-slate-300 pb-6' > {productDetails.description} </h2>
                    <p className='my-6' >
                        <span className='text-slate-400 me-2 text-xl' >
                            {productDetails.ratingsAverage}
                        </span>
                        <span>
                            {handleShowingRating(productDetails?.ratingsAverage)}
                        </span>
                        <span className=' text-slate-400 ' >  {productDetails?.ratingsQuantity} Ratings </span>
                    </p >

                    <p className=' mt-6 text-blue-400 ' >
                        <span className='me-2 text-slate-500 text-lg font-medium' >
                            Brand:
                        </span>
                        <Link
                            href={`/brands/${productDetails.brand._id}`}
                            className='  hover:underline cursor-pointer'
                        >
                            {productDetails.brand.name}
                        </Link>
                    </p>

                    <div className=' my-6  ' >
                        <span className='me-2 text-slate-500 text-lg font-medium' >Price: </span>
                        {productDetails.priceAfterDiscount ? (<>
                            <span className=' line-through text-slate-500' > {productDetails.price}  </span>
                            <span className='  me-2  text-slate-500' >EGP</span>
                            <span className=' text-red-700 font-medium  ' > {productDetails.priceAfterDiscount} </span>

                        </>
                        ) : (
                            <span className='text-slate-500   font-medium ' > {productDetails.price}  </span>
                        )}
                        <span className=' text-slate-500   font-medium ' >
                            EGP
                        </span>

                        {productDetails.priceAfterDiscount != 0 && discountPercentage != 0 && (
                            <span className=' ms-3  px-3 py-2 bg-blue-400 font-bold text-white rounded-full text-sm ' >
                                {discountPercentage}% OFF
                            </span>
                        )}
                    </div>
                </div>

                <div className='p-5 bg-white rounded-xl addToCart col-span-12 xl:col-span-6 row-span-1 xl:row-span-4 order-3 mt-0 lg:mt-7 xl:mt-0 ' >

                    <div className=' flex justify-center items-center ' >
                        <AddToCart product={productDetails} />
                        <AddToWishlist product={productDetails} />
                    </div>

                    <div className=' pt-3 mt-3 border-t-1 border-t-slate-300 text-slate-600 ' >

                        <div className=' flex mb-3' >
                            <span className='me-3 text-slate-400 ' >
                                <i className="fa-solid fa-truck"></i>
                            </span>
                            <p>
                                <span className=' block font-medium mb-1 ' >
                                    Delivery via e-commerce logistics
                                </span>
                                <span>
                                    Expect your order to be delivered before scheduled dates or receive a 10% delay compensation
                                </span>
                            </p>
                        </div>

                        <div className=' flex mb-3' >
                            <span className='me-3 text-slate-400 ' >
                                <i className="fa-solid fa-shield-halved"></i>
                            </span>
                            <p>
                                <span className=' block font-medium mb-1 ' >
                                    Secure payments
                                </span>
                                <span>
                                    Every payment you make on our website secured with strict SSL encryption and PCI DSS data protection protocols
                                </span>
                            </p>
                        </div>

                        <div className=' flex mb-3' >
                            <span className='me-3 text-slate-400 ' >
                                <i className="fa-solid fa-arrow-right-arrow-left"></i>
                            </span>
                            <p>
                                <span className=' block font-medium mb-1 ' >
                                    Standard refund policy
                                </span>
                                <span>
                                    Claim a refund if your order doesn&apos;t ship, is missing, or arrives with product issues
                                </span>
                            </p>
                        </div>

                    </div>

                </div>

            </section>

            {similarProducts && (
                <section>
                    < CustomSlider imageArea='cover' sliderName='Similar Products' slides={similarProducts.data!} slideType='product' />
                </section>
            )}
        </main>
    )
}
