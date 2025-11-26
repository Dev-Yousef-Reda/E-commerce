// components/MainImage.tsx
'use client';

import Image from 'next/image';
import Thumbnail from '../Thumbnail/Thumbnail';
import { productType } from '_/types/product.type';
import { useState } from 'react';

export default function MainImage({ product, defaultImage }: { product: productType, defaultImage:string }) {

    const [mainImageSrc, setMainImageSrc] = useState(defaultImage)

    let discountPercentage = 0
    if (product.priceAfterDiscount) {
        discountPercentage = Number.parseInt(`${((product.price - product.priceAfterDiscount) / product.price) * 100}`)
    }

    return (
        <>
            <div className='overflow-hidden relative --card ' >
                <div className="image-container mt-2   group-hover:scale-[1.1] transition-all duration-300">
                    <Image
                        width={500}
                        height={500}
                        className='w-full h-[450px] object-contain'
                        src={mainImageSrc}
                        alt={product.title}
                        priority={true}
                    />
                </div>

                {product.priceAfterDiscount != 0 && discountPercentage != 0 && (
                    <div className=' absolute px-3 py-2 font-bold bg-accent text-accent-foreground  bottom-[5%] right-[5%] rounded-full text-sm  ' >
                        {discountPercentage}% OFF
                    </div>
                )}
            </div>

            <div className='bg-white' >
                <ul className=' flex gap-3 --secondary  px-1.5 py-3 ' >
                    {product.images.slice(0, 4).map((image) =>
                        <li
                            className='w-1/4 rounded-lg overflow-hidden cursor-pointer'
                            key={image}
                        >
                            < Thumbnail imgAlt={`${product.title}`} imgSrc={`${image}`} setMainImageSrc={setMainImageSrc} />
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
}




