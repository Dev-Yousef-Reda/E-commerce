'use client'
import { useRef, useEffect } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import leftArrow from './../../assets/Arrow-left.png'
import rightArrow from './../../assets/arrow-right.png'
import { categoryType } from "_/types/category.types";
import { productType } from "_/types/product.type";
import Link from "next/link";

export default function CustomSlider({ sliderName, slides, imageArea, slideType }
    : { sliderName: string, slides: categoryType[] | productType[] | null, imageArea: string, slideType: ('product' | 'category') }) {
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);
    const swiperRef = useRef<SwiperClass | null>(null);



    useEffect(() => {
        if (
            swiperRef.current &&
            swiperRef.current.params &&
            prevRef.current &&
            nextRef.current
        ) {
            // Assign navigation elements AFTER refs are available
            const navigation = swiperRef.current.params.navigation;
            if (navigation && typeof navigation !== 'boolean') {
                navigation.prevEl = prevRef.current;
                navigation.nextEl = nextRef.current;
            }

            // Re-init navigation
            swiperRef.current.navigation.destroy();
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);

    if (slides === null) return

    return (

        <section className=" w-[90%] mx-auto my-15 relative  mt-[100px] " >

            <h2
                className='flex justify-between items-center mb-4 pb-5 border-b-2 border-b-slate-100 text-2xl lg:text-4xl'
            >
                <span className=' text-slate-600 font-bold ' >
                    {sliderName}
                </span>
            </h2>

            <div className="w-full">
                <Swiper
                    modules={[Navigation, Keyboard, Autoplay]}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper; // store swiper instance
                    }}
                    keyboard={{
                        enabled: true,
                    }}
                    slidesPerView={1}
                    spaceBetween={15}
                    breakpoints={{
                        600: {
                            slidesPerView: 2,
                        },

                        970: {
                            slidesPerView: 3,
                        },

                        1250: {
                            slidesPerView: 4,
                        },
                        1650: {
                            slidesPerView: 5,
                        },
                    }}
                    autoplay={{
                        delay: 1800,
                        disableOnInteraction: true,
                    }}
                    
                    rewind={true}
                    className="mySwiper"
                >

                    {slideType === 'category' &&
                        (slides as categoryType[]).map((slide) => (

                            <SwiperSlide key={slide.name} className="mt-[50px] " >
                                <div className='text-center'  >
                                    <Link
                                        className="cursor-pointer"
                                        href={`/categories/${slide._id}`}
                                    >

                                        <div className="image-container">
                                            <Image
                                                width={500}
                                                height={500}
                                                src={`${slide.image}`}
                                                alt=""
                                                className={` w-full h-[450px] object-${imageArea} rounded-xl overflow-hidden `}
                                            />
                                        </div>
                                        <h3
                                            className=' font-bold text-xl mt-3 text-slate-700 '
                                        >
                                            {`${slide.name}`}
                                        </h3>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}

                    {slideType === 'product' &&
                        (slides as productType[]).map((slide) => (

                            <SwiperSlide key={slide.id} className="mt-[50px] " >
                                <div className='text-center'  >
                                    <Link className="cursor-pointer" href={`/products/${slide.id}`} >
                                        <div className="image-container">
                                            <Image
                                                src={`${slide.imageCover}`}
                                                alt=""
                                                className={` w-full h-[450px] object-${imageArea} rounded-xl overflow-hidden `}
                                                width={400}
                                                height={400}
                                            />
                                        </div>
                                        <h3
                                            className=' font-bold text-xl mt-3 text-slate-700 '
                                        >
                                            {`${(slide.title).split(' ', 3).join(' ')}`}
                                        </h3>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}



                </Swiper>
            </div>
            {/* Custom Buttons */}
            <button
                ref={prevRef}
                className="absolute right-15 top-1 text-4xl z-10 cursor-pointer opacity-70 hover:opacity-100"
            >
                <Image width={40} src={leftArrow} alt="" />
            </button>
            <button
                ref={nextRef}
                className="absolute right-0 top-1 text-4xl z-10 cursor-pointer opacity-70 hover:opacity-100"
            >
                <Image width={40} src={rightArrow} alt="" />
            </button>

        </section>
    );
}
