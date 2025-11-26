"use client";

import { cn } from "_/lib/utils";

interface HeroProps {
  title: string;
  description: string;

}

export function HeroSection({
  title,
  description,

}: HeroProps) {

  return (
    <section
      className={cn(
        "text-foreground ",
        " mt-[100px] md:mt-[210px]",
        "fade-bottom overflow-hidden pb-0"
      )}
    >
      <div className="mx-auto w-[90%] px-0 flex max-w-container flex-col gap-12 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">

          {/* Title */}
          <h1 className="relative z-10 inline-block animate-appear bg-gradient-to-r from-foreground to-muted-foreground w-full
          bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl
          sm:text-6xl sm:leading-tight  lg:text-8xl md:leading-tight md:mt-[20px] lg:mt-0 "  >
            {title}
            <br />
            Service You Can Trust
          </h1>

          {/* Description */}
          <p className="text-md relative z-10 w-1/2 animate-appear font-medium text-muted-foreground opacity-0 delay-100 sm:text-xl">
            {description}
          </p>

          <ul
            className='flex  flex-wrap animate-appear pb-4 '
          >

            <li className=' px-4 mt-7 w-full md:w-[50%] lg:w-1/3' >
              <div className='rounded-3xl border shadow-lg bg-white shadow-primary/10 md:min-h-[250px]  py-7 px-5 text-card-foreground ' >
                <p className='mb-3 lg:text-xl font-bold capitalize  ' >
                  Assured Quality and transactions
                </p>
                <p className='lg:text-lg' >
                  Ensure production quality from verified suppliers, with your orders protected from payment to delivery.
                </p>
              </div>
            </li>

            <li className='  px-4 mt-7 w-full md:w-[50%] lg:w-1/3' >
              <div className='rounded-3xl border shadow-lg bg-white shadow-primary/10 md:min-h-[250px] py-7 px-5  text-card-foreground' >
                <p className='mb-3 lg:text-xl font-bold capitalize ' >
                  Fast & Reliable Delivery
                </p>
                <p className='lg:text-lg' >
                  Enjoy express shipping with premium logistics partners.
                  Real-time tracking ensures transparency from checkout to doorstep.
                  Worldwide delivery with careful packaging to protect every detail.
                </p>
              </div>
            </li>

            <li className='  px-4 mt-7 w-full md:w-[50%] lg:w-1/3' >
              <div className='rounded-3xl border shadow-lg bg-white shadow-primary/10 md:min-h-[250px] py-7 px-5  text-card-foreground' >
                <p className='mb-3 lg:text-xl font-bold capitalize' >
                  Trusted by Thousands of Customers
                </p>
                <p className='lg:text-lg' >
                  Verified reviews and authentic testimonials from global clients.

                  A reputation built on transparency, service, and satisfaction.

                  Dedicated customer support ready to assist 24/7.
                </p>
              </div>
            </li>
        
          </ul>

        </div>
      </div>
    </section>
  );
}
