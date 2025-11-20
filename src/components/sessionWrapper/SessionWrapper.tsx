'use client'
import CartCountContextProvider from '_/context/ProductsCount/ProductsCountProvider'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider  >
            <CartCountContextProvider>
                {children}
            </CartCountContextProvider>
        </SessionProvider>
    )
}
