import React from 'react'
import Login from './Login/Login'
import Link from 'next/link'

export const metadata = {
  title: "sign in",
}

export default function page() {
  return (
    <main className=' mt-[100px] md:mt-[180px] w-[90%] md:w-[60%] lg:w-[50%] mx-auto shadow-xl text-foreground border-border rounded-xl px-7 py-5' >
      <h1 className='text-center text-lg md:text-4xl text-secondary-foreground font-bold' >Welcome Back!</h1>
      <Login />
      <div className='text-sm text-primary mt-5 cursor-pointer flex justify-between '  >
        <Link className=' hover:underline ' href={'/forgot-password'} > Forgot Password? </Link>
        <Link className=' hover:underline ' href={'/signup'} > New here? Sign Up.  </Link>
      </div>
    </main>
  )
}
