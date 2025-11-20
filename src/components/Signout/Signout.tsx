'use client'
import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

export default function Signout() {

    function handleSignout() {
        signOut({ redirect: true, callbackUrl: '/signin' })
    }

    return (
        <Button
            className="text-slate-600 text-lg font-semibold px-3! py-3!  flex  cursor-pointer justify-start bg-transparent
                            hover:bg-red-100/70 transition-colors duration-300 w-full  rounded-xl h-fit "
            onClick={handleSignout}
        >
            <span className="me-3" >
                <i className="fa-solid fa-power-off"></i>
            </span>

            <span   >
                Signout
            </span>
        </Button>
    )
}
