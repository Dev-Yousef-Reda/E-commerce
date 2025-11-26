'use client'
import { useRef, useEffect } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay, Grid, Keyboard, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import leftArrow from './../../assets/Arrow-left.png'
import rightArrow from './../../assets/arrow-right.png'
import { brandType } from "_/types/brands.types";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function GridSlider({ sliderName, slides, }
    : { sliderName: string, slides: brandType[], imageArea: string, height: number }) {
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

    const userSession = useSession()

    return (

        <section className={` w-[90%] mx-auto my-15 relative ${userSession.status === 'authenticated' && ' mt-[210px] '}  `} >

            <h2
                className='flex justify-between items-center mb-4 pb-5 border-b-2 border-b-secondary text-2xl lg:text-4xl'
            >
                <span className=' text-foreground font-bold ' >
                    {sliderName}
                </span>
            </h2>

            <div className="w-full">
                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper; // store swiper instance
                    }}
                    modules={[Navigation, Grid, Keyboard, Autoplay]}
                    slidesPerView={1}
                    grid={{
                        rows: 2,
                    }}
                    keyboard={{
                        enabled: true,
                    }}
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
                        1400: {
                            slidesPerView: 5,
                        }
                    }}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: true,
                    }}
                    rewind={true}
                    loop
                    className="gridSlider"
                >

                    {slides.map((slide) => (
                        <SwiperSlide key={slide.name} className="  mt-[50px]! ">
                            <div className='text-center '  >
                                <div className="image-container relative">
                                    <Link href={`/brands/${slide.slug}?id=${slide._id}`} >
                                        <Image
                                            priority={true}
                                            width={500}
                                            height={500}
                                            src={`${slide.image}`}
                                            alt=""
                                            className={` w-full cursor-pointer h-[220px] object-cover object-center rounded-xl overflow-hidden  border shadow-sm shadow-primary/10  `}
                                        />
                                    </Link>
                                </div>
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

        </section >
    );
}
