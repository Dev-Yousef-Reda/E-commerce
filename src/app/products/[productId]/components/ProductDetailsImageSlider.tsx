'use client'
import { productType } from '_/types/product.type'
import React, { useEffect, useRef, useState } from 'react'
import ZoomPreview from './ZoomPreview';
import { ImageSlider } from './ImageSlider';
import Image from 'next/image';
import ProductDetailsModal from './ProductDetailsModal';

export default function ProductDetailsImageSlider({ product, defaultImage }: { product: (productType), defaultImage:string }) {

    const [mainImage, setMainImage] = useState<string>(defaultImage)
    const [showZoomPreview, setShowZoomPreview] = useState(false)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical')

    const img = useRef<HTMLImageElement | null>(null)

    useEffect(() => {

        function handleSliderOrientation() {

            const x = window.innerWidth

            if (x >= 1024) {
                setOrientation('vertical')
            } else {
                setOrientation('horizontal')
            }
        }

        handleSliderOrientation()

        window.addEventListener('resize', handleSliderOrientation)

        return () => window.removeEventListener('resize', handleSliderOrientation)

    }, [])

    function handleZoomPreview(event: React.MouseEvent<HTMLImageElement>) {
        if (!!img.current) {
            const rect = img.current.getBoundingClientRect()

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;

            setX(xPercent)
            setY(yPercent)
        }
    }


    return (
        <>
            <div className='relative flex justify-between flex-wrap flex-col lg:flex-row h-full xl:sticky xl:h-fit xl:top-[92px] ' >

                <div className={` lg:mt-13 xl:mt-10  ${orientation === 'vertical' ? 'w-[10%] me-[2%]   ' : 'w-[80%] mx-auto flex justify-center mt-5 '}   `}>

                    <ImageSlider product={product} setMainImage={setMainImage} orientation={orientation} />

                </div>

                <div className={`mainImage ${orientation === 'vertical' ? 'w-[88%]' : 'w-full mx-auto '}  -order-1 lg:order-2  `}
                    onMouseEnter={() => setShowZoomPreview(true)}
                    onMouseLeave={() => setShowZoomPreview(false)}
                >
                    <ProductDetailsModal
                        setMainImage={setMainImage}
                        product={product}
                        imagePreview={mainImage}
                    >
                        <Image
                            width={700}
                            height={700}
                            ref={img}
                            priority={true}
                            onMouseMove={handleZoomPreview}
                            className='w-full cursor-pointer object-contain rounded-xl overflow-hidden'
                            src={mainImage}
                            alt={product.title}
                            
                        />
                    </ProductDetailsModal>
                </div>

                <ZoomPreview showZoomPreview={showZoomPreview} urlPreview={mainImage} x={x} y={y} />

            </div>
        </>
    )
}
