// components/Thumbnail.tsx

'use client'
import Image from 'next/image'
import React, { SetStateAction } from 'react'

type ThumbnailProps = {
    setMainImageSrc: React.Dispatch<SetStateAction<string>>,
    imgSrc: string,
    imgAlt: string
}

export default function Thumbnail({ setMainImageSrc, imgSrc, imgAlt }: ThumbnailProps) {

    function handleChangeMainImage() {
        setMainImageSrc(imgSrc)
    }


    return (
        <Image
            onMouseEnter={handleChangeMainImage}
            className='w-full h-[100px] object-cover block object-center '
            src={`${imgSrc}`}
            alt={`${imgAlt}`}
            width={200}
            height={200}
        />
    )
}
