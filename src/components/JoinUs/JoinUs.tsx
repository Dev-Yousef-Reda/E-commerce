import Link from 'next/link'
import React from 'react'
export default function JoinUs() {
    return (
        <section
            className='joinUs py-8 text-white font-bold text-center bg-contain bg-repeat-x bg-center flex flex-col justify-center items-center '
        >
            <h2 className='text-4xl' >Ready To Get Start</h2>
            <p className='text-2xl my-5 '>Explore several products from trusted suppliers by signing up today!</p>
            <Link
                className='bg-blue-400 px-10 py-2 rounded-full text-2xl tracking-wider'
                href={``} >
                Sign Up
            </Link>
        </section>
    )
}
