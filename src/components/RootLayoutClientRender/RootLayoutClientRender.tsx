'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import SessionWrapper from '../sessionWrapper/SessionWrapper'
import { Toaster } from 'sonner'
import Navbar from '../Navbar.tsx/Navbar'
import { NavBarDemo } from '../NavBarDemo/NavBarDemo'

export default function RootLayoutClientRender({ children }: { children: React.ReactNode }) {

    const pathName = usePathname()

    const cleanUI = ['/signin', '/signup', '/user-profile', '/forgot-password'].some((path) => pathName.includes(path))

    return (
        <>
            <SessionWrapper>
                <Toaster
                    position="bottom-right"
                    duration={1000 * 3}
                />
                {!cleanUI &&
                    <Navbar />
                }
                {children}
                {!cleanUI &&
                    <NavBarDemo />
                }
            </SessionWrapper>
        </>
    )
}
