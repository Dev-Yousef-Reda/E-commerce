import React from 'react'
import Register from './Register/Register'
import Link from 'next/link'


export const metadata = {
  title: "sign up",
}

export default function page() {
  return (
    <main className=' mt-[100px] md:mt-[180px] w-[90%] md:w-[60%] lg:w-[50%] mx-auto  shadow-xl text-foreground border-border rounded-xl px-7 py-5' >
      <h1 className='text-center text-lg md:text-4xl  font-bold' >Join Us</h1> 
      <Register />
      <div className='text-center text-sm text-primary mt-5 cursor-pointer hover:underline' >
        <Link href={'/signin'} > Already have an account? Sign in.  </Link>
      </div>
    </main>
  )
}
