'use client'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "_/components/ui/dialog"
import { productType } from "_/types/product.type"
import Image from "next/image";

import React, { SetStateAction } from 'react'

export default function ProductDetailsModal({ children, imagePreview, product, setMainImage }:
    { children: React.ReactNode, imagePreview: string, product: productType, setMainImage: React.Dispatch<SetStateAction<string>> }) {

    function handleChangingMainImage(imageSrc: string) {
        setMainImage(imageSrc);
    }

    return (
        <Dialog>
            <DialogTrigger
                className=" w-full max-w-full  rounded-xl overflow-hidden block"
            >
                {children}
            </DialogTrigger>

            <DialogContent
                className=" w-[80%] max-w-[80%]! xl:max-h-[90vh]  bg-neutral-300 overflow-hidden"
            >
                <div
                    className=" flex   mt-[20px] justify-center items-center xl:max-h-[70%]  "
                >
                    <div className="MainImage h-full  w-[60%] me-[2%] xl:max-h-[85%] ">
                        <Image
                            width={700}
                            height={700}
                            priority={true}
                            className=" w-full  xl:max-h-[92%] object-contain object-center block "
                            src={imagePreview}
                            alt=""
                        />
                    </div>

                    <ul
                        className=" w-[38%] xl:max-h-[68%] grid grid-cols-3 lg:grid-cols-4 gap-3 "
                    >
                        {product.images.map((image) =>

                            <li
                                className=" border-1 border-blue-300 hover:border-3  rounded-lg overflow-hidden "
                                key={image}
                            >
                                <Image
                                    onClick={() => handleChangingMainImage(image)}
                                    className=" w-full cursor-pointer "
                                    src={image}
                                    alt={product.title}
                                    width={200}
                                    height={200}
                                />
                            </li>
                        )}
                    </ul>
                </div>
            </DialogContent>
        </Dialog>
    )
}
