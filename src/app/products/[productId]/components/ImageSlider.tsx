import * as React from "react"

import { Card, CardContent } from "../../../../components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel"
import { productType } from "_/types/product.type"
import Image from "next/image";

export function ImageSlider({ product, setMainImage, orientation }:
  { product: productType, setMainImage: React.Dispatch<React.SetStateAction<string>>, orientation: ('vertical' | 'horizontal') }) {


  function handleChangingMainImage(imageSrc:string) {
    setMainImage(imageSrc);
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      orientation={orientation}
      className="w-full max-w-xs"
    >

      <CarouselContent className="  xl:-mt-4 lg:h-fit lg:max-h-[950px] xl:h-fit xl:max-h-[60vh] w-full max-w-full ">

        {product.images.map((image, index) => (
          <CarouselItem key={index} className={`${orientation ? 'basis-1/6  ' : 'basis-1/2'}`}>
            <div className="  ">
              <Card className="w-full mx-auto p-0 border-1 border-border shadow-lg hover:border-3 rounded-xl  overflow-hidden  cursor-pointer  transition-all duration-100" >

                <CardContent className=" p-0 ">

                  <Image
                    onMouseEnter={() => handleChangingMainImage(image)}
                    className='w-full'
                    src={image}
                    alt={product.title}
                    width={200}
                    height={200}
                  />

                </CardContent>

              </Card>
            </div>
          </CarouselItem>
        ))}

      </CarouselContent>

      <CarouselPrevious className="cursor-pointer" />
      <CarouselNext className="cursor-pointer" />

    </Carousel>
  )
}

